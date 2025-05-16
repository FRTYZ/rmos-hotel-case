import { useState, useEffect } from 'react'

import Link from 'next/link';

// Components
import Drawer from '../Drawer';
import XButton from '../FormElements/XButton';

import { usePathname } from 'next/navigation'

function Navbar() {
    const pathname = usePathname()

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    
    const navLinks = [
        { href: '/', label: 'Forecast' },
        { href: '/blacklist', label: 'Blacklist' },
    ]

    useEffect(() => {
        if(pathname){
            setIsDrawerOpen(!isDrawerOpen)
        }
    }, [pathname])

    const menuItems = (
        <ul className="grid lg:flex space-y-5 lg:space-y-1 lg:space-x-8 ">
            {navLinks.map((link) => {
                const isActive = pathname === link.href

                return (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={`text-gray-700 hover:text-blue-600 text-[25px] lg:text-[18px] font-medium ${
                                isActive ? 'border-b border-gray-300' : 'border-transparent'
                            }`}
                        >
                            {link.label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )

    return (
        <header className="bg-white shadow-md py-3">
            <nav className="container mx-auto flex items-center justify-between px-4 py-3">
                {/* Sol: Logo */}
                <div className="flex gap-4 items-center justify-between">
                    <Link href="/" className='border-r border-gray-400 pr-6'>
                        <img 
                            src={'https://www.rmosyazilim.com/img/logo.png'} 
                            className='h-6 w-full hover:text-green-500'
                        />
                    </Link>
                    <p className='text-[18px] font-semibold'>Otel Case</p>
                </div>

                {/* Orta: Menü */}
                <div className='hidden lg:flex'>            
                    {menuItems}
                </div>
                <div className="flex lg:hidden">
                    <Drawer
                        buttonContent={
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list w-6 h-6" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                            </svg>
                        }
                        backgroundColor='bg-white dark:bg-primary-dark'
                        side='right'
                        padding='px-8 pt-12'
                        width='w-[80vw]'
                    >
                        <div className="grid grid-cols-1 gap-4 mt-5 lg:grid-cols-5">
                            {menuItems}
                        </div>
                    </Drawer>
                   
                </div>
            </nav>
        </header> 
    )
}

export default Navbar