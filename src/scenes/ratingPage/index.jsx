// import React, { useEffect, useState } from "react";
// import { Box, Typography } from "@mui/material";
// import { useSelector } from "react-redux";
// import Follow from "./Follow"; // ייבוא רכיב ה-Follow

const RatingPage = () => {
//   const [users, setUsers] = useState([]);
//   const token = useSelector((state) => state.token);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const response = await fetch("http://localhost:3001/users/rating", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       // מיון המשתמשים לפי מספר הכוכבים מהגבוה לנמוך
//       const sortedUsers = data.sort((a, b) => b.stars - a.stars);
//       setUsers(sortedUsers);
//     };

//     fetchUsers();
//   }, [token]);

//   return (
//     <Box m="2rem">
//       <Typography variant="h4" fontWeight="500" mb="2rem" textAlign="center">
//         Users Rating
//       </Typography>
//       <Box display="flex" flexDirection="column" alignItems="center" gap="1.5rem">
//         {users.map((user) => (
//           <Follow
//             key={user._id}
//             followingId={user._id}
//             name={user.firstName + " " + user.lastName}
//             subtitle={user.occupation || ""}
//             userPicturePath={user.picturePath || "anonymous.jpg"}
//             stars={user.stars || 0}
//           />
//         ))}
//       </Box>
//     </Box>
//   );
};

export default RatingPage;

