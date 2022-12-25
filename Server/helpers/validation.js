
const yup =  require("yup")


const regValidation = yup.object().shape({
    password:yup.string().required().min(6).max(16),
    email:yup.string().email().required(),
    name: yup.string().required(),
  });

const loginValidation = yup.object().shape({
    email:yup.string().email().required(),
  });
module.exports = {regValidation,loginValidation}