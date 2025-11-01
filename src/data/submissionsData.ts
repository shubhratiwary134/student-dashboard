import { usersData } from './usersData';
import { assignmentsData } from './assignmentsData';
import type { Submission } from '../types/types';

export const submissionsData: Submission[] = usersData
  .filter((u) => u.role === 'student')
  .flatMap((student) =>
    assignmentsData.map((assignment) => ({
      assignmentId: assignment.id,
      studentId: student.id,
      submitted: false,
    }))
  );
