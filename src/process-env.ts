export const getMandatoryEnvironmentVariable = (key: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    console.error(`Mandatory environment variable ${key} not defined!`);
  }
  return value || key;
};
