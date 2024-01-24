const endpoint = (method: string, route: string) => {
  return {
    endpoint: `${method} ${route}`,
    url: route,
    method,
  };
};

export default endpoint;