import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: 48,
    width: 288,
  },
  input: {
    color: 'white',
    transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
  },
  icon: {
    transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
  },
});

class SearchBar extends React.Component {
  state = {
    show: false,
    filter: '',
  };

  handleBlur = () => {
    if (!this.state.filter) {
      this.setState({show: false});
    }
  };

  handleChange = (e) => {
    this.setState({filter: e.target.value});
  };

  handleKeyUp = (e) => {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.filter);
    }
  }

  handleClickSearch = () => {
    this.setState({show: true});
  }

  handleClickClear = (e) => {
    this.setState({
      show: false,
      filter: '',
    });
    if (this.props.onClear) {
      this.props.onClear();
    }
  }

  render() {
    const {classes} = this.props;
    const {show, filter} = this.state;
    return (
      <div className={classes.root}>
        {show && (
          <Input
            autoFocus
            disableUnderline
            fullWidth
            className={classes.input}
            placeholder='Search...'
            value={filter}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
          />
        )}
        <IconButton color='inherit'>
          {show && filter ? (
            <ClearIcon
              className={classes.icon}
              onClick={this.handleClickClear}
            />
          ) : (
              <SearchIcon
                className={classes.icon}
                onClick={this.handleClickSearch}
              />
            )
          }
        </IconButton>
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
};

export default withStyles(styles)(SearchBar);
