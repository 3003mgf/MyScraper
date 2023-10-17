/* eslint-disable @next/next/no-img-element */
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { Rating } from "@mui/material";
import Link from "next/link";

type Props = {
  results: Product[]
}

const Results = ({results}: Props) => {
 
  
  return ( 
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
      {results.map((result, index) => {

        const rating = Number(result.rating?.split("out")[0]);
        // const features2 = ['Great memory with more than 120GB RAM', 'Best Seller', 'PC - Stream', 'PC - Origin', 'This item will be realeased on December 31, 2023.', 'FREE Delivery']

        return (<Link
          href={result.url}
          key={index}
          className="flex flex-col space-x-4 w-full bg-white rounded-lg shadow-md p-5"
        >

          {/* IMAGE  */}
          <img 
            src={result.image}
            alt={result.title}
            className="object-contain w-full h-40 py-5"
          />

          {/* DETAILS */}
          <div className="flex flex-col py-5 flex-1">
            
            {/* Title & Reviews */}
            <p className="font-LVRegular tracking-wide mb-3 text-sm">{result.title}</p>
            {
              rating > 0 ? (
                <div className="tracking-wide text-[9px] flex items-center justify-start w-full">
                  <Rating name="half-rating-read" defaultValue={rating} precision={0.5} size="small" readOnly />
                  <span className="ml-2">({result.reviews || "0"} reviews)</span>
                </div>
              ):(
                <div className="flex items-center justify-start w-full space-x-2">
                  <NoSymbolIcon className="h-4 w-4 text-rose-600"/>
                  <p className="tracking-wide text-[9px] text-gray-500">No reviews available</p>
                </div>
              )
            }

            {/* Price */}
            <div className="flex space-x-2 justify-end flex-1">
              <p className="text-pink-600 font-bold pt-4 text-xs mt-auto">
                {result.price > 0 ? `$${result.price}` : "N/A"}
              </p>
              
              {result.previous_price > 0 && (
                <p className="line-through font-bold text-pink-600/50 text-xs pt-2 mt-auto">
                  {`$${result.previous_price}`}
                </p>
              )}
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 justify-end mt-5">
              {result.features.map((feature, index)=>(
                feature && (
                  <div key={index} className="rounded-md bg-gradient-to-r from-pink-800 via-pink-700 to-pink-600">
                    <p
                      className="text-xs font-LVRegular tracking-wide px-2 py-1 text-white"
                    >
                      {feature}
                    </p>
                  </div>
                )
              ))}
            </div>

          </div>
        </Link>)
      })}
    </div>
   );
}
 
export default Results;