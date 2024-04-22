import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Button, TextField, Grid, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

function AddProduct() {
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
    <MainCard title="Add Product">
      <Formik
        initialValues={{
          pocName: '',
          pocPhone: '',
          pocEmail: '',
          customerName: '',
          customerPhone: '',
          customerEmail: '',
          customerAddress: '',
          customerWebsite: ''
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Field name="pocName" as={TextField} label="POC Name" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field name="pocPhone" as={TextField} label="POC Phone" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field name="pocEmail" as={TextField} label="POC Email" fullWidth variant="outlined" />
              </Grid>
              {/* <Grid item xs={12}>
                <Box mt={2}>
                  <Typography variant="h6">Customer Details</Typography>
                </Box>
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <Field name="customerName" as={TextField} label="Customer Name" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name="customerWebsite" as={TextField} label="Customer Website" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name="customerPhone" as={TextField} label="Customer Phone" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name="customerEmail" as={TextField} label="Customer Email" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField name="customerAddress" label="Customer Address" fullWidth multiline variant="outlined" rows={4} />
              </Grid>
            </Grid>
            <Box mt={2}>
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

export default AddProduct;
