import { TextField } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import HomeLayout from '../components/layout'
import { ProductList } from '../components/productos'
import { Loading, Swiper } from '../components/ui'
import styles from '../styles/Home.module.css'
import { useProducts } from '../hooks/useProducts';
import useSWR, { SWRConfiguration } from 'swr'
const Home: NextPage = () => {
   const{data,loading}=useProducts('/products')
   console.log(data)
  return (
    <HomeLayout titulo='Tienda-Home' descripcion='una pagina para comprar muchas cosas'>

       {loading? <Loading/>:
       <>
      <Swiper/>
      <ProductList product={data.data}/>
       </>
      }

    </HomeLayout>
  )
}

export default Home
