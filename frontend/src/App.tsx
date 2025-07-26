import { useState } from 'react';
import { Header } from './components/Header';
import { ChatsList } from './components/ChatsList';
import { ChatPage } from './components/ChatPage';
import { defaultChatsList, chatMessages, type Chat } from './common/types';

const App = () => {
  const [msgs, setMsgs] = useState<Chat[]>(chatMessages);
  const [selectedChat, setSelectedChat] = useState('');
  const chatInfo = defaultChatsList.find(({ id }) => id === selectedChat);
  //TODO: Add better error page and ability to go back

  if (selectedChat && chatInfo) {
    return (
      <ChatPage
        selectedChatId={selectedChat}
        chatInfo={chatInfo}
        chatMsgs={msgs}
        setSelectedChat={setSelectedChat}
        setChats={setMsgs}
      />
    );
  }

  return (
    <>
      <Header />
      <ChatsList chats={defaultChatsList} setSelectedChat={setSelectedChat} />
    </>
  );
};

export default App;
