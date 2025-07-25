import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface IChatPageHeader {
  setSelectedChat: React.Dispatch<React.SetStateAction<string>>;
  avatar: string;
  name: string;
}

export const ChatPageHeader = ({
  setSelectedChat,
  avatar,
  name,
}: IChatPageHeader) => {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 bg-primary-600 px-2 py-2.5 text-white">
      <FaArrowLeft
        className="cursor-pointer text-xl"
        onClick={() => setSelectedChat('')}
      />
      <img
        src={avatar}
        alt="avatar"
        className="h-10 w-10 rounded-full object-cover"
      />
      <div className="mr-auto">
        <h4 className="font-medium">{name}</h4>
        <p className="text-xs text-white/80">Online</p>
      </div>
    </header>
  );
};
