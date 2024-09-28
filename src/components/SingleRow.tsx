const SingleRow = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) => {
  return (
    <div className="grid grid-cols-2 text-lg">
      <span className="relative border-r border-neutral-300 font-medium">
        {label}
        {unit && <span className="text-sm text-gray-400 ms-1">({unit})</span>}:
      </span>
      <span className="px-3">{value}</span>
    </div>
  );
};

export default SingleRow;
