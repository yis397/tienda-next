
import type { NextApiRequest,NextApiResponse } from 'next';
import { db } from '../../../services/db';
import Producto from '../../../models/Producto';
import { jwst } from '../../../helpers';
import { respJson } from '../../../helpers/respJson';
import { IProducto } from '../../../interfaces/models';




export default function handler(req:NextApiRequest,resp:NextApiResponse) {
    console.log(req.method);
  switch (req.method) {
    case 'POST':
        
        return addProduct(req,resp);
    case 'GET':
        
        return getProductos(resp);
    default:
        return resp.status(400).json({
            message: 'Bad request'
        })
  }
}


const getProductos=async(resp:NextApiResponse)=>{
    
    await db.connect()
    const products=await Producto.find().select('nombre descripcion precio marca tags slug -_id').lean();
    await db.disconnect()
    return resp.status(200).json({
        data:products,
        msg:'ok'
    })
}
const addProduct=async(req:NextApiRequest,resp:NextApiResponse)=>{
    let vendedor:string;
    const {token}=req.headers??req.cookies;
    const {nombre,cantidad,precio,marca,descripcion,tags}=req.body as IProducto

    try {
        
        vendedor=await jwst.isValidToken(token as string);
        
    } catch (error) {
        return respJson('Error en validacion',401,resp)
    }
    db.connect()
    try {
        
        const newProduct=new Producto({vendedor,nombre,cantidad,precio,marca,descripcion,slug:nombre+'_'+marca,tags})
        newProduct.save()
    } catch (error) {
        return respJson('Error en Implementacion',401,resp)
    }
    db.disconnect()
    return resp.status(200).json({
        msg:'ok'
    })

}