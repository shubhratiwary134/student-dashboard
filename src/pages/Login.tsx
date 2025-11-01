import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [role, setRole] = useState<'student' | 'admin' | ''>('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!role) {
      alert('Please select a role');
      return;
    }
    localStorage.setItem('role', role);
    if (role === 'student') {
      navigate('/student');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-80 text-center">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Login</h1>

        <div className="flex flex-col gap-4 mb-6">
          <button
            onClick={() => setRole('student')}
            className={`py-2 rounded-lg border ${
              role === 'student'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-50 hover:bg-blue-50'
            }`}
          >
            Student
          </button>

          <button
            onClick={() => setRole('admin')}
            className={`py-2 rounded-lg border ${
              role === 'admin'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-50 hover:bg-blue-50'
            }`}
          >
            Admin
          </button>
        </div>

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
