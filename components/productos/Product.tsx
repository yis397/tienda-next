import React from 'react'
import { Box, Button, Card, CardContent, CardMedia, Typography,IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Disponible } from '../ui';
import { IProducto } from '../../interfaces';
export const Product=({product}:{product:IProducto})=> {
  return (
    <Box sx={{with:"100vw",height:"90vh",paddingTop:15,position:"relative"}}>
    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ ml: 5 }}>
      <ArrowBackIcon />
    </IconButton>
    <Card sx={{ display: 'flex' }}>
      <CardMedia
          component="img"
          sx={{ width: 500,ml:"15%" }}
          image="https://compass-ssl.xbox.com/assets/b0/d1/b0d1a50f-1d0c-4e39-9fe7-158dd64dd0bd.png?n=XBX-CMP-L-Console_Large-T_02.png"
          alt="xbox"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h3">
              {product.nombre}
            </Typography>
            <Typography variant="h4" color="text.secondary" component="div">
              {product.marca}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              ${product.precio}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              {product.descripcion}
             </Typography>
            <Typography variant="subtitle2" color="text.secondary" component="div" sx={{marginTop:1}}>
              Disponibles:  {product.cantidad}
            </Typography>
            <Disponible/>
            <Button variant="contained"  size="large" sx={{fontSize:10,backgroundColor:"coral",height:50}}><h3>Comprar</h3></Button>
          </CardContent>
        </Box >
        
      </Card>

    </Box>
  )
}

