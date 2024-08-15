import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import PropTypes from "prop-types";

const PostsWidget = ({ userId, isProfile = false, isLiked = false, isSaved = false, isShared = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts || []); // Ensure posts is an array
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getLikedPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/likes`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getSavedPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/saves`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getSharedPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/shares`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    }
    
    if (isLiked)  {
      getLikedPosts();
    }

    if (isSaved)  {
      getSavedPosts();
    }

    if (isShared)  {
      getSharedPosts();
    }

    else {
      getPosts();
    }
  }, [isProfile, isLiked, isSaved, isShared]); // Add isProfile and isLiked as dependencies if they can change

  if (!Array.isArray(posts)) {
    return <div>No posts available</div>;
  }

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          title,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          saved, 
          shared,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            title= {title}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            saved={saved}
            shared={shared}
            comments={comments}
          />
        )
      )}
    </>
  );
};

PostsWidget.propTypes = {
  userId: PropTypes.string.isRequired,
  isProfile: PropTypes.bool,
  isLiked: PropTypes.bool,
  isSaved: PropTypes.bool,
  isShared: PropTypes.bool,
};

export default PostsWidget;