import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCurrentUser, getUsers } from '../helpers/storageHelpers';
import { getStudentProgress } from '../helpers/studentHelpers';
import { AddAssignmentButton } from '../components/admin/AddAssignmentButton';
import { AdminList } from '../components/admin/AdminList';
import { ManageAssignments } from '../components/admin/ManageAssignments';

interface StudentSummary {
  id: string;
  name: string;
  totalAssignments: number;
  completed: number;
  progress: number;
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedSection, setSelectedSection] = useState<
    'progress' | 'assignments'
  >('progress');

  useEffect(() => {
    const allUsers = getUsers().filter((u) => u.role === 'student');

    const summaries: StudentSummary[] = allUsers.map((s) => {
      const total = 10;
      const progress = getStudentProgress(s.id);
      const completed = Math.round((progress / 100) * total);
      return {
        id: s.id,
        name: s.name,
        totalAssignments: total,
        completed,
        progress,
      };
    });

    setStudents(summaries);
  }, [refresh]);

  const handleLogout = () => {
    clearCurrentUser();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#E5E7EB] p-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-[#2A2A2E] pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-[#E5E7EB]">
          🤵 Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm text-[#EF4444] border border-[#EF4444]/40 px-3 py-1.5 rounded-md 
                     hover:bg-[#EF4444]/10 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setSelectedSection('progress')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            selectedSection === 'progress'
              ? 'bg-[#2563EB] text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]'
              : 'bg-[#b0b0b9] text-[#9CA3AF] hover:bg-[#2A2A2E]'
          }`}
        >
          Student Progress
        </button>

        <button
          onClick={() => setSelectedSection('assignments')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            selectedSection === 'assignments'
              ? 'bg-[#2563EB] text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]'
              : 'bg-[#1A1A1D] text-[#9CA3AF] hover:bg-[#2A2A2E]'
          }`}
        >
          Manage Assignments
        </button>
      </div>

      {/* Student Cards */}
      {selectedSection === 'progress' ? (
        <div>
          <AddAssignmentButton onAssignmentAdded={() => setRefresh(!refresh)} />
          <div className="mt-8">
            <AdminList students={students} />
          </div>
        </div>
      ) : (
        <ManageAssignments />
      )}
    </div>
  );
};
