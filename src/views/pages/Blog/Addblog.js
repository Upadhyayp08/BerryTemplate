import React, { useState, useEffect } from "react";
import MainCard from "ui-component/cards/MainCard";
import {
  Grid,
  TextField,
  Button,
  Input,
  Dialog,
  DialogActions,
  Slider,
} from "@mui/material";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { BlogById, createBlog, updateBlog } from "store/Blog/blogActions";
import { useNavigate, useParams } from "react-router";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../ui-component/cropImage";
import { IconArrowUp, IconX } from "@tabler/icons-react";
import Loader from "ui-component/Loader";

const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blog = useSelector((state) => state.blog.blogbyid);
  const { id } = useParams();
  const [inputKey, setInputKey] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [crop, setCrop] = useState({ x: 0, y: 0, aspect: 16 / 9 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(BlogById(id)).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, dispatch]);

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveCroppedImage = async (setFieldValue) => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    setImageSrc(null); // Close cropping dialog
    setFieldValue("image", croppedImage);
    setFieldValue("imagePreview", URL.createObjectURL(croppedImage));
  };

  const BlogSchema = Yup.object().shape({
    title: Yup.string().required("Blog Title is required"),
    shortdescription: Yup.string().required("Short description is required"),
    description: Yup.string().required("description is required"),
    image: Yup.mixed().required("An image is required"),
  });

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", values.title);
    formData.append("short_desc", values.shortdescription);
    formData.append("description", values.description);
    formData.append("image", values.image);
    dispatch(id ? updateBlog(formData) : createBlog(formData))
      .then(() => navigate("/blog"))
      .catch((err) => console.log(err));
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        title: id ? blog.title : "",
        shortdescription: id ? blog.shortdescription : "",
        description: id ? blog.description : "",
        image: id ? blog.image : null,
        imagePreview: id ? blog.image : null,
      }}
      validationSchema={BlogSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form>
          <MainCard title="Add Blog">
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
                      style={{ border: "1px solid black" }}
                    >
                      Upload Image
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
                      style: { width: "50%", height: "80vh" },
                    }}
                  >
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      onCropChange={setCrop}
                      onCropComplete={handleCropComplete}
                      onZoomChange={setZoom}
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
                  <div style={{ marginTop: "20px" }}>
                    <img
                      src={values.imagePreview}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "300px" }}
                    />
                    <Button
                      onClick={() => {
                        setFieldValue("image", null);
                        setFieldValue("imagePreview", null);
                        setInputKey(Date.now());
                      }}
                      style={{ color: "red", marginLeft: "10px" }}
                    >
                      <IconX />
                    </Button>
                  </div>
                )}
              </Grid>

              <Grid item xs={6} container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="title"
                    as={TextField}
                    label="Title"
                    variant="outlined"
                    fullWidth
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="shortdescription"
                    as={TextField}
                    label="Short description"
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    error={
                      touched.shortdescription &&
                      Boolean(errors.shortdescription)
                    }
                    helperText={
                      touched.shortdescription && errors.shortdescription
                    }
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <ReactQuill
                  value={values.description}
                  onChange={(value) => setFieldValue("description", value)}
                />
                {touched.description && errors.description && (
                  <div style={{ color: "red", marginTop: "10px" }}>
                    {errors.description}
                  </div>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit Blog
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Form>
      )}
    </Formik>
  );
};

export default Addblog;
