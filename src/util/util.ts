import { Response } from 'express';
import HttpStatus from 'http-status-codes';
import { Role } from './enums';

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

export const handleCommonResponse = (MyMovieDbResponse: MyMovieDbResponse, res: Response) => {
  if (!MyMovieDbResponse.success) {
    return res.status(HttpStatus.BAD_REQUEST).send(MyMovieDbResponse);
  }
  res.send(MyMovieDbResponse);
}

export const isValidRole = (role: string) => {
  return role === Role.USER || role === Role.ADMIN;
}