import { AvatarDropzone } from '@/components/AvatarDropzone'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { Auth } from '@/libs/authLib/authTypes'
import { deleteUserAvatar, updateUser } from '@/libs/usersLib/usersApi'
import { UpdateProfileFormValues } from '@/libs/usersLib/userTypes'
import { updateProfileValidationSchema } from '@/validations/formValidations'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { MdOutlineNoPhotography } from 'react-icons/md'
import { ThreeDots } from 'react-loader-spinner'
import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

export function Profile() {
  const [avatar, setAvatar] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [auth, setAuth] = useLocalStorage(
    import.meta.env.VITE_LOCAL_STORAGE_NAME,
    {} as Auth
  )

  console.log('🚀 ~ auth', auth)

  const formik = useFormik({
    onSubmit: (values) => handleUpdateUser(values),
    initialValues: {
      name: auth?.user?.name ?? '',
      username: auth?.user?.username ?? '',
      email: auth?.user?.email ?? '',
      password: '',
      avatar: auth?.user?.avatarUrl ?? null,
      confirmPassword: '',
    },
    validationSchema: updateProfileValidationSchema,
  })

  useEffect(() => {
    if (avatar) {
      formik.setFieldValue('avatar', avatar)
    }
  }, [avatar])

  const handleUpdateUser = async (values: UpdateProfileFormValues) => {
    console.log('🚀 ~ values', values)

    if (!auth?.token) {
      return
    }

    const { token } = auth

    const formData = new FormData()

    formData.append('name', values.name)
    formData.append('username', values.username)
    formData.append('email', values.email)

    if (values.password && values.confirmPassword) {
      formData.append('password', values.password)
      formData.append('confirmPassword', values.confirmPassword)
    }

    if (avatar) {
      formData.append('avatar', values.avatar as File)
    }

    const user = await updateUser(formData, auth)

    if (!user) {
      return
    }

    setAuth({
      token,
      user,
    })

    formik.setValues({
      name: user.name,
      username: user.username,
      email: user.email,
      password: '',
      avatar: user.avatarUrl ?? null,
      confirmPassword: '',
    })
  }

  const handleDeleteAvatar = async () => {
    if (!auth?.token) {
      return
    }

    const { token } = auth

    const result = await deleteUserAvatar(auth)

    if (!result) {
      return
    }

    setAuth({
      token,
      user: { ...auth.user, avatarUrl: null },
    })

    setAvatar(null)
    setPreview(null)

    formik.setFieldValue('avatar', null)
  }

  if (!auth?.user?.id) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header>
        <h1 className="text-xl sm:text-2xl text-white font-bold">
          Editar Perfil
        </h1>
      </Header>

      <main className="max-w-[712px] w-full flex flex-col items-center gap-8 mt-8 mb-12 px-5 flex-1">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col gap-5"
        >
          <AvatarDropzone
            auth={auth}
            setAvatar={setAvatar}
            setPreview={setPreview}
            preview={preview}
          />

          <button
            type="button"
            onClick={handleDeleteAvatar}
            className="px-4 py-2 text-sm rounded-2xl mx-auto text-white bg-red-500 hover:bg-red-300 flex gap-2 items-center"
          >
            <MdOutlineNoPhotography
              className="inline-block "
              color="#F4F6FF"
              size={20}
            />
            Excluir imagem de perfil
          </button>

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
              'Salvar'
            )}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  )
}
