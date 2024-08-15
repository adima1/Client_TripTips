import { Box, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import PropTypes from "prop-types";
import React from "react";

const PostWidgetNoUser = ({ name, title, description, picturePath, likeCount }) => {
  return (
    <WidgetWrapper m="2rem 0">
      <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
        {name}
      </Typography>
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
  picturePath: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
};

export default PostWidgetNoUser;
