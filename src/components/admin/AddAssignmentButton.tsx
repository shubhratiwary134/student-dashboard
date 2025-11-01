import React, { useState } from 'react';
import { AddAssignmentForm } from './AddAssignmentForm';

interface AddAssignmentButtonProps {
  onAssignmentAdded: () => void;
}

export const AddAssignmentButton: React.FC<AddAssignmentButtonProps> = ({
  onAssignmentAdded,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => setOpen(true)}
          className="px-5 py-2 bg-linear-to-r from-[#2563EB] to-[#3B82F6] text-white font-medium 
                     rounded-md shadow-[0_0_10px_rgba(59,130,246,0.3)]
                     hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] 
                     hover:scale-[1.02] active:scale-[0.99]
                     transition-all duration-300"
        >
          + Create Assignment
        </button>
      </div>

      <AddAssignmentForm
        open={open}
        onClose={() => setOpen(false)}
        onAssignmentAdded={onAssignmentAdded}
      />
    </>
  );
};
