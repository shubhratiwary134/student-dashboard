import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCurrentUser, getUsers } from '../helpers/storageHelpers';
import { getStudentProgress } from '../helpers/studentHelpers';
import { AddAssignmentButton } from '../components/admin/AddAssignmentButton';
import { AdminList } from '../components/admin/AdminList';
import { ManageAssignments } from '../components/admin/ManageAssignments';
import { LogOut } from 'lucide-react';

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
    <div className="min-h-screen bg-[#0E0E10] text-[#E5E7EB] px-4 sm:px-6 lg:px-10 py-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 border-b border-[#2A2A2E] pb-4">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#E5E7EB]">
            🤵 Admin Dashboard
          </h1>
          <p className="text-sm sm:text-base text-[#9CA3AF]">
            Manage assignments and track student progress
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex justify-center items-center gap-2 text-sm text-[#EF4444] border border-[#EF4444]/40 
                     px-3 py-2 rounded-md hover:bg-[#EF4444]/10 transition-colors duration-200 
                     self-center sm:self-auto w-full sm:w-auto hover:cursor-pointer "
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center sm:justify-start">
        <button
          onClick={() => setSelectedSection('progress')}
          className={`
            flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium
            transition-all duration-200 w-full sm:w-auto
            ${
              selectedSection === 'progress'
                ? 'bg-[#2A2A2E] border border-[#3B82F6]/50 text-[#F3F4F6] shadow-[0_0_8px_rgba(59,130,246,0.4)]'
                : 'bg-[#1A1A1D] text-[#9CA3AF] hover:bg-[#2A2A2E]/60'
            }
          `}
        >
          📊 Student Progress
        </button>

        <button
          onClick={() => setSelectedSection('assignments')}
          className={`
            flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium
            transition-all duration-200 w-full sm:w-auto
            ${
              selectedSection === 'assignments'
                ? 'bg-[#2A2A2E] border border-[#3B82F6]/50 text-[#F3F4F6] shadow-[0_0_8px_rgba(59,130,246,0.4)]'
                : 'bg-[#1A1A1D] text-[#9CA3AF] hover:bg-[#2A2A2E]/60'
            }
          `}
        >
          🗂 Manage Assignments
        </button>
      </div>

      {/* Student Cards */}
      {selectedSection === 'progress' ? (
        <div>
          <div className="flex justify-center sm:justify-end">
            <AddAssignmentButton
              onAssignmentAdded={() => setRefresh(!refresh)}
            />
          </div>
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
