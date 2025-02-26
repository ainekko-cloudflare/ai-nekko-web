'use client'

import Image from 'next/image'

import CatAnimText1 from './catAnimText1';
import CatAnimText2 from './catAnimText2';
import CatAnimText3 from './catAnimText3';
import ComeBuildWithUs from './comeBuildWithUs';
import IMGCatAnim from '@/public/imgs/hero/catAnim.webp'
import IMGCatAnimLight from '@/public/imgs/hero/catAnimLight.webp'

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function CatAnim() {
    const scrollerContainerRef = useRef<HTMLDivElement | null>(null);
    const animContainerRef = useRef(null);
    
    const percentParagraphRef = useRef(null);
    const [percent, setpercent] = useState(0);

    const imgDarkCatRef = useRef(null);
    const imgLightCatRef = useRef(null);

    const [firstAnimComplete, setFirstAnimComplete] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({onComplete: () => {setFirstAnimComplete(true)}});
        const mm = gsap.matchMedia();

        // Remove scroll from main container
        tl.set(scrollerContainerRef.current, {overflowY: 'hidden'})

        // Short pause
        tl.to({}, { duration: 0.5 });
    
        // Initial FadeIn
        tl.to(animContainerRef.current,{ opacity: 1, duration: 1 });

        // Short pause
        tl.to({}, { duration: 0.5 });
    
        // Increment the number from 0 to 100
        tl.to({}, {
            duration: 1,
            onUpdate: function () {
                const progress = Math.floor(this.progress() * 100);
                setpercent(progress);

                // Fill the cat with a darker color
                gsap.to(imgDarkCatRef.current, {
                    clipPath: `inset(${100 - progress}% 0% 0% 0%)`,
                    duration: 0,
                });
            },
        }, '<');

        // Hide light cat image
        tl.set(imgLightCatRef.current, { display: 'none' })
    
        // Fading out of the percent number and enlarging the cat image
        // (with responsive)
        tl.to(percentParagraphRef.current, { opacity: 0, duration: 0.35, onComplete: () => {
            tl.set(percentParagraphRef.current, { display: 'none' })
        } }, '+=0.4');

        mm.add('(max-width: 430px)', () => { // xs
            tl.to(animContainerRef.current, { width: '55.8rem', height: '50.2rem', duration: 0.75, ease: 'power2.out' });
        })
        mm.add('(min-width: 431px) and (max-width: 639px)', () => { // xs
            tl.to(animContainerRef.current, { width: '55.8rem', height: '50.2rem', duration: 0.75, ease: 'power2.out' });
        })
        mm.add('(min-width: 640px) and (max-width: 767px)', () => { // sm
            tl.to(animContainerRef.current, { width: '66.2rem', height: '59.6rem', duration: 0.75, ease: 'power2.out' });
        })
        mm.add('(min-width: 768px) and (max-width: 1023px)', () => { // md
            tl.to(animContainerRef.current, { width: '66.2rem', height: '59.6rem', duration: 0.75, ease: 'power2.out' });
        })
        mm.add('(min-width: 1024px) and (max-width: 1279px)', () => { // lg
            tl.to(animContainerRef.current, { width: '66.2rem', height: '59.6rem', duration: 0.75, ease: 'power2.out' });
        })
        mm.add('(min-width: 1280px) and (max-width: 1535px)', () => { // xl
            tl.to(animContainerRef.current, { width: '66.2rem', height: '59.6rem', duration: 0.75, ease: 'power2.out' });
        })
        mm.add('(min-width: 1536px)', () => { // 2xl
            tl.to(animContainerRef.current, { width: '66.2rem', height: '59.6rem', duration: 0.75, ease: 'power2.out' });
        })

        // Enable scroll for main container
        tl.set(scrollerContainerRef.current, {overflowY: 'scroll'})
    });

    useGSAP(() => {
        if(firstAnimComplete){
            if (!scrollerContainerRef.current) return;
        
            // Recalculate the markers for the scroll triggers based on scrollerContainerRef
            ScrollTrigger.scrollerProxy(scrollerContainerRef.current, {
                scrollTop(value) {
                    return arguments.length ? scrollerContainerRef.current?.scrollTo({ top: value, behavior: "smooth" }) : scrollerContainerRef.current?.scrollTop;
                },
                getBoundingClientRect() {
                    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
                }
            });
        }
    }, [firstAnimComplete])
    
    return (
        <div className='relative w-full h-screen overflow-hidden'>
            <div className='absolute w-full h-full flex justify-center items-center'>
                <div ref={animContainerRef} className='absolute flex opacity-0 
                    w-[5.6rem] md:w-[7.5rem] lg:w-[7.5rem] xl:w-[7.5rem] 2xl:w-[7.5rem] 
                    h-[5.1rem] md:h-[6.9rem] lg:h-[6.9rem] xl:h-[6.9rem] 2xl:h-[6.9rem] 
                '>
                    <Image ref={imgLightCatRef} className='absolute top-0 left-0' width={662} height={597} src={IMGCatAnimLight.src} alt='Cat Animation Light Color' />
                    <Image ref={imgDarkCatRef} className='absolute top-0 left-0 w-full h-full' style={{clipPath: 'inset(100% 0% 0% 0%)'}} width={662} height={597} src={IMGCatAnim.src} alt='Cat Animation Dark Color' />
                    <div className='relative left-1/2 transform -translate-x-1/2 font-dharma-gothic-e flex font-black justify-center items-center
                    -bottom-[7rem] md:-bottom-[11.5rem] lg:-bottom-[11.5rem] xl:-bottom-[11.5rem] 2xl:-bottom-[11.5rem] 
                    '>
                        <p ref={percentParagraphRef} className='
                            text-[6.4rem] md:text-[12.8rem] lg:text-[12.8rem] xl:text-[12.8rem] 2xl:text-[12.8rem]
                            leading-[4.7rem] md:leading-[9.4rem] lg:leading-[9.4rem] xl:leading-[9.4rem] 2xl:leading-[9.4rem]
                        '>
                            {percent}%
                        </p>
                    </div>
                </div>
            </div>
            <div ref={scrollerContainerRef} className='scroller-container relative w-full h-full snap-y snap-mandatory'>
                <div className='trigger-1 w-full h-full flex flex-col justify-center items-center snap-center'>
                    <CatAnimText1 className='!fixed top-0 pointer-events-none' firstAnimComplete={firstAnimComplete} scrollerContainerRef={scrollerContainerRef} />
                </div>
                <div className='trigger-2 w-full h-full flex flex-col justify-center items-center snap-center'>
                    <CatAnimText2 className='!fixed top-0 pointer-events-none' firstAnimComplete={firstAnimComplete} scrollerContainerRef={scrollerContainerRef} />
                </div>
                <div className='trigger-3 w-full h-full flex flex-col justify-center items-center snap-center'>
                    <CatAnimText3 className='!fixed top-0 pointer-events-none' firstAnimComplete={firstAnimComplete} scrollerContainerRef={scrollerContainerRef} animContainerRef={animContainerRef} />
                </div>
                <div className='trigger-4 w-full h-full flex flex-col justify-center items-center snap-center'>
                    <ComeBuildWithUs className='!fixed top-0 pointer-events-none' firstAnimComplete={firstAnimComplete} scrollerContainerRef={scrollerContainerRef} />
                </div>
            </div>
        </div>
    )
}