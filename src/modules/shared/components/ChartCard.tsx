export const ChartCard: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <div className="h-[300px]">{children}</div>
  </div>
);
