export const getMandatoryEnvironmentVariable = (key: string) =>
  `Value from process.env.${key}`;
