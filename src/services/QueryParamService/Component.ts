class QueryParamService {

  getPageNumber = () => Number(window.location.search.split('page=')[1]);
  
  public updatePageUrl = (page: number) => {
    if (page === 1) {
      const newUrl = window.location.pathname
      window.history.replaceState({}, document.title, newUrl);
    } else {
      const newUrl = window.location.pathname + '?' + `page=${page}`;
      window.history.replaceState({}, document.title, newUrl);
    }
  }

  public removeQueryParam = () => {
    const newUrl = window.location.pathname
    window.history.replaceState({}, document.title, newUrl);
  }

}

export default QueryParamService;