import React, { useState } from 'react';
import { getAssignments } from '../../helpers/storageHelpers';
import type { Assignment } from '../../types/types';
import { addNewAssignment } from '../../helpers/adminHelpers';

interface AddAssignmentFormProps {
  open: boolean;
  onClose: () => void;
  onAssignmentAdded: () => void;
}

export const AddAssignmentForm: React.FC<AddAssignmentFormProps> = ({
  open,
  onClose,
  onAssignmentAdded,
}) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    driveLink: '',
    dueInDays: 7,
    marks: 50,
    category: 'General',
  });

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'marks' || name === 'dueInDays' ? Number(value) : value,
    });
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.description.trim()) {
      alert('Please fill all required fields.');
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
      dueInDays: form.dueInDays,
      marks: form.marks,
      category: form.category,
    };

    addNewAssignment(newAssignment);
    setForm({
      title: '',
      description: '',
      driveLink: '',
      dueInDays: 7,
      marks: 50,
      category: 'General',
    });
    onAssignmentAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div
        className="bg-[#1A1A1D] border border-[#2A2A2E] rounded-xl p-6 w-[95%] sm:w-[400px]
                   shadow-[0_0_20px_rgba(0,0,0,0.5)] text-[#E5E7EB]"
      >
        <h2 className="text-xl font-semibold mb-4 text-[#F3F4F6]">
          Create New Assignment
        </h2>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full bg-[#0E0E10] border border-[#2A2A2E] text-[#E5E7EB]
                     px-3 py-2 mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full bg-[#0E0E10] border border-[#2A2A2E] text-[#E5E7EB]
                     px-3 py-2 mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        />

        <input
          name="driveLink"
          placeholder="Drive Link (optional)"
          value={form.driveLink}
          onChange={handleChange}
          className="w-full bg-[#0E0E10] border border-[#2A2A2E] text-[#E5E7EB]
                     px-3 py-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        />

        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <label className="block text-xs text-[#9CA3AF] mb-1">
              Due in (days)
            </label>
            <input
              name="dueInDays"
              type="number"
              min="1"
              value={form.dueInDays}
              onChange={handleChange}
              className="w-full bg-[#0E0E10] border border-[#2A2A2E] text-[#E5E7EB]
                         px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>

          <div className="flex-1">
            <label className="block text-xs text-[#9CA3AF] mb-1">Marks</label>
            <input
              name="marks"
              type="number"
              min="10"
              value={form.marks}
              onChange={handleChange}
              className="w-full bg-[#0E0E10] border border-[#2A2A2E] text-[#E5E7EB]
                         px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-xs text-[#9CA3AF] mb-1">Category</label>
          <input
            name="category"
            placeholder="e.g. Web Development, Design"
            value={form.category}
            onChange={handleChange}
            className="w-full bg-[#0E0E10] border border-[#2A2A2E] text-[#E5E7EB]
                       px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#2A2A2E] text-[#9CA3AF] rounded-md
                       hover:bg-[#3A3A3D] transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-linear-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-md
                       hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
