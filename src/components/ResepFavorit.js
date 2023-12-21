import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import './style/custom.css';
import {Link} from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, colors, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Navigation from './Navigation';
import AddIcon from '@mui/icons-material/Add';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import nasgor from '../assets/nasgor.jpg'
import axios from 'axios';
import Favorite from './Favorite';

function DaftarResep () {

    // Mengambil token dari local storage
    const accessToken = localStorage.getItem("token");
    console.log(accessToken);

    
    const authAxios = axios.create({
        baseURL: "http://localhost:8080/api",
        headers: {
          Authorization : `Bearer ${accessToken}`
        }
      });

    const [post, setPost] = useState(null);

    React.useEffect(() => {
        authAxios.get('/recipe/user-favorites')
        .then((response) => {
          setPost(response.data);
          console.log(response.data);
        })
        .then((res) => {
            console.log(res);
        });
      }, []);
    
    if (!post) return null;

    return (
        <div>
            <Navigation/>
            <Container>
                <Grid container spacing={4} direction="column" justifyContent="center" alignItems="center" paddingTop={7}>
                    <Grid item>
                        <Grid container spacing={4} direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Link to={'/tambah-resep'}>
                                    <Button variant="contained" startIcon={<AddIcon/>}>Tambah Resep</Button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <TextField id="filled-basic" placeholder='Cari Resep' type="search" size="small" sx={{width: '500px', background: 'white' }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                              <SearchIcon />
                                            </InputAdornment>
                                          )
                                    }}/>
                            </Grid>
                            <Grid item>
                                <Typography>BARIS FILTER</Typography>
                            </Grid>
                        </Grid>                        
                    </Grid>
                    <Grid item>
                        <Typography variant="h4">Daftar Resep Masakan</Typography>
                    </Grid>                    
                    <Grid item>
                        <Grid container spacing={6} direction="row" justifyContent="flex-start" alignItems="flex-start" marginBottom={10}>
                            {post.data.map(recipes => (
                                <Grid item key={recipes.recipeId}>
                                <Card sx={{ width: 250 }}>
                                <CardMedia
                                    sx={{ height: 120 }}
                                    image={recipes.imageUrl}
                                    title={nasgor}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary" textAlign={'left'}>
                                    {recipes.categories.categoryName}
                                    </Typography>
                                    <Typography gutterBottom variant="body1" component="div" textAlign={'left'}>
                                    {recipes.recipeName}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                <Grid container direction="column" marginBottom={1}>
                                    <Grid  container direction="row" justifyContent="space-between" alignItems="center" sx={{color: 'black'}}>
                                        <Grid item>
                                        <IconButton aria-label="add to favorites" disabled>
                                            <AccessTimeIcon sx={{color: '#01BFBF'}}/> <Typography variant='body2' sx={{color: '#01BFBF'}}>&nbsp;{recipes.time} menit</Typography>
                                        </IconButton>                                            
                                        </Grid>
                                        <Grid item>
                                            <Favorite recipeId={recipes.recipeId}/>
                                        </Grid>
                                    </Grid>
                                    <Grid  container direction="row" justifyContent="space-between" alignItems="center" sx={{color: 'black'}}>
                                        <Grid item>
                                            <Link className='recipe' to={'detail-resep/'+recipes.recipeId}>
                                                <Typography variant='body2'>
                                                    Lihat detail Resep
                                                </Typography>
                                            </Link>                                         
                                        </Grid>
                                        <Grid item>
                                            <Link className='recipe' to={'edit-resep/'+recipes.recipeId}>
                                                    <Typography variant='body2'>
                                                        Edit Resep
                                                    </Typography>
                                                </Link>  
                                        </Grid>
                                    </Grid>                                
                                </Grid> 
                                </CardActions>
                                </Card>
                                </Grid>
                            ))
                            }
                        </Grid>                        
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default DaftarResep