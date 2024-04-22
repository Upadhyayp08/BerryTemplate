import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Button, TextField, Grid, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

function Addemployee() {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values); // Access form values
      setSubmitting(false); // Set submitting state to false
      navigate('/other-page'); // Redirect after submission
    }, 1000);
  };

  return (
    <MainCard title="Add Employee">
      <Formik
        initialValues={{
          name: '',
          id: '',
          designation: '',
          phone: '',
          email: '',
          experience: '',
          salary: ''
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              {/* First line: Name, ID, Designation */}
              <Grid item xs={12} sm={4}>
                <Field name="name" as={TextField} label="Name" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field name="id" as={TextField} label="ID" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field name="designation" as={TextField} label="Designation" fullWidth variant="outlined" />
              </Grid>

              {/* Second line: Phone, Email */}
              <Grid item xs={12} sm={6}>
                <Field name="phone" as={TextField} label="Phone" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name="email" as={TextField} label="Email" fullWidth variant="outlined" />
              </Grid>

              {/* Third line: Experience, Salary */}
              <Grid item xs={12} sm={6}>
                <Field name="experience" as={TextField} label="Experience" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name="salary" as={TextField} label="Salary" fullWidth variant="outlined" />
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

export default Addemployee;
