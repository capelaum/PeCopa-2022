import { Input } from '@/components/Input'
import { api } from '@/services/api'
import { useFormik } from 'formik'
import { MdArrowBack } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
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

export function Register() {
  const formik = useFormik({
    onSubmit: async (values) => {
      try {
        const response = await api.post('/users', values)
        console.log('🚀 ~ response', response)
      } catch (error) {
        console.log('🚀 ~ error', error)
      }
    },
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema,
  })

  return (
    <div className="min-h-screen bg-white text-white flex flex-col items-center">
      <header className="w-full flex justify-center px-5 py-5 border-b-2 border-red-300">
        <div className="max-w-[150px]">
          <img src="/assets/logo/logo-bg-white.svg" alt="NaTrave Logo" />
        </div>
      </header>

      <main className="max-w-xl w-full p-5">
        <header className="mt-8 flex gap-4">
          <NavLink to="/" title="Voltar para Home">
            <MdArrowBack size={32} color="#AF053F" />
          </NavLink>
          <h1 className="text-red-700 font-bold text-xl">Crie sua conta</h1>
        </header>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-5 my-8"
        >
          <div className="input-container">
            <Input
              label="Seu nome"
              name="name"
              type="text"
              error={formik.touched.name && formik.errors.name}
              placeholder="Digite seu nome"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>

          <div className="input-container">
            <Input
              label="Seu nome de usuário"
              name="username"
              type="text"
              error={formik.touched.username && formik.errors.username}
              placeholder="Digite seu nome de usuário"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>

          <div className="input-container">
            <Input
              label="Seu e-mail"
              name="email"
              type="email"
              error={formik.touched.email && formik.errors.email}
              placeholder="Digite seu e-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>

          <div className="input-container">
            <Input
              label="Sua senha"
              name="password"
              type="password"
              error={formik.touched.password && formik.errors.password}
              placeholder="Digite sua senha"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>

          <button
            type="submit"
            className="button button-primary mt-5 disabled:opacity-80 disabled:cursor-not-allowed"
            disabled={!formik.isValid}
          >
            Criar minha conta
          </button>
        </form>
      </main>
    </div>
  )
}
