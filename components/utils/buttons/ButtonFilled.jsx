import React from 'react'

const ButtonFilled = ({text}) => {
  return (
    <button 
        className='w-28 bg-purple-700 text-white text-sm font-medium px-2 py-3 rounded-full'>
        {text}
    </button>
  )
}

export default ButtonFilled