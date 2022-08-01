

import internal from "stream";
import type { NextApiResponse } from "next";

type RespNext = NextApiResponse;

export const respJson=(msg:string,status:number,res:RespNext)=>{
  res.status(status).json({
   'msg':msg
  })
}