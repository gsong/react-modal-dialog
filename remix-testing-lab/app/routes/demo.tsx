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
