import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = (theme) => ({
  root: {
    padding: theme.spacing.unit,
  },
  card: {
    cursor: 'pointer',
    minWidth: theme.spacing.unit * 36,
  },
  list: {
    width: theme.spacing.unit * 30,
  },
  listItem: {
    textAlign: 'center',
  },
});


@withStyles(styles)
export default class MassCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
  };

  state = {
    open: false,
  };

  handleDialogOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleDialogClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const {className, classes, name} = this.props;
    return (
      <div className={classNames(classes.root, className)}>
        <Card className={classes.card} onClick={this.handleDialogOpen}>
          <CardContent>
            <Typography>
              {name}
            </Typography>
          </CardContent>
        </Card>
        <Dialog open={this.state.open} onClose={this.handleDialogClose}>
          <List className={classes.list}>
            {['甲年', '乙年', '丙年'].map((year, key) => {
              return (
                <ListItem
                  button
                  className={classes.listItem}
                  component='a'
                  href={`/mass/?markdown=${year}/${name}`}
                  key={key}
                  target='_blank'
                >
                  <ListItemText primary={year} />
                </ListItem>);
            })}
          </List>
        </Dialog>
      </div>
    );
  }
}
