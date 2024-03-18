import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

const ImageUpload = () => {


  const navigate = useNavigate(); 
  const [details, setDetails] = useState({
    title: "",
    image: null, // This will hold the base64 encoded image.
  });


  const handleFileInputClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the base64 string, including the data URL prefix.
        setDetails({ ...details, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (e) => {
    setDetails({ ...details, title: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Since you're sending JSON, you can include the base64 string directly.
    const payload = JSON.stringify({
      title: details.title,
      image: details.image,
    });

    try {
      const response = await fetch(`${BASE_URL}/user/upload-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
          "authorization": `Bearer ${localStorage.getItem("token")}`, 
        },
        body: payload,
      });

      if (response.ok) {
        console.log("Image uploaded successfully!");
        setDetails({ title: "", image: null });
        navigate("/GetImages"); 
      } else {
        console.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 64px)",
        background: "#fff",
        p: 4,
      }}
    >
      <Box
        sx={{
          width: "60%",
          height: "300px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          cursor: "pointer",
          "&:hover": {
            borderColor: "primary.main",
          },
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={ details.title}
          onChange={handleTitleChange}
          style={{
            marginTop: "20px",
            width: "60%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <Typography variant="body1" color="textSecondary">
          Drop your image here or
          <Button color="primary" onClick={handleFileInputClick}>browse</Button>
        </Typography>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*"
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2, width: "200px", height: "50px", fontSize: "16px" }}
      >
        Upload
      </Button>
    </Box>
  );
};

export default ImageUpload;