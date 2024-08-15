import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import PropTypes from "prop-types";

const PostsWidget = ({ userId, region, searchTerm = "", isProfile = false, isLiked = false, isSaved = false, isShared = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts || []); // וידוא שמצב הפוסטים הוא מערך
  const token = useSelector((state) => state.token);

  const getAllPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts?searchTerm=${encodeURIComponent(searchTerm)}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getPostsByRegion = async () => {
    const response = await fetch(`http://localhost:3001/posts/region?region=${encodeURIComponent(region)}&searchTerm=${encodeURIComponent(searchTerm)}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts?region=${encodeURIComponent(region)}&searchTerm=${encodeURIComponent(searchTerm)}`,
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
      `http://localhost:3001/posts/${userId}/likes?region=${encodeURIComponent(region)}&searchTerm=${encodeURIComponent(searchTerm)}`,
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
      `http://localhost:3001/posts/${userId}/saves?region=${encodeURIComponent(region)}&searchTerm=${encodeURIComponent(searchTerm)}`,
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
      `http://localhost:3001/posts/${userId}/shares?region=${encodeURIComponent(region)}&searchTerm=${encodeURIComponent(searchTerm)}`,
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
    } else if (isLiked) {
      getLikedPosts();
    } else if (isSaved) {
      getSavedPosts();
    } else if (isShared) {
      getSharedPosts();
    } else if (region) {
      getPostsByRegion(); // כאשר נבחר אזור, מביאים פוסטים לפי האזור ומונח החיפוש
    } else {
      getAllPosts(); // כאשר לא נבחר אזור, מביאים את כל הפוסטים עם אפשרות לחיפוש לפי מונח
    }
  }, [region, searchTerm, isProfile, isLiked, isSaved, isShared]);

  if (!Array.isArray(posts) || posts.length === 0) {
    return <div>oopsi not found :)</div>; // הצגת הודעה כאשר אין פוסטים זמינים
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
            key={_id} // מפתח ייחודי לכל פוסט
            postId={_id} // מזהה הפוסט
            postUserId={userId} // מזהה המשתמש שפרסם את הפוסט
            name={`${firstName} ${lastName}`} // שם מלא של המשתמש
            title={title} // כותרת הפוסט
            description={description} // תיאור הפוסט
            location={location} // מיקום הפוסט
            picturePath={picturePath} // נתיב התמונה של הפוסט
            userPicturePath={userPicturePath} // נתיב התמונה של המשתמש
            likes={likes} // לייקים על הפוסט
            saved={saved} // שמירות של הפוסט
            shared={shared} // שיתופים של הפוסט
            comments={comments} // תגובות על הפוסט
          />
        )
      )}
    </>
  );
};

PostsWidget.propTypes = {
  userId: PropTypes.string.isRequired, // מזהה המשתמש חובה
  region: PropTypes.string, // אזור (אופציונלי)
  searchTerm: PropTypes.string, // מונח החיפוש (אופציונלי)
  isProfile: PropTypes.bool, // האם הפוסטים מוצגים בפרופיל
  isLiked: PropTypes.bool, // האם הפוסטים מסוננים לפי לייקים
  isSaved: PropTypes.bool, // האם הפוסטים מסוננים לפי שמירות
  isShared: PropTypes.bool, // האם הפוסטים מסוננים לפי שיתופים
};

export default PostsWidget;