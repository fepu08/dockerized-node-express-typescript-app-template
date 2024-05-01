import Joi from 'joi';

export const dummySchema = Joi.object({
  name: Joi.string().required(),
});
