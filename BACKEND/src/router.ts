import { Router } from "express"
import { createAccount, getUser, login, updateProfile, uploadImage } from "./handlers"
import { body } from "express-validator"
import { handleInputErrors } from "./middleware/validation"
import { authenticate } from "./middleware/auth"

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
        .isLength({ min: 8 })
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

router.get('/user', authenticate, getUser)

router.patch('/user',
    body('handle')
        .notEmpty()
        .withMessage('Invalid username'),
    body('description')
        .notEmpty()
        .withMessage('Invalid description'), 
    handleInputErrors,
    authenticate, 
    updateProfile
)

router.post('/user/image', authenticate, uploadImage)

export default router