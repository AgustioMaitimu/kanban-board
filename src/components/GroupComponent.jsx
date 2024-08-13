import React, { useState } from 'react';
import Image from 'next/image';
import { Nunito_Sans } from 'next/font/google';
import NewTask from './NewTask';

const nunito_sans = Nunito_Sans({ subsets: ['latin'] });

function ProgressBar({ progress_percentage }) {
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

function TaskItem({ task }) {
  return (
    <div className="flex flex-col gap-2 rounded-[4px] border-[1px] border-[#E0E0E0] bg-[#FAFAFA] p-4">
      <p>{task.name}</p>
      <div className="w-full border-b border-dashed border-[#E0E0E0]"></div>
      <div className="mt-1 flex w-full items-center gap-[26px]">
        <div className="flex w-full gap-3">
          <ProgressBar progress_percentage={task.progress_percentage} />
          <div className="text-xs font-normal text-[#757575]">
            {task.progress_percentage === 100 ? (
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
              `${task.progress_percentage}%`
            )}
          </div>
        </div>
        <div className="relative h-6 w-6">
          <Image
            alt="menu"
            className="object-cover"
            src="/menu.png"
            fill
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
}

function GroupComponent({ groupID, items, colorCodes, number, description }) {
  const [showNewTask, setShowNewTask] = useState(false);

  const containerStyle = {
    borderColor: colorCodes.OutBorder,
    backgroundColor: colorCodes.BG,
  };

  const headerStyle = {
    borderColor: colorCodes.InBorder,
    color: colorCodes.Text,
  };

  // Sort items by progress_percentage in descending order
  const sortedItems = items
    ? [...items].sort((a, b) => b.progress_percentage - a.progress_percentage)
    : [];

  return (
    <div
      style={containerStyle}
      className={`${nunito_sans.className} flex h-fit w-[326px] shrink-0 select-none flex-col gap-2 rounded-[4px] border-[1px] p-4`}
    >
      <h1
        style={headerStyle}
        className="w-fit rounded-[4px] border-[1px] bg-transparent px-[8px] py-[3px] text-xs"
      >
        Group Task {number}
      </h1>
      <h1 className="text-xs font-medium">{description}</h1>
      {!items ? (
        <h1 className="rounded-[4px] border-[1px] border-[#E0E0E0] bg-[#FAFAFA] px-[16px] py-[8px] text-sm font-light text-[#757575]">
          Loading Tasks...
        </h1>
      ) : sortedItems.length === 0 ? (
        <h1 className="rounded-[4px] border-[1px] border-[#E0E0E0] bg-[#FAFAFA] px-[16px] py-[8px] text-sm font-light text-[#757575]">
          No Task
        </h1>
      ) : (
        <div className="flex w-full flex-col gap-3 text-sm font-bold text-[#404040]">
          {sortedItems.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
      <div
        className="flex cursor-pointer items-center gap-[5px]"
        onClick={() => setShowNewTask(true)}
      >
        <div className="relative aspect-square w-[20px]">
          <Image
            alt="plus"
            src="/plus.png"
            className="object-cover"
            fill
            sizes="100vw"
          />
        </div>
        <p className="text-xs font-light">New Task</p>
      </div>
      <NewTask
        groupID={groupID}
        show={showNewTask}
        onClose={() => setShowNewTask(false)}
      />
    </div>
  );
}

export default GroupComponent;
