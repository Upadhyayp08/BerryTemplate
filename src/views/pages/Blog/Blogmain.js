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
// import { getBlog } from "store/Blog/blogActions";

// const blogs = [
//   {
//     id: 1,
//     image: "https://picsum.photos/200/300?random=1",
//     name: "Blog 1",
//     shortDescription: "Short description for Blog 1",
//   },
//   {
//     id: 2,
//     image: "https://picsum.photos/200/300?random=2",
//     name: "Blog 2",
//     shortDescription: "Short description for Blog 2",
//   },
//   {
//     id: 3,
//     image: "https://picsum.photos/200/300?random=3",
//     name: "Blog 3",
//     shortDescription: "Short description for Blog 3",
//   },
// ];

// const Blogmain = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const blog = useSelector((state) => state.blog.blogs);
//   console.log(blog);
//   const handleClick = () => {
//     navigate("/add-blog");
//   };

//   useEffect(() => {
//     dispatch(getBlog());
//   }, []);

//   return (
//     <>
//       <MainCard
//         title="Blogs"
//         secondary={
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handleClick()}
//           >
//             Add Blog
//           </Button>
//         }
//       >
//         <Grid container spacing={2}>
//           {blog.map((blog) => (
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
//                   <CardContent>
//                     <Typography gutterBottom variant="h5" component="div">
//                       {blog.title}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       <div
//                         dangerouslySetInnerHTML={{ __html: blog.description }}
//                       />
//                     </Typography>
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

// export default Blogmain;

import React, { useEffect } from "react";
import {
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  CardActions,
  CardActionArea,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlog } from "store/Blog/blogActions";

const Blogmain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blog.blogs);
  console.log(blogs);

  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  const handleAddClick = () => {
    navigate("/add-blog");
  };

  const handleEdit = (id) => {
    navigate(`/add-blog/${id}`);
  };

  const handleDelete = (id) => {
    console.log(id);
    // console.log("Delete blog with id:", id); // Replace this with actual delete logic
    dispatch(deleteBlog({ id: id })).then((res) => {
      dispatch(getBlog());
    });
  };

  return (
    <MainCard
      title="Blogs"
      secondary={
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          Add Blog
        </Button>
      }
    >
      <Grid container spacing={2}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
            <Card sx={{ maxWidth: 345, border: "1px solid black" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={blog.image}
                  alt={blog.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blog.shortdescription,
                      }}
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <IconButton color="primary" onClick={() => handleEdit(blog.id)}>
                  <Edit />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(blog.id)}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
};

export default Blogmain;
