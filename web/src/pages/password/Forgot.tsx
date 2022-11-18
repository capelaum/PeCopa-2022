import { Input } from '@/components/Input'
import { forgotPassword } from '@/libs/authLib/authApi'
import { Auth } from '@/libs/authLib/authTypes'
import { forgotPasswordValidationSchema } from '@/validations/formValidations'
import { useFormik } from 'formik'
import { MdArrowBack } from 'react-icons/md'
import { ThreeDots } from 'react-loader-spinner'
import { Navigate, NavLink } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

export function Forgot() {
  const [auth] = useLocalStorage(
    import.meta.env.VITE_LOCAL_STORAGE_NAME,
    {} as Auth
  )

  const formik = useFormik({
    onSubmit: (values) => forgotPassword(values),
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordValidationSchema,
  })

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
          <NavLink to="/login" title="Voltar para o Login">
            <MdArrowBack size={32} color="#AF053F" />
          </NavLink>
          <h1 className="text-red-700 font-bold text-xl">Recuperar senha</h1>
        </header>

        <p className="text-red-700 text-lg mt-8">
          Enviaremos um link de redefinição de senha para o seu email.
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
              'Recuperar'
            )}
          </button>
        </form>
      </main>
    </div>
  )
}
