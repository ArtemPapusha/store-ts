class QueryParamService {
  protected static instance: QueryParamService;

  protected params: String[] = []; 

  public static getInstance(): QueryParamService {
    if (!QueryParamService.instance) {
      QueryParamService.instance = new QueryParamService();
    }
    return QueryParamService.instance;
  }

  public getPageNumber = () => Number(window.location.search.split('page=')[1]);
  
  public updateUrl = (key: string, value: string) => {
    this.params = this.params.filter(param => !param.startsWith(`${key}`));

    if (key === 'page=' && value === '1') {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    } else {
      this.params.push(`${key}${value}`);

      const newUrl = window.location.pathname + '?' + this.params.join('&');
      window.history.replaceState({}, document.title, newUrl);
    }
  }

  public removeQueryParam = (key: string) => {
    this.params = this.params.filter(param => !param.startsWith(`${key}`));

    const newUrl = window.location.pathname + '?' + this.params.join('&');
    window.history.replaceState({}, document.title, newUrl);
  }

}

export default QueryParamService;