import Joi from 'joi';

const validationSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.number().required(),
    password: Joi.string().required(),
    NIN: Joi.number().required(),
});

export default validationSchema;