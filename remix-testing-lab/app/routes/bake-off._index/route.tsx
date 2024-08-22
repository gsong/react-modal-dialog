import "mermaid";

import { useEffect, useId, useRef, useState } from "react";
import { useLoaderData } from "@remix-run/react";

// @ts-expect-error vite-plugin-markdown
import { html } from "./modal-dialog-popover.md";

export const loader = () => {
  return { documentation: html };
};

export default function BakeOff() {
  const { documentation } = useLoaderData<typeof loader>();

  return (
    <>
      <h1>Modal, Dialog, Popover Bake-off</h1>
      <Modal />
      <Dialog />
      <AutoPopover />
      <ManualPopover />

      <details style={{ marginBlock: "2rem" }}>
        <summary>Documentation</summary>
        <div dangerouslySetInnerHTML={{ __html: documentation }} />
      </details>
    </>
  );
}

function Modal() {
  const ref = useRef<HTMLDialogElement>(null);
  const toggleModal = () => {
    ref.current?.open ? ref.current.close() : ref.current?.showModal();
  };

  return (
    <>
      <h2>Modal Demo</h2>

      <button onClick={toggleModal}>Open Modal</button>

      <dialog ref={ref}>
        <p>Dialog content</p>
        <button onClick={toggleModal}>Close Modal</button>
      </dialog>
    </>
  );
}

function Dialog() {
  return (
    <>
      <h2>Dialog Demo</h2>
      <DialogElement label="1" />
      <DialogElement label="2" />
    </>
  );
}

function DialogElement({ label }: { label: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);
  const toggleDialog = () => {
    ref.current?.open ? ref.current.close() : ref.current?.show();
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleDialog}>
        {isOpen ? "Close" : "Open"} Dialog {label}
      </button>

      <dialog ref={ref}>
        <p>Dialog {label} content</p>
        <button onClick={toggleDialog}>Close Dialog {label}</button>
      </dialog>
    </>
  );
}

function AutoPopover() {
  return (
    <>
      <h2>Auto Popover Demo</h2>
      <PopoverElement label="auto 1" />
      <PopoverElement label="auto 2" />
    </>
  );
}

function ManualPopover() {
  return (
    <>
      <h2>Manual Popover Demo</h2>
      <PopoverElement popover="manual" label="manual 1" />
      <PopoverElement popover="manual" label="manual 2" />
    </>
  );
}

function PopoverElement({
  popover = "auto",
  label,
}: {
  popover?: "auto" | "manual";
  label: string;
}) {
  const id = useId();
  const ref = useRef<CustomDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const popover = ref.current;

    // Popover API is not supported in React 18:
    // https://github.com/facebook/react/issues/27479#issuecomment-2193766635
    if (popover) {
      const handleBeforeToggle = (event: ToggleEvent) => {
        if (event.newState === "open") {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      };

      popover.addEventListener("beforetoggle", handleBeforeToggle);

      return () => {
        popover.removeEventListener("beforetoggle", handleBeforeToggle);
      };
    }
  }, []);

  return (
    <>
      <button {...{ popovertarget: id }}>
        {isOpen ? "Close" : "Open"} popover {label}
      </button>
      <div {...{ id, popover, ref }}>
        Popover {label} content
        <button {...{ popovertarget: id }}>Close</button>
      </div>
    </>
  );
}

// Hack because of TS bug? https://github.com/microsoft/TypeScript/issues/54864
interface CustomEventMap extends HTMLElementEventMap {
  beforetoggle: ToggleEvent;
  toggle: ToggleEvent;
}

interface CustomDivElement extends HTMLDivElement {
  addEventListener<K extends keyof CustomEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: CustomEventMap[K]) => unknown,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof CustomEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: CustomEventMap[K]) => unknown,
    options?: boolean | EventListenerOptions,
  ): void;
}
