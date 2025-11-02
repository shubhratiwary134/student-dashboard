import { User } from 'lucide-react';
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
      className="
        bg-[#1A1A1D] border border-[#2A2A2E] rounded-xl 
        hover:border-[#3B82F6]/40 hover:shadow-[0_0_12px_rgba(59,130,246,0.15)]
        transition-all duration-300 p-7
      "
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-[#2A2A2E] rounded-lg">
            <User size={32} className="text-[#60A5FA]" />
          </div>
          <div>
            <h2 className="text-[#E5E7EB] font-semibold text-lg">
              {student.name}
            </h2>
            <p className="text-sm text-[#9CA3AF] mb-2">
              {student.completed} of {student.totalAssignments} completed
            </p>
          </div>
        </div>
        <p className="text-[#3B82F6] font-semibold text-2xl">
          {student.progress}%
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-[#2A2A2E] rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-linear-to-r from-[#8B5CF6] to-[#3B82F6] transition-all duration-500"
          style={{ width: `${student.progress}%` }}
        ></div>
      </div>

      <p className="text-xs text-[#9CA3AF]">Progress • {pending} pending</p>
    </div>
  );
};
