
export const setValueInLocalStorage = (key, value) => {
  if ( localStorage) {
    localStorage.setItem(key, value);
  }
};

export const getValueFromLocalStorage = (key) => {
  return  localStorage && localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  return  localStorage && localStorage.removeItem(key);
};
