'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import axios from 'axios';

export default function TaskItem({ task, groupID }) {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);
  const [editHover, setEditHover] = useState(false);
  const [trashHover, setTrashHover] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleMenuClick() {
    if (displayMenu) {
      handleClose();
    } else {
      setDisplayMenu(true);
      setTimeout(() => setOpacity(100), 5);
    }
  }

  function handleClose() {
    setOpacity(0);
    setTimeout(() => setDisplayMenu(false), 300);
  }

  async function handleMoveRight() {
    try {
      const body = {
        target_todo_id: parseInt(task.todo_id + 1),
      };

      await axios.patch(
        `/api/reqs?group_id=${groupID.toString()}&item_id=${parseInt(task.id)}`,
        body,
      );
      location.reload();
    } catch (error) {
      console.error('Error moving task:', error);
    }
  }

  async function handleMoveLeft() {
    try {
      const body = {
        target_todo_id: parseInt(task.todo_id - 1),
      };

      await axios.patch(
        `/api/reqs?group_id=${groupID.toString()}&item_id=${parseInt(task.id)}`,
        body,
      );
      location.reload();
    } catch (error) {
      console.error('Error moving task:', error);
    }
  }

  return (
    <div className="flex flex-col gap-2 rounded-[4px] border-[1px] border-[#E0E0E0] bg-[#FAFAFA] p-4">
      <p>{displayMenu}</p>
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
        <div className="relative" ref={dropdownRef}>
          <div
            className={`${displayMenu && 'bg-[#EDEDED]'} relative h-6 w-6 cursor-pointer rounded transition-all duration-300 hover:bg-[#EDEDED]`}
            onClick={handleMenuClick}
          >
            <Image
              alt="menu"
              className="object-cover"
              src="/menu.png"
              fill
              sizes="100vw"
            />
          </div>
          <div
            style={{ opacity: opacity / 100 }}
            className={`${groupID == 1246 && 'right-0'} ${displayMenu ? 'flex' : 'hidden'} dropdown-content bottom-[-135px] flex w-[320px] flex-col rounded-md bg-white py-2 shadow-md transition-all duration-300`}
          >
            <div
              onClick={handleMoveRight}
              onMouseEnter={() => setRightHover(true)}
              onMouseLeave={() => setRightHover(false)}
              className={`${groupID == 1246 && 'hidden'} flex cursor-pointer items-center gap-4 py-2 pl-4`}
              href="#"
            >
              <div className="relative -mt-[2px] h-6 w-6">
                <Image
                  alt="right"
                  src={`/right-${rightHover ? 'on' : 'off'}.png`}
                  layout="fill"
                  className="object-cover transition-all duration-300"
                />
              </div>
              <p
                className={`${rightHover ? 'text-[#01959F]' : 'text-black'} transition-all duration-300`}
              >
                Move Right
              </p>
            </div>
            <div
              onClick={handleMoveLeft}
              onMouseEnter={() => setLeftHover(true)}
              onMouseLeave={() => setLeftHover(false)}
              className={`${groupID == 1243 && 'hidden'} flex cursor-pointer items-center gap-4 py-2 pl-4`}
              href="#"
            >
              <div className="relative -mt-[2px] h-6 w-6">
                <Image
                  alt="left"
                  src={`/left-${leftHover ? 'on' : 'off'}.png`}
                  layout="fill"
                  className="object-cover transition-all duration-300"
                />
              </div>
              <p
                className={`${leftHover ? 'text-[#01959F]' : 'text-black'} transition-all duration-300`}
              >
                Move Left
              </p>
            </div>
            <div
              onMouseEnter={() => setEditHover(true)}
              onMouseLeave={() => setEditHover(false)}
              className="flex cursor-pointer items-center gap-4 py-2 pl-4"
              href="#"
            >
              <div className="relative -mt-[2px] h-6 w-6">
                <Image
                  alt="edit"
                  src={`/edit-${editHover ? 'on' : 'off'}.png`}
                  layout="fill"
                  className="object-cover transition-all duration-300"
                />
              </div>
              <p
                className={`${editHover ? 'text-[#01959F]' : 'text-black'} transition-all duration-300`}
              >
                Edit
              </p>
            </div>
            <div
              onMouseEnter={() => setTrashHover(true)}
              onMouseLeave={() => setTrashHover(false)}
              className="flex cursor-pointer items-center gap-4 py-2 pl-4"
              href="#"
            >
              <div className="relative -mt-[2px] h-6 w-6">
                <Image
                  alt="trash"
                  src={`/trash-${trashHover ? 'on' : 'off'}.png`}
                  layout="fill"
                  className="object-cover transition-all duration-300"
                />
              </div>
              <p
                className={`${trashHover ? 'text-[#E11428]' : 'text-black'} transition-all duration-300`}
              >
                Delete
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
