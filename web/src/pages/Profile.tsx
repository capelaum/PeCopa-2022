import { AuthData } from '@/@types/response'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { updateUser } from '@/libs/userLib'
import { updateProfileValidationSchema } from '@/validations/formValidations'
import { useFormik } from 'formik'
import { ThreeDots } from 'react-loader-spinner'
import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

export function Profile() {
  const [auth] = useLocalStorage(
    import.meta.env.VITE_LOCAL_STORAGE_NAME,
    {} as AuthData
  )

  const formik = useFormik({
    onSubmit: (values) => updateUser(values, auth?.token ?? ''),
    initialValues: {
      name: auth?.user?.name ?? '',
      username: auth?.user?.username ?? '',
      email: auth?.user?.email ?? '',
      password: '',
    },
    validationSchema: updateProfileValidationSchema,
  })

  if (!auth?.user?.id) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header>
        <h1 className="text-xl sm:text-2xl text-white font-bold">
          Luís Vinicius Capelletto
        </h1>
      </Header>

      <main className="max-w-[712px] w-full flex flex-col items-center gap-8 my-8 px-5 flex-1">
        <h2 className="w-full text-red-500 font-bold text-xl sm:text-2xl">
          Editar Perfil
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col gap-5"
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
              'Salvar'
            )}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  )
}
