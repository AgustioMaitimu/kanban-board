import React, { useState } from 'react';
import Image from 'next/image';
import { Nunito_Sans } from 'next/font/google';
import CreateTask from './CreateTask';
import TaskItem from './TaskItem';

const nunito_sans = Nunito_Sans({ subsets: ['latin'] });

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
            <TaskItem key={task.id} groupID={groupID} task={task} />
          ))}
        </div>
      )}
      <div
        className="flex w-fit cursor-pointer items-center gap-[5px]"
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
      <CreateTask
        groupID={groupID}
        show={showNewTask}
        onClose={() => setShowNewTask(false)}
      />
    </div>
  );
}

export default GroupComponent;
