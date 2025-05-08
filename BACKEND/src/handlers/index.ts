import { Request, Response } from "express"
import slug from 'slug'
import formidable from 'formidable'
import cloudinary from "../config/cloudinary"
import {v4 as uuid} from 'uuid'
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateJWT } from "../utils/jwt"
import { validationResult } from "express-validator"


export const createAccount = async (req: Request, res: Response) => {

    // handle errors
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return 
    }

    const { email, password, handle } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        const error = new Error('The email is already registered!!')
        res.status(409).json({ error: error.message })
        return
    }

    const handleSlug = slug(handle)
    const handleExists = await User.findOne({ handleSlug })

    if (handleExists) {
        const error = new Error('The username already exists')
        res.status(409).json({ error: error.message })
        return
    }


    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handleSlug
    await user.save()

    res.send('Successfuly created!')
}

export const login = async (req: Request, res: Response) => {

    // handle errors
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return 
    }

    // Request data
    const { email, password } = req.body

    // Find the user by email
    const emailExists = await User.findOne({ email })
    if (!emailExists) {
        const error = new Error('The email is not valid')
        res.status(409).json({ error: error.message })
        return
    }

    // check the password
    const isPasswordCorrect = await checkPassword(password, emailExists.password)
    if (!isPasswordCorrect) {
        const error = new Error('The password is not valid')
        res.status(401).json({ error: error.message })
        return
    }

    // generate JWT
    const token = generateJWT({id: emailExists._id})

    res.send(token)

}

export const getUser = async(req: Request, res: Response) => {
    res.json(req.user)
}

export const updateProfile = async(req: Request, res: Response) => {
    try {
        const { description, links } = req.body
        const handle = slug(req.body.handle, '')
        const handleExists = await User.findOne({handle})
        if (handleExists && handleExists.email !== req.user.email) {
            const error = new Error('Username not available')
            res.status(409).json({error: error.message})
        }
        //Update the user
        req.user.description = description
        req.user.handle = handle
        req.user.links = links
        await req.user.save()
        res.send('Profile Successfuly Updated')
    } catch (e) {
        const error = new Error('There was an error')
        res.status(500).json({error: error.message})
    }
}


export const uploadImage = async(req: Request, res: Response) => {

    const form = formidable({multiples: false})
    
    try {
        form.parse(req, (error, fields, files)=>{

            cloudinary.uploader.upload(files.file[0].filepath, { public_id: uuid() }, async function (error, result) {
                
                if(error){
                    const error = new Error('There was an error uploading the image')
                    res.status(500).json({error : error.message})
                    return
                }

                if(result){
                    req.user.image = result.secure_url
                    await req.user.save()
                    res.json({image : result.secure_url})
                }
            })
        })
        
    } catch (e) {
        const error = new Error('There was an error')
        res.status(500).json({error: error.message})
    }
}