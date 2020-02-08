export const FETCH_CHURCHES = 'FETCH_CHURCHES';

export const fetchChurches = () => {
  return {
    type: FETCH_CHURCHES,
    payload: {
      request: {
        url: '/churches.json',
      },
    },
  };
};
