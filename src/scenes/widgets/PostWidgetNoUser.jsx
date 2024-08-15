import { Box, Typography, Avatar } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import PropTypes from "prop-types";
import React from "react";

const PostWidgetNoUser = ({ name, title, description, picturePath, likeCount, userPicturePath, location }) => {
  return (
    <WidgetWrapper m="2rem 0">
      <Box display="flex" alignItems="center">
        <Avatar
          alt={name}
          src={`http://localhost:3001/assets/${userPicturePath}`}
          sx={{ width: 56, height: 56, mr: 2 }}
        />
        <Box>
          <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>
          {location && (
            <Typography variant="body2" color="textSecondary">
              {location}
            </Typography>
          )}
        </Box>
      </Box>
      <Typography variant="h6" color="textSecondary" sx={{ mt: "0.5rem" }}>
        {title}
      </Typography>
      <Typography color="textSecondary" sx={{ mt: "0.5rem", mb: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <Box position="relative">
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        </Box>
      )}
      <Typography color="textSecondary" sx={{ mt: "0.5rem" }}>
        {likeCount} Likes
      </Typography>
    </WidgetWrapper>
  );
};

PostWidgetNoUser.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  picturePath: PropTypes.string,
  likeCount: PropTypes.number.isRequired,
  userPicturePath: PropTypes.string.isRequired, // נתיב תמונת הפרופיל של המשתמש שהעלה את הפוסט
  location: PropTypes.string, // הוספת location כפרופ אופציונלי
};

export default PostWidgetNoUser;