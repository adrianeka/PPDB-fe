import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import './style/custom.css';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { AppBar, Button, Card, CardActions, CardContent, CardMedia, colors, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Navigation from './Navigation';
import http from '../http-common' // import axios dengan header authorization
import { useForm } from "react-hook-form";
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { v4 as uuid } from 'uuid';

function EditResep () {
    const navigate = useNavigate();

    const unique_id = uuid();
    const small_id = unique_id.slice(0,8)
    
    // Set Resep dari database
    const [post, setPost] = useState(null);
    const { id } = useParams();

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
    const [recipeIngridients, setRecipeIngridients] = useState([{
        id : small_id,
        ingridients : {
            ingridientQuantity : '',
            ingridientMeasurement : '',
            ingridientName : ''
        }
    }]);

    const addRecipe = () => {
        setRecipeIngridients([...recipeIngridients, {
            id : small_id,
            ingridients : {
                ingridientQuantity : '',
                ingridientMeasurement : '',
                ingridientName : ''
            }
        }])
    }

    const updateIngridientsQty = index => e => {
        console.log('index: ' + index);
        console.log('property name: '+ e.target.name);
        let newArr = [...recipeIngridients]; // copying the old datas array
        // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
        newArr[index].ingridients.ingridientQuantity = e.target.value; // replace e.target.value with whatever you want to change it to

        setRecipeIngridients(newArr);
    }

    const updateIngridientsMeasurement = index => e => {
        let newArr = [...recipeIngridients]; 
        newArr[index].ingridients.ingridientMeasurement = e.target.value; 
        setRecipeIngridients(newArr);
    }

    const updateIngridientsName = index => e => {
        let newArr = [...recipeIngridients]; 
        newArr[index].ingridients.ingridientName = e.target.value; 
        setRecipeIngridients(newArr);
    }

    // How To Cooks
    const [recipeHowToCooks, setRecipeHowToCooks] = useState([{
        id : small_id,
        howToCooks : {
            position : 1,
            description : ''
        }
    }]);

    const addHowToCook = () => {
        setRecipeHowToCooks([...recipeHowToCooks, {
            id : small_id,
            howToCooks : {
                position : recipeHowToCooks.length + 1,
                description : ''
            }
        }])
    }

    const updateHowToCookDescription = index => e => {
        let newArr = [...recipeHowToCooks]; 
        newArr[index].howToCooks.description = e.target.value; 
        setRecipeHowToCooks(newArr);
    }

    const deleteHowToCook = howToCook => {
        setRecipeHowToCooks(recipeHowToCooks.filter(a => a.id !== howToCook.id));
        // updatePosition();
    }

    const sortir = () =>{
        let newArr = [...recipeHowToCooks];
        let position = 0;

        for (let index = 0; index < newArr.length; index++) {
            position = position+1
            newArr[index].howToCooks.position = position; 
            setRecipeHowToCooks(newArr);   
        }        
    }

    // Get Resep
    useEffect(() => {
        http.get(`recipe/read/${id}`)
        .then((response) => {
          setPost(response.data);
          console.log(response.data);
          setCategories(response.data.data.categories);
          setLevels(response.data.data.levels);
          setRecipeName(response.data.data.recipeName);
          setImageUrl(response.data.data.imageUrl);
          setTime(response.data.data.time);
          setRecipeIngridients(response.data.recipesIngridient);
          setRecipeHowToCooks(response.data.recipesHowToCook);
        })
        .catch((err) => {
            console.log(err);
        });
      }, []);
    
    // Get Categories
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

    // Get Levels
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
    
    if (!post) return null;
    if (!category) return null;
    if (!level) return null;

    // Set level
    const levelChange = (event) => {
        setLevels({levelId: event.target.value});
    };

    // Set Category
    const CategoryChange = (event) => {
        setCategories({categoryId: event.target.value});
    };

    // Update request ke database
    const handleSubmit = (e) => {
        e.preventDefault()
        http.put(`/recipe/update/${id}`, {
            categories, levels, recipeName, imageUrl, time, recipeIngridients, recipeHowToCooks
        })
        .then((response) => {
            console.log(response);
            navigate("/daftar-resep");
        })
        .catch((err) => console.log(err))
    }

    return (
        <div>
            <Navigation/>
            <Container>
                <Typography variant='h4' marginTop={8}>
                    Edit Resep Masakan
                </Typography>
                <form>
                    <Grid container rowSpacing={4} columnSpacing={{md: 12 }} justifyContent="center" paddingTop={7} marginBottom={5}>
                        <Grid item sm={6}>
                            <TextField defaultValue={post.data.recipeName} id="recipeName" placeholder='Nama Resep Masakan' label='Nama Resep Masakan' type="text" size="small" fullWidth sx={{background: 'white' }} onChange={(e) => setRecipeName(e.target.value)} />
                        </Grid>
                        <Grid item sm={6}>
                            {/* <TextField id="recipeCategory" placeholder='Kategori Masakan' label='Kategori Masakan' type="text" size="small" fullWidth sx={{background: 'white' }} /> */}
                            <FormControl fullWidth size="small" sx={{background: 'white' }}>
                                <InputLabel id="demo-simple-select-label">Kategori Masakan</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={post.data.categories.categoryId}
                                    label="Kategori Masakan"
                                    onChange={CategoryChange}>
                                {category.data.map(ctgr =>(    
                                    <MenuItem value={ctgr.categoryId}>{ctgr.categoryName}</MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <TextField defaultValue={post.data.imageUrl} id="imageUrl" placeholder='Gambar Masakan' label='URL Gambar Masakan' type="text" size="small" fullWidth sx={{background: 'white' }} onChange={(e) => setImageUrl(e.target.value)} />
                        </Grid>
                        <Grid item sm={6}>
                            <Grid container spacing={4}>
                                <Grid item sm={6}>
                                    <TextField defaultValue={post.data.time} id="time" placeholder='Waktu Masak' label='Waktu Masak' type="text" size="small" fullWidth sx={{background: 'white' }} onChange={(e) => setTime(e.target.value)}/>
                                </Grid>
                                <Grid item sm={6}>
                                    <FormControl fullWidth size="small" sx={{background: 'white' }}>
                                        <InputLabel id="demo-simple-select-label">Tingkat Kesulitan</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={post.data.levels.levelId}
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
                            <Grid container spacing={2}>
                                <Grid item sm={3}>
                                    <Typography variant='h6'>
                                        Jumlah
                                    </Typography>                                    
                                </Grid>
                                <Grid item sm={3}>
                                    <Typography variant='h6'>
                                        Satuan
                                    </Typography>
                                </Grid>
                                <Grid item sm={6}>
                                    <Typography variant='h6'>
                                        Nama Bahan Makanan
                                    </Typography>
                                </Grid>
                            </Grid>
                            <hr></hr>
                        {
                            post.recipesIngridient.map((ingridient, index) => {
                                return (
                                <Grid container spacing={2} key={ingridient.id} marginTop={1}>
                                    <Grid item sm={3}>
                                    <TextField defaultValue={ingridient.ingridients.ingridientQuantity} id="recipeName" label='Jumlah' type="text" size="small" fullWidth sx={{background: 'white' }}
                                    onChange={updateIngridientsQty(index)} InputLabelProps={{ shrink: true }}/>
                                    </Grid>
                                    <Grid item sm={3}>
                                    <TextField defaultValue={ingridient.ingridients.ingridientMeasurement} id="recipeName" label='Satuan' type="text" size="small" fullWidth sx={{background: 'white' }} onChange={updateIngridientsMeasurement(index)} InputLabelProps={{ shrink: true }}/>
                                    </Grid>
                                    <Grid item sm={6}>
                                    <TextField defaultValue={ingridient.ingridients.ingridientName} id="recipeName" label='Nama Bahan Masakan' type="text" size="small" fullWidth sx={{background: 'white' }} onChange={updateIngridientsName(index)} InputLabelProps={{ shrink: true }}/>
                                    </Grid>
                                </Grid>
                                )
                            })
                        }
                        </Grid>
                        <Grid item sm={6}>
                            <Grid container spacing={2}>
                                <Grid item sm={2}>
                                    <Typography variant='h6'>
                                        Urutan
                                    </Typography>                                    
                                </Grid>
                                <Grid item sm={10}>
                                    <Typography variant='h6'>
                                        Deskripsi
                                    </Typography>
                                </Grid>
                            </Grid>
                            <hr></hr>
                        {
                            post.recipesHowToCook.sort((a, b) => a.howToCooks.position > b.howToCooks.position ? 1 : -1).map((howToCook, index) => {
                                let postitionNumber = 0;
                                return (
                                <Grid container spacing={2} key={howToCook.id} marginTop={1}>
                                    <Grid item sm={2}>
                                    <TextField id="recipeName" label='Urutan' type="text" size="small" fullWidth sx={{background: 'white' }} InputLabelProps={{ shrink: true }} disabled value={howToCook.howToCooks.position}/>
                                    </Grid>
                                    <Grid item sm={10}>
                                    <TextField defaultValue={howToCook.howToCooks.description} id="recipeName" label='Deskripsi' type="text" size="small" fullWidth sx={{background: 'white' }} onChange={updateHowToCookDescription(index)} InputLabelProps={{ shrink: true }}/>
                                    </Grid>
                                    {console.log("Log user position :" +howToCook.howToCooks.position)}
                                    {console.log("Log index :" + index)}
                                </Grid>
                                )
                            })
                        }
                        </Grid>

                    </Grid>
                    <Grid container spacing={4} justifyContent="flex-end" alignItems="center" paddingBottom={10}>
                        <Grid item md={2}>
                            <Button variant="outlined" fullWidth onClick={() => navigate(-1)} style={{ background: '#FFFFFF'}}>
                                Batal
                            </Button>
                        </Grid>
                        <Grid item md={2}>
                            <Button variant="contained" fullWidth onClick={handleSubmit} style={{ background: '#01BFBF' }}>
                                Submit                                
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {/* <Typography align='left'>
                    <pre>
                        {JSON.stringify({categories, levels, recipeName, imageUrl, time, recipeIngridients, recipeHowToCooks}, null, " ")}
                    </pre>
                </Typography>
                <div></div> */}
            </Container>
        </div>
    )
}

export default EditResep