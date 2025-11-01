import React from 'react';

interface StudentSummary {
  id: string;
  name: string;
  totalAssignments: number;
  completed: number;
  progress: number;
}

interface AdminCardProps {
  student: StudentSummary;
}

export const AdminCard: React.FC<AdminCardProps> = ({ student }) => {
  const pending = student.totalAssignments - student.completed;

  return (
    <div
      className="p-5 bg-[#1A1A1D] rounded-xl border border-[#2A2A2E] shadow-sm 
                 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)] transition-all duration-300"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-[#E5E7EB] tracking-tight">
          {student.name}
        </h3>
        <span className="text-sm text-[#9CA3AF]">{student.progress}%</span>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full bg-[#2A2A2E] rounded-full h-2 mb-3 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-full transition-all"
          style={{ width: `${student.progress}%` }}
        />
      </div>

      {/* Stats */}
      <div className="flex justify-between text-sm mt-1">
        <p className="text-[#9CA3AF]">
          ✅ <span className="text-[#E5E7EB]">{student.completed}</span> /{' '}
          {student.totalAssignments} Completed
        </p>
        <p className="text-[#9CA3AF]">
          ⏳ Pending:{' '}
          <span className="text-[#E5E7EB] font-medium">{pending}</span>
        </p>
      </div>
    </div>
  );
};
