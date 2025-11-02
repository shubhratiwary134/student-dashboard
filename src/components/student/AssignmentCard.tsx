import React from 'react';
import type { Assignment } from '../../types/types';
import { Calendar, ClipboardCheck, FileText } from 'lucide-react';

interface AssignmentCardProps {
  assignment: Assignment;
  submitted: boolean;
  submittedAt?: string;
  onSubmit: (assignmentId: string) => void;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  submitted,
  submittedAt,
  onSubmit,
}) => {
  return (
    <div
      className="
        bg-[#1A1A1D] border border-[#2A2A2E] rounded-xl p-5
        hover:border-[#3B82F6]/40 hover:shadow-[0_0_12px_rgba(59,130,246,0.15)]
        transition-all duration-300 flex flex-col justify-between
      "
    >
      {/* Header Row */}
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg font-semibold text-[#E5E7EB] hover:text-[#60A5FA] transition-all">
          {assignment.title}
        </h2>

        <span className="text-xs px-3 py-1 rounded-full bg-[#2A2A2E] text-[#D1D5DB] font-medium">
          {assignment.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-[#9CA3AF] mb-4 line-clamp-2">
        {assignment.description}
      </p>

      {/* Status Badge */}
      <div className="flex items-center gap-2 mb-4">
        {submitted ? (
          <span className="flex items-center gap-1 bg-[#064E3B]/30 text-[#10B981] text-xs font-medium px-2 py-1 rounded-full">
            <ClipboardCheck size={14} /> Submitted
          </span>
        ) : (
          <span className="flex items-center gap-1 bg-[#3B0764]/30 text-[#A855F7] text-xs font-medium px-2 py-1 rounded-full">
            Pending
          </span>
        )}
      </div>

      {/* Meta Info */}
      <div className="flex items-center justify-between text-[#9CA3AF] text-sm mb-4">
        <div className="flex items-center gap-2">
          {submitted ? (
            <p className="text-[#10B981] text-sm mt-2">
              ✅ Submitted on {new Date(submittedAt || '').toLocaleDateString()}
            </p>
          ) : (
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>Due in {assignment.dueInDays} days</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <FileText size={14} />
          <span>{assignment.marks} marks</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {submitted ? (
          <button
            disabled
            className="
              bg-gradient-to-r from-[#4F46E5] to-[#3B82F6]
              text-white text-sm font-medium px-4 py-2 rounded-lg
              opacity-70 cursor-not-allowed w-fit
            "
          >
            Already Submitted
          </button>
        ) : (
          <button
            onClick={() => onSubmit(assignment.id)}
            className="
              bg-gradient-to-r from-[#4F46E5] to-[#3B82F6]
              text-white text-sm font-medium px-4 py-2 rounded-lg
              hover:shadow-[0_0_12px_rgba(59,130,246,0.4)]
              transition-all duration-300
            "
          >
            Submit Assignment
          </button>
        )}

        <a
          href={assignment.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2 text-[#E5E7EB] border border-[#2A2A2E]
            px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2A2A2E]/60
            transition-all duration-200
          "
        >
          <ClipboardCheck size={16} /> View Details
        </a>
      </div>
    </div>
  );
};
