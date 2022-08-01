import { db } from "."
import Producto from '../../models/Producto';

export const getSlugsProducts=async()=>{
   db.connect();
   const slugs=await Producto.find().select('slug -_id').lean()
   db.disconnect();
   return slugs
}
export const getProductBySlug=async(slug:string)=>{
    db.connect();
    const product=await Producto.findOne({slug})
    db.disconnect();
    return product
 }