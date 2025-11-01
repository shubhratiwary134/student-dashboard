interface ConfirmModalProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
        <p className="mb-4 text-gray-800">{message}</p>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            Yes
          </button>
          <button onClick={onCancel} className="bg-gray-300 px-4 py-1 rounded">
            No
          </button>
        </div>
      </div>
    </div>
  );
};
