import React from 'react'
import { SiDependabot } from "react-icons/si";

function ChatHistory({ chatHistory }) {
    return (
        <div>
            {chatHistory.map((chat, index) => {
                // console.log(chat)
                return (
                    <div key={index}>
                        {chat.role === "user" ? (
                            <p className='text-right mb-4 w-fit max-w-[70%] ml-auto bg-slate-200 p-4 rounded-3xl'>{chat.parts[0].text}</p>
                        ) : (
                            <div className='relative mb-8'>
                                <SiDependabot size={30} className='absolute top-0 left-[-40px]' />
                                <p className=''>{chat.parts[0].text}</p>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default ChatHistory
