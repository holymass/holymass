import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Skeleton from '@mui/material/Skeleton';

export interface MassCardSkeleton {}

export default function MassCardSkeleton(props: MassCardSkeleton) {
  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardHeader
        title={<Skeleton animation="wave" height={20} width="60%" />}
        subheader={<Skeleton animation="wave" height={20} width="30%" />}
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            height={40}
            width={40}
          />
        }
        action={null}
      />
      <CardContent>
        <Skeleton animation="wave" height={20} width="100%" />
        <Skeleton animation="wave" height={20} width="100%" />
        <Skeleton animation="wave" height={20} width="100%" />
        <Skeleton animation="wave" height={20} width="100%" />
      </CardContent>
    </Card>
  );
}
