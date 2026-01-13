import React, { useEffect, useState } from "react";
import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { colors } from "../styles/colors";

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Définition des couleurs par catégorie
  const categoryColors = {
    Programming: colors.primary,
    Monitoring: colors.primary,
    "Big Data": colors.primary,
    Databases: colors.primary,
    Languages: colors.primary,
    "Soft Skills": colors.primary,
  };

  useEffect(() => {
    fetch("/profile/skills.json")
      .then((r) => r.json())
      .then((data) => setSkills(data.skills || []))
      .catch((e) => console.error(e));
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 12,
        px: 3,
        color: "white",
        background: colors.background,
      }}
    >
      {/* Header */}
      <Typography
        variant="h2"
        align="center"
        fontWeight="900"
        sx={{
          mb: 2,
          background: "linear-gradient(90deg, #253C67)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        My Skills
      </Typography>

      <Typography
        variant={isMobile ? "body1" : "h5"}
        color={colors.textLight}
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: "bold", fontStyle: "italic" }}
      >
        Technologies and tools I use to bring ideas to life
      </Typography>

      <Box display="flex" flexDirection="column" gap={10}>
        {skills.map((cat, idx) => (
          <Box key={idx}>
            {/* Titre de catégorie */}
            <Box display="flex" alignItems="center" gap={2} mb={4}>
              <Typography
                variant="h4"
                fontWeight="700"
                sx={{
                  background:
                    categoryColors[cat.category] || categoryColors["Programming"],
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {cat.category}
              </Typography>

              {/* Ligne blanche */}
              <Box
                flex={1}
                height={4}
                borderRadius={2}
                sx={{
                  background: "#ffffff",
                  opacity: 0.8,
                }}
              />
            </Box>

            {/* Items sur une seule ligne et centrés */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 3, // plus d'espace entre capsules
              }}
            >
              {cat.items.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    px: 4, // plus large
                    py: 2, // plus haut
                    borderRadius: 6, // plus arrondi
                    background: "#ffffff",
                    color: colors.textLight,
                    fontWeight: "bold", // texte en gras
                    fontSize: "1.2rem", // texte un peu plus grand
                    whiteSpace: "nowrap",
                    "&:hover": {
                      transform: "scale(1.05)",
                      transition: "transform 0.2s",
                      background: "#f5f5f5",
                    },
                  }}
                >
                  {item}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

