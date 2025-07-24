import { useState } from 'react';
import { Header } from './components/Header';
import { ChatsList } from './components/ChatsList';
import { ChatPage } from './components/ChatPage';
import { defaultChatsList, chatMessages, ChatUser, Chat  } from './common/types';

const App = () => {
  const [chats, _setChats] = useState<ChatUser[]>(defaultChatsList);
  const [msgs, setMsgs] = useState<Chat[]>(chatMessages);
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
