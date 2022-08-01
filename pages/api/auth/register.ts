import { responsiveFontSizes } from "@mui/material";
import type { NextApiRequest,NextApiResponse } from "next";
import bcrypt from 'bcryptjs';
import { jwst, respJson, validate } from "../../../helpers";
import Usuario from "../../../models/Usuario";
import { db } from "../../../services/db";
import { isEmail } from '../../../helpers/validations';


export default function handler(req: NextApiRequest,res: NextApiResponse) 
  {
    console.log(req.method);
    switch (req.method) {
      case 'POST':
        
        return addUser(req,res)
    
      default:
        return respJson('error en metodo',400,res)
    }
  }

const addUser=async(req: NextApiRequest,res: NextApiResponse)=>{
  const {email,password,name,apellido}=req.body;
  if (password<6) return respJson('error en contraseña',400,res);
  if ( !validate.isValidEmail( email ) ) return respJson('error en email',400,res);

  await db.connect();
  const newUser=new Usuario({
    nombre:name,
    apellido:apellido,
    correo:(email as String).toLocaleLowerCase(),
    password:bcrypt.hashSync(password),
    rol:'user'
  })
  newUser.save({ validateBeforeSave: true });
  await db.disconnect();
  const { _id, rol } = newUser;
  const token = jwst.signToken( _id.toString(), email );
  return res.status(200).json({
    msg:'ok',
    token,
    user:{
      nombre:newUser.nombre,
      rol:newUser.rol,
    }
  })
}


  