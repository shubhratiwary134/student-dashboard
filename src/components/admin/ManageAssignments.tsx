import { getAssignments } from '../../helpers/storageHelpers';

export const ManageAssignments: React.FC = () => {
  const assignments = getAssignments();

  return (
    <div className="mt-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#E5E7EB] tracking-tight text-center sm:text-left">
        All Assignments
      </h2>

      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-300
        "
      >
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="p-4 sm:p-5 bg-[#1A1A1D] border border-[#2A2A2E] rounded-lg 
                       hover:bg-[#222225] transition-colors duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h3 className="font-medium text-[#F3F4F6] text-sm sm:text-base">
                {assignment.title}
              </h3>
              <span className="text-xs text-[#9CA3AF] mt-1 sm:mt-0">
                {new Date(assignment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-2">
              {assignment.description}
            </p>
            <a
              href={assignment.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-[#3B82F6] mt-3 inline-block hover:underline"
            >
              Open Drive Link
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
