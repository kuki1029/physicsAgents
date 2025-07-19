export type Chat = {
    id: string;
    name: string;
    avatar: undefined;
}

interface IChatsList {
    chats: Chat[],
    setSelectedChat: React.Dispatch<React.SetStateAction<string>>
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
              className="rounded-full bg-gray-800 w-12 h-12 object-cover"
              src={chat.avatar}
            />
            <div>
              <h4 className="text-gray-800 font-medium text-base flex justify-between">
                <span>{chat.name}</span>
              </h4>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};