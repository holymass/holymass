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
import Link from './Link';
import { LiturgicalYear, Mass } from '../domain/mass/Mass';

const liturgicalYearColor = {
  A: blue[500],
  B: green[500],
  C: red[500],
};

const liturgicalYearName = {
  A: '甲年',
  B: '乙年',
  C: '丙年',
};

const buildLink = (liturgicalYear: LiturgicalYear, name: string, id = '') => {
  const year = liturgicalYearName[liturgicalYear];
  return `https://assets.holymass.app/masses/index.html?m=${year}/${name}#/${id}`;
};

export interface MassCardProps {
  model: Mass;
}

export default function MassCard(props: MassCardProps) {
  const {
    date,
    firstReading,
    gospel,
    liturgicalYear,
    name,
    responsorialPsalm,
    secondReading,
  } = props.model;
  const { t } = useTranslation('mass');
  const generateLink = (text: string, id: string) => {
    return (
      <Link
        href={buildLink(liturgicalYear, name, id)}
        target="_blank"
        underline="hover"
      >
        {text}
      </Link>
    );
  };
  const generateTypography = (label: string, value: string, id: string) => {
    return (
      <Typography
        component="div"
        variant="body2"
        color="text.secondary"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <span>{t(label)}</span>
        {generateLink(value, id)}
      </Typography>
    );
  };
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
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              open(buildLink(liturgicalYear, name));
            }}
          >
            <Launch />
          </IconButton>
        }
      />
      <CardContent>
        {generateTypography('First Reading', firstReading, 'first-reading')}
        {generateTypography(
          'Responsorial Psalm',
          responsorialPsalm,
          'responsorial-psalm',
        )}
        {generateTypography('Second Reading', secondReading, 'second-reading')}
        {generateTypography('Gospel', gospel, 'gospel')}
      </CardContent>
    </Card>
  );
}
