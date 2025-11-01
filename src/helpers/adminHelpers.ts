import type { Assignment, Submission } from '../types/types';
import {
  getUsers,
  getAssignments,
  getSubmissions,
  setAssignments,
  setSubmissions,
} from './storageHelpers';

export function addNewAssignment(newAssignment: Assignment) {
  const assignments = getAssignments();
  const submissions = getSubmissions();
  const users = getUsers();

  const updatedAssignments = [...assignments, newAssignment];
  setAssignments(updatedAssignments);

  const newSubs: Submission[] = users
    .filter((u) => u.role === 'student')
    .map((student) => ({
      assignmentId: newAssignment.id,
      studentId: student.id,
      submitted: false,
    }));

  setSubmissions([...submissions, ...newSubs]);
}
