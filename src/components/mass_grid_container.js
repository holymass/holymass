import {connect} from 'react-redux';
import MassGrid from './mass_grid';

const mapStateToProps = (state) => {
  return {mass: state.mass};
};

export default connect(mapStateToProps)(MassGrid);
