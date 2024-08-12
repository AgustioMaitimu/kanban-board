import Image from 'next/image';
import React from 'react';
import { Nunito_Sans } from 'next/font/google';

const nunito_sans = Nunito_Sans({ subsets: ['latin'] });

function GroupComponent({ items, colorCodes, number, description }) {
  const containerStyle = {
    borderColor: colorCodes.OutBorder,
    backgroundColor: colorCodes.BG,
  };

  const headerStyle = {
    borderColor: colorCodes.InBorder,
    color: colorCodes.Text,
  };

  return (
    <div
      style={containerStyle}
      className={`${nunito_sans.className} flex w-[326px] shrink-0 flex-col gap-2 rounded-[4px] border-[1px] p-4`}
    >
      <h1
        style={headerStyle}
        className="w-fit rounded-[4px] border-[1px] bg-transparent px-[8px] py-[3px] text-xs"
      >
        Group Task {number}
      </h1>
      <h1 className="text-xs font-medium">{description}</h1>
      {!items && (
        <h1 className="rounded-[4px] border-[1px] border-[#E0E0E0] bg-[#FAFAFA] px-[16px] py-[8px] text-sm font-light text-[#757575]">
          No Task
        </h1>
      )}
      <div className="flex items-center gap-[5px]">
        <div className="relative aspect-square w-[20px]">
          <Image
            alt="plus"
            src="/plus.png"
            className="object-cover"
            layout="fill"
          />
        </div>
        <p className="text-xs font-light">New Task</p>
      </div>
      <h1></h1>
    </div>
  );
}

export default GroupComponent;
