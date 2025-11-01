import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getUsers,
  setCurrentUser,
  getCurrentUser,
  initializeDummyData,
} from '../helpers/storageHelpers';
import type { User } from '../types/types';

export const Login: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    initializeDummyData();
    setUsers(getUsers());

    const existing = getCurrentUser();
    if (existing) {
      navigate(existing.role === 'student' ? '/student' : '/admin');
    }
  }, [navigate]);

  const handleLogin = () => {
    if (!selectedId) {
      alert('Please select a user');
      return;
    }
    const user = users.find((u) => u.id === selectedId);
    if (!user) return;

    setCurrentUser(user);
    navigate(user.role === 'student' ? '/student' : '/admin');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Login</h1>

        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-6 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select user</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} — {u.role}
            </option>
          ))}
        </select>

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
