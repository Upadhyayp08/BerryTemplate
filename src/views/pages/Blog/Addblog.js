import React, { useState, useEffect } from "react";
import MainCard from "ui-component/cards/MainCard";
import { Grid, TextField, Button, Input } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import { IconArrowUp, IconX } from "@tabler/icons-react";
import ReactQuill from "react-quill";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { BlogById, createBlog, updateBlog } from "store/Blog/blogActions";
import { useNavigate, useParams } from "react-router";

const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputKey, setInputKey] = useState(Date.now()); // State to handle input key for reset
  const blog = useSelector((state) => state.blog.blogbyid);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(BlogById(id)).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id]);

  const BlogSchema = Yup.object().shape({
    title: Yup.string().required("Blog Title is required"),
    shortdescription: Yup.string().required("Short description is required"),
    description: Yup.string().required("description is required"),
    image: Yup.mixed().required("An image is required"),
  });

  // const handleSubmit = (values) => {
  //   const formData = new FormData();
  //   formData.append("title", values.title);
  //   formData.append("shortdescription", values.shortdescription);
  //   formData.append("description", values.description);
  //   formData.append("image", values.image);
  //   dispatch(createBlog(formData)).then((res) => {
  //     navigate("/blog");
  //   });
  // };
  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", values.title);
    formData.append("shortdescription", values.shortdescription);
    formData.append("description", values.description);
    formData.append("image", values.image);
    const action = id ? updateBlog(formData) : createBlog(formData);
    dispatch(action)
      .then((res) => {
        navigate("/blog");
        // setSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
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
                          setFieldValue("image", file);
                          setFieldValue(
                            "imagePreview",
                            URL.createObjectURL(file)
                          );
                        }
                      }}
                    />
                    <Button
                      variant="filled"
                      component="span"
                      style={{ border: "1px solid black" }}
                    >
                      <IconArrowUp
                        style={{ textAlign: "center", margin: "100px" }}
                      />
                    </Button>
                    {touched.image && errors.image && (
                      <div style={{ color: "red", marginTop: "10px" }}>
                        {errors.image}
                      </div>
                    )}
                  </label>
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
                        setInputKey(Date.now()); // Reset key to force input re-render
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
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "link",
                    "image",
                    "video",
                  ]}
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
