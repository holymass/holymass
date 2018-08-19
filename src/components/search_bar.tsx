import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import {
  default as withStyles,
  WithStyles
} from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import classNames from 'classnames';

const styles = createStyles({
  root: {
    display: 'flex',
    height: 48,
    width: 200,
  },
  icon: {
    marginLeft: -24,
    transform: 'scale(1, 1)',
    transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)'
  },
  iconHidden: {
    transform: 'scale(0, 0)',
  }
});

export interface SearchBarProps extends WithStyles<typeof styles> {
}

export interface SearchBarState {
  show: boolean;
  value: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = { show: true, value: '' };
  }

  handleFocus = () => {
    this.setState({ show: false });
  }

  handleBlur = () => {
    this.setState({ show: true });
  }

  handleInput = (e: any) => {
    this.setState({ value: e.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Input fullWidth
          placeholder='Search...'
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onInput={this.handleInput}
        />
        <SearchIcon className={classNames(classes.icon, {
          [classes.iconHidden]: this.state.value !== ''
        })} />
      </Paper>
    );
  }
}

export default withStyles(styles)(SearchBar);
