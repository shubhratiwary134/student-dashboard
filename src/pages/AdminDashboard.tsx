import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCurrentUser, getUsers } from '../helpers/storageHelpers';
import { getStudentProgress } from '../helpers/studentHelpers';
import { AddAssignmentButton } from '../components/admin/AddAssignmentButton';
import { AdminList } from '../components/admin/AdminList';

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

  useEffect(() => {
    const allUsers = getUsers().filter((u) => u.role === 'student');

    const summaries: StudentSummary[] = allUsers.map((s) => {
      const total = 10; // we can dynamically fetch total from getSubmissions()
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 border px-3 py-1 rounded hover:bg-red-100"
        >
          Logout
        </button>
      </div>

      {/* Add Assignment Modal Trigger */}
      <AddAssignmentButton onAssignmentAdded={() => setRefresh(!refresh)} />

      {/* Student Cards */}
      <div className="mt-8">
        <AdminList students={students} />
      </div>
    </div>
  );
};
