
export const prepareResponse = (
  data: any,
  success: boolean,
  errorCode = "",
  errorMessage = ""
): Response => {
  return { data, success, errorCode, errorMessage };
};

export interface Response {
  errorCode: string | null;
  errorMessage: string | null;
  success: boolean;
  data: any;
}