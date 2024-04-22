import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, TextField, Button, Input } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import { IconArrowUp } from '@tabler/icons-react';
import ReactQuill from 'react-quill';

function Addblog() {
  const [content, setContent] = useState('');

  const handleQuillChange = (value) => {
    setContent(value);
  };
  return (
    <>
      <MainCard title="Add Blog">
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ marginBottom: '20px' }}>
            <label htmlFor="upload-photo">
              <Input id="upload-photo" type="file" inputProps={{ accept: 'image/*', style: { display: 'none' } }} />
              <Button variant="filled" component="span" style={{ border: '1px solid black' }}>
                {/* Upload Image */}
                <IconArrowUp style={{ textAlign: 'center', margin: '100px' }} />
              </Button>
            </label>
          </Grid>

          <Grid item xs={6} container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Name" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Short Description" multiline rows={3} variant="outlined" fullWidth />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {/* React Quill for Long Description */}
            <ReactQuill
              value={content}
              onChange={handleQuillChange}
              modules={{
                toolbar: [
                  [{ header: '1' }, { header: '2' }, { font: [] }],
                  [{ size: [] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image', 'video'],
                  ['clean']
                ]
              }}
              formats={[
                'header',
                'font',
                'size',
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'list',
                'bullet',
                'link',
                'image',
                'video'
              ]}
            />
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}

export default Addblog;
