import React from 'react';
import { Grid, Input, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { IconArrowUp } from '@tabler/icons-react';

const images = [
  {
    id: 1,
    image: 'https://picsum.photos/200/300?random=1'
  },
  {
    id: 2,
    image: 'https://picsum.photos/200/300?random=2'
  },
  {
    id: 3,
    image: 'https://picsum.photos/200/300?random=3'
  },
  {
    id: 4,
    image: 'https://picsum.photos/200/300?random=4'
  },
  {
    id: 5,
    image: 'https://picsum.photos/200/300?random=5'
  },
  {
    id: 6,
    image: 'https://picsum.photos/200/300?random=6'
  }
];

function Gallery() {
  return (
    <>
      <MainCard title="Gallery">
        <Grid container spacing={2}>
          {images.map((blog) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
              <Card sx={{ maxWidth: 345 }} style={{ border: '1px solid black' }}>
                <CardActionArea>
                  <CardMedia component="img" height="140" image={blog.image} alt="blog" />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <label htmlFor="upload-photo" style={{ width: '100%' }}>
              <Input
                id="upload-photo"
                type="file"
                inputProps={{ accept: 'image/*', style: { display: 'none' } }}
                style={{ display: 'none' }}
              />
              <Button
                variant="filled"
                component="span"
                style={{ border: '1px solid black', width: '100%', height: '100%', borderRadius: '4px' }}
              >
                {/* Upload Image */}
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
