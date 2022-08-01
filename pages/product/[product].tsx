import React,{useEffect} from 'react'
import { GetServerSideProps, GetStaticPaths, GetStaticProps,NextPage } from 'next';
import HomeLayout from '../../components/layout/HomeLayout'
import { Product } from '../../components/productos';
import { dbProduct } from '../../services/db';
import { IProducto } from '../../interfaces';


interface Props {
  product: IProducto
}

const ProductPage:NextPage<Props>=({product})=>{

  
  
  return (
    <HomeLayout titulo={'asd'} descripcion={'asd'} >
    <Product product={product}/>
    </HomeLayout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const productSlugs = await dbProduct.getSlugsProducts();
  console.log(productSlugs)
  return {
    paths: productSlugs.map( ({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  console.log(params)
  const { slug = '' } = params as { slug: string };
  const product = await dbProduct.getProductBySlug( slug );

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage


