'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

const Header = () => {

  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const handleSearch = async(e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log("input");
    router.replace('http://localhost:3000?loading=true');
    
    const input = inputRef.current?.value;
    if(!input) return;
    if(input && input === "") return;

    try{
      // TODO: Change endpoint to the VERCEL URL
      // Call API to activate Scraper
      const response = await fetch("https://webscrapper-ten.vercel.app/api/activateScraper", {
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body: JSON.stringify({search: input})
      });

      const data = await response.json();
      if(!data.collection_id){
        throw new Error(data);
      };

      const { collection_id, start_eta } = data;
      router.push(`/search/${collection_id}`);

    }catch(error){
      // Handle Errors
      console.log(error);
      
    }

    // Wait for response to come back

  };

  return ( 
    <div>
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center py-2 px-4 max-w-md mx-auto rounded-full bg-gray-100 space-x-2"
      >
        <input 
          type="text" 
          placeholder="Search..." 
          ref={inputRef}
          className="font-LVRegular flex-1 outline-none bg-transparent text-sm tracking-wide placeholder:font-LVRegular placeholder:text-sm placeholder:tracking-wide"
        />
        <button ref={btnRef} className="invisible hidden" type="submit">Search</button>
        <MagnifyingGlassIcon className="h-6 w-6 text-indigo-300 cursor-pointer" onClick={()=> btnRef.current?.click()}/>
      </form>
    </div>
   );
}
 
export default Header;