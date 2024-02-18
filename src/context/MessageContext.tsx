import React, { createContext, useState, ReactNode } from "react";


/**
 * Defines the structure of the MessageContext.
 */
interface MessageContextType {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Context for managing messages.
 */
export const MessageContext = createContext<MessageContextType | null>(null);

/**
 * Props for the MessageProvider component.
 */
interface MessageProviderProps {
  children: ReactNode;
}

/**
 * MessageProvider component to manage messages using React context.
 *
 * This provider encapsulates the logic for handling messages within the application.
 * It utilizes React context to share the message state and setter function with its descendants.
 * 
 * @param children - The child components to be wrapped by the provider.
 */
export const MessageProvider: React.FC<MessageProviderProps> = ({
  children,
}) => {
  const [message, setMessage] = useState("");

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
