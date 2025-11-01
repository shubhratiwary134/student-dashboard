import type { Assignment } from '../../types/types';

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
      className="p-5 bg-[#1F1F1F] rounded-xl border border-[#2A2A2E] 
                 shadow-sm hover:shadow-[0_0_10px_rgba(59,130,246,0.2)] 
                 transition-all duration-300 flex justify-between items-start"
    >
      <div className="space-y-5">
        <h2 className="font-semibold text-[#EBEBEB] hover:text-blue-500 tracking-tight mb-1">
          {assignment.title}
        </h2>
        <p className="text-sm text-[#9CA3AF]">{assignment.description}</p>

        {submitted ? (
          <p className="text-[#10B981] text-sm mt-2">
            ✅ Submitted on {new Date(submittedAt || '').toLocaleDateString()}
          </p>
        ) : (
          <p className="text-[#EF4444] text-sm mt-2">⏳ Pending submission</p>
        )}

        {!submitted && (
          <button
            onClick={() => onSubmit(assignment.id)}
            className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] 
                     text-white px-4 py-1.5 rounded-md text-sm font-medium 
                     hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] 
                     hover:scale-[1.03] active:scale-[0.98] 
                     transition-all duration-300"
          >
            Mark as Submitted
          </button>
        )}
      </div>
    </div>
  );
};
