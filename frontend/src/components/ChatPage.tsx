import { FaArrowLeft } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { type Chat as SingleChat } from './ChatsList';
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

export const ChatPage = ({
  selectedChatId,
  setSelectedChat,
  chatMsgs,
  chatInfo,
  setChats,
}: IChatPage) => {
  const currentChatMsgs = chatMsgs.find(({ id }) => id === selectedChatId);
  const className =
    'w-max max-w-[80%] py-1 px-1.5 rounded-lg shadow-md text-sm text-black flex  items-end';

  // TODO: fix the types here
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = e.target.msg.value;
    if (e.target instanceof HTMLFormElement) {
      e.target.reset();
    }

    setChats(
      chatMsgs.map((chat) => {
        if (chat.id === selectedChatId) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                msg,
                me: true,
              },
            ],
          };
        }
        return chat;
      }),
    );
  };

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
        {chatMsgs
          ? chatMsgs[0].messages.map(({ msg, me }, i) => (
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
