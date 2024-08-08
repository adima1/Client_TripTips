import React from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";

const editProfileSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  location: yup.string().required("Location is required"),
  occupation: yup.string().required("Occupation is required"),
});

const EditProfileForm = ({ open, handleClose, currentUser, onSave, token }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValues = {
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    email: currentUser.email || "",
    location: currentUser.location || "",
    occupation: currentUser.occupation || "",
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const response = await fetch(`https://server-triptips.onrender.com/users/${currentUser._id}`, {
        method: "PATCH",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        onSave(updatedUser);
        onSubmitProps.resetForm();
        handleClose();
      } else {
        const errorData = await response.json();
        console.error("Failed to update profile:", errorData.message);
        // כאן תוכל להוסיף הודעת שגיאה למשתמש
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // כאן תוכל להוסיף הודעת שגיאה למשתמש
    }
  };




  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Edit Profile
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={editProfileSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    mt: "2rem",
                    p: "0.7rem",
                    backgroundColor: "#006B7D",
                    fontSize: "1.2rem",
                    color: "white",
                    "&:hover": { color: "white", backgroundColor: "#0092A8" },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

EditProfileForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string,
    occupation: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default EditProfileForm;