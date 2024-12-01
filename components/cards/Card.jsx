import React from 'react'
import Image from 'next/image'
import ButtonFilled from '../utils/buttons/ButtonFilled'
import ButtonOutline from '../utils/buttons/ButtonOutline'

const Card = ({
    title,
    content,
    price,
    discount
}) => {
  return (
    <div className='border border-gray-300 rounded-3xl w-[16.5rem] h-[24.7rem] p-2 bg-white'>
        <div className=' border border-gray-200 rounded-2xl'>
            <Image
                src="/assets/img1.jpeg"
                alt="program"
                width={650}
                height={200}
                className='rounded-2xl h-36 shadow-sm'
                style={{objectFit:'cover'}}
            />
        </div>
        <div className='flex flex-col mt-3 h-[9.5rem]'>
            <h3 className='uppercase font-bold text-xl'>{title}</h3>
            <p className='font-medium h-[2rem]'>{content}</p>
            <p className='font-xs font-medium text-purple-700 mt-3'>Special Price</p>
            <span className='flex items-center gap-3 '>
                <span className='font-semibold text-[1.1rem]'>{price}</span>
                <span className='text-xs text-green-500 mt-1 font-medium'>{discount} % off</span>
            </span>
            <p className='line-through text-gray-400 text-sm mt-2'> Rs. 3000</p>
        </div>
        <div className='flex justify-between mt-5'>
            <ButtonOutline text={'Buy Now'}/>
            <ButtonFilled text={'Explore'}/>
        </div>
    </div>
  )
}

export default Card;
