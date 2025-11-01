interface StudentSummary {
  id: string;
  name: string;
  totalAssignments: number;
  completed: number;
  progress: number;
}

interface AdminCardProps {
  student: StudentSummary;
}

export const AdminCard: React.FC<AdminCardProps> = ({ student }) => {
  const pending = student.totalAssignments - student.completed;

  return (
    <div className="p-4 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-800">{student.name}</h3>
        <span className="text-sm text-gray-500">{student.progress}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${student.progress}%` }}
        />
      </div>

      <p className="text-sm text-gray-600">
        Completed: {student.completed} / {student.totalAssignments}
      </p>
      <p className="text-sm text-red-500">⏳ Pending: {pending}</p>
    </div>
  );
};
