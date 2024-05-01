// import React, { useState, useEffect } from "react";
// import { Button, Grid } from "@mui/material";
// // import { Edit, Delete } from '@mui/icons-material';
// import { useNavigate } from "react-router-dom";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { CardActionArea } from "@mui/material";
// import MainCard from "ui-component/cards/MainCard";
// import { useDispatch, useSelector } from "react-redux";
// import { getAlbum } from "store/Album/albumActions";

// const blogs = [
//   {
//     id: 1,
//     image: "https://picsum.photos/200/300?random=1",
//     name: "Album 1",
//     shortDescription: "Short description for Blog 1",
//   },
//   {
//     id: 2,
//     image: "https://picsum.photos/200/300?random=2",
//     name: "Album 2",
//     shortDescription: "Short description for Blog 2",
//   },
//   {
//     id: 3,
//     image: "https://picsum.photos/200/300?random=3",
//     name: "Album 3",
//     shortDescription: "Short description for Blog 3",
//   },
// ];

// const Albummain = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const albums = useSelector((state) => state.album.albums);
//   console.log(albums);

//   const handleClick = () => {
//     navigate("/add-album");
//   };

//   const handleAlbumClick = (data) => {
//     navigate(`/gallery/${data.id}`);
//   };

//   useEffect(() => {
//     dispatch(getAlbum());
//   }, []);

//   return (
//     <>
//       <MainCard
//         title="Album"
//         secondary={
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handleClick()}
//           >
//             Add Album
//           </Button>
//         }
//       >
//         <Grid container spacing={2}>
//           {albums.map((blog) => (
//             <Grid
//               item
//               xs={12}
//               sm={6}
//               md={4}
//               lg={3}
//               key={blog.id}
//               onClick={() => handleAlbumClick(blog)}
//             >
//               <Card
//                 sx={{ maxWidth: 345 }}
//                 style={{ border: "1px solid black" }}
//               >
//                 <CardActionArea>
//                   <CardMedia
//                     component="img"
//                     height="140"
//                     image={blog?.gallery[0].image}
//                     alt="blog"
//                   />
//                   <CardContent>
//                     <Typography gutterBottom variant="h5" component="div">
//                       {blog.name}
//                     </Typography>
//                     {/* <Typography variant="body2" color="text.secondary">
//                       {blog.shortDescription}
//                     </Typography> */}
//                   </CardContent>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </MainCard>
//     </>
//   );
// };

// export default Albummain;

// import React, { useEffect } from "react";
// import {
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   CardActionArea,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import MainCard from "ui-component/cards/MainCard";
// import { useDispatch, useSelector } from "react-redux";
// import { getAlbum } from "store/Album/albumActions";

// const Albummain = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const albums = useSelector((state) => state.album.albums);

//   useEffect(() => {
//     dispatch(getAlbum());
//   }, []);

//   const handleAlbumClick = (album) => {
//     navigate(`/gallery/${album.id}`);
//   };

//   const handleAddAlbum = () => {
//     navigate("/add-album");
//   };

//   return (
//     <MainCard
//       title="Album"
//       secondary={
//         <Button variant="contained" color="primary" onClick={handleAddAlbum}>
//           Add Album
//         </Button>
//       }
//     >
//       <Grid container spacing={2}>
//         {albums.map((album) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={album.id}>
//             <Card
//               sx={{
//                 maxWidth: 345,
//                 m: 2,
//                 boxShadow: 5,
//                 borderRadius: 2,
//                 transition: "0.3s",
//                 ":hover": {
//                   transform: "scale(1.05)",
//                   boxShadow: 10,
//                 },
//               }}
//               onClick={() => handleAlbumClick(album)}
//             >
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={album?.gallery[0]?.image}
//                   alt={album.name}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     {album.name}
//                   </Typography>
//                   {/* Optional: Add a description or other elements here */}
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </MainCard>
//   );
// };

// export default Albummain;

import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteAlbum, getAlbum } from "store/Album/albumActions";
import Loader from "ui-component/Loader";

const Albummain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const albums = useSelector((state) => state.album.albums);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAlbum()).then((res) => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleAlbumClick = (album) => {
    navigate(`/gallery/${album.id}`);
  };

  const handleAddAlbum = () => {
    navigate("/add-album");
  };

  const handleDeleteAlbum = (albumId) => {
    const formData = new FormData();
    formData.append("id", albumId);
    dispatch(deleteAlbum(formData)).then((res) => {
      dispatch(getAlbum());
    });
  };

  return (
    <MainCard
      title="Album"
      secondary={
        <Button variant="contained" color="primary" onClick={handleAddAlbum}>
          Add Album
        </Button>
      }
    >
      <Grid container spacing={2}>
        {albums.map((album) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={album.id}>
            <Card
              sx={{
                maxWidth: 345,
                m: 2,
                boxShadow: 5,
                borderRadius: 2,
                transition: "0.3s",
                ":hover": {
                  transform: "scale(1.05)",
                  boxShadow: 10,
                },
              }}
              onClick={() => handleAlbumClick(album)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={album ? album?.gallery[0]?.image : ""}
                  alt={album.name}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{ textAlign: "center" }}
                  >
                    {album.name}
                  </Typography>
                  <Grid item xs={12}>
                    {" "}
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAlbum(album.id);
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
      </Grid>
    </MainCard>
  );
};

export default Albummain;
