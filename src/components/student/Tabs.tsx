import { Award, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

interface TabsProps {
  total: number;
  completed: number;
  pending: number;
  progress: number;
}

export const Tabs: React.FC<TabsProps> = ({
  total,
  completed,
  pending,
  progress,
}) => {
  const cards = [
    {
      title: 'Total Assignments',
      value: total,
      icon: <Award size={18} className="text-[#3B82F6]" />,
    },
    {
      title: 'Completed',
      value: completed,
      icon: <CheckCircle2 size={18} className="text-[#10B981]" />,
    },
    {
      title: 'Pending',
      value: pending,
      icon: <Clock size={18} className="text-[#FACC15]" />,
    },
    {
      title: 'Progress',
      value: `${progress}%`,
      icon: <TrendingUp size={18} className="text-[#8B5CF6]" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-4 sm:p-5 rounded-xl bg-[#1A1A1D] border border-[#2A2A2E]
                     hover:shadow-[0_0_12px_rgba(59,130,246,0.15)] transition-all duration-300"
        >
          <div>
            <p className="text-xs sm:text-sm text-[#9CA3AF]">{item.title}</p>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#E5E7EB] mt-1">
              {item.value}
            </h3>
          </div>
          <div className="p-3 rounded-lg bg-[#2A2A2E] flex items-center justify-center">
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};
