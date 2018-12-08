export const FETCH_ALL_CHURCHES = 'FETCH_ALL_CHURCHES';

export const fetchAllChurches = () => {
  return {
    type: FETCH_ALL_CHURCHES,
    payload: {
      request: {
        url: '/churches/all',
      },
    },
  };
};
