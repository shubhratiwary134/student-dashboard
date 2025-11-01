import type { Assignment, Submission, User } from '../types/types';

const USERS_KEY = 'users';
const ASSIGNMENTS_KEY = 'assignments';
const SUBMISSIONS_KEY = 'submissions';
const CURRENT_USER_KEY = 'currentUser';

function read<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : null;
}

function write<T>(key: string, val: T) {
  localStorage.setItem(key, JSON.stringify(val));
}

export function initializeDummyData() {
  const users = read<User[]>(USERS_KEY);
  if (!users || users.length === 0) {
    const dummyUsers: User[] = [
      {
        id: 'u1',
        name: 'Aisha Sharma',
        role: 'student',
        email: 'aisha@example.com',
      },
      {
        id: 'u2',
        name: 'Rohan Mehta',
        role: 'student',
        email: 'rohan@example.com',
      },
      { id: 'u3', name: 'Prof. Roy', role: 'admin', email: 'roy@uni.edu' },
    ];
    write(USERS_KEY, dummyUsers);

    const assignments: Assignment[] = [
      {
        id: 'a1',
        title: 'Math Homework 1',
        description: 'Solve Chapter 2 problems',
        createdBy: 'u3',
        createdAt: new Date().toISOString(),
      },
    ];
    write(ASSIGNMENTS_KEY, assignments);

    const submissions: Submission[] = dummyUsers
      .filter((u) => u.role === 'student')
      .map((s) => ({
        assignmentId: 'a1',
        studentId: s.id,
        submitted: false,
      }));

    write(SUBMISSIONS_KEY, submissions);
  }
}

export const getUsers = (): User[] => read<User[]>(USERS_KEY) || [];
export const setUsers = (u: User[]) => write(USERS_KEY, u);
export const setCurrentUser = (user: User) => write(CURRENT_USER_KEY, user);
export const getCurrentUser = (): User | null => read<User>(CURRENT_USER_KEY);
export const clearCurrentUser = () => localStorage.removeItem(CURRENT_USER_KEY);

export const getAssignments = (): Assignment[] =>
  read<Assignment[]>(ASSIGNMENTS_KEY) || [];
export const setAssignments = (a: Assignment[]) => write(ASSIGNMENTS_KEY, a);

export const getSubmissions = (): Submission[] =>
  read<Submission[]>(SUBMISSIONS_KEY) || [];
export const setSubmissions = (s: Submission[]) => write(SUBMISSIONS_KEY, s);
