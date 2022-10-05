export function Footer() {
  return (
    <footer className="w-full flex flex-col justify-center items-center bg-red-500 text-white px-5 pt-8 pb-2">
      <div className="w-full max-w-2xl flex flex-col gap-8 items-center justify-between">
        <img
          src="/assets/logo/logo-bg-red.svg"
          alt="NaTrave Logo"
          className="max-w-[100px]"
        />

        <span className="text-sm text-center">
          Desenvolvido com 🤍 por{' '}
          <a
            href="https://github.com/capelaum"
            target="_blank"
            className="hover:underline"
          >
            Luís V. Capelletto
          </a>
        </span>
      </div>
    </footer>
  )
}
