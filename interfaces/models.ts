export interface IUser {
    id      : string;
    nombre     : string;
    apellido     : string;
    correo    : string;
    password?: string;
    rol?    : string;
    estado?:boolean;
    creado ?  :string;
    direccion?:string;
    carrito?:string[]
}
export interface IProducto{
    _id:string,
    nombre:string,
    cantidad:number,
    precio:number,
    img?:string,
    vendedor:string,
    marca:string,
    tags:tags,
    slug:string,
    descripcion:string,
}
type tags=
    |"electronica"
    |"ropa"
    |"alimentos"
