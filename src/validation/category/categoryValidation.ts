import Joi from "joi";

const validateCategoryForm = function validateCategoryForm(inputValue: any) {
    const schema = Joi.object({
      category: Joi.string().min(3).max(20).required().regex(/^[a-zA-Z]+$/),
      description: Joi.string(),
      image: Joi.any(),
    });

    return schema.validate(inputValue, { abortEarly: false });
  }

  export default validateCategoryForm;