import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { blue, green, red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Launch from '@mui/icons-material/Launch';

const liturgicalYearColor = {
  A: blue[500],
  B: green[500],
  C: red[500],
};

export interface MassInfo {
  date: string;
  firstReading: string;
  gospel: string;
  liturgicalYear: 'A' | 'B' | 'C';
  name: string;
  pinyin: string;
  responsorialPsalm: string;
  secondReading: string;
}

export interface MassCardProps {
  info: MassInfo;
}

export default function MassCard(props: MassCardProps) {
  const {
    date,
    firstReading,
    gospel,
    liturgicalYear,
    name,
    pinyin,
    responsorialPsalm,
    secondReading,
  } = props.info;
  const { t } = useTranslation('mass');
  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardHeader
        title={name}
        subheader={date}
        avatar={
          <Avatar sx={{ bgcolor: liturgicalYearColor[liturgicalYear] }}>
            {t(liturgicalYear)}
          </Avatar>
        }
        action={
          <IconButton>
            <Launch />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          读经一： {firstReading}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          答唱咏： {responsorialPsalm}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          读经二： {secondReading}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          福音： {gospel}
        </Typography>
      </CardContent>
    </Card>
  );
}
