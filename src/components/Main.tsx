import * as React from 'react';
import Container from '@mui/material/Container';

interface MainProps {
  children?: React.ReactNode;
}

export default function Main(props: MainProps) {
  const { children } = props;
  return (
    <Container component="main" maxWidth="lg">
      {children}
    </Container>
  );
}
