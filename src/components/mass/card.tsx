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
    minWidth: 275,
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
          <Button size='small' href={'/mass/?markdown=甲年/' + name}>甲年</Button>
          <Button size='small' href={'/mass/?markdown=乙年/' + name}>乙年</Button>
          <Button size='small' href={'/mass/?markdown=丙年/' + name}>丙年</Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(MassCard);
