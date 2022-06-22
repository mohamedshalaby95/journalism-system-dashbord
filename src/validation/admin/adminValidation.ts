import Joi from "joi";

const validateAdminForm = function validateAdminForm(login: any) {
  const schema = Joi.object({
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    firstName: Joi.string()
      .min(3)
      .max(20)
      .required()
      .regex(/^[a-zA-Z]+$/),

    lastName: Joi.string()
      .min(3)
      .max(20)
      .required()
      .regex(/^[a-zA-Z]+$/),
    brief: Joi.string().min(20).max(200).required(),
    role: Joi.string().valid("administrator", "editor", "reviewer").required(),
  });

  return schema.validate(login, { abortEarly: false });
};

export default validateAdminForm;
