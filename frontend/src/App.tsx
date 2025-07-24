import { useState } from 'react';
import { Header } from './components/Header';
import { ChatsList, type Chat } from './components/ChatsList';
import { type Chat as ChatMsgs, ChatPage } from './components/ChatPage';
import albert from './assets/images/albert.jpg';
import richard from './assets/images/richard.jpg';
import nikola from './assets/images/tesla.jpg';
import galileo from './assets/images/galileo.jpg';
import paul from './assets/images/paul.jpg';

const defaultChatsList = [
  {
    name: 'Richard Feynman',
    avatar: richard,
    id: 'richard',
    desc: 'Playful genius who explains physics like magic.',
  },
  {
    name: 'Nikola Tesla',
    avatar: nikola,
    id: 'tesla',
    desc: 'Eccentric inventor obsessed with wireless energy.',
  },
  {
    name: 'Galileo Galilei',
    avatar: galileo,
    id: 'galileo',
    desc: 'Rebel scientist who defied the Church.',
  },
  {
    name: 'Albert Einstein',
    avatar: albert,
    id: 'albert',
    desc: 'Quirky thinker who bent space and time.',
  },
  {
    name: 'Paul Dirac',
    avatar: paul,
    id: 'paul',
    desc: 'Silent genius who spoke only in equations.',
  },
];

const chatMessages = [
  {
    id: '1',
    userId: 'richard',
    messages: [],
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
