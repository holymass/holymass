import {connect} from 'react-redux';
import {FILTER_MASS} from '../actions/types';
import SearchBar from './search_bar';

const mapDispatchToProps = (dispatch) => {
  return {
    onClear: () => {
      dispatch({
        type: FILTER_MASS,
      });
    },
    onSearch: (filter) => {
      dispatch({
        type: FILTER_MASS,
        filter: filter,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
