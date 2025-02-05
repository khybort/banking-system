import Joi from "joi";

export const CreateAccountValidator = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  balance: Joi.number().min(0).required(),
  ownerId: Joi.string().required(),
});
