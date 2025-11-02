import React from 'react';
import { getAssignments } from '../../helpers/storageHelpers';

export const ManageAssignments: React.FC = () => {
  const assignments = getAssignments();

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4 text-[#E5E7EB] tracking-tight">
        All Assignments
      </h2>

      <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="p-5 bg-[#1A1A1D] border border-[#2A2A2E] rounded-lg hover:bg-[#222225] transition-colors duration-200"
          >
            <div className="flex justify-between items-center ">
              <h3 className="font-medium text-[#F3F4F6]">{assignment.title}</h3>
              <span className="text-xs text-[#9CA3AF]">
                {new Date(assignment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-[#9CA3AF] mt-2">
              {assignment.description}
            </p>
            <a
              href={assignment.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#3B82F6] mt-3 inline-block hover:underline"
            >
              Open Drive Link
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
