'use client'

import OpenedMenu from "@/modals/OpenedMenu";
import { Bars4Icon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Menu = () => {

  const [openMenu, setOpenMenu] = useState(false);

  return ( 
    <div>
      <OpenedMenu openMenu={openMenu} setOpenMenu={setOpenMenu}/>

      <div className='bg-gradient-to-br from-rose-500 to-orange-300 h-fit p-1 rounded-full cursor-pointer hover:opacity-90 transition-opacity duration-300'>
        <Bars4Icon className='h-6 w-6 text-white' onClick={()=> setOpenMenu(true)}/>
      </div>
    </div>
   );
}
 
export default Menu;