import { Box, useMediaQuery, RadioGroup, FormControlLabel, Radio, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import PostsWidgetNoUserSearch from "scenes/widgets/PostsWidgetNoUserSearch";
import NavbarSearchNoUser from "scenes/navbar_search_no_user";

const SearchPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const [region, setRegion] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const resetFilter = () => {
        setRegion(""); // איפוס הסינון לפי אזור
        setSearchTerm(""); // איפוס מונח החיפוש
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
            }}
        >
            <NavbarSearchNoUser onSearchChange={handleSearchChange} />
            <Box
                sx={{
                    maxWidth: "700px",
                    width: "100%",
                    px: isNonMobileScreens ? 4 : 2,
                    my: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Select a Region:
                </Typography>
                <RadioGroup
                    value={region}
                    onChange={handleRegionChange}
                    sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", flexGrow: 1 }}
                >
                    <FormControlLabel value="north" control={<Radio />} label="North" />
                    <FormControlLabel value="center" control={<Radio />} label="Center" />
                    <FormControlLabel value="south" control={<Radio />} label="South" />
                </RadioGroup>
                <Button 
                    variant="outlined" 
                    onClick={resetFilter} 
                    sx={{
                        ml: 2,
                        fontSize: "0.875rem",
                        padding: "6px 12px",
                        borderColor: "#0097A7", 
                        color: "#0097A7", 
                        "&:hover": {
                            backgroundColor: "#e0f7fa", 
                            borderColor: "#004e5a", 
                        },
                    }}
                >
                    Reset Filter
                </Button>
            </Box>
            <Box
                sx={{
                    maxWidth: "700px",
                    width: "100%",
                    px: isNonMobileScreens ? 4 : 2,
                }}
            >
                <PostsWidgetNoUserSearch region={region} searchTerm={searchTerm} />
            </Box>
        </Box>
    );
};

export default SearchPage;