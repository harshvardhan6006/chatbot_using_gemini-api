import React from 'react'
import { SiDependabot } from "react-icons/si";

function Greeting() {
    return (
        <div className='flex justify-center items-center gap-3 text-black mb-5'>
            <div><SiDependabot size={50} /></div>
            <div className='text-4xl font-medium'>Hi I am Chatly, how can i help you?</div>
        </div>
    )
}

export default Greeting
