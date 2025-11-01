import type { Assignment, Submission, User } from '../types/types';
import { usersData } from '../data/usersData';
import { assignmentsData } from '../data/assignmentsData';
import { submissionsData } from '../data/submissionsData';

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
    write(USERS_KEY, usersData);
    write(ASSIGNMENTS_KEY, assignmentsData);
    write(SUBMISSIONS_KEY, submissionsData);
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
