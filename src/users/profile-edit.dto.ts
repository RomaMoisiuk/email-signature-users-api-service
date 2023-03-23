// import Joi from 'joi';

// export const profileEditSchema = Joi.object({
//   fullName: Joi.string().email().required(),
//   company: Joi.string().required(),
//   title: Joi.string().required(),
//   address: Joi.string().required(),
//   phone: Joi.string().required(),
// });

export interface ProfileEditDto {
  fullName: string;
  company: string;
  title: string;
  address: string;
  phone: string;
  templateVersion: string;
}
