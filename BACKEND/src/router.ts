import { Router } from "express"
import { createAccount, login } from "./handlers"
import { body } from "express-validator"
import { handleInputErrors } from "./middleware/validation"

const router = Router()

// Authentication and register
router.post('/auth/register', 
    body('handle')
        .notEmpty()
        .withMessage('Invalid username'), 
    body('name')
        .notEmpty()
        .withMessage('Invalid name'), 
    body('email')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .isLength({min: 8})
        .withMessage('Invalid password'),
    handleInputErrors,
    createAccount
)

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .notEmpty()
        .withMessage('Invalid password'),
    handleInputErrors,
    login
)

export default router