import Link from 'next/link'
import React from 'react'

const VerificationPage = () => {
    return (
        <div className='bg-[#110327] flex items-center justify-center h-screen w-full'>
            <div className="w-[400px] p-8 rounded-xl bg-[#17023A] text-white space-y-4 text-center">
                <h1 className='font-roboto font-medium tracking-wide text-4xl capitalize'>Check your email</h1>
                <p className='text-lg tracking-wide'>A sign in link has been sent to <br /> your email address.</p>
                <Link href="/" className='font-raleway font-bold text-2xl block pt-6'>iKnowCode</Link>
            </div>
        </div>
    )
}

export default VerificationPage