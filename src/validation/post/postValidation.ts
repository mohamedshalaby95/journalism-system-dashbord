import Joi from "joi";

const validatePostForm = function validatePostForm(post: any) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(20).required().regex(/^[a-zA-Z]+$/),
    description: Joi.string().min(20).max(200).required(),
    category: Joi.string(),
    subCategory: Joi.string(),
    region: Joi.string().valid("egypt", "america", "england").required(),
    image: Joi.string().allow(''),
    auther: Joi.string().allow('')
  });

  return schema.validate(post, { abortEarly: false });
};

export default validatePostForm;
