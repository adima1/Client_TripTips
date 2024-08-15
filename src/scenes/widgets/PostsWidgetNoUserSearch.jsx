import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidgetNoUser from "./PostWidgetNoUser";
import PropTypes from "prop-types";

const PostsWidgetNoUserSearch = ({ region, searchTerm = "" }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts || []);

  // בקשת כל הפוסטים עבור אורחים
  const getAllPosts = async () => {
    try {
      console.log(`Fetching all posts with searchTerm: ${searchTerm}`);
      const response = await fetch(`http://localhost:3001/posts?searchTerm=${encodeURIComponent(searchTerm)}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Posts fetched:", data); // הדפסת הנתונים שהתקבלו
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
  };

  // בקשת הפוסטים לפי אזור עבור אורחים
  const getPostsByRegion = async () => {
    try {
      console.log(`Fetching posts by region: ${region} with searchTerm: ${searchTerm}`);
      const response = await fetch(`http://localhost:3001/posts/region?region=${encodeURIComponent(region)}&searchTerm=${encodeURIComponent(searchTerm)}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Posts fetched by region:", data); // הדפסת הנתונים שהתקבלו
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
  };

  useEffect(() => {
    if (region) {
      getPostsByRegion(); // כאשר נבחר אזור, מביאים פוסטים לפי האזור ומונח החיפוש
    } else {
      getAllPosts(); // כאשר לא נבחר אזור, מביאים את כל הפוסטים עם אפשרות לחיפוש לפי מונח
    }
  }, [region, searchTerm]);

  if (!Array.isArray(posts) || posts.length === 0) {
    return <div>No posts found for the selected filters</div>; 
  }

  return (
    <>
      {posts.map(
        ({
          _id,
          firstName,
          lastName,
          title,
          description,
          picturePath,
          likes,
        }) => (
          <PostWidgetNoUser
            key={_id} 
            name={`${firstName} ${lastName}`} 
            title={title} 
            description={description} 
            picturePath={picturePath} 
            likeCount={Object.keys(likes).length} 
          />
        )
      )}
    </>
  );
};

PostsWidgetNoUserSearch.propTypes = {
  region: PropTypes.string,
  searchTerm: PropTypes.string,
};

export default PostsWidgetNoUserSearch;
