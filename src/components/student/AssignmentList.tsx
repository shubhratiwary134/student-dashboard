import type { Assignment } from '../../types/types';
import { AssignmentCard } from './AssignmentCard';

interface StudentAssignmentData {
  assignment: Assignment;
  submitted: boolean;
  submittedAt?: string;
}

interface AssignmentListProps {
  assignments: StudentAssignmentData[];
  onSubmit: (assignmentId: string) => void;
}

export const AssignmentList: React.FC<AssignmentListProps> = ({
  assignments,
  onSubmit,
}) => {
  if (assignments.length === 0) {
    return (
      <p className="text-[#9CA3AF] text-center mt-10 text-sm sm:text-base">
        No assignments found.
      </p>
    );
  }

  return (
    <div
      className="
        grid gap-5
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
       transition-all duration-300
      "
    >
      {assignments.map((item, index) => (
        <AssignmentCard
          key={index}
          assignment={item.assignment}
          submitted={item.submitted}
          submittedAt={item.submittedAt}
          onSubmit={onSubmit}
        />
      ))}
    </div>
  );
};
