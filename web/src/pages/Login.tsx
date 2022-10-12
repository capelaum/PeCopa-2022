import { LoginFormValues } from '@/@types/form'
import { Input } from '@/components/Input'
import { api } from '@/services/api'
import { Buffer } from 'buffer'
import { useFormik } from 'formik'
import { MdArrowBack } from 'react-icons/md'
import { ThreeDots } from 'react-loader-spinner'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('E-mail deve ser válido.')
    .required('Informe seu e-mail.'),
  password: yup
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .required('Digite sua senha.'),
})

export function Login() {
  const formik = useFormik({
    onSubmit: (values) => handleSubmit(values),
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
  })

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const encodedAuth = Buffer.from(
        `${values.email}:${values.password}`
      ).toString('base64')

      const response = await api.get('/login', {
        headers: {
          Authorization: `Basic ${encodedAuth}`,
        },
      })

      toast.success(response.data.message)
    } catch (error) {
      toast.error((error as any).response.data.message)
    }
  }

  return (
    <div className="min-h-screen bg-white text-white flex flex-col items-center overflow-hidden">
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
          <h1 className="text-red-700 font-bold text-xl">Entre na sua conta</h1>
        </header>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-5 my-8"
        >
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
            className="button button-primary mt-5"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <ThreeDots
                height="30"
                width="30"
                radius="9"
                color="#F4F6FF"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      </main>
    </div>
  )
}
