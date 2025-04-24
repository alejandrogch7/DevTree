import { Request, Response } from "express"
import slug from 'slug'
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"


export const createAccount = async (req: Request, res: Response) => {

    const { email, password, handle } = req.body

    const userExists = await User.findOne({email})

    if (userExists) {
        const error = new Error('The email is already registered!!')
        res.status(409).json({error : error.message})
        return
    }

    const handleSlug = slug(handle)
    const handleExists = await User.findOne({handleSlug})

    if (handleExists) {
        const error = new Error('The username already exists')
        res.status(409).json({error : error.message})
        return
    }


    const user = new User(req.body)
    user.password = await hashPassword(password) 
    user.handle = handleSlug
    await user.save()

    res.send('Successfuly created!')
}

export const login = async(req: Request, res: Response) => {

    const { email, password} = req.body

    const emailExists = await User.findOne({email})
    if (!emailExists) {
        const error = new Error('The email is not valid')
        res.status(409).json({error : error.message})
        return
    }

    const isPasswordCorrect = await checkPassword(password, emailExists.password)
    if (!isPasswordCorrect) {
        const error = new Error('The password is not valid')
        res.status(401).json({error : error.message})
        return
    }
    
    res.send('Authenticated')

}