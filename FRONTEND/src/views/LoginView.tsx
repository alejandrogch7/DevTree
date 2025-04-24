import { Link } from "react-router-dom"

const LoginView = () => {
  return (
    <>
        <div>Login View</div>
        <nav>
        <Link to="/auth/register">
                Don't have an account yet? Register.
            </Link>
        </nav>
    </>
  )
}

export default LoginView