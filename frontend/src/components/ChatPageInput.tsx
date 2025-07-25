import React from 'react';
import { IoMdSend } from 'react-icons/io';

interface IChatPageInput {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  newMsg: string;
  setNewMsg: React.Dispatch<React.SetStateAction<string>>;
  newResponse: string;
}

export const ChatPageInput = ({
  handleSubmit,
  newMsg,
  setNewMsg,
  newResponse,
}: IChatPageInput) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 flex w-full items-center gap-2 bg-[url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)] p-2 pt-0.5"
    >
      <div className="flex flex-grow items-center gap-3 rounded-full border bg-white p-2 text-black/50">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          type="text"
          placeholder="Type a message"
          required
          disabled={!!newResponse}
          className="w-full flex-grow bg-transparent text-black outline-none"
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-primary p-3"
        disabled={!!newResponse}
      >
        <IoMdSend className="text-xl text-white" />
      </button>
    </form>
  );
};
