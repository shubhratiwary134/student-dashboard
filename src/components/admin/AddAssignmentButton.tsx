import React, { useState } from 'react';
import AddAssignmentForm from './AddAssignmentForm';

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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
