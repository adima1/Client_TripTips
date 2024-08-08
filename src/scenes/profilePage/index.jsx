import React, { useEffect, useState, useCallback } from "react";
import { 
  Box, 
  useMediaQuery, 
  Tabs, 
  Tab, 
  Avatar, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  List, 
  ListItem, 
  ListItemText,
  IconButton,
  Tooltip
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Star, Close, Edit, Delete } from "@mui/icons-material";
import Navbar from "scenes/navbar";
import PostsWidget from "scenes/widgets/PostsWidget";
import StatisticsWidget from "scenes/widgets/StatisticsWidget";
import EditProfileForm from "./EditProfileForm";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState(0);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [postDetailsOpen, setPostDetailsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user.id);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();

  const getUser = useCallback(async () => {
    const response = await fetch(`https://server-triptips.onrender.com/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  }, [userId, token]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleFollowersOpen = () => setFollowersOpen(true);
  const handleFollowersClose = () => setFollowersOpen(false);
  const handleFollowingOpen = () => setFollowingOpen(true);
  const handleFollowingClose = () => setFollowingOpen(false);
  const handleEditProfileOpen = () => setEditProfileOpen(true);
  const handleEditProfileClose = () => setEditProfileOpen(false);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setPostDetailsOpen(true);
  };

  const handlePostDetailsClose = () => {
    setPostDetailsOpen(false);
    setSelectedPost(null);
  };

  const handleEditPost = (post) => {
    console.log("עריכת פוסט:", post);
    // יש להוסיף כאן את הלוגיקה לעריכת הפוסט
  };

  const handleDeletePost = (post) => {
    console.log("מחיקת פוסט:", post);
    // יש להוסיף כאן את הלוגיקה למחיקת הפוסט
  };

  const handleSaveProfile = async (updatedProfile) => {
    try {
      const response = await fetch(`https://server-triptips.onrender.com/users/${userId}`, {
        method: "PATCH",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProfile),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        // כאן תוכל להוסיף הודעת הצלחה למשתמש
      } else {
        // טיפול בשגיאות
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    handleEditProfileClose();
  };

  console.log("user:", userId,"hdesk", loggedInUserId);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Avatar
            src={`https://server-triptips.onrender.com/assets/${user.picturePath}`}
            sx={{ width: 150, height: 150, mb: 2 }}
          />
          <Typography variant="h4">{user.firstName} {user.lastName}</Typography>
          <Typography variant="body1" color="textSecondary" mb={2}>
            {user.email}
          </Typography>
          {userId === loggedInUserId && (
            <Button variant="outlined" onClick={handleEditProfileOpen}>edit profile</Button>
          )}
          <Box mt={2} display="flex" alignItems="center">
            <Button onClick={handleFollowersOpen}>followers: {user.followers?.length || 0}</Button>
            <Button onClick={handleFollowingOpen}>following: {user.following?.length || 0}</Button>
            <Box display="flex" alignItems="center" ml={2}>
              <Star color="primary" />
              <Typography variant="body1" ml={1}>{user.stars || 0} stars</Typography>
            </Box>
          </Box>
        </Box>

        <Box width="100%" maxWidth="600px">
          <Tabs value={tab} onChange={handleTabChange} centered>
            <Tab label="posts" />
            <Tab label="saved" />
            <Tab label="liked" />
            <Tab label="shared" />
            <Tab label="statistics" />
          </Tabs>
          {tab === 0 && (
            <PostsWidget
              userId={userId}
              isProfile
              onPostClick={handlePostClick}
              renderPostActions={(post) => (
                userId === loggedInUserId && (
                  <Box sx={{ display: "none", ".MuiCard-root:hover &": { display: "block" } }}>
                    <Tooltip title="ערוך">
                      <IconButton onClick={(e) => { e.stopPropagation(); handleEditPost(post); }}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="מחק">
                      <IconButton onClick={(e) => { e.stopPropagation(); handleDeletePost(post); }}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )
              )}
            />
          )}
          {tab === 1 && <PostsWidget userId={userId} isSaved onPostClick={handlePostClick} />}
          {tab === 2 && <PostsWidget userId={userId} isLiked onPostClick={handlePostClick} />}
          {tab === 3 && <PostsWidget userId={userId} isShared onPostClick={handlePostClick} />}
          {tab === 4 && <StatisticsWidget userId={userId} />}
        </Box>
      </Box>

      <Dialog open={followersOpen} onClose={handleFollowersClose}>
        <DialogTitle>
          עוקבים אחריי
          <IconButton
            aria-label="close"
            onClick={handleFollowersClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <List>
            {user.followers?.map((follower) => (
              <ListItem key={follower._id}>
                <ListItemText primary={`${follower.firstName} ${follower.lastName}`} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      <Dialog open={followingOpen} onClose={handleFollowingClose}>
        <DialogTitle>
          following
          <IconButton
            aria-label="close"
            onClick={handleFollowingClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <List>
            {user.following?.map((following) => (
              <ListItem key={following._id}>
                <ListItemText primary={`${following.firstName} ${following.lastName}`} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      <EditProfileForm
        open={editProfileOpen}
        handleClose={handleEditProfileClose}
        currentUser={user}
        onSave={handleSaveProfile}
      />

      <Dialog open={postDetailsOpen} onClose={handlePostDetailsClose}>
        <DialogTitle>
        post details
          <IconButton
            aria-label="close"
            onClick={handlePostDetailsClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedPost && (
            <>
              <Typography variant="h6">{selectedPost.title}</Typography>
              <Typography variant="body1">{selectedPost.content}</Typography>
              {userId === loggedInUserId && (
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button variant="outlined" color="primary" startIcon={<Edit />} onClick={() => handleEditPost(selectedPost)}>
                    edit
                  </Button>
                  <Button variant="outlined" color="secondary" startIcon={<Delete />} onClick={() => handleDeletePost(selectedPost)}>
                    delete
                  </Button>
                </Box>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
