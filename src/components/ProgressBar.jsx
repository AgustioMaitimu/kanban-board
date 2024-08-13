export default function ProgressBar({ progress_percentage }) {
  const progressColor =
    progress_percentage === 100
      ? 'bg-[#43936C] rounded-r-full'
      : 'bg-[#1F959F]';

  return (
    <div className="flex h-4 w-full">
      <div
        style={{ width: `${progress_percentage}%` }}
        className={`rounded-l-full ${progressColor}`}
      ></div>
      <div
        style={{ width: `${100 - progress_percentage}%` }}
        className="rounded-r-full bg-[#EDEDED]"
      ></div>
    </div>
  );
}
