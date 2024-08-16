import * as React from "react";

export const useModal = () => {
  const originalStyles = React.useRef<OriginalStyles>({
    overflow: "",
    scrollbarGutter: "",
  });
  const ref = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    originalStyles.current = {
      overflow: document.documentElement.style.overflow,
      scrollbarGutter: document.documentElement.style.scrollbarGutter,
    };
  }, []);

  const openModal = React.useCallback(
    (
      { disableBodyScroll: _disableBodyScroll } = { disableBodyScroll: true },
    ) => {
      if (ref.current) {
        ref.current.showModal();

        if (_disableBodyScroll) {
          disableBodyScroll();
        }
      }
    },
    [],
  );

  const closeModal = React.useCallback(() => {
    ref.current?.close();
  }, []);

  const Modal = React.useMemo(() => {
    return function Modal({
      allowDismiss = false,
      onDismiss = () => {},
      onClose = () => {},
      ...props
    }: React.PropsWithChildren<ModalProps>) {
      return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
        <dialog
          onClick={(event) => {
            if (
              allowDismiss &&
              event.target === event.currentTarget &&
              !clickedInCurrentTarget(event)
            ) {
              event.currentTarget.close();
              onDismiss(event);
            }
          }}
          onClose={(event) => {
            if (ref.current) {
              enableBodyScroll(originalStyles.current);
            }
            onClose(event);
          }}
          {...props}
          ref={ref}
        />
      );
    };
  }, []);

  return { Modal, openModal, closeModal };
};

const disableBodyScroll = () => {
  if (typeof window !== "undefined") {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.scrollbarGutter = "stable";
  }
};

const enableBodyScroll = ({ overflow, scrollbarGutter }: OriginalStyles) => {
  if (typeof window !== "undefined") {
    document.documentElement.style.overflow = overflow;
    document.documentElement.style.scrollbarGutter = scrollbarGutter;
  }
};

const clickedInCurrentTarget = (
  event: React.MouseEvent<HTMLDialogElement, MouseEvent>,
) => {
  const { currentTarget, clientX, clientY } = event;

  const { top, bottom, left, right } = currentTarget.getBoundingClientRect();
  return top < clientY && clientY < bottom && left < clientX && clientX < right;
};

interface OriginalStyles {
  overflow: string;
  scrollbarGutter: string;
}

interface ModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  allowDismiss?: boolean;
  onDismiss?: (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => void;
}
