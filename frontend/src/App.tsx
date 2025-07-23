import { useState } from 'react';
import { Header } from './components/Header';
import { ChatsList, type Chat } from './components/ChatsList';
import { type Chat as ChatMsgs, ChatPage } from './components/ChatPage';

const defaultChatsList = [
  {
    name: 'Stephen Hawking',
    avatar: undefined,
    id: '123',
  },
];

const chatMessages = [
  {
    id: '1',
    userId: '123',
    messages: [
      {
        me: true,
        msg: 'hello',
      },
      {
        me: false,
        msg: 'other person',
      },
      {
        me: true,
        msg: 'me again test',
      },
    ],
  },
];

const App = () => {
  const [chats, _setChats] = useState<Chat[]>(defaultChatsList);
  const [msgs, setMsgs] = useState<ChatMsgs[]>(chatMessages);
  const [selectedChat, setSelectedChat] = useState('');

  if (selectedChat) {
    return (
      <ChatPage
        selectedChatId={selectedChat}
        chatInfo={defaultChatsList[0]}
        chatMsgs={msgs}
        setSelectedChat={setSelectedChat}
        setChats={setMsgs}
      />
    );
  }

  return (
    <>
      <Header />
      <ChatsList chats={chats} setSelectedChat={setSelectedChat} />
    </>
  );
};

export default App;
