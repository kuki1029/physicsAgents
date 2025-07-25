import { Chat } from '@/common/types';
import { useCallback, useEffect, useRef } from 'react';

interface IChatPageMessages {
  latestMsg: string;
  currentChatMsg?: Chat;
}

const BUBBLE_BASE_STYLE =
  'w-max max-w-[80%] py-1 px-1.5 rounded-lg shadow-md text-sm text-black flex items-end';

export const ChatPageMessages = ({
  currentChatMsg,
  latestMsg,
}: IChatPageMessages) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(scrollToBottom, [
    currentChatMsg?.messages,
    latestMsg,
    scrollToBottom,
  ]);

  if (!currentChatMsg) return;

  return (
    <section className="relative flex flex-col gap-3 overflow-y-auto p-2 pb-44">
      {currentChatMsg?.messages.map(({ msg, me }, i) => (
        <div
          key={i}
          className={`${
            me ? 'ml-auto bg-green-100' : 'bg-white'
          } ${BUBBLE_BASE_STYLE} ${
            msg.length < 25 ? 'flex-row gap-2' : 'flex-col'
          }`}
        >
          <p className="px-1.5 py-0.5">{msg}</p>
        </div>
      ))}

      {latestMsg ? (
        <div
          className={`${BUBBLE_BASE_STYLE} bg-white ${
            latestMsg.length < 25 ? 'flex-row gap-2' : 'flex-col'
          }`}
        >
          <p className="px-1.5 py-0.5">{latestMsg}</p>
        </div>
      ) : null}

      <div ref={messageEndRef} />
    </section>
  );
};
