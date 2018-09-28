export default (state = {}, action) => {
  switch (action.type) {
    case 'FILTER':
      return {};
    default:
      return state;
  }
};
