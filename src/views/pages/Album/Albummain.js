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
import NoDataImage from "../../../assets/images/NoData.png";

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
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddAlbum}
          sx={{ color: "white" }}
        >
          Add Album
        </Button>
      }
    >
      {albums.length === 0 ? (
        <>
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
        </>
      ) : (
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
                // onClick={() => handleAlbumClick(album)}
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
                    <Grid container spacing={2}>
                      <Grid item lg={6}>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{ color: "white" }}
                          color="primary"
                          onClick={() => handleAlbumClick(album)}
                        >
                          View
                        </Button>
                      </Grid>
                      <Grid item lg={6}>
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
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </MainCard>
  );
};

export default Albummain;
