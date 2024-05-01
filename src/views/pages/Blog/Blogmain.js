// import React, { useEffect } from "react";
// import {
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   CardActions,
//   CardActionArea,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import MainCard from "ui-component/cards/MainCard";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteBlog, getBlog } from "store/Blog/blogActions";

// const Blogmain = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const blogs = useSelector((state) => state.blog.blogs);

//   useEffect(() => {
//     dispatch(getBlog());
//   }, [dispatch]);

//   const handleAddClick = () => {
//     navigate("/add-blog");
//   };

//   const handleEdit = (id) => {
//     navigate(`/add-blog/${id}`);
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteBlog({ id })).then(() => {
//       dispatch(getBlog());
//     });
//   };

//   return (
//     <MainCard
//       title="Blogs"
//       secondary={
//         <Button variant="contained" color="primary" onClick={handleAddClick}>
//           Add Blog
//         </Button>
//       }
//     >
//       <Grid container spacing={2}>
//         {blogs.map((blog) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
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
//             >
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={blog.image}
//                   alt={blog.title}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     {blog.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <div
//                       dangerouslySetInnerHTML={{
//                         __html: blog.shortdescription,
//                       }}
//                     />
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//               <CardActions
//                 disableSpacing
//                 sx={{ justifyContent: "space-between", padding: "8px" }}
//               >
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => handleEdit(blog.id)}
//                   sx={{ flexGrow: 1, marginRight: "8px" }} // Ensure buttons fill space and have margin between
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="contained"
//                   // color=""
//                   onClick={() => handleDelete(blog.id)}
//                   sx={{
//                     flexGrow: 1,
//                     backgroundColor: "red",
//                     ":hover": {
//                       backgroundColor: "rgba(255, 0, 0, 0.8)", // Light transparent red on hover
//                     },
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </MainCard>
//   );
// };

// export default Blogmain;

// import React, { useEffect } from "react";
// import {
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   CardActions,
//   CardActionArea,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import MainCard from "ui-component/cards/MainCard";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteBlog, getBlog } from "store/Blog/blogActions";

// const Blogmain = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const blogs = useSelector((state) => state.blog.blogs);

//   useEffect(() => {
//     dispatch(getBlog());
//   }, [dispatch]);

//   const handleAddClick = () => {
//     navigate("/add-blog");
//   };

//   const handleEdit = (id) => {
//     navigate(`/add-blog/${id}`);
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteBlog({ id })).then(() => {
//       dispatch(getBlog());
//     });
//   };

//   return (
//     <MainCard
//       title="Blogs"
//       secondary={
//         <Button variant="contained" color="primary" onClick={handleAddClick}>
//           Add Blog
//         </Button>
//       }
//     >
//       <Grid container spacing={2}>
//         {blogs.map((blog) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
//             <Card
//               sx={{
//                 width: 345, // consistent width for all cards
//                 m: 2,
//                 boxShadow: 5,
//                 borderRadius: 2,
//                 transition: "0.3s",
//                 ":hover": {
//                   transform: "scale(1.05)",
//                   boxShadow: 10,
//                 },
//               }}
//             >
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={blog.image}
//                   alt={blog.title}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     {blog.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <div
//                       dangerouslySetInnerHTML={{
//                         __html: blog.shortdescription,
//                       }}
//                     />
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//               <CardActions
//                 disableSpacing
//                 sx={{ justifyContent: "space-between", padding: "8px" }}
//               >
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => handleEdit(blog.id)}
//                   sx={{ flexGrow: 1, marginRight: "8px" }}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="contained"
//                   onClick={() => handleDelete(blog.id)}
//                   sx={{
//                     flexGrow: 1,
//                     backgroundColor: "red",
//                     ":hover": {
//                       backgroundColor: "rgba(255, 0, 0, 0.8)",
//                     },
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </MainCard>
//   );
// };

// export default Blogmain;

// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   CardActions,
//   CardActionArea,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import MainCard from "ui-component/cards/MainCard";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteBlog, getBlog } from "store/Blog/blogActions";

// const Blogmain = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const blogs = useSelector((state) => state.blog.blogs);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     dispatch(getBlog());
//   }, [dispatch]);

//   const handleAddClick = () => {
//     navigate("/add-blog");
//   };

//   const handleEdit = (id) => {
//     navigate(`/add-blog/${id}`);
//   };

//   const openDeleteDialog = (id) => {
//     setDeleteId(id);
//     setOpenDialog(true);
//   };

//   const handleDelete = () => {
//     dispatch(deleteBlog({ id: deleteId })).then(() => {
//       dispatch(getBlog());
//       setOpenDialog(false);
//       setDeleteId(null);
//     });
//   };

//   const handleClose = () => {
//     setOpenDialog(false);
//     setDeleteId(null);
//   };

//   return (
//     <MainCard
//       title="Blogs"
//       secondary={
//         <Button variant="contained" color="primary" onClick={handleAddClick}>
//           Add Blog
//         </Button>
//       }
//     >
//       <Grid container spacing={2}>
//         {blogs.map((blog) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
//             <Card
//               sx={{
//                 width: 345,
//                 m: 2,
//                 boxShadow: 5,
//                 borderRadius: 2,
//                 transition: "0.3s",
//                 ":hover": {
//                   transform: "scale(1.05)",
//                   boxShadow: 10,
//                 },
//               }}
//             >
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={blog.image}
//                   alt={blog.title}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     {blog.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <div
//                       dangerouslySetInnerHTML={{
//                         __html: blog.shortdescription,
//                       }}
//                     />
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//               <CardActions
//                 disableSpacing
//                 sx={{ justifyContent: "space-between", padding: "8px" }}
//               >
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => handleEdit(blog.id)}
//                   sx={{ flexGrow: 1, marginRight: "8px" }}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="contained"
//                   onClick={() => openDeleteDialog(blog.id)}
//                   sx={{
//                     flexGrow: 1,
//                     backgroundColor: "red",
//                     ":hover": {
//                       backgroundColor: "rgba(255, 0, 0, 0.8)",
//                     },
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <Dialog
//         open={openDialog}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Are you sure you want to delete this blog post?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDelete} color="primary" autoFocus>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </MainCard>
//   );
// };

// export default Blogmain;

// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   CardActions,
//   CardActionArea,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import MainCard from "ui-component/cards/MainCard";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteBlog, getBlog } from "store/Blog/blogActions";
// import DeleteConfirmationDialog from "../../../ui-component/DeleteConfirmationDialog"; // Import the new component

// const Blogmain = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const blogs = useSelector((state) => state.blog.blogs);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     dispatch(getBlog());
//   }, [dispatch]);

//   const handleAddClick = () => {
//     navigate("/add-blog");
//   };

//   const handleEdit = (id) => {
//     navigate(`/add-blog/${id}`);
//   };

//   const openDeleteDialog = (id) => {
//     setDeleteId(id);
//     setOpenDialog(true);
//   };

//   const handleDelete = () => {
//     dispatch(deleteBlog({ id: deleteId })).then(() => {
//       dispatch(getBlog());
//       setOpenDialog(false);
//       setDeleteId(null);
//     });
//   };

//   const handleClose = () => {
//     setOpenDialog(false);
//     setDeleteId(null);
//   };

//   return (
//     <MainCard
//       title="Blogs"
//       secondary={
//         <Button variant="contained" color="primary" onClick={handleAddClick}>
//           Add Blog
//         </Button>
//       }
//     >
//       <Grid container spacing={2}>
//         {blogs.map((blog) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
//             <Card
//               sx={{
//                 width: 345,
//                 m: 2,
//                 boxShadow: 5,
//                 borderRadius: 2,
//                 transition: "0.3s",
//                 ":hover": {
//                   transform: "scale(1.05)",
//                   boxShadow: 10,
//                 },
//               }}
//             >
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={blog.image}
//                   alt={blog.title}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     {blog.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <div
//                       dangerouslySetInnerHTML={{
//                         __html: blog.shortdescription,
//                       }}
//                     />
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//               <CardActions
//                 disableSpacing
//                 sx={{ justifyContent: "space-between", padding: "8px" }}
//               >
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => handleEdit(blog.id)}
//                   sx={{ flexGrow: 1, marginRight: "8px" }}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="contained"
//                   onClick={() => openDeleteDialog(blog.id)}
//                   sx={{
//                     flexGrow: 1,
//                     backgroundColor: "red",
//                     ":hover": {
//                       backgroundColor: "rgba(255, 0, 0, 0.8)",
//                     },
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <DeleteConfirmationDialog
//         open={openDialog}
//         onClose={handleClose}
//         onConfirm={handleDelete}
//       />
//     </MainCard>
//   );
// };

// export default Blogmain;

// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   CardActions,
//   CardActionArea,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import MainCard from "ui-component/cards/MainCard";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteBlog, getBlog } from "store/Blog/blogActions";
// import DeleteConfirmationDialog from "../../../ui-component/DeleteConfirmationDialog"; // Import the confirmation dialog component

// const Blogmain = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const blogs = useSelector((state) => state.blog.blogs);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     dispatch(getBlog());
//   }, [dispatch]);

//   const handleAddClick = () => {
//     navigate("/add-blog");
//   };

//   const handleEdit = (id) => {
//     navigate(`/add-blog/${id}`);
//   };

//   const openDeleteDialog = (id) => {
//     setDeleteId(id);
//     setOpenDialog(true);
//   };

//   const handleDelete = () => {
//     dispatch(deleteBlog({ id: deleteId })).then(() => {
//       dispatch(getBlog());
//       setOpenDialog(false);
//       setDeleteId(null);
//     });
//   };

//   const handleClose = () => {
//     setOpenDialog(false);
//     setDeleteId(null);
//   };

//   return (
//     <MainCard
//       title="Blogs"
//       secondary={
//         <Button variant="contained" color="primary" onClick={handleAddClick}>
//           Add Blog
//         </Button>
//       }
//     >
//       <Grid container spacing={2}>
//         {blogs.map((blog) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
//             <Card
//               sx={{
//                 width: 345,
//                 m: 2,
//                 boxShadow: 5,
//                 borderRadius: 2,
//                 transition: "0.3s",
//                 ":hover": {
//                   transform: "scale(1.05)",
//                   boxShadow: 10,
//                 },
//               }}
//             >
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={blog.image}
//                   alt={blog.title}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     {blog.title}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     dangerouslySetInnerHTML={{ __html: blog.shortdescription }}
//                   />
//                 </CardContent>
//               </CardActionArea>
//               <CardActions
//                 disableSpacing
//                 sx={{ justifyContent: "space-between", padding: "8px" }}
//               >
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => handleEdit(blog.id)}
//                   sx={{ flexGrow: 1, marginRight: "8px" }}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="contained"
//                   onClick={() => openDeleteDialog(blog.id)}
//                   sx={{
//                     flexGrow: 1,
//                     backgroundColor: "red",
//                     ":hover": {
//                       backgroundColor: "rgba(255, 0, 0, 0.8)",
//                     },
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <DeleteConfirmationDialog
//         open={openDialog}
//         onClose={handleClose}
//         onConfirm={handleDelete}
//       />
//     </MainCard>
//   );
// };

// export default Blogmain;

import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlog } from "store/Blog/blogActions";
import DeleteConfirmationDialog from "../../../ui-component/DeleteConfirmationDialog"; // Import the confirmation dialog component

const Blogmain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blog.blogs);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  const handleAddClick = () => {
    navigate("/add-blog");
  };

  const handleEdit = (id) => {
    navigate(`/add-blog/${id}`);
  };

  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleDelete = () => {
    dispatch(deleteBlog({ id: deleteId })).then(() => {
      dispatch(getBlog());
      setOpenDialog(false);
      setDeleteId(null);
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
    setDeleteId(null);
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
            <Card
              sx={{
                maxWidth: 345, // Use maxWidth for better responsiveness
                m: 2,
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
                  height="140"
                  image={blog.image}
                  alt={blog.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    dangerouslySetInnerHTML={{ __html: blog.shortdescription }}
                  />
                </CardContent>
              </CardActionArea>
              <CardActions
                disableSpacing
                sx={{ justifyContent: "space-between", padding: "8px" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(blog.id)}
                  sx={{ flexGrow: 1, marginRight: "8px" }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => openDeleteDialog(blog.id)}
                  sx={{
                    flexGrow: 1,
                    backgroundColor: "red",
                    ":hover": {
                      backgroundColor: "rgba(255, 0, 0, 0.8)",
                    },
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <DeleteConfirmationDialog
        open={openDialog}
        onClose={handleClose}
        onConfirm={handleDelete}
      />
    </MainCard>
  );
};

export default Blogmain;
