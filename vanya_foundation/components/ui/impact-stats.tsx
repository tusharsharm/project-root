interface ImpactStat {
  number: number;
  label: string;
  icon: React.ReactNode;
}

export function ImpactStats({ stats }: { stats: ImpactStat[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="text-primary mb-2">{stat.icon}</div>
          <div className="text-4xl font-bold mb-2">{stat.number}+</div>
          <div className="text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}