'use client'

import dynamic from 'next/dynamic';

const LottiePlayer = dynamic(() => import('@/components/common/LottiePlayer'));

export default function OurCompanyDivider(){
    return (
        <>
            <LottiePlayer
                className='relative top-0 w-full hidden xs:flex sm:flex md:flex lg:flex xl:flex 2xl:flex'
                loop
                autoplay
                src='/lotties/marqueeDesktop.lottie'
            />
            <LottiePlayer
                className='relative top-0 w-full block xs:hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden'
                loop
                autoplay
                src='/lotties/marqueeMobile.lottie'
            />
        </>
    )
}