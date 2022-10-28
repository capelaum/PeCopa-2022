import { Auth } from '@/libs/authLib/authTypes'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'
import AvatarDefault from '../AvatarDefault'

interface AvatarDropzoneProps {
  setAvatar: (avatar: File | null) => void
  preview: string | null
  setPreview: (preview: string | null) => void
}

export function AvatarDropzone({
  setAvatar,
  preview,
  setPreview,
}: AvatarDropzoneProps) {
  const [auth] = useLocalStorage(
    import.meta.env.VITE_LOCAL_STORAGE_NAME,
    {} as Auth
  )

  const onDrop = useCallback((acceptedFiles: any) => {
    setAvatar(acceptedFiles[0])

    const previewImage = URL.createObjectURL(acceptedFiles[0])

    setPreview(previewImage)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  if (!auth?.user) {
    return <Navigate to="/" replace />
  }

  return (
    <div
      {...getRootProps()}
      title="Atualizar imagem de perfil"
      className={`
        border-[3px] border-dashed border-gray-500 hover:border-red-500
        rounded-full w-32 h-32 mx-auto hover:cursor-pointer relative
        flex items-center justify-center hover:after:rounded-full overflow-hidden
        text-2xl font-semibold text-white

        hover:after:content-["⇮"] hover:after:absolute hover:after:top-0 hover:after:bottom-0 hover:after:left-0 hover:after:right-0
        hover:after:bg-black hover:after:bg-opacity-50 hover:after:z-10
        hover:after:flex hover:after:items-center hover:after:justify-center
         hover:after:font-semibold
        ${
          isDragActive
            ? `after:content-["⇮"] text-white after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0
              after:bg-black after:bg-opacity-60 after:z-10 after:rounded-full
              after:flex after:items-center after:justify-center`
            : ''
        }

      `}
    >
      <input {...getInputProps()} />
      <AvatarDefault
        avatarUrl={preview ? preview : auth.user.avatarUrl ?? ''}
        alt={auth.user.username}
        value={auth.user.username}
        size={124}
        width={200}
        height={200}
      />
    </div>
  )
}
