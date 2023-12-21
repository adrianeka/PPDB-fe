import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import './style/custom.css';
import {Link} from 'react-router-dom';
import { AppBar, Button, Card, CardActions, CardContent, CardMedia, colors, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Navigation from './Navigation';
import http from '../http-common' // import axios dengan header authorization
import { useForm } from "react-hook-form";
import CancelIcon from '@mui/icons-material/Cancel';

// ingridients

function DaftarResep () {

    // Mengambil token dari local storage
    const accessToken = localStorage.getItem("token");
    console.log(accessToken);

    // Get category & Level dari database
    const [category, setCategory] = useState(null);
    const [level, setLevel] = useState(null);

    // Input
    const [levels, setLevels] = useState({levelId: ''});
    const [categories, setCategories] = useState({categoryId: ''});

    // Mengambil data dari text field
    const [recipeName, setRecipeName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [time, setTime] = useState('')
    
    // ingridients
    // const [recipeIngridients, setRecipeIngridients] = useState([{ingridients : {ingridientQuantity : '2', ingridientMeasurement : 'gram', ingridientName : 'Tepung'}}]);
    // const [recipeIngridients, setRecipeIngridients] = useState([{id : 0, ingridientQuantity : '2', ingridientMeasurement : 'gram', ingridientName : 'Tepung'}]);

    const [recipeIngridients, setRecipeIngridients] = useState([addRecipeIngridients])
    const [addRecipeIngridients, setAddRecipeIngridients] = useState({
        ingridientQuantity : 'a',
        ingridientMeasurement : 'b',
        ingridientName : 'c'
    })
    const handleUpdateRecipeIngridients = (e) => {
        e.preventDefault();
        setRecipeIngridients([...recipeIngridients, addRecipeIngridients]);
        setAddRecipeIngridients({
            ingridientQuantity : '',
            ingridientMeasurement : '',
            ingridientName : ''
        })
    }

    React.useEffect(() => {
        http.get('/recipe/read-categories')
        .then((response) => {
            setCategory(response.data);
            console.log(response.data);
        })
        .then((res) => {
            console.log(res);
        });
    }, []);

    React.useEffect(() => {
        http.get('/recipe/read-levels')
        .then((response) => {
            setLevel(response.data);
            console.log(response.data);
        })
        .then((res) => {
            console.log(res);
        });
    }, []);
    
    if (!category) return null;
    if (!level) return null;
    
    const levelChange = (event) => {
        setLevels({levelId: event.target.value});
    };

    const CategoryChange = (event) => {
        setCategories({categoryId: event.target.value});
    };

    return (
        <div>
            <Navigation/>
            <Container>
                <Typography variant='h4' marginTop={8}>
                    Buat Resep Masakan Baru
                </Typography>
                <form>
                    <Grid container rowSpacing={2} columnSpacing={{md: 12 }} justifyContent="center" paddingTop={7} marginBottom={7}>
                        <Grid item sm={6}>
                            <TextField id="recipeName" placeholder='Nama Resep Masakan' label='Nama Resep Masakan' type="text" size="small" fullWidth sx={{background: 'white' }} onChange={(e) => setRecipeName(e.target.value)} />
                        </Grid>
                        <Grid item sm={6}>
                            {/* <TextField id="recipeCategory" placeholder='Kategori Masakan' label='Kategori Masakan' type="text" size="small" fullWidth sx={{background: 'white' }} /> */}
                            <FormControl fullWidth size="small" sx={{background: 'white' }}>
                                <InputLabel id="demo-simple-select-label">Kategori Masakan</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={categories.categoryId}
                                    label="Kategori Masakan"
                                    onChange={CategoryChange}>
                                {category.data.map(ctgr =>(    
                                    <MenuItem value={ctgr.categoryId}>{ctgr.categoryName}</MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <TextField id="imageUrl" placeholder='Gambar Masakan' label='URL Gambar Masakan' type="text" size="small" fullWidth sx={{background: 'white' }} onChange={(e) => setImageUrl(e.target.value)} />
                        </Grid>
                        <Grid item sm={6}>
                            <Grid container spacing={4}>
                                <Grid item sm={6}>
                                    <TextField id="time" placeholder='Waktu Masak' label='Waktu Masak' type="text" size="small" fullWidth sx={{background: 'white' }} onChange={(e) => setTime(e.target.value)}/>
                                </Grid>
                                <Grid item sm={6}>
                                    <FormControl fullWidth size="small" sx={{background: 'white' }}>
                                        <InputLabel id="demo-simple-select-label">Tingkat Kesulitan</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={levels.levelId}
                                            label="Tingkat Kesulitan"
                                            onChange={levelChange}
                                            >
                                        {level.data.map(lev =>(    
                                            <MenuItem value={lev.levelId}>{lev.levelName}</MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={6}>
                        {
                            recipeIngridients.map(ingridient => (
                            <Grid container spacing={2} key={ingridient.id}>
                                {/* <Grid item sm={3}>
                                   <TextField id="recipeName" placeholder='Jumlah' label='Jumlah' type="text" size="small" fullWidth sx={{background: 'white' }} />
                                </Grid>
                                <Grid item sm={3}>
                                   <TextField id="recipeName" placeholder='Satuan' label='Satuan' type="text" size="small" fullWidth sx={{background: 'white' }} />
                                </Grid>
                                <Grid item sm={5}>
                                   <TextField id="recipeName" placeholder='Nama Bahan Masakan' label='Nama Bahan Masakan' type="text" size="small" fullWidth sx={{background: 'white' }} />
                                </Grid>
                                <Grid item sm={1}>
                                    <IconButton>
                                        <CancelIcon/>
                                    </IconButton>
                                </Grid> */}

                                <Grid item sm={3}>
                                   <TextField id="recipeName" placeholder='Jumlah' label='Jumlah' type="text" size="small" fullWidth sx={{background: 'white' }} onChange={(e) => setAddRecipeIngridients(...recipeIngridients, {ingridientQuantity : e.target.value})}/>
                                </Grid>
                                <Grid item sm={3}>
                                   <TextField id="recipeName" placeholder='Satuan' label='Satuan' type="text" size="small" fullWidth sx={{background: 'white' }}/>
                                </Grid>
                                <Grid item sm={5}>
                                   <TextField id="recipeName" placeholder='Nama Bahan Masakan' label='Nama Bahan Masakan' type="text" size="small" fullWidth sx={{background: 'white' }} />
                                </Grid>
                                <Grid item sm={1}>
                                    <IconButton>
                                        <CancelIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                            ))
                        }
                        </Grid>
                        <Grid item sm={6}>
                            {/* <TextField id="recipeName" placeholder='Nama Resep Masakan' label='Nama Resep Masakan' type="text" size="small" fullWidth sx={{background: 'white' }} /> */}
                            <Button onClick={handleUpdateRecipeIngridients}>
                                Add list
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Typography align='left'>
                    <pre>
                        {JSON.stringify({levels, categories, recipeName, imageUrl, time, recipeIngridients}, null, " ")}
                    </pre>
                </Typography>
                <div></div>
            </Container>
        </div>
    )
}

export default DaftarResep