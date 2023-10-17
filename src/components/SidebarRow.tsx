'use client'

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { DocumentData } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import Spinner from "react-spinkit"
// NOTE: Had to to NPM I -D @types/react-spinkit in order to the NPM to work

type Props = {
  doc: DocumentData,
  modal?: boolean,
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
};

const SidebarRow = ({doc, modal, setOpenMenu}:Props) => {

  const router = useRouter();
  const {id} = useParams();

  const handleClick = () =>{
    if(modal){
      setOpenMenu(false);
      router.push(`/search/${doc.id}`);
    }else{
      router.push(`/search/${doc.id}`);
    }
  }

  const [active, setActive] = useState(false);
  useEffect(() => {
    if(!id) return;
    setActive(id === (doc.id));
  }, [id]);


  return ( 
    <li onClick={handleClick} className={`flex items-center justify-between cursor-pointer rounded-lg transition-shadow duration-100 hover:shadow-md bg-white  ${active && "shadow-md"}`}>
      <div className="flex items-center flex-col justify-center w-full min-h-[50px] md:pl-3 py-4">
        <p className="text-xs md:text-sm font-LVRegular tracking-wider">
          {doc.data().search.trim().slice(0, 1).toUpperCase() + doc.data().search.trim().slice(1, doc.data().search.trim().length)}
        </p>
        {/* {doc.data().status == "pending" && (
          <p className="text-xs font-LVWeb tracking-wider text-gray-500">Scraping Information...</p>
        )} */}
      </div>

      <span className={`md:px-2 ${modal && "pr-2"}`}>
        {doc.data().status === "pending" ? (
          <Spinner name="cube-grid" fadeIn="none" color="#FA8072" style={{width: "19px", height:"19px"}}/>
        ):(
          <CheckCircleIcon className="h-5 w-5 text-green-600"/>
        )}
      </span>
    </li>
   );
}
 
export default SidebarRow;