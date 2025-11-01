import React, { useState } from 'react';
import { getAssignments } from '../../helpers/storageHelpers';
import type { Assignment } from '../../types/types';
import { addNewAssignment } from '../../helpers/adminHelpers';

interface AddAssignmentFormProps {
  open: boolean;
  onClose: () => void;
  onAssignmentAdded: () => void;
}

const AddAssignmentForm: React.FC<AddAssignmentFormProps> = ({
  open,
  onClose,
  onAssignmentAdded,
}) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    driveLink: '',
  });

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.description.trim()) {
      alert('Please fill all fields');
      return;
    }

    const existing = getAssignments();
    const newAssignment: Assignment = {
      id: 'as' + (existing.length + 1),
      title: form.title,
      description: form.description,
      driveLink: form.driveLink || 'https://drive.google.com',
      createdBy: 'admin',
      createdAt: new Date().toISOString(),
    };

    addNewAssignment(newAssignment);
    setForm({ title: '', description: '', driveLink: '' });
    onAssignmentAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="font-semibold mb-4 text-lg">Create New Assignment</h2>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border w-full px-2 py-1 mb-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border w-full px-2 py-1 mb-2 rounded"
        />
        <input
          name="driveLink"
          placeholder="Drive Link (optional)"
          value={form.driveLink}
          onChange={handleChange}
          className="border w-full px-2 py-1 mb-4 rounded"
        />
        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-300 px-4 py-1 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAssignmentForm;
