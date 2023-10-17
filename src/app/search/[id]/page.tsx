'use client'
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../../../firebase";
import { doc } from "firebase/firestore";
import Results from "@/components/Results";
import Spinner from "react-spinkit"


type Props = {
  params:{
    id: string
  }
}

const SearchPage = ({params: {id}}:Props) => {

  const [snapshot, loading, error] = useDocument(doc(db, 'searches', id));

  // if(loading){
  //   return (
  //     <h1 className="font-LVRegular animate-pulse text-sm tracking-wider p-10">
  //       Scraping results from Amazon...
  //     </h1>
  //   )
  // };

  if(!snapshot?.exists()) return;
  if(snapshot?.data().status === "pending" || loading){
    return (
      <div className="flex flex-col gap-y-5 py-10 px-5 items-center justify-center">
        <Spinner name="pacman" color="#FA8072"/>
        <p className="animate-pulse font-LVRegular text-sm tracking-wider text-gray-400">
          Scraping Amazon...
        </p>
        <p className="font-LVRegular text-xs text-center tracking-wider text-gray-400 leading-6">
         {"We are scraping Amazon Website looking for your item, this can take up to 5 minutes, please be patient with us! :)"}
        </p>
      </div>
    )
  }

  return ( 
    <div>
      
      {/* Results Found */}
      <div className="my-7">
        <h1 className="font-bold font-Futura text-xs">
          Search results for&nbsp;
          <span className="text-pink-700">{`"${snapshot.data()?.search}"`}</span>
        </h1>
        <p className="font-LVRegular text-gray-500 text-xs tracking-wide">
          {
            snapshot.data()?.results?.length > 0 &&
            `${snapshot.data().results.length} results found`
          }
        </p>
      </div>

      {
        snapshot.data().results.length > 0 && (
          <Results results={snapshot.data().results}/>
        )
      }
      {
        snapshot.data().results.length === 0 && (
          <div>
            <p className="font-LVRegular">{"We couldn't find any items :("}</p>
          </div>
        )
      }

    </div>
   );
}
 
export default SearchPage;