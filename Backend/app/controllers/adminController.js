import repo from "../repository/repo.js"
import { createToken } from "../utils/jwt.js"
const repository = new repo()

export default class adminControl {

    login = async (req, res) => {
        try {
            const { name, password } = req.body
            console.log('vannu');
            console.log(name === process.env.admin, password == process.env.password);
            if (name === process.env.admin && password === process.env.password) {
                const token = await createToken(name, '7d')
                res.status(200).json({ message: true, token })

            } else {
                res.status(200).json({ message: false })
            }
        } catch (error) {
            console.log(error);
        }
    }

    getOrders = async (req, res) => {
        try {
            const response = await repository.getOrders()
            res.status(200).json(response)
        } catch (error) {
            console.log(error);
        }
    }
    getAuthority = async (req, res) => {
        try {
            const response = await repository.getAuthority()
            res.status(200).json(response)
        } catch (error) {
            console.log(error);
        }
    }






}
