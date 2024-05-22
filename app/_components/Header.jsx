"use client"
import React from 'react'

import Image from "next/image"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import logo from '../../public/logo2.png'

function Header() {
    const {user, isSignedIn} = useUser();
  return (
    <div className='p-3 flex justify-between items-center border shadow-sm'>
      <Image  
      src={logo} // Path to your image
        alt="Logo"
        width={100} // Desired width
        height={100} // Desired height
     />
        { isSignedIn?
        <UserButton/> : 
        <Link href={'/sign-in'}>
        <Button>Get Started</Button>
        </Link>
        }
     

    </div>
  )
}

export default Header
