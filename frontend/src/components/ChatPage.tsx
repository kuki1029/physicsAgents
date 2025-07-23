import { FaArrowLeft } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { type Chat as SingleChat } from './ChatsList';
import { useEffect, useState } from 'react';
import { useWebsocket } from '@/hooks/useWebsocket';

export type ChatMessage = {
  me: boolean;
  msg: string;
};

export type Chat = {
  id: string;
  userId: string;
  messages: ChatMessage[];
};

interface IChatPage {
  selectedChatId: string;
  chatInfo: SingleChat;
  chatMsgs: Chat[];
  setSelectedChat: React.Dispatch<React.SetStateAction<string>>;
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}

// TODO: UI Bug. doesnt scroll down auto.
export const ChatPage = ({
  selectedChatId,
  setSelectedChat,
  chatMsgs,
  chatInfo,
  setChats,
}: IChatPage) => {
  const currentChatMsgs = chatMsgs.find(
    ({ userId }) => userId === selectedChatId,
  );
  const [newRes, setNewRes] = useState('');
  const [newMsg, setNewMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const className =
    'w-max max-w-[80%] py-1 px-1.5 rounded-lg shadow-md text-sm text-black flex  items-end';

  // TODO Move up url to somewhere else
  const { send, connected } = useWebsocket<ChatMessage>(
    'ws://localhost:8000/ws/chat',
    {
      onMessage: (data) => {
        //TODO: Fix this type
        if (data.chunk) {
          const msg = data.chunk as string;
          setNewRes((prev) => prev + msg);
        }
        if (data.response) {
          setChats((prevChats) =>
            prevChats.map((chat) => {
              if (chat.userId === selectedChatId) {
                return {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    {
                      msg: data.response,
                      me: false,
                    },
                  ],
                };
              }
              return chat;
            }),
          );
          setNewRes('');
        }
      },
      onOpen: () => console.log('WebSocket connected'),
      onClose: () => console.log('WebSocket disconnected'),
      onError: () => console.error('WebSocket error'),
    },
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChats(
      chatMsgs.map((chat) => {
        if (chat.userId === selectedChatId) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                msg: newMsg,
                me: true,
              },
            ],
          };
        }
        return chat;
      }),
    );
    setLoading(true);
  };

  useEffect(() => {
    const fn = async () => {
      if (loading) {
        // Display loading somewhere?
        const dataMsg = newMsg;
        setNewMsg('');
        // const data = (await sendChat({ msg: dataMsg })).data.response;
        send({ msg: dataMsg });
        // setChats(
        //   chatMsgs.map((chat) => {
        //     if (chat.userId === selectedChatId) {
        //       return {
        //         ...chat,
        //         messages: [
        //           ...chat.messages,
        //           {
        //             msg: data,
        //             me: false,
        //           },
        //         ],
        //       };
        //     }
        //     return chat;
        //   }),
        // );
        setLoading(false);
      }
    };
    fn();
  }, [loading]);

  if (!connected) return <p>Connecting...</p>;

  return (
    <main className="min-h-screen bg-[url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)] bg-cover bg-fixed">
      <header className="sticky top-0 z-30 flex items-center justify-center gap-3 bg-primary-600 px-2 py-2.5 text-white">
        <FaArrowLeft className="text-xl" onClick={() => setSelectedChat('')} />
        <img
          src={chatInfo.avatar}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div className="mr-auto flex flex-col">
          <h4 className="font-medium">{chatInfo.name}</h4>
          <p className="text-xs text-white/80">online</p>
        </div>
      </header>

      <section className="relative flex flex-col gap-3 p-2 pb-44">
        {currentChatMsgs
          ? currentChatMsgs.messages.map(({ msg, me }, i) => (
              <div
                key={i}
                className={`${
                  me ? 'ml-auto bg-green-100' : 'bg-white'
                } ${className} ${
                  msg.length < 25 ? 'flex-row gap-2' : 'flex-col'
                }`}
              >
                <p className="px-1.5 py-0.5">{msg}</p>

                {/* <p className="text-xs text-black/40">
              {time}
              {me && (
                <IoCheckmarkDoneSharp className="mx-1 inline-block text-lg text-sky-500" />
              )}
            </p> */}
              </div>
            ))
          : null}
        {newRes.length ? (
          <div
            className={`${'bg-white'} ${className} ${
              newRes.length < 25 ? 'flex-row gap-2' : 'flex-col'
            }`}
          >
            <p className="px-1.5 py-0.5">{newRes}</p>
          </div>
        ) : null}
      </section>

      <form
        onSubmit={onSubmit}
        className="group fixed bottom-0 left-0 flex w-full items-center gap-2 bg-red-500/0 bg-[url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)] p-2 pt-0.5"
      >
        <div className="flex flex-grow items-center gap-3 rounded-full border bg-white p-2 text-black/50">
          {/* <p>
            <GrEmoji className="text-2xl" />
          </p> */}
          <input
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            name="msg"
            className="w-full flex-grow text-black outline-none"
            type="text"
            required
            placeholder="Type a message"
          />
        </div>

        <button type="submit" className="rounded-full bg-primary p-3">
          <IoMdSend className="text-xl text-white group-invalid:hidden" />
        </button>
      </form>
    </main>
  );
};
