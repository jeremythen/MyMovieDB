import { Response } from 'express';
import HttpStatus from 'http-status-codes';
import { Role } from './enums';

export const prepareResponse = <T>(
  data: T,
  success: boolean,
  errorCode: string | null = "",
  errorMessages: string[] | string = []
): MyMovieDbResponse<T> => {
  return { data, success, errorCode, errorMessages };
};

export interface MyMovieDbResponse<T> {
  errorCode: string | null;
  errorMessages: string[] | string;
  success: boolean;
  data: T;
}

export interface ValidationResult {
  valid: boolean;
  validationErrors: string[];
}

export const handleCommonResponse = (MyMovieDbResponse: MyMovieDbResponse<any>, res: Response) => {
  if (!MyMovieDbResponse.success) {
    return res.status(HttpStatus.BAD_REQUEST).send(MyMovieDbResponse);
  }
  res.send(MyMovieDbResponse);
}

export const isValidRole = (role: string) => {
  return role === Role.USER || role === Role.ADMIN;
}

export const isValidId = (id: number) => {
  id = Number(id);
  return !Number.isNaN(id) && id > 0;
}