import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  ThumbUp,
  Share,
  Bookmark,
  Visibility,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const StatItem = ({ icon, label, value }) => (
  <Card>
    <CardContent>
      <Box display="flex" flexDirection="column" alignItems="center">
        {icon}
        <Typography variant="h6" component="div">
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

StatItem.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

const StatisticsWidget = ({ userId }) => {
  const [stats, setStats] = useState(null);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const response = await fetch(
          `https://server-triptips.onrender.com/users/${userId}/statistics`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    getStatistics();
  }, [userId, token]);

  if (!stats) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box mt={2}>
      <Typography variant="h5" textAlign="center" mb={2}>
        סטטיסטיקות
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <StatItem
            icon={<ThumbUp color="primary" fontSize="large" />}
            label="לייקים שקיבלתי"
            value={stats.totalLikes}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatItem
            icon={<Share color="primary" fontSize="large" />}
            label="שיתופים של הפוסטים שלי"
            value={stats.totalShares}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatItem
            icon={<Bookmark color="primary" fontSize="large" />}
            label="שמירות של הפוסטים שלי"
            value={stats.totalSaves}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatItem
            icon={<Visibility color="primary" fontSize="large" />}
            label="צפיות בפרופיל"
            value={stats.profileViews}
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <Typography variant="body1" textAlign="center">
          {"סה\"כ פוסטים: "}{stats.totalPosts}
        </Typography>
        <Typography variant="body1" textAlign="center">
          {"ממוצע לייקים לפוסט: "}{(stats.totalLikes / stats.totalPosts || 0).toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

StatisticsWidget.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default StatisticsWidget;