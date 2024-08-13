import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Nunito_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';

const nunito_sans = Nunito_Sans({ subsets: ['latin'] });

export default function NewTask({ show, onClose, groupID }) {
  const [opacity, setOpacity] = useState(0);
  const [taskName, setTaskName] = useState('');
  const [progress, setProgress] = useState('');
  const router = useRouter();

  useEffect(() => {
    show ? setOpacity(100) : setOpacity(0);
  }, [show]);

  function handleClose() {
    setTaskName('');
    setProgress('');
    setOpacity(0);
    setTimeout(onClose, 300);
  }

  function handleTaskNameChange(e) {
    setTaskName(e.target.value);
  }

  function handleProgressChange(e) {
    setProgress(e.target.value);
  }

  async function handleSave() {
    try {
      const body = {
        name: taskName,
        progress_percentage: progress,
      };

      await axios.post(`/api/reqs?group_id=${groupID.toString()}`, body);

      setTaskName('');
      setProgress('');
      location.reload();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  }

  return (
    <div
      className={`${nunito_sans.className} ${show ? 'flex' : 'hidden'} fixed left-0 top-0 z-20 h-screen w-screen items-center justify-center bg-gray-800 bg-opacity-40 opacity-${opacity} shadow-2xl transition-opacity duration-300`}
      onClick={handleClose}
    >
      <div
        className="flex w-[90%] max-w-[420px] flex-col gap-6 rounded-[10px] bg-white p-6 shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Create Task</h1>
          <div
            className="relative h-6 w-6 cursor-pointer"
            onClick={handleClose}
          >
            <Image
              alt="close"
              src="/x.png"
              className="object-cover"
              fill
              sizes="100vw"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold text-[#404040]">Task Name</p>
            <input
              value={taskName}
              onChange={handleTaskNameChange}
              placeholder="Type your Task"
              type="text"
              className="rounded-lg border-2 border-[#EDEDED] px-4 py-2 text-xs"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold text-[#404040]">Progress</p>
            <input
              value={progress}
              onChange={handleProgressChange}
              placeholder="70%"
              type="text"
              className="w-[143px] rounded-lg border-2 border-[#EDEDED] px-4 py-2 text-xs"
            />
          </div>
        </div>
        <div className="flex self-end">
          <button
            className="mr-[10px] h-[32px] rounded-lg border-[1px] border-[#E0E0E0] px-4 py-1 text-sm font-bold"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="h-[32px] rounded-lg bg-[#01959F] px-4 py-1 text-sm font-bold text-white"
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
}
