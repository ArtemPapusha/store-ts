class QueryParamService {

  protected static instance: QueryParamService | null = null;

  protected params: String[] = []; 

  constructor() {
    if (QueryParamService.instance && typeof QueryParamService.instance === "object") {
      return QueryParamService.instance
    }

    QueryParamService.instance = this
    return this
  }

  public updateUrl = (key: string, value: string) => {
    this.params = this.params.filter(param => !param.startsWith(`${key}`));

    this.params.push(`${key}${value}`);

    const newUrl = window.location.pathname + '?' + this.params.join('&');
    window.history.replaceState({}, document.title, newUrl);
  }

  public removeQueryParam = (key: String[]) => {
    this.params = this.params.filter(param => !param.startsWith(`${key}`));

    const newUrl = window.location.pathname + this.params.join('&');
 
    window.history.replaceState({}, document.title, newUrl);
  }

}

export default QueryParamService;