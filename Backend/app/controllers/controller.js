import repo from "../repository/repo.js";
import { createToken } from '../utils/jwt.js';
import request from "request";

const repository = new repo();

export default class Controller {

    signup = async (req, res) => {
        try {
            const data = req.body;
            const response = await repository.saveAuthority(data);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error in signup' });
        }
    };

    login = async (req, res) => {
        try {
            const data = req.body;
            const response = await repository.login(data);
            console.log(response);

            if (response.message) {
                const token = await createToken(response._id, '7d');
                res.status(200).json({ token, ...response });
            } else {
                res.status(200).json({ message: false });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error in login' });
        }
    };

    order = async (req, res) => {
        try {
            const data = req.body;
            const response = await repository.order(data);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error in order' });
        }
    };

    getOrders = async (req, res) => {
        try {
            const response = await repository.getOrders();
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error in getOrders' });
        }
    };

    getAuthority = async (req, res) => {
        try {
            const response = await repository.getAuthority();
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error in getAuthority' });
        }
    };

    sendMessage = async (req, res) => {
        let resData = {
            status: false,
            answer: ''
        };

        try {
            const options = {
                method: 'POST',
                url: 'https://graph.facebook.com/v20.0/405381042649464/messages',
                headers: {
                    Authorization: `Bearer ${process.env.SECRET_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messaging_product: 'whatsapp',
                    to: '+919544429615',
                    type: 'template',
                    template: {
                        name: 'hello_world',
                        language: {
                            code: 'en_US'
                        }
                    }
                })
            };

            request(options, function (error, response, body) {
                if (error) {
                    console.error('Error sending message:', error);
                    resData.answer = error.message;
                    return res.status(500).json(resData);
                }
                resData.status = true;
                resData.answer = body;
                return res.status(200).json(resData);
            });
        } catch (e) {
            console.error('Error in sendMessage:', e);
            resData.answer = e.message;
            return res.status(500).json(resData);
        }
    };

}
