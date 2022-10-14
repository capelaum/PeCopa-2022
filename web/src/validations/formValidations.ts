import * as yup from 'yup'

export const registerValidationSchema = yup.object().shape({
  name: yup.string().trim().required('Preencha seu nome.'),
  username: yup.string().required('Preencha seu nome de usuário.'),
  email: yup
    .string()
    .email('E-mail deve ser válido.')
    .required('Informe seu e-mail.'),
  password: yup
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .required('Digite sua senha.'),
})

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('E-mail deve ser válido.')
    .required('Informe seu e-mail.'),
  password: yup
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .required('Digite sua senha.'),
})

export const updateProfileValidationSchema = yup.object().shape({
  name: yup.string().trim().required('Preencha seu nome.'),
  username: yup.string().required('Preencha seu nome de usuário.'),
  email: yup
    .string()
    .email('E-mail deve ser válido.')
    .required('Informe seu e-mail.'),
  password: yup.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
})
