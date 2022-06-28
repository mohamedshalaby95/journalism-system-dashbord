import Joi from "joi";

const validatePostForm = function validatePostForm(post: any) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(20).max(1000).required(),
    category: Joi.string(),
    subCategory: Joi.string(),
    region: Joi.string().valid("egypt", "america", "england").required(),
    image: Joi.string().allow(''),
    auther: Joi.string().allow('')
  });

  return schema.validate(post, { abortEarly: false });
};

export default validatePostForm;
