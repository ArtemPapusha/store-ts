class Validations {

  public static maxLength = (max: number) => (value: string) =>
    value.length > max ? `You must enter no more than ${max} characters` : '';

  public static required = () => (value: string) => value.length === 0 ? `Can't be blank` : '';

  public static url = () => (value: string) => {
    const URLRegExp =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return URLRegExp.exec(value) ? '' : 'Its not look like url-link';
  };

}

export default Validations;