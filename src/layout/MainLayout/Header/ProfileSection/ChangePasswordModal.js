// // // ChangePasswordModal.jsx

// // import React from "react";
// // import { Modal, Box, Typography, TextField, Button } from "@mui/material";
// // import { Formik, Form, Field } from "formik";
// // import * as Yup from "yup";

// // const ChangePasswordModal = ({ open, onClose }) => {
// //   const initialValues = {
// //     old_password: "",
// //     new_password: "",
// //     confirmPassword: "",
// //   };

// //   const validationSchema = Yup.object().shape({
// //     old_password: Yup.string().required("Old password is required"),
// //     new_password: Yup.string().required("New password is required"),
// //     confirmPassword: Yup.string()
// //       .oneOf([Yup.ref("new_password"), null], "Passwords must match")
// //       .required("Confirm password is required"),
// //   });

// //   const handleSubmit = (values) => {
// //     console.log(values);
// //     onClose();
// //   };

// //   return (
// //     <Modal
// //       open={open}
// //       onClose={onClose}
// //       style={{
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //       }}
// //     >
// //       <Box
// //         sx={{
// //           bgcolor: "white",
// //           p: 4,
// //           borderRadius: 4,
// //           minWidth: 300,
// //         }}
// //       >
// //         <Typography variant="h5" gutterBottom>
// //           Change Password
// //         </Typography>
// //         <Formik
// //           initialValues={initialValues}
// //           validationSchema={validationSchema}
// //           onSubmit={handleSubmit}
// //         >
// //           {({ errors, touched }) => (
// //             <Form>
// //               <Box sx={{ marginBottom: "20px" }}>
// //                 <Field
// //                   fullWidth
// //                   name="old_password"
// //                   type="password"
// //                   label="Old Password"
// //                   as={TextField}
// //                   error={errors.old_password && touched.old_password}
// //                   helperText={errors.old_password}
// //                 />
// //               </Box>
// //               <Box sx={{ marginBottom: "20px" }}>
// //                 <Field
// //                   fullWidth
// //                   name="new_password"
// //                   type="password"
// //                   label="New Password"
// //                   as={TextField}
// //                   error={errors.new_password && touched.new_password}
// //                   helperText={errors.new_password}
// //                 />
// //               </Box>
// //               <Box sx={{ marginBottom: "20px" }}>
// //                 <Field
// //                   fullWidth
// //                   name="confirmPassword"
// //                   type="password"
// //                   label="Confirm Password"
// //                   as={TextField}
// //                   error={errors.confirmPassword && touched.confirmPassword}
// //                   helperText={errors.confirmPassword}
// //                 />
// //               </Box>
// //               <Button type="submit" variant="contained" color="primary">
// //                 Change Password
// //               </Button>
// //             </Form>
// //           )}
// //         </Formik>
// //       </Box>
// //     </Modal>
// //   );
// // };

// // export default ChangePasswordModal;

// // ChangePasswordModal.jsx

// import React from "react";
// import { Modal, Box, Typography, TextField, Button } from "@mui/material";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import API from "helper/API";
// import Notification from "helper/Notification";
// import { useNavigate } from "react-router";

// const ChangePasswordModal = ({ open, onClose }) => {
//   const navigate = useNavigate();
//   const initialValues = {
//     old_password: "",
//     new_password: "",
//     confirmPassword: "",
//   };

//   const validationSchema = Yup.object().shape({
//     old_password: Yup.string().required("Old password is required"),
//     new_password: Yup.string().required("New password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("new_password"), null], "Passwords must match")
//       .required("Confirm password is required"),
//   });

//   const handleSubmit = (values) => {
//     console.log(values);
//     API.post("/change/password", values).then((res) => {
//       const {
//         data: { statusCode, message },
//       } = res;
//       if (statusCode === 200) {
//         Notification("success", message);
//         localStorage.clear();
//         navigate("/pages/login/login3");
//       }
//     });

//     onClose();
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Box
//         sx={{
//           bgcolor: "white",
//           p: 4,
//           borderRadius: 4,
//           minWidth: 300,
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           Change Password
//         </Typography>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ errors, touched }) => (
//             <Form>
//               <Box sx={{ marginBottom: "20px" }}>
//                 <Field
//                   fullWidth
//                   name="old_password"
//                   type="password"
//                   label="Old Password"
//                   as={TextField}
//                   error={touched.old_password && errors.old_password}
//                   helperText={touched.old_password && errors.old_password}
//                 />
//               </Box>
//               <Box sx={{ marginBottom: "20px" }}>
//                 <Field
//                   fullWidth
//                   name="new_password"
//                   type="password"
//                   label="New Password"
//                   as={TextField}
//                   error={touched.new_password && errors.new_password}
//                   helperText={touched.new_password && errors.new_password}
//                 />
//               </Box>
//               <Box sx={{ marginBottom: "20px" }}>
//                 <Field
//                   fullWidth
//                   name="confirmPassword"
//                   type="password"
//                   label="Confirm Password"
//                   as={TextField}
//                   error={touched.confirmPassword && errors.confirmPassword}
//                   helperText={touched.confirmPassword && errors.confirmPassword}
//                 />
//               </Box>
//               <Button type="submit" variant="contained" color="primary">
//                 Change Password
//               </Button>
//             </Form>
//           )}
//         </Formik>
//       </Box>
//     </Modal>
//   );
// };

// export default ChangePasswordModal;

import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import API from "helper/API";
import Notification from "helper/Notification";
import { useNavigate } from "react-router";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ChangePasswordModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    old_password: "",
    new_password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    old_password: Yup.string().required("Old password is required"),
    new_password: Yup.string().required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values) => {
    API.post("/change/password", values)
      .then((res) => {
        const {
          data: { statusCode, message, response },
        } = res;

        if (statusCode === 200) {
          Notification("success", message);
          localStorage.clear();
          navigate("/pages/login/login3");
          onClose();
        } else {
          Notification("error", response[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "old_password":
        setShowOldPassword(!showOldPassword);
        break;
      case "new_password":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirmPassword":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          p: 4,
          borderRadius: 4,
          minWidth: 300,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }} gutterBottom>
          Change Password
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Box sx={{ marginBottom: "20px" }}>
                <Field
                  fullWidth
                  name="old_password"
                  type={showOldPassword ? "text" : "password"}
                  label="Old Password"
                  as={TextField}
                  error={touched.old_password && errors.old_password}
                  helperText={touched.old_password && errors.old_password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            togglePasswordVisibility("old_password")
                          }
                        >
                          {showOldPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <Field
                  fullWidth
                  name="new_password"
                  type={showNewPassword ? "text" : "password"}
                  label="New Password"
                  as={TextField}
                  error={touched.new_password && errors.new_password}
                  helperText={touched.new_password && errors.new_password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            togglePasswordVisibility("new_password")
                          }
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <Field
                  fullWidth
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  as={TextField}
                  error={touched.confirmPassword && errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            togglePasswordVisibility("confirmPassword")
                          }
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Button type="submit" variant="contained" color="primary">
                Change Password
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
