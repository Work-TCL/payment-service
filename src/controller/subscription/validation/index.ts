import Joi from 'joi';

export const subscribePlanSchema = Joi.object({
    planId: Joi.string().required(),
    type: Joi.string().valid('recurring', 'one-time')
});