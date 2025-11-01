import {
  getAssignments,
  getSubmissions,
  setSubmissions,
} from './storageHelpers';

export function getAssignmentsForStudent(studentId: string) {
  const assignments = getAssignments();
  const submissions = getSubmissions();

  const studentSubs = submissions.filter((s) => s.studentId === studentId);

  return studentSubs.map((sub) => {
    const assignment = assignments.find((a) => a.id === sub.assignmentId);
    return {
      assignment,
      submitted: sub.submitted,
      submittedAt: sub.submittedAt,
    };
  });
}

export function markAssignmentSubmitted(
  studentId: string,
  assignmentId: string
) {
  const submissions = getSubmissions();

  const updated = submissions.map((s) =>
    s.assignmentId === assignmentId && s.studentId === studentId
      ? { ...s, submitted: true, submittedAt: new Date().toISOString() }
      : s
  );

  setSubmissions(updated);
}

export function getStudentProgress(studentId: string) {
  const submissions = getSubmissions().filter((s) => s.studentId === studentId);
  if (submissions.length === 0) return 0;

  const submittedCount = submissions.filter((s) => s.submitted).length;
  return Math.round((submittedCount / submissions.length) * 100);
}
