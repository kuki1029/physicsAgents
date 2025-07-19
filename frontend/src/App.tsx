import { useState } from "react";
import { Header } from "./components/Header";
import { ChatsList, Chat } from "./components/ChatsList";

const defaultChats = [{
  name: 'Bob', avatar: undefined, id: '123'
}]

const App = () => {
  const [chats, setChats] = useState<Chat[]>(defaultChats);
  const [selectedChat, setSelectedChat] = useState('');

  if (selectedChat) {
    return <></>
  }

  return (
    <>
      <Header
      />
        <ChatsList
          chats={chats}
          setSelectedChat={setSelectedChat}
        />
      
    </>
  );
};

export default App;
