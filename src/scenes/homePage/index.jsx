import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import React from "react";
import PostsWidget from "scenes/widgets/PostsWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // מרכז את התוכן
                p: 2, // הוסף ריפוד פנימי
            }}
        >
            <Navbar />
            <Box
                sx={{
                    
                    maxWidth: "700px", // מגביל את רוחב התוכן למקסימום של 1200 פיקסלים
                    width: "100%", // גורם לתוכן לתפוס את רוחב הקונטיינר ההורה
                    px: isNonMobileScreens ? 4 : 2, // הוסף ריפוד צדדי בהתאמה למסך קטן וגדול
                }}
            >
                <PostsWidget userId={_id} />
            </Box>
        </Box>
    );
};


export default HomePage;

/*const HomePage = ()=> {

    return (<div>HomePage</div>)
}

export default HomePage;*/