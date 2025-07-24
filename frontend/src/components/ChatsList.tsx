export type Chat = {
  id: string;
  name: string;
  desc: string
  avatar: string;
};

interface IChatsList {
  chats: Chat[];
  setSelectedChat: React.Dispatch<React.SetStateAction<string>>;
}

export const ChatsList = ({ chats, setSelectedChat }: IChatsList) => {
  return (
    <>
      <section className="">
        {chats.map((chat) => (
          <div
            className="grid grid-cols-[3rem_1fr] items-center gap-3 px-5 py-4 hover:bg-gray-200"
            key={chat.id}
            onClick={() => setSelectedChat(chat.id)}
          >
            <img
              className="h-12 w-12 rounded-full bg-gray-800 object-cover"
              src={chat.avatar}
            />
            <div>
              <h4 className="flex justify-between text-base font-medium text-gray-800">
                <span>{chat.name}</span>
              </h4>
              <p className="flex font-light text-xs text-gray-400">
                <span>{chat.desc}</span>
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
