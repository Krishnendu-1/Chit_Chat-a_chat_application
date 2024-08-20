import React from 'react'

function Messages({user,message,side}) {
 if(user=='You'){
    return (
        <div className='grid gap-[1vh] text-base m-2' style={side}>
            <p className=' bg-blue-500 rounded-lg text-black w-fit p-1 font-semibold'>{`You`}</p> <p className=' bg-green-500 rounded-lg text-white p-1 min-w-10 flex justify-center font-mono'>{`${message}`}</p>
        </div>
      )
 }
 else{
    return (
        <div className='grid gap-[1vh] text-base m-2' style={side}>
            <p  className=' bg-green-500 rounded-lg text-black w-fit p-1 font-semibold'>{`${user}`}</p> <p className=' bg-blue-500 rounded-lg text-white p-1 min-w-10 flex justify-center font-mono'>{`${message}`}</p>
        </div>
      )
 }
}

export default Messages
