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
    <div className="min-h-screen flex items-center justify-center bg-[#0E0E10] text-[#E5E7EB]">
      <div
        className="bg-[#1A1A1D] border border-[#2A2A2E] rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]
                   w-[90%] max-w-md p-8 text-center transition-all duration-300"
      >
        <h1 className="text-3xl font-semibold mb-8 tracking-tight text-[#F3F4F6]">
          Welcome Back 👋
        </h1>

        <div className="mb-8">
          <label
            htmlFor="user"
            className="block text-sm font-medium text-[#9CA3AF] mb-2"
          >
            Select your account
          </label>
          <select
            id="user"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="
              w-full bg-[#0E0E10] border border-[#2A2A2E]
              text-[#E5E7EB] rounded-lg p-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-[#3B82F6]
              transition-all duration-200
            "
          >
            <option value="">Select user</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} — {u.role}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleLogin}
          className="
            w-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6]
            text-white py-2.5 rounded-lg font-medium
            hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]
            hover:scale-[1.02] active:scale-[0.97]
            transition-all duration-300
          "
        >
          Continue
        </button>

        <p className="mt-6 text-xs text-[#9CA3AF]">
          Tip: You can log in as either{' '}
          <span className="text-[#3B82F6]">Admin</span> or{' '}
          <span className="text-[#3B82F6]">Student</span> from the dropdown.
        </p>
      </div>
    </div>
  );
};
