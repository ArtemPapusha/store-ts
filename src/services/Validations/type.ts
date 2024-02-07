type ValidationFunction = (value: string) => string;

interface ValidationImp {
  maxLength: (max: number) => ValidationFunction;
  required: () => ValidationFunction;
  url: () => ValidationFunction;
  notZero: () => ValidationFunction;
  onlyNumbers: () => ValidationFunction;
}

export { type ValidationFunction, type ValidationImp };