import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"


export default function RegisterView() {
  const { register, watch, handleSubmit, formState: { errors } } = useForm()
  
  console.log(errors)

  const handleRegister = () => {
    console.log('I control from here')
  }

  return (
    <>
      <h1 className="text-4xl text-white font-bold">Register!</h1>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('name',{required:"The name is mandatory"})}
          />
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Your Email Address"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('email',{required:"The e-mail is mandatory"})}
          />
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">Username</label>
          <input
            id="handle"
            type="text"
            placeholder="Username (with no spaces)"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('handle',{required:"The username is mandatory"})}
          />
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Your Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password',{required:"The password is mandatory"})}
          />
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repeat Password</label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repeat your Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password_confirmation',{required:"The password confirmation is mandatory"})}
          />
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value='Submit'
        />
      </form>

      <nav className="mt-10">
        <Link
          className="text-center text-white text-lg block"
          to="/auth/login">
          Already registered? Login.
        </Link>
      </nav>
    </>
  )
}
