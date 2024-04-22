import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Button, TextField, Grid, Box, MenuItem } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

function Addpurchase() {
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
    <MainCard title="Add Purchase">
      <Formik
        initialValues={{
          materialName: '',
          quantity: '',
          unit: '',
          amount: '',
          comments: ''
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Field component={TextField} type="text" name="materialName" label="Material Name" select fullWidth variant="outlined">
                  <MenuItem value="">Select Material</MenuItem>
                  <MenuItem value="Material1">Material 1</MenuItem>
                  <MenuItem value="Material2">Material 2</MenuItem>
                  {/* Additional materials can be added here */}
                </Field>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field component={TextField} type="text" name="quantity" label="Quantity" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field component={TextField} type="text" name="unit" label="Unit" select fullWidth variant="outlined">
                  <MenuItem value="">Select Unit</MenuItem>
                  <MenuItem value="kg">Kg</MenuItem>
                  <MenuItem value="pcs">Pieces</MenuItem>
                  {/* Additional units can be added here */}
                </Field>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field component={TextField} type="text" name="amount" label="Amount" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <Field component={TextField} type="text" name="comments" label="Comments" fullWidth multiline variant="outlined" rows={4} />
              </Grid>
              <Grid item xs={12}>
                <Box mt={2}>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </MainCard>
  );
}

export default Addpurchase;
