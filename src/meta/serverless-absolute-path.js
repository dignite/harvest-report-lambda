const resolve = (event, relativePath) => {
  const rootUrl = event.isOffline
    ? "http://localhost:3000"
    : getRootUrlWhenDeployed(event);
  return rootUrl + relativePath;
};

const getRootUrlWhenDeployed = event => {
  const protocol = event.headers["X-Forwarded-Proto"];
  const host = event.headers["Host"];
  const deploymentStage = event.requestContext["stage"];

  return `${protocol}://${host}/${deploymentStage}`;
};

module.exports.resolve = resolve;
