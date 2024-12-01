import React from 'react'
import Image from 'next/image'
import { IoHomeOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { HiOutlineClipboardList } from "react-icons/hi";
import Link from 'next/link';


const Navbar = () => {

    const navLinks = [
        {
            name:'Home',
            icon: <IoHomeOutline />
        },
        {
            name: 'Program',
            icon: <HiOutlineClipboardList />,
        },
        {
            name: 'Test Series',
            icon:<HiOutlineClipboardList />
        },
        {
            name: 'My cart',
            icon: <BsCart3 />
        }
    ]

  return (
    <nav className='w-full bg-white'>
        <div className='xl:w-[75%] sm:w-[90%] mx-auto flex items-center justify-between px-10 py-5'>
            <Image
                src="/assets/enest-logo.jpeg"
                alt="logo"
                width={200}
                height={77}
            />
            <ul className='flex justify-around gap-5'>
                {navLinks.map((link, index) => (
                    <li key={index} className='mx-5 hover:text-purple-800'>
                        <Link href='#' className='flex items-center gap-2 font-semibold'>
                            <span>{link.icon}</span>
                            <p>{link.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            <Image
                src="/assets/user-badge.png"
                alt="search"
                width={40}
                height={40}
            />
        </div>
    </nav>
  )
}

export default Navbar