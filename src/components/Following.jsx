import React from "react";
import PropTypes from "prop-types"; // ייבוא PropTypes
import { PersonAddOutlined, PersonRemoveOutlined, ShareOutlined, Star} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFollowing } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Follow = ({ followingId, name, subtitle, userPicturePath, stars }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const following = useSelector((state) => state.user.following);
  const loggedInUserId = useSelector((state) => state.user.id);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  console.log(following);
  const isFollowing = following.find((following) => following._id === followingId);
 console.log(isFollowing, followingId);
 console.log("Following array:", JSON.stringify(following, null, 2));

  const patchFollowing = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${id}/${followingId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFollowing({ following: data }));
    window.location.reload();
  };


  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${followingId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
            <Box display="flex" alignItems="center" ml={2}>
              <Star color="primary" />
              <Typography variant="body1" ml={1}>{stars || 0} stars</Typography>
            </Box>
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      
    {followingId !== loggedInUserId && (
      <IconButton
        onClick={() => patchFollowing()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFollowing ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    )}
    </FlexBetween>
  );
};

// הגדרת PropTypes עבור רכיב 
Follow.propTypes = {
  followingId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  userPicturePath: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired, // הגדרת PropTypes עבור מספר הכוכבים
};

export default Follow;
