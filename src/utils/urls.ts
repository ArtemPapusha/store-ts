export const currentUrl = new URL(window.location.href);

export const updatePageNumber = (pageNumber: string) => {

  currentUrl.searchParams.set('_page', pageNumber);

  window.history.replaceState({}, '', currentUrl);
}
