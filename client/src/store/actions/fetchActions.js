export const fetchRequest = (type) => {
  return { type };
};

export const fetchSuccess = (type, payload) => {
  return {
    type,
    payload,
  };
};

export const fetchFailure = (type, payload) => {
  return {
    type,
    payload,
  };
};
