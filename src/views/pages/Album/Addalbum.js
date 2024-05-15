// import React, { useState } from "react";
// import { Grid, Button, Input, TextField, IconButton } from "@mui/material";
// import { IconCloudUpload, IconUpload } from "@tabler/icons-react";
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
//                 <div style={{ width: "300px", height: "200px" }}>
//                   {" "}
//                   {/* Set height explicitly */}
//                   {!imagePreview ? (
//                     <label htmlFor="upload-photo">
//                       <Input
//                         id="upload-photo"
//                         name="image"
//                         type="file"
//                         inputProps={{
//                           accept: "image/*",
//                           style: { display: "none" },
//                         }}
//                         onChange={(event) =>
//                           handleImageChange(event, setFieldValue)
//                         }
//                       />
//                       <Button
//                         variant="outlined"
//                         component="span"
//                         style={{
//                           border: "1px dashed black",
//                           width: "100%",
//                           height: "100%",
//                           borderRadius: "4px",
//                         }}
//                       >
//                         <IconCloudUpload />
//                       </Button>
//                     </label>
//                   ) : (
//                     <div
//                       style={{
//                         position: "relative",
//                         // width: "100%",
//                         // height: "100%",
//                         width: "300px",
//                         height: "200px",
//                         border: "1px solid black",
//                         borderRadius: "4px",
//                       }}
//                     >
//                       <img
//                         src={imagePreview}
//                         alt="Preview"
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover", // Ensures the image covers the div without distorting aspect ratio
//                         }}
//                       />
//                       <IconButton
//                         onClick={() => handleRemoveImage(setFieldValue)}
//                         style={{
//                           position: "absolute",
//                           top: 0,
//                           right: 0,
//                           color: "red",
//                         }}
//                       >
//                         <CloseIcon />
//                       </IconButton>
//                     </div>
//                   )}
//                 </div>
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

import React, { useState, useEffect } from "react";
import MainCard from "ui-component/cards/MainCard";
import {
  Grid,
  TextField,
  Button,
  Input,
  Dialog,
  DialogActions,
  IconButton,
} from "@mui/material";
import "react-quill/dist/quill.snow.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createAlbum } from "store/Album/albumActions";
import { useNavigate } from "react-router";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../ui-component/cropImage";
import { IconX, IconCloudUpload } from "@tabler/icons-react";
import Loader from "ui-component/Loader";

const AddAlbum = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputKey, setInputKey] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [crop, setCrop] = useState({ x: 0, y: 0, aspect: 16 / 9 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveCroppedImage = async (setFieldValue) => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    setImageSrc(null); // Close cropping dialog
    setFieldValue("image", croppedImage);
    setFieldValue("imagePreview", URL.createObjectURL(croppedImage));
  };

  const AlbumSchema = Yup.object().shape({
    name: Yup.string().required("Album Name is required"),
    image: Yup.mixed().required("An image is required"),
  });

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image);
    dispatch(createAlbum(formData))
      .then(() => navigate("/album"))
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={{
        name: "",
        image: null,
        imagePreview: null,
      }}
      validationSchema={AlbumSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form>
          <MainCard title={"Add Album"}>
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ marginBottom: "20px" }}>
                {!values.imagePreview && (
                  <label htmlFor="upload-photo">
                    <Input
                      key={inputKey}
                      id="upload-photo"
                      name="image"
                      type="file"
                      inputProps={{
                        accept: "image/*",
                        style: { display: "none" },
                      }}
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        if (file) {
                          setImageSrc(URL.createObjectURL(file)); // Open cropper
                        }
                      }}
                    />
                    <Button
                      variant="filled"
                      component="span"
                      style={{
                        width: "300px",
                        height: "200px",
                        border: "1px dashed rgb(175, 175, 175)",
                        backgroundColor: "whitesmoke",
                      }}
                    >
                      <IconCloudUpload color="#4d9de0" />
                    </Button>
                  </label>
                )}

                {imageSrc && (
                  <Dialog
                    open={Boolean(imageSrc)}
                    onClose={() => setImageSrc(null)}
                    maxWidth={false}
                    fullWidth
                    PaperProps={{
                      style: {
                        width: "600px",
                        maxWidth: "none",
                        height: "600px",
                        maxHeight: "none",
                      },
                    }}
                  >
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      onCropChange={setCrop}
                      onCropComplete={handleCropComplete}
                      onZoomChange={setZoom}
                      cropShape="rect"
                      aspect={3 / 2}
                      style={{ width: "300px", height: "200px" }}
                    />
                    <DialogActions>
                      <Button onClick={() => setImageSrc(null)}>Cancel</Button>
                      <Button
                        onClick={() => handleSaveCroppedImage(setFieldValue)}
                      >
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                )}

                {values.imagePreview && (
                  <div
                    style={{
                      position: "relative",
                      width: "300px",
                      height: "200px",
                    }}
                  >
                    <img
                      src={values.imagePreview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      onClick={() => {
                        setFieldValue("image", null);
                        setFieldValue("imagePreview", null);
                        setInputKey(Date.now());
                      }}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        color: "red",
                      }}
                    >
                      <IconX />
                    </IconButton>
                  </div>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="name"
                  as={TextField}
                  label="Album Name*"
                  variant="outlined"
                  fullWidth
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ marginTop: "25px" }}>
              <Button type="submit" variant="contained" color="primary">
                Save Album
              </Button>
            </Grid>
          </MainCard>
        </Form>
      )}
    </Formik>
  );
};

export default AddAlbum;
