import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Button, TextField, Grid, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

function Addmaterial() {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    // Example: Perform form submission to your backend
    // Simulate a delay (e.g., API call) using setTimeout
    setTimeout(() => {
      console.log(values); // Access form values
      setSubmitting(false); // Set submitting state to false
      // Redirect to another page after form submission
      navigate('/other-page');
    }, 1000); // Simulate a delay of 1 second
  };

  return (
    <MainCard title="Add Material">
      <Formik
        initialValues={{
          materialName: ''
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Field name="pocName" as={TextField} label="POC Name" fullWidth variant="outlined" />
              </Grid>
            </Grid>
            <Box mt={2} alignContent="center">
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </MainCard>
  );
}

export default Addmaterial;
