// import React, { useState, useEffect } from "react";
// import { Grid, Input, Button } from "@mui/material";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import { CardActionArea } from "@mui/material";
// import MainCard from "ui-component/cards/MainCard";
// import { IconArrowUp } from "@tabler/icons-react";
// import { useNavigate, useParams } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { AlbumById, updateAlbum } from "store/Album/albumActions";

// function Gallery() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const gallerys = useSelector((state) => state.album.albumbyid);
//   const [selectedImage, setSelectedImage] = useState([]);
//   const [imagePreview, setImagePreview] = useState(null);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imagePreviewUrl = URL.createObjectURL(file);
//       setSelectedImage(file);
//       setImagePreview(imagePreviewUrl);
//     }
//   };

//   const handleUpload = () => {
//     if (selectedImage) {
//       const formData = new FormData();
//       formData.append("album_id", id);
//       formData.append("image", selectedImage);
//       dispatch(updateAlbum(formData));
//     }
//   };

//   console.log(gallerys);
//   useEffect(() => {
//     dispatch(AlbumById({ id: id }));
//   }, []);

//   return (
//     <>
//       <MainCard
//         title="Gallery"
//         secondary={
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handleUpload()}
//           >
//             Save
//           </Button>
//         }
//       >
//         <Grid container spacing={2}>
//           {gallerys?.gallery?.map((blog) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
//               <Card
//                 sx={{ maxWidth: 345 }}
//                 style={{ border: "1px solid black" }}
//               >
//                 <CardActionArea>
//                   <CardMedia
//                     component="img"
//                     height="140"
//                     image={blog.image}
//                     alt="blog"
//                   />
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           ))}
//           {selectedImage.length == 0 ? (
//             <Grid item xs={12} sm={6} md={4} lg={3}>
//               <label htmlFor="upload-photo" style={{ width: "100%" }}>
//                 <Input
//                   id="upload-photo"
//                   type="file"
//                   inputProps={{ accept: "image/*", style: { display: "none" } }}
//                   style={{ display: "none" }}
//                   onChange={handleImageUpload}
//                 />
//                 <Button
//                   variant="filled"
//                   component="span"
//                   onClick={handleUpload}
//                   style={{
//                     border: "1px solid black",
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: "4px",
//                   }}
//                 >
//                   {/* Upload Image */}
//                   <IconArrowUp />
//                 </Button>
//               </label>
//             </Grid>
//           ) : (
//             <Grid item xs={12} sm={6} md={4} lg={3}>
//               <img
//                 src={imagePreview}
//                 style={{
//                   border: "1px solid black",
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: "4px",
//                 }}
//                 alt="Uploaded Preview"
//               ></img>
//             </Grid>
//           )}
//         </Grid>
//       </MainCard>
//     </>
//   );
// }

// export default Gallery;

import React, { useState, useEffect } from "react";
import { Grid, Input, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import { IconArrowUp } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AlbumById, updateAlbum } from "store/Album/albumActions";

const images = [
  {
    id: 1,
    image: "https://picsum.photos/200/300?random=1",
  },
  // other images...
];

function Gallery() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gallerys = useSelector((state) => state.album.albumbyid);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // const handleImageUpload = (event) => {
  //   const files = Array.from(event.target.files);
  //   const newImagePreviews = files.map((file) => URL.createObjectURL(file));

  //   setSelectedImages((prev) => [...prev, ...files]);
  //   setImagePreviews((prev) => [...prev, ...newImagePreviews]);
  // };
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
                    height="140"
                    image={blog.image}
                    alt="blog"
                  />
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
                  height: "140px",
                  borderRadius: "4px",
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
                  height: "140px",
                  borderRadius: "4px",
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
