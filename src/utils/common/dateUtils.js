const defaultFormatToUnix = (date) => {
  const newDate = new Date(date);
  return newDate.getTime();
};

export default { defaultFormatToUnix };
