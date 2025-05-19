import Joi from 'joi';

export const addPlanSchema = Joi.object({
    period: Joi.string().valid('monthly', 'yearly').required(),
    interval: Joi.number().integer().min(1).required(),
    name: Joi.string().min(3).required(),
    amount: Joi.number().positive().required(),
    description: Joi.string().optional()
});