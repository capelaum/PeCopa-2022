import { LoginFormValues } from '@/@types/form'
import { AuthData } from '@/@types/response'
import { Input } from '@/components/Input'
import { login } from '@/libs/authLib'
import { loginValidationSchema } from '@/validations/formValidations'
import { useFormik } from 'formik'
import { MdArrowBack } from 'react-icons/md'
import { ThreeDots } from 'react-loader-spinner'
import { Navigate, NavLink } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

export function Login() {
  const [auth, setAuth] = useLocalStorage('@pecopa-2022:auth', {} as AuthData)

  const formik = useFormik({
    onSubmit: (values) => handleLogin(values),
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
  })

  const handleLogin = async (values: LoginFormValues) => {
    const data = await login(values)
    setAuth(data)
  }

  if (auth?.user?.id) {
    return <Navigate to="/palpites" replace />
  }

  return (
    <div className="min-h-screen bg-white text-white flex flex-col items-center overflow-hidden">
      <header className="w-full flex justify-center px-5 py-5 border-b-2 border-red-300">
        <div className="max-w-[150px]">
          <img src="/assets/logo/pecopa_white.svg" alt="NaTrave Logo" />
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
