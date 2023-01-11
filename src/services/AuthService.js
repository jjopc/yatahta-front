export const getUser = () => {
  const auth = JSON.parse(window.localStorage.getItem("yatahta.auth"));
  if (auth) {
    const [header, payload, signature] = auth.access.split(".");
    const decoded = window.atob(payload);
    return JSON.parse(decoded);
  }
  return undefined;
};

export const isStaff = () => {
  const user = getUser();
  return user && user.is_staff;
};

export const getAccessToken = () => {
  const auth = JSON.parse(window.localStorage.getItem("yatahta.auth"));
  if (auth) {
    return auth.access;
  }
  return undefined;
};
