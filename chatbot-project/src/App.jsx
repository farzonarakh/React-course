import { useState, useRef, useEffect } from 'react'
import { Chatbot } from 'supersimpledev';
import RobotProfileImage from './assets/robot.png';
import UserProfileImage from './assets/user.png';
import './App.css'

  function ChatInput({chatMessages, setChatMessages}) {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false)


    function saveInputText(event) {
      setInputText(event.target.value);
    }

    function handleKeyDown(event) {
      {event.key === 'Enter' && sendMessage()}
      {event.key === 'Escape' && setInputText('')} 
    }

    async function sendMessage() {
      if (isLoading || inputText === '') {
        return;
      }
      
      setIsLoading(true)

      setInputText('');

      const newChatMessages = [
        ...chatMessages,
        {
          message: inputText,
          sender: 'user',
          id: crypto.randomUUID()
        }
      ];

      setChatMessages([
        ...newChatMessages,
        {
        message: <img src="loading-spinner.gif" className="loading-spinner"/>,
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]);

      const response = await Chatbot.getResponseAsync(inputText);
      setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]);

      setIsLoading(false);
    }

    return (
      <div className="chat-input-container">
        <input 
          placeholder="Send a message to Chatbot" 
          size="30" 
          onChange={saveInputText}
          value={inputText}
          onKeyDown={handleKeyDown}
          className="chat-input"
        />
        <button 
        onClick={sendMessage} 
        className="send-button"
        >Send</button>
      </div>
    );
  }

  function ChatMessage({ message, sender }) {
    // const { message, sender } = props;

    /*
    if(sender === 'robot') {
      return(
        <div>
          <img src="robot.png" width="50"/>
          {message}
      </div>
      );
    }
    */

    return (
      <div className={
        sender === 'user' 
        ? "chat-message-user" 
        : "chat-message-robot"
      }>
        {sender === 'robot' && (
          <img src={RobotProfileImage} className="chat-message-profile"/>
        )}
        <div 
        className="chat-message-text">
          {message}
        </div>
        {sender === 'user' && (
          <img src={UserProfileImage} className="chat-message-profile"/>
        )}
      </div>
    );
  }

  function useAutoScroll(dependencies) {
    const containerRef = useRef(null);

    useEffect(() => {
      const containerElem = containerRef.current;
      if (containerElem) {
        containerElem.scrollTop = containerElem.
        scrollHeight;
      }
    }, [dependencies]);

    return containerRef;
  }

  function ChatMessages({chatMessages}) {
    const chatMessagesRef = useAutoScroll(chatMessages);

    return(
      <div 
      className="chat-messages-container"
        ref={chatMessagesRef}>
        {chatMessages.map((chatMessage) => {
          return (
            <ChatMessage 
              message={chatMessage.message}
              sender={chatMessage.sender}
              key={chatMessage.id}
            />
          );
        })}
      </div>
    );
  }

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  //const {ChatMessages, setChatMessages} = array;

  //const ChatMessages = array[0];
  //const setChatMessages = array[1];

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
