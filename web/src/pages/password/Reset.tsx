import { Input } from '@/components/Input'
import { resetPassword } from '@/libs/authLib/authApi'
import { Auth, ResetPasswordFormValues } from '@/libs/authLib/authTypes'
import { resetPasswordValidationSchema } from '@/validations/formValidations'
import { useFormik } from 'formik'
import { MdArrowBack } from 'react-icons/md'
import { ThreeDots } from 'react-loader-spinner'
import { Navigate, NavLink, useSearchParams } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

export function Reset() {
  const [searchParams] = useSearchParams()

  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const [auth] = useLocalStorage(
    import.meta.env.VITE_LOCAL_STORAGE_NAME,
    {} as Auth
  )

  const formik = useFormik({
    onSubmit: (values) => handleResetPassword(values),
    initialValues: {
      email: email ?? '',
      password: '',
      confirmPassword: '',
      token: token ?? '',
    },
    validationSchema: resetPasswordValidationSchema,
  })

  async function handleResetPassword(values: ResetPasswordFormValues) {
    const result = await resetPassword(values)
    console.log('🚀 ~ result', result)

    formik.resetForm()

    if (!result) {
      return
    }

    // redirect to login after 3 seconds
    setTimeout(() => {
      window.location.href = '/login'
    }, 3000)
  }

  if (auth?.user?.id) {
    return <Navigate to={`/palpites/${auth.user.username}`} replace />
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
          <h1 className="text-red-700 font-bold text-xl">Redefinir senha</h1>
        </header>

        <p className="text-red-700 text-lg mt-8">
          Redefina sua senha para continuar.
        </p>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-5 my-8"
        >
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
            disabled
          />

          <Input
            label="Informe uma nova senha"
            name="password"
            type="password"
            error={formik.touched.password && formik.errors.password}
            placeholder="Digite sua senha"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />

          <Input
            label="Confirme a nova senha"
            name="confirmPassword"
            type="password"
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            placeholder="Confirme sua senha"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />

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
              'Enviar'
            )}
          </button>
        </form>
      </main>
    </div>
  )
}
