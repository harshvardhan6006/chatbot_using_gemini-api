import { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai';
import { IoSend } from "react-icons/io5";

function Message({ setChatHistory, chatHistory }) {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const [response, setResponse] = useState("");
    const [input, setInput] = useState("");
    const [query, setQuery] = useState("");

    console.log(query)

    const handleInputChange = (e) => {
        setInput(e.target.value);
        e.target.style.height = 'auto'; // Reset height to auto to recalculate
        e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height based on scroll height
    };

    const handleSendMessage = async (messageFromUser) => {
        const chat = model.startChat({
            history: chatHistory,
        });

        let result = await chat.sendMessageStream(messageFromUser);

        let fullResponse = "";

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            // console.log(chunkText);
            fullResponse += chunkText;
            setResponse((prev) => prev + chunkText);
        }

        // console.log(response);

        setChatHistory([...chatHistory, { role: "user", parts: [{ text: messageFromUser }] }, { role: "model", parts: [{ text: fullResponse }] }]);
        setQuery("");
        setResponse("");
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) { // Detect "Enter" without Shift
            e.preventDefault(); // Prevent new line in the textarea
            console.log("Enter key pressed");
            setQuery(input);
            handleSendMessage(input);
            setInput("");
        }
    };

    return (
        <div className='relative flex flex-col'>
            <div className='flex-1 overflow-auto'>
                {query && <p className='text-right mb-4 w-fit max-w-[70%] ml-auto bg-slate-200 p-4 rounded-3xl'>{query}</p>}
                <p>{response}</p>
            </div>
            <div className='sticky bottom-0 z-50 bg-gray-200 flex flex-nowrap w-full p-3 rounded-3xl'>
                <textarea
                    className='w-full mr-2 bg-gray-200 resize-none overflow-hidden focus:outline-none'
                    rows={1} // Starts with 1 row
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    style={{ height: 'auto' }} // Initial height
                />
                <button disabled={!input} className={`p-3 rounded-full h-fit bg-black flex justify-center items-center ${input ? "" : "opacity-15"}`} onClick={() => {
                    setQuery(input);
                    handleSendMessage(input);
                    setInput("");
                }}><IoSend size={25} color='white' /></button>
            </div>
        </div>
    )
}

export default Message
