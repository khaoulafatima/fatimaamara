import React, { useEffect, useState } from "react";
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
} from "@mui/lab";
import { Paper, Typography, Chip, Box, Container, useMediaQuery, useTheme } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { motion } from "framer-motion";
import { colors } from "../styles/colors";

const EventTimelinePage = () => {
    const [events, setEvents] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("/profile/EventTimeline.json");
                const data = await response.json();
                setEvents(data.EventTimeline);
            } catch (error) {
                console.error("Error loading events:", error);
            }
        };
        fetchEvents();
    }, []);

    const renderYears = (event) => {
        if (event.year) return event.year;
        if (event.years) return event.years.join(", ");
        return "";
    };

    const renderRoles = (event) => {
        if (event.role) return event.role;
        if (event.roles) return event.roles.join(", ");
        return "";
    };

    return (
        <Container sx={{ my: { xs: 10, md: 14 } }}>
            {/* Header */}
            <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
                color={colors.primary}
            >
                Event Organization Activities
            </Typography>

            <Typography
                variant={isMobile ? "body1" : "h6"}
                color={colors.textLight}
                textAlign="center"
                gutterBottom
            >
                Academic & professional contributions in conferences and workshops
            </Typography>

            {/* Desktop Timeline */}
            {!isMobile && (
                <Timeline position="alternate" sx={{ my: 5 }}>
                    {events.map((event, index) => (
                        <TimelineItem key={event.id}>
                            <TimelineSeparator>
                                <TimelineDot sx={{ backgroundColor: colors.primary }}>
                                    <EventIcon fontSize="small" />
                                </TimelineDot>
                                {index < events.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>

                            <TimelineContent sx={{ px: 2 }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                                        <Typography variant="subtitle1" fontWeight="bold" color={colors.textLight} mb={0.5}>
                                            {event.name} {event.acronym ? `(${event.acronym})` : ""}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary" mb={1}>
                                            {event.type} • {renderYears(event)}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary" mb={1}>
                                            {renderRoles(event)}
                                        </Typography>

                                        {event.co_located_with && (
                                            <Typography variant="body2" color="text.secondary" mb={1}>
                                                Co-located with: {event.co_located_with}
                                            </Typography>
                                        )}

                                        {event.collaboration && (
                                            <Box mb={1}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Collaboration:
                                                </Typography>
                                                {event.collaboration.map((colab, i) => (
                                                    <Typography key={i} variant="body2">
                                                        • {colab}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        )}

                                        {event.website && (
                                            <Chip
                                                label="Website"
                                                component="a"
                                                href={event.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                clickable
                                                variant="outlined"
                                                sx={{ color: colors.primary, borderColor: colors.primary }}
                                            />
                                        )}
                                    </Paper>
                                </motion.div>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            )}

            {/* Mobile List */}
            {isMobile && (
                <Box display="flex" flexDirection="column" gap={3} mt={4}>
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Paper sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold" color={colors.textLight} mb={0.5}>
                                    {event.name} {event.acronym ? `(${event.acronym})` : ""}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" mb={1}>
                                    {event.type} • {renderYears(event)}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" mb={1}>
                                    {renderRoles(event)}
                                </Typography>

                                {event.co_located_with && (
                                    <Typography variant="body2" color="text.secondary" mb={1}>
                                        Co-located with: {event.co_located_with}
                                    </Typography>
                                )}

                                {event.collaboration && (
                                    <Box mb={1}>
                                        <Typography variant="body2" color="text.secondary">
                                            Collaboration:
                                        </Typography>
                                        {event.collaboration.map((colab, i) => (
                                            <Typography key={i} variant="body2">
                                                • {colab}
                                            </Typography>
                                        ))}
                                    </Box>
                                )}

                                {event.website && (
                                    <Chip
                                        label="Website"
                                        component="a"
                                        href={event.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        clickable
                                        variant="outlined"
                                        sx={{ color: colors.primary, borderColor: colors.primary }}
                                    />
                                )}
                            </Paper>
                        </motion.div>
                    ))}
                </Box>
            )}
        </Container>
    );
};

export default EventTimelinePage;
