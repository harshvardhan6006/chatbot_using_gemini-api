import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Message from './components/Message'
import ChatHistory from './components/ChatHistory'
import Greeting from './components/Greeting'
import { MdDelete } from "react-icons/md";

function App() {
  const [chatHistory, setChatHistory] = useState(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // console.log(chatHistory)

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory))
  }, [chatHistory])

  const deleteChatHistory = () => {
    localStorage.removeItem('chatHistory');
    setChatHistory([]);
  }

  return (
    <div className='w-100 min-h-screen flex justify-center items-center py-5'>
      <div className='w-2/3 lg:w-1/2 min-h-screen flex flex-col justify-center relative'>
        {chatHistory.length === 0 && <Greeting />}
        <ChatHistory chatHistory={chatHistory} />
        <Message setChatHistory={setChatHistory} chatHistory={chatHistory} />
        {chatHistory.length !== 0 && <button onClick={deleteChatHistory} className='absolute top-2 right-0 active:text-red-600'><MdDelete size={40} /></button>}
      </div>
    </div>
  )
}

export default App
