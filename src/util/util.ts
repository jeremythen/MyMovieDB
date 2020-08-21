
export const prepareResponse = (
  data: any,
  success: boolean,
  errorCode = "",
  errorMessages: string[] | string = []
): MyMovieDbResponse => {
  return { data, success, errorCode, errorMessages };
};

export interface MyMovieDbResponse {
  errorCode: string | null;
  errorMessages: string[] | string;
  success: boolean;
  data: any;
}

export interface ValidationResult {
  valid: boolean;
  validationErrors: string[];
}