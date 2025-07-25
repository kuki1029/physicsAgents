import { useEffect, useState, useCallback, useMemo } from 'react';

import { useWebsocket } from '@/hooks/useWebsocket';
import { WS_URL } from '@/services/api';
import type { ChatUser, Chat, resMsg } from '@/common/types';
import { ChatPageHeader } from './ChatPageHeader';
import { ChatPageInput } from './ChatPageInput';
import { ChatPageMessages } from './ChatPageMessages';

interface ChatPageProps {
  selectedChatId: string;
  chatInfo: ChatUser;
  chatMsgs: Chat[];
  setSelectedChat: React.Dispatch<React.SetStateAction<string>>;
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}

export const ChatPage = ({
  selectedChatId,
  setSelectedChat,
  chatMsgs,
  chatInfo,
  setChats,
}: ChatPageProps) => {
  const [newMsg, setNewMsg] = useState('');
  const [newRes, setNewRes] = useState('');
  const [loading, setLoading] = useState(false);

  const currentChat = useMemo(
    () => chatMsgs.find((chat) => chat.userId === selectedChatId),
    [chatMsgs, selectedChatId],
  );

  const appendMessage = useCallback(
    (msg: string, me: boolean) => {
      setChats((prev) =>
        prev.map((chat) =>
          chat.userId === selectedChatId
            ? {
                ...chat,
                messages: [...chat.messages, { msg, me }],
              }
            : chat,
        ),
      );
    },
    [selectedChatId, setChats],
  );

  const { send, connected } = useWebsocket<resMsg>(WS_URL, {
    onMessage: (data) => {
      if (data.chunk) {
        setNewRes((prev) => prev + data.chunk);
      }
      if (data.response) {
        appendMessage(data.response, false);
        setNewRes('');
      }
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newMsg.trim()) return;

      appendMessage(newMsg, true);
      setLoading(true);
    },
    [newMsg, appendMessage],
  );

  useEffect(() => {
    if (loading && connected) {
      send({ msg: newMsg, id: chatInfo.id });
      setNewMsg('');
      setLoading(false);
    }
  }, [loading, connected, send, newMsg, chatInfo.id]);

  if (!connected) return <p className="p-4 text-center">Connecting...</p>;

  return (
    <main className="min-h-screen bg-[url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)] bg-cover bg-fixed">
      <ChatPageHeader
        setSelectedChat={setSelectedChat}
        name={chatInfo.name}
        avatar={chatInfo.avatar}
      />
      <ChatPageMessages latestMsg={newRes} currentChatMsg={currentChat} />
      <ChatPageInput
        handleSubmit={handleSubmit}
        newMsg={newMsg}
        setNewMsg={setNewMsg}
        newResponse={newRes}
      />
    </main>
  );
};
