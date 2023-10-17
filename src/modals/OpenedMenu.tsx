'use client'

import { Dispatch, SetStateAction } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { collection, orderBy, query } from "firebase/firestore";
import SidebarRow from "@/components/SidebarRow";
import { ArrowLeftIcon, ChevronLeftIcon, DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";


type Props = {
  openMenu: boolean,
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
};

const OpenedMenu = ({openMenu, setOpenMenu}:Props) => {

  const [snapshot, loading, error] = useCollection(
    query(collection(db, "searches"), orderBy("start_eta", "desc"))
  );
  
  const router = useRouter();

  return ( 
    <article 
    className={`${openMenu ? "left-0" : "-left-[200vw]"}
    fixed top-0 flex items-center justify-start w-fit sm:w-fit z-50 max-h-screen h-screen transition-all duration-700`}>
      <div
        className="bg-[#f7f7f7] w-[13rem] sm:max-w-sm sm:w-[20rem] py-6 pt-9 relative h-full overflow-hidden flex flex-col"
      >
        <div className="absolute top-2 left-0 p-2 cursor-pointer" onClick={()=> setOpenMenu(false)}>
          <ChevronLeftIcon className="h-4 w-4"/>
        </div>
        <div className="flex flex-col items-center justify-center mb-10 md:p-10">
        <DocumentMagnifyingGlassIcon onClick={()=> router.push("/")} className='h-20 w-20 bg-gradient-to-br from-rose-500 to-orange-300 rounded-md text-white p-2 cursor-pointer'/>
          <h1 className="text-center text-lg mt-2 font-LVRegular mb-2">
            MyScraper
          </h1>
          <h2 className="text-center text-xs font-LVWeb">
            Scraping the Unscrapable!
          </h2>
        </div>

        <div className="overflow-y-auto no-scrollbar">
          <ul className="flex flex-col gap-2 py-2 px-5">
            {snapshot?.docs.map((doc)=> (
              <SidebarRow key={doc.id} doc={doc} modal={true} setOpenMenu={setOpenMenu}/>
            ))}
          </ul>
        </div>
      </div>
    </article>
   );
}
 
export default OpenedMenu;