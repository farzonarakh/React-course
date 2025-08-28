import { useEffect, useState } from 'react'
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import { Chatbot } from 'supersimpledev';
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  //const {ChatMessages, setChatMessages} = array;

  //const ChatMessages = array[0];
  //const setChatMessages = array[1];

  useEffect(() => {
    Chatbot.addResponses({
      'hi':'Hi! How can I help you?'
    });
  }, [])

  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p className="welcome-message">
          Welcome to the chatbot project! Send a message using the textbox below.
        </p>
      )}
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
