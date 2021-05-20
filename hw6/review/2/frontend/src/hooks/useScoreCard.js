import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  messages: [],

  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
});

const makeMessage = (message, color) => {
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [messagess, setMessages] = useState([]);

  const addCardMessage = (message) => {

    setMessages([...messagess, makeMessage(message, ADD_MESSAGE_COLOR)]);
  };

  const addRegularMessage = (...ms) => {

    setMessages([
      ...messagess,
      ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
    ]);

  };

  const addErrorMessage = (message) => {
    setMessages([...messagess, makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  const deleteMessage = () => {
    setMessages([]);

  };

  return (
    <ScoreCardContext.Provider
      value={{
        messagess,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        deleteMessage,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
