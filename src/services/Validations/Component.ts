class Validations {

  public static maxLength = (max: number) => (value: string) =>
    value.length > max ? `You must enter no more than ${max} characters` : '';

  public static required = () => (value: string) => value.length === 0 ? `Can't be blank` : '';

  public static url = () => (value: string) => {
    const URLRegExp =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return URLRegExp.exec(value) ? '' : 'Its not look like url-link';
  };

  public static notZero = () => (value: string) => value <= '0' ? `Can't be zero or less` : '';

  public static onlyNumbers = () => (value: string) => {
    const onlyNumbersRegex = /^\d+$/; 

    return !onlyNumbersRegex.test(value) ? 'You should enter only numbers' : '';
  };

}

export default Validations;