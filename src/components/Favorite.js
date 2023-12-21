import { Alert, IconButton, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import http from '../http-common' // import axios dengan header authorization

function Favorite (props) {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
      setOpen(true);
    };
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  

    // Mengambil Id resep
    const recipeId = props.recipeId

    const [post, setPost] = useState();
    const [newPost, setNewPost] = useState();
    const [data, setData] = useState();

    // Get User Favorite
    useEffect(() => {
        http.get('/recipe/user-favorites')
        .then((response) => {
          setPost(response.data);
          console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
      }, []);
    
    if (!post) return null;

    // Toogle Favorite
    const toogleFavorite = (recipeId) => {
        http.get(`/recipe/toggle-favorite/${recipeId}`)
        .then((response) => {
            setNewPost(response.data);
            console.log(response);
        })
        .catch((err) => console.log(err))

        handleClick()
        // Sebisa mungkin toogle nya otomatis berubah saat click
        window.location.reload(true)
    }

    let icon1 = false
    let icon2 = false

    return (
        <div>
            <IconButton aria-label="add to favorites" sx={{color: 'black'}} onClick={() => toogleFavorite(recipeId)}>
                {post.data.map(favoriteRecipe => {
                    if (favoriteRecipe.recipeId === recipeId) {
                        icon1 = true
                    }else {
                        if (icon1 === false) {
                            icon2 = true
                        }else{
                            icon2 = false
                        }
                    }
                })}
                {icon1? <StarIcon sx={{color: '#01BFBF'}}/> : <StarOutlineIcon sx={{color: '#01BFBF'}}/>} <Typography sx={{color: '#01BFBF'}} variant='body2'>&nbsp;Favorite</Typography>
                
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                    </Alert>
                </Snackbar>
            </IconButton>
        </div>
    )
}

export default Favorite