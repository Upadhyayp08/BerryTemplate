// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup"; // Import Yup
// import { Button, TextField, Grid, Box, InputAdornment } from "@mui/material";
// import MainCard from "ui-component/cards/MainCard";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createEmployee,
//   EmployeeById,
//   updateEmployee,
// } from "store/Employee/employeeAction";
// import Loader from "ui-component/Loader";

// function AddEmployee() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true); // Add loading state
//   const employeebyid = useSelector((state) => state.employee.employeebyid);
//   const { id } = useParams();

//   // Validation schema
//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required("Name is Required"),
//     emp_id: Yup.string().required("Employee ID is Required"),
//     designation: Yup.string().required("Designation is Required"),
//     phone: Yup.string()
//       .matches(/^[0-9]+$/, "Must be only digits")
//       .min(9, "Must be exactly 9 digits")
//       .max(9, "Must be exactly 9 digits")
//       .required("Phone Number is Required"),
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is Required"),
//     experience: Yup.string()
//       // .typeError("You must specify a number")
//       // .min(0, "Minimum value 0")
//       .required("Experience is Required"),
//     salary: Yup.number()
//       .typeError("You must specify a number")
//       .required("Salary is Required"),
//   });

//   useEffect(() => {
//     if (id) {
//       dispatch(EmployeeById(id)).then(() => {
//         setLoading(false); // Set loading to false once data is fetched
//       });
//     } else {
//       setLoading(false); // Set loading to false if no id is present
//     }
//   }, [id]); // Make sure to include id in the dependency array

//   const handleSubmit = (values, { setSubmitting }) => {
//     if (id) {
//       dispatch(updateEmployee(values))
//         .then((res) => {
//           navigate("/employee");
//           setSubmitting(false);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       dispatch(createEmployee(values))
//         .then((res) => {
//           navigate("/employee");
//           setSubmitting(false);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   if (loading) {
//     return (
//       <div>
//         <Loader />
//       </div>
//     ); // Display a loading indicator while data is being fetched
//   }

//   return (
//     <MainCard title={id ? "Edit Employee" : "Add Employee"}>
//       <Formik
//         initialValues={{
//           id: id ? employeebyid.id : "",
//           name: id ? employeebyid.name : "",
//           emp_id: id ? employeebyid.emp_id : "",
//           designation: id ? employeebyid.designation : "",
//           phone: id ? employeebyid.phone : "",
//           email: id ? employeebyid.email : "",
//           experience: id ? employeebyid.experience : "",
//           salary: id ? employeebyid.salary : "",
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting, errors, touched }) => (
//           <Form>
//             <Grid container spacing={2}>
//               {/* Input fields with error messages */}
//               <Grid item xs={12} sm={4}>
//                 <Field
//                   name="name"
//                   as={TextField}
//                   label="Name*"
//                   fullWidth
//                   variant="outlined"
//                   error={touched.name && Boolean(errors.name)}
//                   helperText={<ErrorMessage name="name" />}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Field
//                   name="emp_id"
//                   as={TextField}
//                   label="Employee ID*"
//                   fullWidth
//                   variant="outlined"
//                   error={touched.emp_id && Boolean(errors.emp_id)}
//                   helperText={<ErrorMessage name="emp_id" />}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Field
//                   name="designation"
//                   as={TextField}
//                   label="Designation*"
//                   fullWidth
//                   variant="outlined"
//                   error={touched.designation && Boolean(errors.designation)}
//                   helperText={<ErrorMessage name="designation" />}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Field
//                   name="phone"
//                   as={TextField}
//                   label="Phone*"
//                   fullWidth
//                   variant="outlined"
//                   error={touched.phone && Boolean(errors.phone)}
//                   helperText={<ErrorMessage name="phone" />}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">+961</InputAdornment>
//                     ),
//                   }}
//                   // disabled // Disable editing
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Field
//                   name="email"
//                   as={TextField}
//                   label="Email*"
//                   fullWidth
//                   variant="outlined"
//                   error={touched.email && Boolean(errors.email)}
//                   helperText={<ErrorMessage name="email" />}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Field
//                   name="experience"
//                   as={TextField}
//                   label="Experience*"
//                   fullWidth
//                   variant="outlined"
//                   error={touched.experience && Boolean(errors.experience)}
//                   helperText={<ErrorMessage name="experience" />}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Field
//                   name="salary"
//                   as={TextField}
//                   label="Salary*"
//                   fullWidth
//                   variant="outlined"
//                   error={touched.salary && Boolean(errors.salary)}
//                   helperText={<ErrorMessage name="salary" />}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Box mt={2}>
//                   <Button
//                     type="submit"
//                     sx={{
//                       color: "white", // Set font color to white
//                     }}
//                     variant="contained"
//                     color="primary"
//                     disabled={isSubmitting}
//                   >
//                     Submit
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Form>
//         )}
//       </Formik>
//     </MainCard>
//   );
// }

// export default AddEmployee;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField, Grid, Box, InputAdornment } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployee,
  EmployeeById,
  updateEmployee,
} from "store/Employee/employeeAction";
import Loader from "ui-component/Loader";
import Notification from "helper/Notification";

function AddEmployee() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const employeebyid = useSelector((state) => state.employee.employeebyid);
  const { id } = useParams();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    emp_id: Yup.string().required("Employee ID is Required"),
    designation: Yup.string().required("Designation is Required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(9, "Must be exactly 9 digits")
      .max(9, "Must be exactly 9 digits")
      .required("Phone Number is Required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required"),
    experience: Yup.string().required("Experience is Required"),
    salary: Yup.number()
      .typeError("You must specify a number")
      .required("Salary is Required"),
  });

  useEffect(() => {
    if (id) {
      dispatch(EmployeeById(id)).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    const action = id ? updateEmployee : createEmployee;
    dispatch(action(values))
      .then((res) => {
        console.log(res);
        const {
          data: { message },
          status,
        } = res;
        if (status === 200) {
          Notification("success", message);
          navigate("/employee");
          setSubmitting(false);
        } else {
          Notification("error", message);
          setSubmitting(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setSubmitting(false);
        // setErrors(err.response.data.errors || { form: "An error occurred" });
      });
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <MainCard title={id ? "Edit Employee" : "Add Employee"}>
      <Formik
        initialValues={{
          id: id ? employeebyid.id : "",
          name: id ? employeebyid.name : "",
          emp_id: id ? employeebyid.emp_id : "",
          designation: id ? employeebyid.designation : "",
          phone: id ? employeebyid.phone : "",
          email: id ? employeebyid.email : "",
          experience: id ? employeebyid.experience : "",
          salary: id ? employeebyid.salary : "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Field
                  name="name"
                  as={TextField}
                  label="Name*"
                  fullWidth
                  variant="outlined"
                  error={touched.name && Boolean(errors.name)}
                  helperText={<ErrorMessage name="name" />}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  name="emp_id"
                  as={TextField}
                  label="Employee ID*"
                  fullWidth
                  variant="outlined"
                  error={touched.emp_id && Boolean(errors.emp_id)}
                  helperText={<ErrorMessage name="emp_id" />}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  name="designation"
                  as={TextField}
                  label="Designation*"
                  fullWidth
                  variant="outlined"
                  error={touched.designation && Boolean(errors.designation)}
                  helperText={<ErrorMessage name="designation" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="phone"
                  as={TextField}
                  label="Phone*"
                  fullWidth
                  variant="outlined"
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={<ErrorMessage name="phone" />}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+961</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="email"
                  as={TextField}
                  label="Email*"
                  fullWidth
                  variant="outlined"
                  error={touched.email && Boolean(errors.email)}
                  helperText={<ErrorMessage name="email" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="experience"
                  as={TextField}
                  label="Experience*"
                  fullWidth
                  variant="outlined"
                  error={touched.experience && Boolean(errors.experience)}
                  helperText={<ErrorMessage name="experience" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="salary"
                  as={TextField}
                  label="Salary*"
                  fullWidth
                  variant="outlined"
                  error={touched.salary && Boolean(errors.salary)}
                  helperText={<ErrorMessage name="salary" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Box mt={2}>
                  <Button
                    type="submit"
                    sx={{
                      color: "white",
                    }}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
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

export default AddEmployee;
