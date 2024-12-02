'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoHomeOutline, IoClose } from "react-icons/io5"
import { BsCart3, BsList } from "react-icons/bs"
import { HiOutlineClipboardList } from "react-icons/hi"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        {
            name: 'Home',
            icon: <IoHomeOutline />,
            href: '/'
        },
        {
            name: 'Program',
            icon: <HiOutlineClipboardList />,
            href: '/programs'
        },
        {
            name: 'Test Series',
            icon: <HiOutlineClipboardList />,
            href: '/test-series'
        },
        {
            name: 'My cart',
            icon: <BsCart3 />,
            href: '/cart'
        }
    ]

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='w-full bg-white shadow-sm'>
            <div className='xl:w-[75%] sm:w-[90%] mx-auto flex items-center justify-between px-4 py-4 relative'>
                {/* Logo */}
                <Image
                    src="/assets/enest-logo.jpeg"
                    alt="logo"
                    width={200}
                    height={77}
                    className='object-contain'
                />

                {/* Desktop Navigation */}
                <ul className='hidden md:flex justify-around gap-5'>
                    {navLinks.map((link, index) => (
                        <li key={index} className='mx-3 hover:text-purple-800'>
                            <Link href={link.href} className='flex items-center gap-2 font-semibold'>
                                <span>{link.icon}</span>
                                <p>{link.name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* User Badge */}
                <Image
                    src="/assets/user-badge.png"
                    alt="user"
                    width={40}
                    height={40}
                    className='hidden md:block'
                />

                {/* Mobile Hamburger Menu */}
                <div className='md:hidden'>
                    <button 
                        onClick={toggleMenu} 
                        className='text-2xl focus:outline-none'
                    >
                        {isMenuOpen ? <IoClose /> : <BsList />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className='fixed inset-0 bg-white z-50 md:hidden'>
                        <div className='flex flex-col h-full'>
                            {/* Mobile Menu Header */}
                            <div className='flex justify-between items-center p-4 border-b'>
                                <Image
                                    src="/assets/enest-logo.jpeg"
                                    alt="logo"
                                    width={150}
                                    height={57}
                                />
                                <button 
                                    onClick={toggleMenu} 
                                    className='text-2xl focus:outline-none'
                                >
                                    <IoClose />
                                </button>
                            </div>

                            {/* Mobile Navigation Links */}
                            <ul className='flex flex-col p-4 space-y-4'>
                                {navLinks.map((link, index) => (
                                    <li key={index} onClick={toggleMenu}>
                                        <Link 
                                            href={link.href} 
                                            className='flex items-center gap-3 text-lg font-semibold py-2 hover:bg-gray-100 rounded-lg px-3'
                                        >
                                            <span className='text-xl'>{link.icon}</span>
                                            <p>{link.name}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Mobile User Section */}
                            <div className='mt-auto p-4 border-t'>
                                <div className='flex items-center gap-3'>
                                    <Image
                                        src="/assets/user-badge.png"
                                        alt="user"
                                        width={50}
                                        height={50}
                                        className='rounded-full'
                                    />
                                    <div>
                                        <p className='font-semibold'>User Profile</p>
                                        <p className='text-sm text-gray-500'>Manage your account</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar