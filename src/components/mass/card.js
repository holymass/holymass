import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = (theme) => ({
  card: {
    cursor: 'pointer',
    minWidth: 300,
  },
  list: {
    width: 300,
  },
  listItem: {
    textAlign: 'center',
  },
});

class MassCard extends React.Component {
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
    const {classes, name} = this.props;
    return (
      <div>
        <Card className={classes.card} onClick={this.handleDialogOpen}>
          <CardContent>
            <Typography>
              {name}
            </Typography>
          </CardContent>
        </Card>
        <Dialog open={this.state.open} onClose={this.handleDialogClose}>
          <List className={classes.list}>
            {['甲年', '乙年', '丙年'].map((year) => {
              return (
                <ListItem
                  button
                  className={classes.listItem}
                  component='a'
                  target='_blank'
                  href={`/mass/?markdown=${year}/${name}`}
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

MassCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
};

export default withStyles(styles)(MassCard);
