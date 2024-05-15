// import React, { useState, useEffect } from "react";
// import { Grid, Input, Button, CardContent } from "@mui/material";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import { CardActionArea } from "@mui/material";
// import MainCard from "ui-component/cards/MainCard";
// import {
//   IconUpload,
//   IconHttpDelete,
//   IconCloudUpload,
// } from "@tabler/icons-react";
// import { useNavigate, useParams } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { AlbumById, deleteImage, updateAlbum } from "store/Album/albumActions";
// import { red } from "@mui/material/colors";
// import Loader from "ui-component/Loader";

// function Gallery() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const gallerys = useSelector((state) => state.album.albumbyid);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [imagePreviews, setImagePreviews] = useState([]);

//   const handleImageUpload = (event) => {
//     const files = Array.from(event.target.files);
//     const newImagePreviews = files.map((file) => URL.createObjectURL(file));
//     setSelectedImages((prevImages) => [...prevImages, ...files]);
//     setImagePreviews((prevPreviews) => [...prevPreviews, ...newImagePreviews]);
//   };

//   const handleUpload = () => {
//     if (selectedImages.length > 0) {
//       const formData = new FormData();
//       formData.append("album_id", id);
//       selectedImages.forEach((image, index) => {
//         formData.append(`images[${index}]`, image); // Append each image with a key indicating its index
//       });
//       dispatch(updateAlbum(formData)).then(() => {
//         // navigate to the album page or perform other actions after upload
//         navigate("/album");
//       });
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       dispatch(AlbumById({ id: id })).then((res) => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, [id, dispatch]);

//   const handleDeleteImage = (galleryid) => {
//     const formdata = new FormData();
//     formdata.append("id", galleryid);
//     dispatch(deleteImage(formdata)).then((res) =>
//       dispatch(AlbumById({ id: id }))
//     );
//   };

//   const handleDeletePreviewImage = (index) => {
//     setImagePreviews((prevPreviews) => {
//       const updatedPreviews = [...prevPreviews];
//       updatedPreviews.splice(index, 1); // Remove the image at the specified index
//       return updatedPreviews;
//     });
//     setSelectedImages((prevPreviews) => {
//       const updatedPreviews = [...prevPreviews];
//       updatedPreviews.splice(index, 1); // Remove the image at the specified index
//       return updatedPreviews;
//     });
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <>
//       <MainCard
//         title={gallerys.name}
//         secondary={
//           <Button variant="contained" color="primary" onClick={handleUpload}>
//             Save
//           </Button>
//         }
//       >
//         <Grid container spacing={2}>
//           {gallerys?.gallery?.map((blog) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
//               <Card
//                 style={{ border: "1px solid black" }}
//                 sx={{
//                   width: "254px",
//                   height: "160px",

//                   boxShadow: 5,
//                   borderRadius: 2,
//                   transition: "0.3s",
//                   ":hover": {
//                     transform: "scale(1.05)",
//                     boxShadow: 10,
//                   },
//                 }}
//               >
//                 <CardActionArea>
//                   <CardMedia
//                     component="img"
//                     height="160"
//                     image={blog.image}
//                     alt="blog"
//                   />
//                   <Button
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       right: 0,
//                     }}
//                     sx={{ color: "red" }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDeleteImage(blog.gallery_id);
//                     }}
//                   >
//                     x
//                   </Button>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           ))}
//           {imagePreviews.map((imagePreview, index) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//               <Card
//                 // sx={{ maxWidth: 345 }}
//                 style={{ border: "1px solid black" }}
//                 sx={{
//                   // maxWidth: 345,
//                   width: "254px",
//                   height: "160px",
//                   // m: 2,
//                   boxShadow: 5,
//                   borderRadius: 2,
//                   transition: "0.3s",
//                   ":hover": {
//                     transform: "scale(1.05)",
//                     boxShadow: 10,
//                   },
//                 }}
//               >
//                 <CardActionArea>
//                   <CardMedia
//                     component="img"
//                     height="160"
//                     image={imagePreview}
//                     alt="blog"
//                   />
//                   <Button
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       right: 0,
//                     }}
//                     sx={{ color: "red" }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDeletePreviewImage(index);
//                     }}
//                   >
//                     {/* <IconHttpDelete /> */}x
//                   </Button>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           ))}
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <label htmlFor="upload-photo" style={{ width: "100%" }}>
//               <Input
//                 id="upload-photo"
//                 type="file"
//                 multiple // Allow multiple file selection
//                 inputProps={{ accept: "image/*", style: { display: "none" } }}
//                 style={{ display: "none" }}
//                 onChange={handleImageUpload}
//               />
//               <Button
//                 // variant="contained"
//                 component="span"
//                 style={{
//                   border: "1px dashed black",
//                   width: "254px",
//                   height: "160px",
//                   borderRadius: "15px",
//                   backgroundColor: "whitesmoke",
//                 }}
//               >
//                 <IconCloudUpload />
//               </Button>
//             </label>
//           </Grid>
//         </Grid>
//       </MainCard>
//     </>
//   );
// }

// export default Gallery;

import React, { useState, useEffect } from "react";
import { Grid, Input, Button, CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import {
  IconUpload,
  IconHttpDelete,
  IconCloudUpload,
} from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AlbumById, deleteImage, updateAlbum } from "store/Album/albumActions";
import { red } from "@mui/material/colors";
import Loader from "ui-component/Loader";

function Gallery() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gallerys = useSelector((state) => state.album.albumbyid);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(true);
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
    if (id) {
      dispatch(AlbumById({ id: id })).then((res) => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, dispatch]);

  const handleDeleteImage = (galleryid) => {
    const formdata = new FormData();
    formdata.append("id", galleryid);
    dispatch(deleteImage(formdata)).then((res) =>
      dispatch(AlbumById({ id: id }))
    );
  };

  const handleDeletePreviewImage = (index) => {
    setImagePreviews((prevPreviews) => {
      const updatedPreviews = [...prevPreviews];
      updatedPreviews.splice(index, 1); // Remove the image at the specified index
      return updatedPreviews;
    });
    setSelectedImages((prevPreviews) => {
      const updatedPreviews = [...prevPreviews];
      updatedPreviews.splice(index, 1); // Remove the image at the specified index
      return updatedPreviews;
    });
  };

  if (loading) {
    return <Loader />;
  }

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
                style={{ border: "1px solid black", position: "relative" }}
                sx={{
                  width: "100%",
                  height: "100%",
                  boxShadow: 5,
                  borderRadius: 2,
                  transition: "0.3s",
                  ":hover": {
                    transform: "scale(1.05)",
                    boxShadow: 10,
                  },
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="160"
                    width="252"
                    image={blog.image}
                    alt="blog"
                  />
                  <Button
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                    sx={{ color: "red" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(blog.gallery_id);
                    }}
                  >
                    {/* <IconHttpDelete /> */}x
                  </Button>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
          {imagePreviews.map((imagePreview, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                style={{ border: "1px solid black", position: "relative" }}
                sx={{
                  width: "100%",
                  height: "100%",
                  boxShadow: 5,
                  borderRadius: 2,
                  transition: "0.3s",
                  ":hover": {
                    transform: "scale(1.05)",
                    boxShadow: 10,
                  },
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="160"
                    width="252"
                    image={imagePreview}
                    alt="blog"
                  />
                  <Button
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                    sx={{ color: "red" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePreviewImage(index);
                    }}
                  >
                    {/* <IconHttpDelete /> */}x
                  </Button>
                </CardActionArea>
              </Card>
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
                component="span"
                style={{
                  border: "1px dashed rgb(175, 175, 175)",
                  width: "100%",
                  height: "160px", // Set fixed height
                  borderRadius: "15px",
                  backgroundColor: "whitesmoke",
                }}
              >
                <IconCloudUpload />
              </Button>
            </label>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}

export default Gallery;
