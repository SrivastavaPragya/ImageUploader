import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

const GetImages = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages(); // This will fetch all images when the component mounts
  }, []);


  useEffect(()=>{
    fetchImages();
  },[])

  const fetchImages = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/all`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setImages(data.Images); 
      } else {
        console.error('Failed to fetch images');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // New function to fetch filtered images
  const fetchFilteredImages = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/images?filter=${(searchTerm)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

     
      if (response.ok) {

        const data = await response.json();
        console.log(data);
        setImages(data.images); 
      } else {
        console.error('Failed to fetch filtered images');
      }
    } catch (error) {
      console.error('Error fetching filtered images:', error);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchFilteredImages(); 
    } else {
      fetchImages(); 
    }
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
        { images && images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image._id}>
            <Card sx={{ maxWidth: 345, mx: 'auto', boxShadow: 4, '&:hover': { boxShadow: 8 } }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={image.imageURL} 
                  alt={image.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {image.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default GetImages;
