import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import {
  default as withStyles,
  WithStyles
} from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import classNames from 'classnames';

const styles = createStyles({
  root: {
    display: 'flex',
    height: 48,
    width: 200,
  },
  input: {
    color: 'white',
    transform: 'scale(1, 1)',
    transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)'
  },
  inputHidden: {
    transform: 'scale(0, 0)',
  },
  icon: {
    marginRight: -24,
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
    this.state = { show: false, value: '' };
  }

  handleBlur = () => {
    if (!this.state.value) {
      this.setState({ show: false });
    }
  }

  handleInput = (e: any) => {
    this.setState({ value: e.target.value });
  }

  handleSearch = () => {
    this.setState({ show: true });
  }

  handleClear = () => {
    this.setState({ show: false, value: '' });
  }

  render() {
    const { classes } = this.props;
    const { show, value } = this.state;
    return (
      <Paper className={classes.root}>
        <Input fullWidth
          disableUnderline
          className={classNames(classes.input, {
            [classes.inputHidden]: !show
          })}
          placeholder='Search...'
          value={value}
          onBlur={this.handleBlur}
          onInput={this.handleInput}
        />
        <SearchIcon
          className={classNames(classes.icon, {
            [classes.iconHidden]: value !== ''
          })}
          onClick={this.handleSearch}
        />
        <ClearIcon
          className={classNames(classes.icon, {
            [classes.iconHidden]: value === ''
          })}
          onClick={this.handleClear}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(SearchBar);
