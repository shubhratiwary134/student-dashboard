export type Role = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  role: Role;
  email?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  driveLink?: string;
  createdBy: string; // adminId
  createdAt: string;
  dueInDays: number;
  marks: number;
  category: string;
}

export interface Submission {
  assignmentId: string;
  studentId: string;
  submitted: boolean;
  submittedAt?: string;
}
