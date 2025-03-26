export const ChartCard: React.FC<{
  title: string;
  children: React.ReactNode;
  isEmpty: boolean;
  emptyMessage?: string;
}> = ({
  title,
  children,
  isEmpty,
  emptyMessage = "No data available yet.",
}) => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <div className="h-[300px] flex items-center justify-center">
      {isEmpty ? (
        <p className="text-gray-500">{emptyMessage || "No Data"}</p>
      ) : (
        children
      )}
    </div>
  </div>
);
