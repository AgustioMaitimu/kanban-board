'use client';
import Image from 'next/image';
import ItemMenu from './ItemMenu';

export default function TaskItem({ task, groupID }) {
  const progressColor =
    task.progress_percentage >= 100
      ? 'bg-[#43936C] rounded-r-full'
      : 'bg-[#1F959F]';

  return (
    <div className="flex flex-col gap-2 rounded-[4px] border-[1px] border-[#E0E0E0] bg-[#FAFAFA] p-4">
      <p>{task.name}</p>
      <div className="w-full border-b border-dashed border-[#E0E0E0]"></div>
      <div className="mt-1 flex w-full items-center gap-[26px]">
        <div className="flex w-full items-center gap-3">
          <div className="flex h-4 w-full">
            <div
              style={{ width: `${task.progress_percentage}%` }}
              className={`rounded-l-full ${progressColor}`}
            ></div>
            <div
              style={{ width: `${100 - task.progress_percentage}%` }}
              className="rounded-r-full bg-[#EDEDED]"
            ></div>
          </div>
          <div className="text-xs font-normal text-[#757575]">
            {task.progress_percentage == 100 ? (
              <div className="relative h-4 w-4">
                <Image
                  alt="check"
                  className="object-cover"
                  src="/check.png"
                  fill
                  sizes="100vw"
                />
              </div>
            ) : (
              `${task.progress_percentage == 0 ? '0' : task.progress_percentage}%`
            )}
          </div>
          <ItemMenu groupID={groupID} task={task} />
        </div>
      </div>
    </div>
  );
}
