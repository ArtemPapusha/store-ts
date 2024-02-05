const endpoint = (method: string, route: string) => {
  return {
    endpoint: `${method} ${route}`,
    currentUrl: route,
    method,
  };
};

export default endpoint;