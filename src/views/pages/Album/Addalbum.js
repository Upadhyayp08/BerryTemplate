import React from 'react';
import { Grid, Button, Input, TextField } from '@mui/material';
import { IconArrowUp } from '@tabler/icons-react';
import MainCard from 'ui-component/cards/MainCard';
function Addalbum() {
  return (
    <>
      <MainCard title="Add Album">
        <Grid item xs={12} sx={{ marginBottom: '20px' }}>
          <label htmlFor="upload-photo">
            <Input id="upload-photo" type="file" inputProps={{ accept: 'image/*', style: { display: 'none' } }} />
            <Button variant="filled" component="span" style={{ border: '1px solid black' }}>
              {/* Upload Image */}
              <IconArrowUp style={{ textAlign: 'center', margin: '100px' }} />
            </Button>
          </label>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Album Name" variant="outlined" fullWidth />
        </Grid>
      </MainCard>
    </>
  );
}

export default Addalbum;
