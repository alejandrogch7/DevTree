import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { isAxiosError } from "axios"
import ErrorMessage from "../components/ErrorMessage"
import { RegisterForm } from "../types/intex"
import { toast } from "sonner"
import api from "../config/axios"


export default function RegisterView() {

  const initialValues : RegisterForm = {
    name: '',
    email: '',
    handle: '',
    password: '',
    password_confirmation: ''
  }

  const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const password = watch('password')

  const handleRegister = async (formData : RegisterForm) => {
    try {
      const {data} = await api.post(`/auth/register`, formData)
      toast.success(data)
      reset()
    } catch (error) {
      if(isAxiosError(error) && error.response){
        toast.error(error.response.data.error)
      }
    }
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
            {...register('name', { required: "The name is mandatory" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Your Email Address"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('email',
              {
                required: "The e-mail is mandatory",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "The E-mail is not valid",
                },
              }
            )}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">Username</label>
          <input
            id="handle"
            type="text"
            placeholder="Username (with no spaces)"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('handle', { required: "The username is mandatory" })}
          />
          {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Your Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password', { 
              required: "The password is mandatory",
              minLength: {
                value: 8,
                message: "The password must be at least eight characters"
              } 
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repeat Password</label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repeat your Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password_confirmation', { 
              required: "The password confirmation is mandatory",
              validate: (value) => value===password || "Passwords don't match" 
            })}
          />
          {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
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
