'use client'

import ParticlesComponent from '@/components/Particles'
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Cog8ToothIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';
import Spinner from "react-spinkit";

export default function Home() {

  const searchParams = useSearchParams();
  const loading = searchParams.get("loading");


  return (
    <div className='relative flex flex-col items-center justify-center'>
      {
        loading ? (
          <div className='flex items-center justify-center mt-28'>
            <Spinner name="circle" color="#FA8072" style={{width: "40px", height:"40px"}}/>
          </div>
        ):(
          <div className='flex flex-col items-center justify-center'>
            <Cog8ToothIcon className='h-[8rem] w-[8rem] animate-[spin_4s_ease-in-out_infinite] text-rose-400 pt-5 mt-9 mb-3'/>
            <h1 className='font-Futura text-xl'>
              Welcome to the MGF Scraper
            </h1>
            <div className='font-LVWeb tracking-wider text-sm space-y-2 mt-4 px-10'>
              <p>
                Welcome to <span className='font-sans text-xs font-semibold'>MyScrap</span> - Your Ultimate Amazon Web Scraping Hub!
              </p>
              <p>
                {"Whether you're a data enthusiast, a business owner, or a curious explorer, our web scraping tools and services are here to empower you."}
              </p>
              <p>
                {"Start scraping and unlocking the true potential of the web today. It's time to turn data into insights, and insights into success. Happy scraping!"}
              </p>
            </div>
          </div>
        )
      }
    </div>
  )
}
