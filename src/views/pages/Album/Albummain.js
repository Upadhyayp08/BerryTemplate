import React from 'react';
import { Button, Grid } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const blogs = [
  {
    id: 1,
    image: 'https://picsum.photos/200/300?random=1',
    name: 'Album 1',
    shortDescription: 'Short description for Blog 1'
  },
  {
    id: 2,
    image: 'https://picsum.photos/200/300?random=2',
    name: 'Album 2',
    shortDescription: 'Short description for Blog 2'
  },
  {
    id: 3,
    image: 'https://picsum.photos/200/300?random=3',
    name: 'Album 3',
    shortDescription: 'Short description for Blog 3'
  }
];

const Albummain = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/add-album');
  };

  const handleAlbumClick = () => {
    navigate('/gallery');
  };

  return (
    <>
      <MainCard
        title="Album"
        secondary={
          <Button variant="contained" color="primary" onClick={() => handleClick()}>
            Add Album
          </Button>
        }
      >
        <Grid container spacing={2}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id} onClick={() => handleAlbumClick()}>
              <Card sx={{ maxWidth: 345 }} style={{ border: '1px solid black' }}>
                <CardActionArea>
                  <CardMedia component="img" height="140" image={blog.image} alt="blog" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {blog.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {blog.shortDescription}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </MainCard>
    </>
  );
};

export default Albummain;
