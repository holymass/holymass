import * as React from "react";
import { useIntl } from "react-intl";
import { blue, green, red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Launch from "@mui/icons-material/Launch";

import Mass from "@/features/mass/domain/Mass";

const getLiturgicalYearColor = (liturgicalYear: string): string => {
  switch (liturgicalYear) {
    case "甲年":
      return blue[500];
    case "乙年":
      return green[500];
    case "丙年":
      return red[500];
    default:
      return "inherit";
  }
};

const buildLink = (liturgicalYear: string, name: string, id = "") => {
  return `/masses/${liturgicalYear}/${name}#/${id}`;
};

export interface MassCardProps {
  loading?: boolean;
  model: Mass;
}

export default function MassCard(props: MassCardProps) {
  const { loading = false, model } = props;
  const intl = useIntl();
  const {
    date,
    firstReading,
    gospel,
    liturgicalYear,
    name,
    responsorialPsalm,
    secondReading,
  } = model;
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
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <span>{label}</span>
        {generateLink(value, id)}
      </Typography>
    );
  };
  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardHeader
        title={
          loading ? <Skeleton animation="wave" height={20} width="60%" /> : name
        }
        subheader={
          loading ? <Skeleton animation="wave" height={20} width="30%" /> : date
        }
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              height={40}
              width={40}
            />
          ) : (
            <Avatar sx={{ bgcolor: getLiturgicalYearColor(liturgicalYear) }}>
              {liturgicalYear[0]}
            </Avatar>
          )
        }
        action={
          loading ? null : (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                open(buildLink(liturgicalYear, name));
              }}
            >
              <Launch />
            </IconButton>
          )
        }
      />
      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton animation="wave" height={20} width="100%" />
            <Skeleton animation="wave" height={20} width="100%" />
            <Skeleton animation="wave" height={20} width="100%" />
            <Skeleton animation="wave" height={20} width="100%" />
          </React.Fragment>
        ) : (
          <React.Fragment>
            {generateTypography(
              intl.formatMessage({ id: "mass.first.reading" }),
              firstReading,
              "first-reading",
            )}
            {generateTypography(
              intl.formatMessage({ id: "mass.responsorial.psalm" }),
              responsorialPsalm,
              "responsorial-psalm",
            )}
            {generateTypography(
              intl.formatMessage({ id: "mass.second.reading" }),
              secondReading,
              "second-reading",
            )}
            {generateTypography(
              intl.formatMessage({ id: "mass.gospel" }),
              gospel,
              "gospel",
            )}
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  );
}
