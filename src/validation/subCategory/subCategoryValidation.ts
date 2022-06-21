import Joi from "joi";

const validateSubCategoryForm = function validateSubCategoryForm(
  inputValue: any
) {
  const schema = Joi.object({
    subcategory: Joi.string()
      .min(3)
      .max(20)
      .required()
      .regex(/^[a-zA-Z]+$/),
    category: Joi.string().required(),
  });

  return schema.validate(inputValue, { abortEarly: false });
};

export default validateSubCategoryForm;
