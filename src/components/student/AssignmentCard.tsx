import type { Assignment } from '../../types/types';
import { Calendar, FileText, ClipboardCheck } from 'lucide-react';

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
        p-5 sm:p-6 md:p-7
        bg-[#1A1A1D] border border-[#2A2A2E] rounded-2xl
        shadow-sm hover:shadow-[0_0_12px_rgba(59,130,246,0.25)]
        transition-all duration-300 flex flex-col justify-between
      "
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-base sm:text-lg font-semibold text-[#E5E7EB] mb-1 tracking-tight">
            {assignment.title}
          </h2>
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#2A2A2E] text-[#D1D5DB] font-medium">
            {assignment.category}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mb-4">
          {assignment.description}
        </p>

        {submitted ? (
          <p className="text-[#10B981] text-xs sm:text-sm mb-4">
            ✅ Submitted on {new Date(submittedAt || '').toLocaleDateString()}
          </p>
        ) : (
          <p className="text-[#EF4444] text-xs sm:text-sm mb-4">
            ⏳ Pending submission
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between text-[#9CA3AF] text-xs sm:text-sm mb-4 gap-2">
          <div className="flex items-center gap-2">
            <Calendar size={14} /> Due in {assignment.dueInDays} days
          </div>
          <div className="flex items-center gap-2">
            <FileText size={14} /> {assignment.marks} marks
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto">
        <a
          href={assignment.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center sm:justify-start gap-2 text-[#E5E7EB]
                     border border-[#2A2A2E] w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium
                     hover:bg-[#2A2A2E]/60 transition-all duration-200"
        >
          <ClipboardCheck size={16} /> View Details
        </a>

        {submitted ? (
          <button
            disabled
            className="w-full sm:w-auto bg-gradient-to-r from-[#4F46E5] to-[#3B82F6]
                       text-white text-sm font-medium px-4 py-2 rounded-lg opacity-70 cursor-not-allowed"
          >
            Already Submitted
          </button>
        ) : (
          <button
            onClick={() => onSubmit(assignment.id)}
            className="w-full sm:w-auto bg-gradient-to-r from-[#4F46E5] to-[#3B82F6]
                       text-white text-sm font-medium px-4 py-2 rounded-lg
                       hover:shadow-[0_0_12px_rgba(59,130,246,0.4)]
                       hover:scale-[1.02] active:scale-[0.98]
                       transition-all duration-300"
          >
            Submit Assignment
          </button>
        )}
      </div>
    </div>
  );
};
