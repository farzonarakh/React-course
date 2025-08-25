import { useRef, useEffect } from "react";
import { ChatMessage } from './ChatMessage'
import './ChatMessages.css';

function ChatMessages({chatMessages}) {
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

export default ChatMessages;