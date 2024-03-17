import React, { useState } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GetImages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const handleUploadImages = () => {
    navigate('/upload');
  };

  return (
    <>
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'background.default' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Search by Name"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Stack>
        <Button variant="contained" color="secondary" onClick={handleUploadImages}>
          Upload Images
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ p: 3, mt: 5 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345, mx: 'auto', boxShadow: 4, '&:hover': { boxShadow: 8 } }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>



        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345, mx: 'auto', boxShadow: 4, '&:hover': { boxShadow: 8 } }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>




        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345, mx: 'auto', boxShadow: 4, '&:hover': { boxShadow: 8 } }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>




        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345, mx: 'auto', boxShadow: 4, '&:hover': { boxShadow: 8 } }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>




        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345, mx: 'auto', boxShadow: 4, '&:hover': { boxShadow: 8 } }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>




        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345, mx: 'auto', boxShadow: 4, '&:hover': { boxShadow: 8 } }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

       

      </Grid>
    </>
  );
};

export default GetImages;
