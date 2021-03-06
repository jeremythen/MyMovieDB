export enum UserError {
  USER_INVALID_PAYLOAD = 'USER_INVALID_PAYLOAD',
  USER_EMAIL_EXISTS = 'USER_EMAIL_EXISTS',
  USER_USERNAME_EXISTS = 'USER_USERNAME_EXISTS',
  USER_CREATE_ERROR = 'USER_CREATE_ERROR',
  USER_INVALID_CREDENTIALS = 'USER_INVALID_CREDENTIALS',
  USER_UNKNOWN_ERROR = 'USER_UNKNOWN_ERROR',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_INVALID_ROLE = 'USER_INVALID_ROLE',
  USER_INVALID_ID = 'USER_INVALID_ID',
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum MovieError {
  MOVIE_INVALID_PAYLOAD = 'MOVIE_INVALID_PAYLOAD',
  MOVIE_INVALID_REVIEW_PAYLOAD = 'MOVIE_INVALID_REVIEW_PAYLOAD',
  MOVIE_NOT_FOUND = 'MOVIE_NOT_FOUND',
  REVIEWER_NOT_FOUND = 'REVIEWER_NOT_FOUND',
  MOVIE_INVALID_ID = 'MOVIE_INVALID_ID',
  MOVIE_INVALID_OFFSET_LIMIT = 'MOVIE_INVALID_OFFSET_LIMIT',
  ACTOR_INVALID_PAYLOAD = 'ACTOR_INVALID_PAYLOAD',
  ACTOR_INVALID_ID = 'ACTOR_INVALID_ID',
  ACTOR_NOT_FOUND = 'ACTOR_NOT_FOUND',
  DIRECTOR_INVALID_PAYLOAD = 'DIRECTOR_INVALID_PAYLOAD',
  DIRECTOR_INVALID_ID = 'DIRECTOR_INVALID_ID',
  DIRECTOR_NOT_FOUND = 'DIRECTOR_NOT_FOUND',
  MOVIE_INVALID_GET_REVIEW_PAYLOAD = 'MOVIE_INVALID_GET_REVIEW_PAYLOAD',
  REVIEW_INVALID_ID = 'REVIEW_INVALID_ID',
  MOVIE_CAST_EXISTS = 'MOVIE_CAST_EXISTS',
  MOVIE_DIRECTOR_EXISTS = 'MOVIE_DIRECTOR_EXISTS',
}

export enum GeneralError {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  ERROR = 'ERROR', 
}