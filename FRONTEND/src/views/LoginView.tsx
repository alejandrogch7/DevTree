import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage"
import { LoginForm } from "../types"
import api from "../config/axios"
import { toast } from "sonner"
import { isAxiosError } from "axios"

export default function LoginView() {

  const initialValues : LoginForm = {
    'email': '',
    'password': ''
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const handleLogin = async (formData : LoginForm) => {
    try {
      const {data} = await api.post(`/auth/login`, formData)
      localStorage.setItem('AUTH_TOKEN', data)
    } catch (error) {
      if(isAxiosError(error) && error.response){
        toast.error(error.response.data.error)
      }
    }
  }

  return (
    <>
      <h1 className="text-4xl text-white font-bold">Login</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        noValidate
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Your Email Address"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: "The Email is mandatory",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid E-mail",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Your Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "The Password is mandatory",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value='Login'
        />
      </form>
      <nav className="mt-10">
        <Link
          className="text-center text-white text-lg block"
          to="/auth/register">
          Don't have an account yet? Register
        </Link>
      </nav>
    </>
  )
}

