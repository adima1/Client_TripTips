import React, { useState, useEffect } from "react"; // ייבוא React ו-hooks מהספרייה
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"; // ייבוא רכיבי MUI
import Form from "./Form"; // ייבוא רכיב טופס מהקובץ Form

// מערך תמונות שישמשו כרקע
const images = [
  "/assets/background1.jpg", // נתיב לתמונה 1
  "/assets/background2.jpg", // נתיב לתמונה 2
  "/assets/background3.jpg"  // נתיב לתמונה 3
];

const LoginPage = () => {
  // קבלת התמה הנוכחית מ-MUI
  const theme = useTheme();
  // בדיקה אם המסך הוא רחב (ללא גרסת המובייל)
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // יצירת מצב לשמירה על התמונה הנוכחית שמוצגת כרקע
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // שימוש ב-useEffect כדי להחליף תמונות כל 5 שניות
  useEffect(() => {
    const interval = setInterval(() => {
      // עדכון אינדקס התמונה הנוכחית
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // החלפת תמונה כל 5 שניות

    return () => clearInterval(interval); // ניקוי ה-interval בעת השמדת הקומפוננטה
  }, []);

  return (
    <Box
      sx={{
        width: "100%", // רוחב מלא של המסך
        minHeight: "100vh", // גובה מינימלי של 100% מהחלון
        backgroundImage: `url(${images[currentImageIndex]})`, // הגדרת התמונה הנוכחית כרקע
        backgroundSize: "cover", // כיסוי מלא של התמונה
        backgroundPosition: "center", // מרכז את התמונה
        display: "flex", // שימוש בתצוגה גמישה
        flexDirection: "column" // הצבת ילדים בעמודה
      }}
    >
      <Box
        width="100%" // רוחב של 90% של המסך
        display="flex" // שימוש בתצוגת פלקס
        justifyContent="center" // יישור אופקי של התוכן למרכז
        alignItems="center" // יישור אנכי של התוכן למרכז
        textAlign="center" // יישור הטקסט למרכז
        backgroundColor={`${theme.palette.background.alt}B3`} // צבע רקע חלופי עם שקיפות
      >
        <Typography fontWeight="bold" fontSize="70px" color="#006B7D">
          TripTips
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"} // רוחב משתנה בהתאם לגודל המסך
        p="2rem" // ריפוד פנימי
        m="2rem auto" // רווח אוטומטי בצדדים (מרכז) ורווח של 2rem למעלה ולמטה
        borderRadius="1.5rem" // פינות מעוגלות
        backgroundColor={`${theme.palette.background.alt}B3`} // צבע רקע חלופי עם שקיפות
        display="flex" // שימוש בתצוגת פלקס
        flexDirection="column" // הצבת ילדים בעמודה
        justifyContent="center" // יישור אופקי של התוכן למרכז
        alignItems="center" // יישור אנכי של התוכן למרכז
        textAlign="center" // יישור הטקסט למרכז
      >
        <Typography fontWeight="500" variant="h4" sx={{ mb: "1.5rem" }} color="#006B7D">
          Welcome to TripTips, the Social Media for travelers!
        </Typography>
        {/* רכיב הטופס */}
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage; // ייצוא הקומפוננטה לשימוש בקבצים אחרים
