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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais.')
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .required('Confirme sua senha.'),
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

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']
const FILE_SIZE = 3000000

export const updateProfileValidationSchema = yup.object().shape({
  name: yup.string().trim().required('Preencha seu nome.'),
  username: yup.string().required('Preencha seu nome de usuário.'),
  email: yup
    .string()
    .email('E-mail deve ser válido.')
    .required('Informe seu e-mail.'),
  password: yup.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais.')
    .min(8, 'Senha deve ter pelo menos 8 caracteres'),
  avatar: yup
    .mixed()
    .test('fileType', 'Tipo de imagem não suportado', (value: File) => {
      if (value && typeof value === 'object') {
        return SUPPORTED_FORMATS.includes(value.type)
      }
      return true
    })
    .test('fileSize', 'A imagem deve ter menos de 3MB', (value: File) => {
      if (value && typeof value === 'object') {
        return value.size <= FILE_SIZE
      }
      return true
    }),
})

export const forgotPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('E-mail deve ser válido.')
    .required('Informe seu e-mail.'),
})

export const resetPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('E-mail deve ser válido.')
    .required('Informe seu e-mail.'),
  password: yup.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais.')
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .required('Confirme sua senha.'),
})
