export default (value) => {
  return typeof value === 'string' ? value.toUpperCase() : value;
};
