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
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-bold">Welcome, {user?.name} 👋</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 border px-3 py-1 rounded hover:bg-red-100"
        >
          Logout
        </button>
      </div>

      {/* Assignment List */}
      <div className="mt-8">
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
