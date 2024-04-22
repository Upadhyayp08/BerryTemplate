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
    name: 'Blog 1',
    shortDescription: 'Short description for Blog 1'
  },
  {
    id: 2,
    image: 'https://picsum.photos/200/300?random=2',
    name: 'Blog 2',
    shortDescription: 'Short description for Blog 2'
  },
  {
    id: 3,
    image: 'https://picsum.photos/200/300?random=3',
    name: 'Blog 3',
    shortDescription: 'Short description for Blog 3'
  }
];

const Blogmain = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/add-blog');
  };

  // Sample data for the table
  // const rows = [
  //   { id: 1, supermarket: 'Supermarket 1', phone: '123-456-7890', email: 'supermarket1@example.com', pocName: 'John Doe' },
  //   { id: 2, supermarket: 'Supermarket 2', phone: '987-654-3210', email: 'supermarket2@example.com', pocName: 'Jane Smith' }
  //   // Add more rows as needed
  // ];

  return (
    <>
      <MainCard
        title="Blogs"
        secondary={
          <Button variant="contained" color="primary" onClick={() => handleClick()}>
            Add Blog
          </Button>
        }
      >
        {/* <Table>
          <TableHead>
            <TableRow>
              <TableCell>Supermarket</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>POC Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.supermarket}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.pocName}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="edit" onClick={() => handleEdit(row.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete" onClick={() => handleDelete(row.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
        <Grid container spacing={2}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
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

export default Blogmain;
