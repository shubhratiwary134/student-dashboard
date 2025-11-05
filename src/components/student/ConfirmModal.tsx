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
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-[#1A1A1D] border border-[#2A2A2E] rounded-xl p-6 w-[90%] sm:w-[400px] text-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <p className="mb-5 text-[#E5E7EB] text-sm sm:text-base">{message}</p>
        <div className="flex flex-col sm:flex-row justify-around gap-3 sm:gap-0">
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-md 
                       font-medium hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-5 py-2 bg-[#2A2A2E] text-[#9CA3AF] rounded-md font-medium 
                       hover:bg-[#3A3A3D] transition-colors duration-200"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
