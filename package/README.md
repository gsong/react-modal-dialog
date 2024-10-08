# @gsong/react-modal-dialog

[![NPM Version](https://img.shields.io/npm/v/%40gsong%2Freact-modal-dialog)](https://www.npmjs.com/package/@gsong/react-modal-dialog)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/gsong/react-modal-dialog/validate.yaml?label=tests)](https://github.com/gsong/react-modal-dialog/actions/workflows/validate.yaml)

A no-frills React modal [`<dialog>`][dialog] component. In addition to default
modal dialog behaviors, the component also disables body scrolling when the
modal is open.

Heavily inspired by <https://web.dev/articles/building/a-dialog-component>.

## Features

- Types
- Works with ESM and CJS
- Server-side rendering (SSR) compatible
- Click outside the modal to dismiss (default off)
- Prevent body scrolling when the modal is open (default on)
- BYOS: Bring your own styles 🧑‍🎤

## Install

```sh
{pnpm,npm,yarn} add @gsong/react-modal-dialog
```

## Usage

```js
import { useModal } from "@gsong/react-modal-dialog";

export default function Demo() {
  const { Modal, openModal, closeModal } = useModal();

  return (
    <div style={{ height: "200vh" }}>
      <button onClick={openModal}>Open Modal</button>

      <Modal
        allowBodyScroll
        allowDismiss
        onDismiss={() => console.debug("Dismissed")}
        onCancel={() => console.debug("Canceled")}
        onClose={() => console.debug("Closed")}
        className="tailwind-stuff"
      >
        <div>Modal content</div>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
}
```

## API

The `useModal` hook returns an object with the following properties:

- `Modal`: The modal component.
- `openModal`: A function to open the modal.
- `closeModal`: A function to close the modal.

### Modal

#### Props

```ts
interface ModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  allowBodyScroll?: boolean;
  allowDismiss?: boolean;
  onDismiss?: (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => void;
}
```

- `allowBodyScroll`: Allow the body to scroll when the modal is open. Defaults
  to `false`.
- `allowDismiss`: Allow the modal to be dismissed by clicking outside of it.
  Defaults to `false`.
- `onDismiss`: Called when the modal is dismissed.

### openModal

```ts
openModal: () => void;
```

### closeModal

```ts
closeModal: () => void;
```

## v1 to v2 Migration

Breaking changes and what to do about them.

### Control Body Scrolling

Instead of this:

```js
openModal({ disableBodyScroll: false });
```

Do this:

```js
<Modal allowBodyScroll />
```

[dialog]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
