import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const AboutPage = () => {
  const [aboutContent, setAboutContent] = useState({ title: "", content: "" });

  useEffect(() => {
    fetch("/about")
      .then((response) => response.json())
      .then((data) => setAboutContent(data))
      .catch((error) => console.error("Error fetching about content:", error));
  }, []);

  return (
    <Box
      width="100%"
      padding="2rem 6%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
    >
      <Typography variant="h2" component="h1" gutterBottom>
        {aboutContent.title}
      </Typography>
      <Typography variant="body1" component="p" maxWidth="800px">
        {aboutContent.content}
      </Typography>
    </Box>
  );
};

export default AboutPage;
