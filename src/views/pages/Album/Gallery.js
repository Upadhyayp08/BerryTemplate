import React, { useState, useEffect } from "react";
import { Grid, Input, Button, CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import { IconArrowUp } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AlbumById, deleteImage, updateAlbum } from "store/Album/albumActions";

function Gallery() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gallerys = useSelector((state) => state.album.albumbyid);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...files]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newImagePreviews]);
  };

  const handleUpload = () => {
    if (selectedImages.length > 0) {
      const formData = new FormData();
      formData.append("album_id", id);
      selectedImages.forEach((image, index) => {
        formData.append(`images[${index}]`, image); // Append each image with a key indicating its index
      });
      dispatch(updateAlbum(formData)).then(() => {
        // navigate to the album page or perform other actions after upload
        navigate("/album");
      });
    }
  };

  useEffect(() => {
    dispatch(AlbumById({ id: id }));
  }, [id, dispatch]);

  const handleDeleteImage = (galleryid) => {
    const formdata = new FormData();
    formdata.append("id", galleryid);
    dispatch(deleteImage(formdata)).then((res) =>
      dispatch(AlbumById({ id: id }))
    );
  };

  return (
    <>
      <MainCard
        title={gallerys.name}
        secondary={
          <Button variant="contained" color="primary" onClick={handleUpload}>
            Save
          </Button>
        }
      >
        <Grid container spacing={2}>
          {gallerys?.gallery?.map((blog) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
              <Card
                sx={{ maxWidth: 345 }}
                style={{ border: "1px solid black" }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="160"
                    image={blog.image}
                    alt="blog"
                  />
                  <CardContent>
                    <Grid item xs={12}>
                      {" "}
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(blog.gallery_id);
                        }}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
          {imagePreviews.map((imagePreview, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <img
                src={imagePreview}
                style={{
                  border: "1px solid black",
                  width: "342px",
                  height: "245px",
                  borderRadius: "15px",
                }}
                alt="Uploaded Preview"
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <label htmlFor="upload-photo" style={{ width: "100%" }}>
              <Input
                id="upload-photo"
                type="file"
                multiple // Allow multiple file selection
                inputProps={{ accept: "image/*", style: { display: "none" } }}
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <Button
                variant="contained"
                component="span"
                style={{
                  border: "1px solid black",
                  width: "342px",
                  height: "245px",
                  borderRadius: "15px",
                }}
              >
                <IconArrowUp />
              </Button>
            </label>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}

export default Gallery;
