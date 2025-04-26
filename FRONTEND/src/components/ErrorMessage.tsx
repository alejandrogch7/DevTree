type ErrorMessageProps = {
    children: React.ReactNode
}

export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <p className="text-red-600 p-2 font-bold text-center">{children}</p>
  )
}
