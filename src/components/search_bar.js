import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import emitter from '../utils/emitter';

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
    value: '',
  };

  handleBlur = () => {
    if (!this.state.value) {
      this.setState({show: false});
    }
  };

  handleChange = (e) => {
    this.setState({value: e.target.value});
  };

  handleKeyUp = (e) => {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    } else {
      emitter.emit('search', this.state.value);
    }
  }

  handleClickSearch = () => {
    this.setState({show: true});
  }

  handleClickClear = (e) => {
    this.setState({
      show: false,
      value: '',
    });
    if (this.props.onClear) {
      this.props.onClear(e);
    } else {
      emitter.emit('search', '');
    }
  }

  render() {
    const {classes} = this.props;
    const {show, value} = this.state;
    return (
      <div className={classes.root}>
        {show && (
          <Input
            autoFocus
            disableUnderline
            fullWidth
            className={classes.input}
            placeholder='Search...'
            value={value}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
          />
        )}
        <IconButton color='inherit'>
          {show && value !== '' ? (
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
