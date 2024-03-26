export const detectDevice = () => {
  const deviceWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const deviceHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  return { deviceWidth, deviceHeight };
};
