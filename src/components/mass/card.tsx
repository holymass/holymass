import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import {
  default as withStyles,
  WithStyles
} from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = createStyles({
  card: {
    minWidth: 300,
  },
});

export interface MassCardProps extends WithStyles<typeof styles> {
  name: string;
}

class MassCard extends React.Component<MassCardProps, {}> {
  render() {
    const { classes, name } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography>
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          {['甲年', '乙年', '丙年'].map(year => {
            return <Button size='small' color='primary' target='_blank' href={`/mass/?markdown=${year}/${name}`}>{year}</Button>;
          })}
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(MassCard);
