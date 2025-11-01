import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCurrentUser, getCurrentUser } from '../helpers/storageHelpers';
import {
  getAssignmentsForStudent,
  markAssignmentSubmitted,
} from '../helpers/studentHelpers';
import { AssignmentList } from '../components/student/AssignmentList';
import { ConfirmModal } from '../components/student/ConfirmModal';
import type { Assignment } from '../types/types';

interface StudentAssignmentData {
  assignment: Assignment;
  submitted: boolean;
  submittedAt?: string;
}

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<StudentAssignmentData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmStep, setConfirmStep] = useState(1);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<
    string | null
  >(null);
  const user = getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/');
      return;
    }
    const data = getAssignmentsForStudent(user.id);
    setAssignments(data);
  }, [navigate]);

  const handleLogout = () => {
    clearCurrentUser();
    navigate('/');
  };

  const handleMarkSubmitted = (assignmentId: string) => {
    setSelectedAssignmentId(assignmentId);
    setConfirmStep(1);
    setModalOpen(true);
  };

  const handleModalConfirm = () => {
    if (confirmStep === 1) {
      setConfirmStep(2);
    } else if (confirmStep === 2 && selectedAssignmentId && user) {
      markAssignmentSubmitted(user.id, selectedAssignmentId);
      const data = getAssignmentsForStudent(user.id);
      setAssignments(data);
      setModalOpen(false);
    }
  };

  const modalMessage =
    confirmStep === 1
      ? 'Have you submitted the assignment to the provided Drive link?'
      : 'Are you sure you want to mark this assignment as submitted?';

  return (
    <div className="min-h-screen bg-[#171717] text-[#E5E7EB] p-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-[#2A2A2E] pb-4">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-[#E5E7EB]">
            Welcome back, {user?.name} 👋
          </h1>
          <p className="px-1">
            Track your assignments and manage your submissions
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="
    px-4 py-2 
    rounded-md 
    text-sm font-medium
    border border-[#EF4444]/40 
    text-[#EF4444]
    bg-transparent
    hover:bg-[#EF4444]/10
    hover:shadow-[0_0_8px_rgba(239,68,68,0.3)]
    active:scale-[0.97]
    transition-all duration-300
  "
        >
          Logout
        </button>
      </div>

      {/* Assignment List */}
      <div className="mt-10">
        <h2 className="text-2xl font-medium mb-4 text-[#E5E7EB] tracking-tight">
          📜 My Assignments
        </h2>
        <AssignmentList
          assignments={assignments}
          onSubmit={handleMarkSubmitted}
        />
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        open={modalOpen}
        message={modalMessage}
        onConfirm={handleModalConfirm}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};
