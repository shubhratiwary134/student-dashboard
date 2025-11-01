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
    <div className="p-4 bg-white shadow rounded flex justify-between items-center">
      <div>
        <h2 className="font-semibold">{assignment.title}</h2>
        <p className="text-sm text-gray-600">{assignment.description}</p>
        {submitted ? (
          <p className="text-green-600 text-sm mt-1">
            ✅ Submitted on {new Date(submittedAt || '').toLocaleDateString()}
          </p>
        ) : (
          <p className="text-red-500 text-sm mt-1">Pending submission</p>
        )}
      </div>

      {!submitted && (
        <button
          onClick={() => onSubmit(assignment.id)}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          Mark as Submitted
        </button>
      )}
    </div>
  );
};
