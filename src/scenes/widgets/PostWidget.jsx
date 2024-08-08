import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  BookmarkBorderOutlined,
  BookmarkOutlined,
  StarOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import PropTypes from "prop-types";
import React, { useEffect } from "react";


const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  saved,
  comments,
  userRating,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user.id);
  console.log("loggedInUserId:", loggedInUserId);
  
  const [isLiked, setIsLiked] = useState(Boolean(likes[loggedInUserId]));
  //const [isLiked, setIsLiked] = useState(false);
  console.log("isLiked:", isLiked);
  const likeCount = Object.keys(likes).length;
  
  const [isSaved, setIsSaved] = useState(false);
  // const savedCount = Object.keys(saved).length;

  const [isShared, setIsShared] = useState(false);
 
  
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  
  
  const patchLike = async () => {
    try {
      const response = await fetch(`https://server-triptips.onrender.com/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const patchSave = async () => {
    try {
      const response = await fetch(`https://server-triptips.onrender.com/posts/${postId}/save`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleShare = () => {
    // Implement share functionality
    setIsShared(!isShared);
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <Box position="relative">
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`https://server-triptips.onrender.com/assets/${picturePath}`}
          />
          <Box position="absolute" top="10px" right="10px">
            <IconButton>
              <StarOutlined sx={{ color: "gold" }} />
            </IconButton>
            <Typography variant="body2" color="white">
              {userRating}
            </Typography>
          </Box>
        </Box>
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>

            <IconButton onClick={patchSave}>
              {isSaved ? (
                <BookmarkOutlined sx={{ color: primary }} />
              ) : (
                <BookmarkBorderOutlined />
              )}
            </IconButton>

          </FlexBetween>

          <IconButton onClick={handleShare}>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>

        <FlexBetween gap="0.3rem">
          <IconButton>
            <ChatBubbleOutlineOutlined />
          </IconButton>
          <Typography>{comments.length}</Typography>
        </FlexBetween>
      </FlexBetween>
    </WidgetWrapper>
  );
};

PostWidget.propTypes = {
  postId: PropTypes.string.isRequired,
  postUserId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  picturePath: PropTypes.string,
  userPicturePath: PropTypes.string,
  likes: PropTypes.object.isRequired,
  saved: PropTypes.object.isRequired,
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
  userRating: PropTypes.number.isRequired,
};

export default PostWidget;