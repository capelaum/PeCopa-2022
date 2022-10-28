import { Input } from '@/components/Input'
import { DialogModal } from '@/components/Modal'
import { register } from '@/libs/authLib/authApi'
import { Auth, RegisterFormValues } from '@/libs/authLib/authTypes'
import { registerValidationSchema } from '@/validations/formValidations'
import { useFormik } from 'formik'
import { useState } from 'react'
import { MdArrowBack } from 'react-icons/md'
import { ThreeDots } from 'react-loader-spinner'
import { Navigate, NavLink } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

export function Register() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const [auth] = useLocalStorage(
    import.meta.env.VITE_LOCAL_STORAGE_NAME,
    {} as Auth
  )

  const formik = useFormik({
    onSubmit: (values) => handleRegister(values),
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerValidationSchema,
  })

  const handleRegister = async (values: RegisterFormValues) => {
    const response = await register(values)

    if (!response) {
      return
    }

    setDialogOpen(true)
  }

  if (auth?.user?.id) {
    return <Navigate to={`/palpites/${auth.user.username}`} replace />
  }

  return (
    <div className="min-h-screen bg-white text-white flex flex-col items-center">
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
          <h1 className="text-red-700 font-bold text-xl">Crie sua conta</h1>
        </header>

        <DialogModal
          id="verify-email-dialog"
          title="Verifique seu e-mail"
          setDialogOpen={setDialogOpen}
          dialogOpen={dialogOpen}
        >
          <p className="text-lg">
            Um email de verificação foi enviado para{' '}
            <span className="font-bold">{formik.values.email}</span>
          </p>

          <p className="mt-2">
            Acesse seu email e clique no link para confirmar seu cadastro.
          </p>

          <button
            onClick={() => {
              setDialogOpen(false)
              formik.resetForm()

              window.location.href = '/login'
            }}
            className="mt-6"
          >
            Ok
          </button>
        </DialogModal>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-5 my-8"
        >
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

          <Input
            label="Confirme sua senha"
            name="confirmPassword"
            type="password"
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            placeholder="Digite sua senha"
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
              'Criar minha conta'
            )}
          </button>
        </form>
      </main>
    </div>
  )
}
