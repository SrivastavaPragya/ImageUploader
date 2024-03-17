import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ImageUpload = () => {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); 

  const handleFileInputClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUpload = async () => {
    if (title && selectedFile) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', selectedFile);

      try {
        // Assuming your endpoint for file upload is '/upload'
        const response = await fetch('http://localhost:8000/upload', {
          method: 'POST',
          body: formData, // FormData will set the Content-Type to 'multipart/form-data' automatically
        });

        if (response.ok) {
          console.log('Image uploaded successfully!');
          setTitle('');
          setSelectedFile(null);
          setPreviewUrl(null); // Reset preview
        } else {
          console.error('Failed to upload image.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      alert('Please enter a title and select an image');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)',
        background: '#fff',
        p: 4,
      }}
    >
      <Box
        sx={{
          width: '60%',
          height: '300px',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'primary.main',
          },
        }}
        onClick={handleFileInputClick} 
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          style={{ marginTop: '20px', width: '60%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        
        {previewUrl && (
          <img src={previewUrl} alt="Preview" style={{ marginTop: '20px', maxWidth: '100%', height: 'auto' }} />
        )}

        <Typography variant="body1" color="textSecondary">
          Drop your image here or
          <Button color="primary">
            browse
          </Button>
        </Typography>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept="image/*"
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ mt: 2, width: '200px', height: '50px', fontSize: '16px' }}
      >
        Upload
      </Button>
    </Box>
  );
};

export default ImageUpload;
