
export const prepareResponse = (
  data: any,
  success: boolean,
  errorCode = "",
  errorMessages: string[] | string = []
): Response => {
  return { data, success, errorCode, errorMessages };
};

export interface Response {
  errorCode: string | null;
  errorMessages: string[] | string;
  success: boolean;
  data: any;
}