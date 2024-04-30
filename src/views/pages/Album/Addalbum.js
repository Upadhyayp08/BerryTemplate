// import React from "react";
// import { Grid, Button, Input, TextField } from "@mui/material";
// import { IconArrowUp } from "@tabler/icons-react";
// import MainCard from "ui-component/cards/MainCard";
// function Addalbum() {
//   return (
//     <>
//       <MainCard title="Add Album">
//         <Grid item xs={12} sx={{ marginBottom: "20px" }}>
//           <label htmlFor="upload-photo">
//             <Input
//               id="upload-photo"
//               type="file"
//               inputProps={{ accept: "image/*", style: { display: "none" } }}
//             />
//             <Button
//               variant="filled"
//               component="span"
//               style={{ border: "1px solid black" }}
//             >
//               {/* Upload Image */}
//               <IconArrowUp style={{ textAlign: "center", margin: "100px" }} />
//             </Button>
//           </label>
//         </Grid>
//         <Grid item xs={12}>
//           <TextField label="Album Name" variant="outlined" fullWidth />
//         </Grid>
//       </MainCard>
//     </>
//   );
// }

// export default Addalbum;

// import React, { useState } from "react";
// import { Grid, Button, Input, TextField, IconButton } from "@mui/material";
// import { IconArrowUp } from "@tabler/icons-react";
// import CloseIcon from "@mui/icons-material/Close";
// import MainCard from "ui-component/cards/MainCard";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router";
// import { createAlbum } from "store/Album/albumActions";
// import { useDispatch } from "react-redux";

// function AddAlbum() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const initialValues = {
//     name: "",
//     image: null,
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Required"),
//     image: Yup.mixed().required("A file is required"),
//   });

//   const handleImageChange = (event, setFieldValue) => {
//     const file = event.currentTarget.files[0];
//     if (file) {
//       const imagePreviewUrl = URL.createObjectURL(file);
//       setSelectedImage(file);
//       setImagePreview(imagePreviewUrl);
//       setFieldValue("image", file);
//     }
//   };

//   const handleRemoveImage = (setFieldValue) => {
//     setSelectedImage(null);
//     setImagePreview("");
//     setFieldValue("image", null);
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={(values, { setSubmitting }) => {
//         // alert("Form is validated! Submit the form logic here.");
//         // console.log("Submitted Values:", values);
//         const formData = new FormData();
//         formData.append("name", values.name);
//         formData.append("image", values.image);
//         dispatch(createAlbum(formData)).then((res) => navigate("/album"));
//         setSubmitting(false);
//       }}
//     >
//       {({ setFieldValue, isSubmitting, errors, touched }) => (
//         <Form>
//           <MainCard title="Add Album">
//             <Grid container spacing={2}>
//               <Grid item xs={4} sx={{ marginBottom: "20px" }}>
//                 {!imagePreview ? (
//                   <label htmlFor="upload-photo">
//                     <Input
//                       id="upload-photo"
//                       name="image"
//                       type="file"
//                       inputProps={{
//                         accept: "image/*",
//                         style: { display: "none" },
//                       }}
//                       onChange={(event) =>
//                         handleImageChange(event, setFieldValue)
//                       }
//                     />
//                     <Button
//                       variant="outlined"
//                       component="span"
//                       style={{
//                         border: "1px solid black",
//                         width: "80%",
//                         height: "100%",
//                         borderRadius: "4px",
//                         padding: "100px",
//                       }}
//                     >
//                       <IconArrowUp />
//                     </Button>
//                   </label>
//                 ) : (
//                   <div
//                     style={{
//                       position: "relative",
//                       width: "80%",
//                       border: "1px solid black",
//                       borderRadius: "4px",
//                     }}
//                   >
//                     <img
//                       src={imagePreview}
//                       alt="Preview"
//                       style={{
//                         width: "100%",
//                         height: "auto",
//                         borderRadius: "4px",
//                       }}
//                     />
//                     <IconButton
//                       onClick={() => handleRemoveImage(setFieldValue)}
//                       style={{
//                         position: "absolute",
//                         top: 0,
//                         right: 0,
//                         color: "red",
//                       }}
//                     >
//                       <CloseIcon />
//                     </IconButton>
//                   </div>
//                 )}
//                 {touched.image && errors.image ? (
//                   <div style={{ color: "red", marginTop: "5px" }}>
//                     {errors.image}
//                   </div>
//                 ) : null}
//               </Grid>
//               <Grid item xs={12}>
//                 <Field
//                   as={TextField}
//                   name="name"
//                   label="Album Name"
//                   variant="outlined"
//                   fullWidth
//                   error={touched.name && !!errors.name}
//                   helperText={touched.name && errors.name}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   disabled={isSubmitting}
//                 >
//                   Save Album
//                 </Button>
//               </Grid>
//             </Grid>
//           </MainCard>
//         </Form>
//       )}
//     </Formik>
//   );
// }

// export default AddAlbum;

import React, { useState } from "react";
import { Grid, Button, Input, TextField, IconButton } from "@mui/material";
import { IconArrowUp } from "@tabler/icons-react";
import CloseIcon from "@mui/icons-material/Close";
import MainCard from "ui-component/cards/MainCard";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { createAlbum } from "store/Album/albumActions";
import { useDispatch } from "react-redux";

function AddAlbum() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    image: Yup.mixed().required("A file is required"),
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);
      setSelectedImage(file);
      setImagePreview(imagePreviewUrl);
      setFieldValue("image", file);
    }
  };

  const handleRemoveImage = (setFieldValue) => {
    setSelectedImage(null);
    setImagePreview("");
    setFieldValue("image", null);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("image", values.image);
        dispatch(createAlbum(formData)).then((res) => navigate("/album"));
        setSubmitting(false);
      }}
    >
      {({ setFieldValue, isSubmitting, errors, touched }) => (
        <Form>
          <MainCard title="Add Album">
            <Grid container spacing={2}>
              <Grid item xs={4} sx={{ marginBottom: "20px" }}>
                <div style={{ width: "80%", height: "300px" }}>
                  {" "}
                  {/* Set height explicitly */}
                  {!imagePreview ? (
                    <label htmlFor="upload-photo">
                      <Input
                        id="upload-photo"
                        name="image"
                        type="file"
                        inputProps={{
                          accept: "image/*",
                          style: { display: "none" },
                        }}
                        onChange={(event) =>
                          handleImageChange(event, setFieldValue)
                        }
                      />
                      <Button
                        variant="outlined"
                        component="span"
                        style={{
                          border: "1px solid black",
                          width: "100%",
                          height: "100%",
                          borderRadius: "4px",
                        }}
                      >
                        <IconArrowUp />
                      </Button>
                    </label>
                  ) : (
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        border: "1px solid black",
                        borderRadius: "4px",
                      }}
                    >
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover", // Ensures the image covers the div without distorting aspect ratio
                        }}
                      />
                      <IconButton
                        onClick={() => handleRemoveImage(setFieldValue)}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          color: "red",
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  )}
                </div>
                {touched.image && errors.image ? (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.image}
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="name"
                  label="Album Name"
                  variant="outlined"
                  fullWidth
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Save Album
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Form>
      )}
    </Formik>
  );
}

export default AddAlbum;
