// import Joi from 'joi';

// export const userRegistrationSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });

export interface UserRegistrationDto {
  email: string;
  password: string;
}
