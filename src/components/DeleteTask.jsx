import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Nunito_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';

const nunito_sans = Nunito_Sans({ subsets: ['latin'] });

export default function DeleteTask({ task, show, onClose, groupID }) {
  const [taskName, setTaskName] = useState('');
  const [progress, setProgress] = useState('');
  const [opacity, setOpacity] = useState(0);
  const [visibility, setVisibility] = useState('hidden');

  useEffect(() => {
    if (show) {
      setVisibility('flex');
      setTimeout(() => setOpacity(100), 5);
    } else {
      setOpacity(0);
      setTimeout(() => setVisibility('hidden'), 300);
    }
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

  async function handleDelete() {
    try {
      await axios.delete(
        `/api/reqs?group_id=${groupID.toString()}&item_id=${task.id}`,
      );
      location.reload();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  }

  return (
    <div
      className={`${nunito_sans.className} fixed left-0 top-0 z-20 h-screen w-screen items-center justify-center bg-gray-800 bg-opacity-40 transition-opacity duration-300 ${visibility}`}
      style={{ opacity: opacity / 100 }}
      onClick={handleClose}
    >
      <div
        className="flex w-[90%] max-w-[420px] flex-col gap-6 rounded-[10px] bg-white p-6 shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6">
              <Image
                alt="alert"
                className="object-cover"
                src="/alert.png"
                layout="fill"
              />
            </div>
            <h1 className="text-lg font-bold">Delete Task</h1>
          </div>
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
        <p className="text-sm font-normal text-[#404040]">
          Are you sure want to delete this task? your action can’t be reverted.
        </p>
        <div className="flex self-end">
          <button
            className="mr-[10px] h-[32px] rounded-lg border-[1px] border-[#E0E0E0] px-4 py-1 text-sm font-bold"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="h-[32px] rounded-lg bg-[#E11428] px-4 py-1 text-sm font-bold text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
