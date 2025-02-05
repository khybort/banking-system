import Joi from "joi";

export const CreateTransactionValidator = Joi.object({
  amount: Joi.number().greater(0).required(),
  fromAccountId: Joi.string().required(),
  toAccountId: Joi.string().required(),
});
