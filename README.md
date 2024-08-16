# @gsong/react-modal-dialog

A no-frills React modal [`<dialog>`](dialog) component, with types. Works with
both ESM and CJS.

## Install

```sh
{pnpm,npm,yarn} install @gsong/react-modal-dialog
```

## Usage

```js
import { useModal } from "@gsong/react-modal-dialog";

function App() {
  const { Modal, openModal, closeModal } = useModal();

  return (
    <div style={{ height: "200vh" }}>
      <button onClick={() => openModal({ disableBodyScroll: false })}>
        Open Modal
      </button>
      <Modal
        allowDismiss={true}
        onDismiss={() => console.debug("Dismissed")}
        onCancel={() => console.debug("Canceled")}
        onClose={() => console.debug("Closed")}
      >
        Modal content
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
}

export default App;
```

## API

The `useModal` hook returns three values:

- Modal: The modal component.
- openModal: A function to open the modal.
- closeModal: A function to close the modal.

### Modal

#### Props

- `allowDismiss?: boolean;` // Allow the modal to be dismissed by clicking
  outside of it.
- `onDismiss?: (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) =>
void;` // Called when the modal is dismissed.
- `onCancel?: (event: React.SyntheticEvent<HTMLDialogElement, Event>) =>
void;` // Called when the modal is canceled.
- `onClose?: (event: React.SyntheticEvent<HTMLDialogElement, Event>) =>
void;` // Called when the modal is closed.

### openModal

```ts
openModal: (options?: {
    disableBodyScroll: boolean;
}) => void;
```

`disableBodyScroll` is `true` by default, which prevents the body from
scrolling when the modal is open.

### closeModal

```ts
closeModal: () => void;
```

[dialog]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
