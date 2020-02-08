export const FETCH_MASSES_OF_YEAR_A = 'FETCH_MASSES_OF_YEAR_A';
export const FETCH_MASSES_OF_YEAR_B = 'FETCH_MASSES_OF_YEAR_B';
export const FETCH_MASSES_OF_YEAR_C = 'FETCH_MASSES_OF_YEAR_C';

export const fetchMasses = (liturgicalYear) => {
  return {
    type: `FETCH_MASSES_OF_YEAR_${liturgicalYear}`,
    payload: {
      request: {
        url: `/masses/${liturgicalYear.toLowerCase()}.json`,
      },
    },
  };
};
