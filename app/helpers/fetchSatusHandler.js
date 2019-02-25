export const fetchStatusHandler = (response) => {
  if (response.status === 200) {
    return response;
  } else {
    throw new Error('Request failed!');
  }
};