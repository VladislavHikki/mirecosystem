export const logout = () => {
  useCookie('l').value = null;
  window.location = '/';
};
