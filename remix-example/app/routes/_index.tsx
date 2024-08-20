import type { MetaFunction } from "@remix-run/node";

import { useModal } from "@gsong/react-modal-dialog";

export const meta: MetaFunction = () => {
  return [
    { title: "Modal Demo" },
    { name: "description", content: "@gsong/react-modal-dialog demo" },
  ];
};

export default function Index() {
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
        allowBodyScroll
        allowDismiss
        onDismiss={() => console.debug("Dismissed")}
        onCancel={() => console.debug("Canceled")}
        onClose={() => console.debug("Closed")}
        className="rounded-lg shadow-xl p-8 backdrop:bg-purple-500 backdrop:bg-opacity-50 backdrop:backdrop-blur-sm"
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
}
