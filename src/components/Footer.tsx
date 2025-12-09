import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

interface FooterProps {
  children?: React.ReactNode;
}

export default function Footer(props: FooterProps) {
  const { children } = props;
  const copyright = `© ${new Date().getFullYear()} HolyMass.app`;
  return (
    <Container component="footer" maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          paddingTop: 2,
          paddingBottom: 4,
          justifyContent: "center",
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Typography component="div" variant="body2" color="text.secondary">
          {copyright}
        </Typography>
      </Box>
      {children}
    </Container>
  );
}
