const SingleRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="grid grid-cols-2 text-lg">
      <span className="border-r border-neutral-300 font-medium">{label}:</span>
      <span className="px-3">{value}</span>
    </div>
  );
};

export default SingleRow;
