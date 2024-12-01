import React from 'react'

const ButtonOutline = ({text}) => {
  return (
    <button 
    className='w-28 border border-purple-700 text-purple-700 text-sm font-medium px-2 py-3 rounded-full'>
      {text}
    </button>  )
}

export default ButtonOutline