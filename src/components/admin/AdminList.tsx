import React from 'react';
import { AdminCard } from './AdminCard';

interface StudentSummary {
  id: string;
  name: string;
  totalAssignments: number;
  completed: number;
  progress: number;
}

interface AdminListProps {
  students: StudentSummary[];
}

export const AdminList: React.FC<AdminListProps> = ({ students }) => {
  if (students.length === 0) {
    return (
      <p className="text-[#9CA3AF] text-center py-10">
        No student data available.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {students.map((student) => (
        <AdminCard key={student.id} student={student} />
      ))}
    </div>
  );
};
