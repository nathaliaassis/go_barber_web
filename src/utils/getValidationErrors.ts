import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string; // a chave pode ser qualquer coisa e irá se tornar string
  // name: string;
  // email: string;
  // password: string;
}
export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });
  return validationErrors;
}
