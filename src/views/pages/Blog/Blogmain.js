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
import NoDataImage from "../../../assets/images/NoData.png";

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
      {blogs.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            flexDirection: "column", // Added to stack elements vertically
          }}
        >
          <div>
            <img src={NoDataImage} alt="No Data" />
          </div>
          <div>
            <h1>No Data Found</h1>
          </div>
        </div>
      ) : (
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
                      dangerouslySetInnerHTML={{
                        __html: blog.shortdescription,
                      }}
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
                    sx={{ flexGrow: 1, marginRight: "8px", width: "100px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => openDeleteDialog(blog.id)}
                    sx={{
                      flexGrow: 1,
                      width: "100px",
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
      )}

      <DeleteConfirmationDialog
        open={openDialog}
        onClose={handleClose}
        onConfirm={handleDelete}
      />
    </MainCard>
  );
};

export default Blogmain;
