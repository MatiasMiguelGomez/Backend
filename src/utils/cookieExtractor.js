export const cookieExtractor = req => {
  return req?.cookies?.token || null;
};
