export const INITIAL_STATE = () => {
  return {
    loading: false,
    data: [],
    error: null,
  };
};

export const START_LOAD = () => {
  return {
    loading: true,
    data: [],
    error: null,
  };
};

export const SUCCESS = (data) => {
  return {
    loading: false,
    data,
    error: null,
  };
};

export const ERROR = (error) => {
  return {
    loading: false,
    error,
  };
};
