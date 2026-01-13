import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Container,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { colors } from "../styles/colors";

const ReviewingActivitiesList = () => {
  const [activities, setActivities] = useState({
    journals: [],
    conferences: [],
    workshops: [],
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/profile/Reviewing.json");
        const data = await response.json();
        setActivities(data.Reviewing || []);
      } catch (error) {
        console.error("Error loading reviewing activities:", error);
      }
    };
    fetchActivities();
  }, []);

  const renderCard = (item, type) => (
    <Paper
      key={`${item.name}-${item.year || item.years?.join("-")}`}
      component={motion.div}
      whileHover={{ scale: 1.02 }}
      sx={{
        p: 3,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        boxShadow: 3,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" color={colors.textLight}>
        {item.name} {item.acronym ? `(${item.acronym})` : ""}
      </Typography>

      {type === "journals" && item.publisher && (
        <Typography variant="body2" color="text.secondary">
          <strong>Publisher:</strong> {item.publisher} {item.date ? `, ${item.date}` : ""}
        </Typography>
      )}

      {type === "conferences" && (
        <Typography variant="body2" color="text.secondary">
          {item.role ? `${item.role}, ` : ""}
          {item.year || item.years?.join(", ")}
        </Typography>
      )}

      {type === "workshops" && (
        <Typography variant="body2" color="text.secondary">
          {item.event ? `${item.event}, ` : item.co_located ? `Co-located at ${item.co_located}, ` : ""}
          {item.year || item.years?.join(", ")}
        </Typography>
      )}
    </Paper>
  );

  return (
    <Container sx={{ my: { xs: 8, md: 12 } }}>
      {/* Header */}
     <Typography
               variant="h3"
               align="center"
               fontWeight="900"
               sx={{
                 mb: 2,
                 background:
                   "linear-gradient(90deg, #253C67)",
                 WebkitBackgroundClip: "text",
                 WebkitTextFillColor: "transparent",
               }}
             >
                Reviewing Activities
             </Typography>

      <Typography
        variant={isMobile ? "body1" : "h5"}
        color={colors.textLight}
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: "bold", fontStyle: "italic" }}
      >
        Academic service and peer-review contributions
      </Typography>

      {/* Journals */}
      <Box mt={5}>
        <Typography variant="h5" fontWeight="bold" color={colors.primary} gutterBottom>
          International Journals
        </Typography>
        <Box display="flex" flexDirection="column" gap={3}>
          {activities.journals.map((journal) => renderCard(journal, "journals"))}
        </Box>
      </Box>

      {/* Conferences */}
      <Box mt={5}>
        <Typography variant="h5" fontWeight="bold" color={colors.primary} gutterBottom>
          International Conferences
        </Typography>
        <Box display="flex" flexDirection="column" gap={3}>
          {activities.conferences.map((conf) => renderCard(conf, "conferences"))}
        </Box>
      </Box>

      {/* Workshops */}
      <Box mt={5}>
        <Typography variant="h5" fontWeight="bold" color={colors.primary} gutterBottom>
          International Workshops
        </Typography>
        <Box display="flex" flexDirection="column" gap={3}>
          {activities.workshops.map((ws) => renderCard(ws, "workshops"))}
        </Box>
      </Box>
    </Container>
  );
};

export default ReviewingActivitiesList;
