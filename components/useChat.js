import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'; // Name of the event
const SOCKET_SERVER_URL = 'http://10.0.2.2:4000';

const useChat = (roomId) => {
  //   const { roomId } = props;
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      //   console.log('\n\n\n message, ', messages);
      setMessages((messages) => [...messages, incomingMessage]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (message) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      room: message.room,
      body: message.body,
      sender: message.senderId,
      receiver: message.receiverId,
      senderId: socketRef.current.id,
    });
    // console.log('\n\n\nsend: ', messageBody);
  };

  return { messages, sendMessage };
};

export default useChat;
