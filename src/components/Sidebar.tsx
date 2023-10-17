'use client'

import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { collection, orderBy, query } from "firebase/firestore";
import SidebarRow from "./SidebarRow";
import { useState } from "react";
import { useRouter } from "next/navigation";

// TODO: Put background with grey images in the side bar and put particles in the bigger welcome screen
const Sidebar = () => {

  const [dummyState, setDummyState] = useState(false);

  const [snapshot, loading, error] = useCollection(
    query(collection(db, "searches"), orderBy("start_eta", "desc"))
  );
  
  const router = useRouter();

  return ( 
    <div className="p-2 py-6 bg-[#f7f7f7] flex flex-col max-h-screen h-screen overflow-hidden border-b-2">
      
      <div className="flex flex-col items-center justify-center mb-6 md:p-10">
        <DocumentMagnifyingGlassIcon onClick={()=> router.push("/")} className='h-20 w-20 bg-gradient-to-br from-rose-500 to-orange-300 rounded-md text-white p-2 cursor-pointer'/>
        <h1 className="hidden md:inline text-center text-2xl mt-2 font-LVRegular mb-2">
          MyScraper
        </h1>
        <h2 className="hidden md:inline text-center text-xs font-LVWeb">
          Scraping the Unscrapable!
        </h2>
      </div>


      <div className="overflow-y-auto no-scrollbar">
        <ul className="flex flex-col gap-2 py-2 px-5">
          {snapshot?.docs.map((doc)=> (
            <SidebarRow key={doc.id} doc={doc} setOpenMenu={setDummyState}/>
          ))}
        </ul>  
      </div>

    </div>
   );
}
 
export default Sidebar;