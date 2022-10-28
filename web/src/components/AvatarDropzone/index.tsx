import { Auth } from '@/libs/authLib/authTypes'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Navigate } from 'react-router-dom'
import AvatarDefault from '../AvatarDefault'

interface AvatarDropzoneProps {
  auth: Auth
  preview: string | null
  setAvatar: (avatar: File | null) => void
  setPreview: (preview: string | null) => void
}

export function AvatarDropzone({
  auth,
  preview,
  setAvatar,
  setPreview,
}: AvatarDropzoneProps) {
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
        border-[3px] border-dashed border-gray-500 hover:border-red-500 p-[2px]
        rounded-full w-40 h-40 mx-auto hover:cursor-pointer relative
        flex items-center justify-center hover:after:rounded-full overflow-hidden
        text-2xl font-semibold text-white

        hover:after:content-["⇮"] hover:after:absolute hover:after:m-[2px]
        hover:after:top-0 hover:after:bottom-0 hover:after:left-0 hover:after:right-0
        hover:after:bg-black hover:after:bg-opacity-50 hover:after:z-10
        hover:after:flex hover:after:items-center hover:after:justify-center
         hover:after:font-semibold
        ${
          isDragActive
            ? `after:content-["⇮"] text-white after:absolute after:m-[2px]
              after:top-0 after:bottom-0 after:left-0 after:right-0
              after:bg-black after:bg-opacity-60 after:z-10 after:rounded-full
              after:flex after:items-center after:justify-center border-red-500`
            : ''
        }

      `}
    >
      <input {...getInputProps()} />

      <AvatarDefault
        avatarUrl={preview ?? auth.user.avatarUrl}
        alt={auth.user.username}
        value={auth.user.username}
        size={150}
      />
    </div>
  )
}
