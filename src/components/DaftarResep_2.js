import { Container } from '@mui/system'
import React, { Component } from 'react'
import './style/custom.css';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, TextField, Typography } from '@mui/material';
import Navigation from './Navigation';
import AddIcon from '@mui/icons-material/Add';
import nasgor from '../assets/nasgor.jpg'
import axios from 'axios';

class DaftarResep extends Component {
    state = {
        recipes: []
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/recipe/read')
        .then(result => {
            const recipes = result.data;
            this.setState({recipes});
        })
    }

    render() {
        return (
            <div>
                <Navigation/>
                <Container>
                    <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" paddingTop={8}>
                        <Grid item>
                            <Typography>BARIS 1</Typography>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    <Button variant="contained" startIcon={<AddIcon/>}>Tambah Resep</Button>
                                </Grid>
                                <Grid item>
                                    <TextField id="outlined-search" label="Search field" type="search" size="small"/>
                                </Grid>
                                <Grid item>
                                    <Typography>BARIS FILTER</Typography>
                                </Grid>
                            </Grid>                        
                        </Grid>
                        <Grid item>
                            <Grid container spacing={6} direction="row" justifyContent="flex-start" alignItems="flex-start">
                                <Grid item>
                                    <Card sx={{ width: 250 }}>
                                    <CardMedia
                                        sx={{ height: 120 }}
                                        image={nasgor}
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary" textAlign={'left'}>
                                        Dinner
                                        </Typography>
                                        <Typography gutterBottom variant="body1" component="div" textAlign={'left'}>
                                        Nasi Goreng
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Lihat detail Resep</Button>
                                    </CardActions>
                                    </Card>
                                </Grid>
                                {this.state.recipes.map(recipe =>
                                <Grid item>
                                    <Card sx={{ width: 250 }}>
                                    <CardMedia
                                        sx={{ height: 120 }}
                                        image={nasgor}
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary" textAlign={'left'}>
                                        Dinner
                                        </Typography>
                                        <Typography gutterBottom variant="body1" component="div" textAlign={'left'}>
                                        {recipe}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Lihat detail Resep</Button>
                                    </CardActions>
                                    </Card>
                                </Grid>
                                )}
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
    
}

export default DaftarResep