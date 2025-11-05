import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCurrentUser, getCurrentUser } from '../helpers/storageHelpers';
import {
  getAssignmentsForStudent,
  markAssignmentSubmitted,
} from '../helpers/studentHelpers';
import { AssignmentList } from '../components/student/AssignmentList';
import { ConfirmModal } from '../components/student/ConfirmModal';
import { Tabs } from '../components/student/Tabs';
import type { Assignment } from '../types/types';
import { LogOut } from 'lucide-react';

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

  const total = assignments.length;
  const completed = assignments.filter((a) => a.submitted).length;
  const pending = total - completed;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#E5E7EB] px-4 sm:px-6 lg:px-10 py-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 border-b border-[#2A2A2E] pb-4">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#E5E7EB]">
          Welcome, {user?.name} 👋
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm text-[#EF4444] border border-[#EF4444]/40 px-4 py-2 rounded-md 
                     hover:bg-[#EF4444]/10 hover:shadow-[0_0_8px_rgba(239,68,68,0.3)] 
                     active:scale-[0.97] transition-all duration-300 self-start sm:self-auto"
        >
          <LogOut />
        </button>
      </div>

      {/* Summary Tabs */}
      <Tabs
        total={total}
        completed={completed}
        pending={pending}
        progress={progress}
      />

      {/* Assignment List */}
      <div className="mt-6">
        <h2 className="text-lg sm:text-xl font-medium mb-4 text-[#E5E7EB] tracking-tight">
          My Assignments
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
