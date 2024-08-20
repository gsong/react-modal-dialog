import type { ModalProps } from "@gsong/react-modal-dialog";

import { useModal } from "@gsong/react-modal-dialog";

export const TestModal = (props: ModalProps) => {
  const { Modal, openModal, closeModal } = useModal();

  return (
    <div style={{ height: "200vh" }}>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Open Modal
      </button>

      <Modal
        className="rounded-lg shadow-xl p-8 backdrop:bg-purple-500 backdrop:bg-opacity-50 backdrop:backdrop-blur-sm"
        data-testid="modal"
        {...props}
      >
        <div className="flex flex-col">
          <div className="text-lg font-semibold mb-20">Modal content</div>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Close Modal
          </button>
        </div>
      </Modal>
    </div>
  );
};
