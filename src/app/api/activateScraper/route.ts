import { NextResponse } from "next/server";
import { adminDb } from "../../../../firebaseAdmin";
import * as admin from "firebase-admin";

export async function POST(request:Request){

  try{
      const body = await request.json();
      const { search } = body;
    
      
      const response = await fetch("https://api.brightdata.com/dca/trigger?collector=c_lnrxgsnkg2iaixyp7&queue_next=1", {
        method:"POST",
        headers:{
          Authorization:`Bearer ${process.env.BRIGHTDATA_KEY}`,
          "Content-Type":"application/json"
        },
        body: JSON.stringify({search})
      });
    
      const data = await response.json();
      console.log("DATA IS >>>", data);
    
    
      const { collection_id, start_eta } = data;
      
      await adminDb.collection("searches").doc(collection_id).set({
        status:"pending",
        search,
        start_eta,
        updatedAt: start_eta
      })
    
      return NextResponse.json({collection_id, start_eta}, {status: 200});

  }catch(error: any){
    console.log("ERROR IS >>>", error);
    return NextResponse.json({error: error.message}, {status: 500})
    
  }
}