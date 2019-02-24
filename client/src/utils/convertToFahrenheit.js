const convertToFahrenheit = temp => {
  return ((9 / 5) * (temp - 273) + 32).toFixed(1);
};

export default convertToFahrenheit;
