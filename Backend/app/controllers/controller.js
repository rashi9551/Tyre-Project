import repo from "../repository/repo.js";
import { createToken } from '../utils/jwt.js';
import { sendMessageTyre } from '../middleware/sendMessage.js';
import { sendMessageTyreOrder } from '../middleware/sendMessage.js';
import request from "request";
import cron from 'node-cron'

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

    orderAlign = async (req, res) => {
        try {
            const data = req.body;
            const { dueDate } = data.formData;
            data.category = 'tyreAlign'
            const response = await repository.order(data);

            if (response.message) {
                const MessageResponse = await sendMessageTyre()
                console.log(MessageResponse, "ithu first ponney");
                const monthsToAdd = parseInt(dueDate, 10);
                if (isNaN(monthsToAdd) || monthsToAdd < 1 || monthsToAdd > 12) {
                    throw new Error('Invalid dueDate value');
                }

                // Calculate the future date
                const futureDate = new Date();
                futureDate.setMonth(futureDate.getMonth() + monthsToAdd);

                // // Extract the parts for the cron expression

                // const minutes = futureDate.getMinutes();
                // const hours = futureDate.getHours();
                // const day = futureDate.getDate();
                // const month = futureDate.getMonth() + 1; // Months are 0-based in JavaScript

                // // Create a cron expression: "minute hour day month *"
                // const cronExpression = `${minutes} ${hours} ${day} ${month} *`;

                const now = new Date();
                const minutes = now.getMinutes() + 2;
                const hours = now.getHours();
                const day = now.getDate();
                const month = now.getMonth() + 1; // Months are 0-based in JavaScript

                // Create a cron expression for 1 minute from now
                const cronExpression = `${minutes % 60} ${hours} ${day} ${month} *`;

                // Schedule the cron job
                cron.schedule(cronExpression, async () => {
                    console.log('Sending scheduled message...');
                    try {
                        const MessageResponse = await sendMessageTyreOrder();
                        console.log(MessageResponse, "=-=-=-=-");
                    } catch (messageError) {
                        console.error('Error sending message:', messageError);
                    }
                });

                console.log(`Cron job scheduled for ${futureDate}`);
            }

            res.status(200).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    orderOil = async (req, res) => {
        // Assuming this is a placeholder for future implementation
        try {
            console.log('oil data', req.body);
            const data = req.body;
            data.category = 'oil'
            const response = await repository.order(data);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error in order' });
        }
    };

    orderTyre = async (req, res) => {
        try {
            console.log('tyre purchse data', req.body);
            const data = req.body;
            data.category = 'tyre'
            const response = await repository.order(data);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error in order tyre pruchase' });
        }
    }
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
                    to: '+918848888069',
                    type: 'template',
                    template: {
                        name: 'renew_message',
                        language: {
                            code: 'en' // Make sure this matches the template's language code
                        },
                        components: [
                            {
                                type: 'header',
                                parameters: [
                                    {
                                        type: 'image', // Ensure this matches the format of your template
                                        image: {
                                            link: 'https://climbr-post.s3.eu-north-1.amazonaws.com/aljamhoor.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCmV1LW5vcnRoLTEiRjBEAiA0fKqMC7oIF8r26e4l5yLcluoenyQuXMb4U57%2F6bpBTAIgbHQ8ywMb1S9oPafR7YF%2BRhM6d7sR36yhaSYEHiNorfIq5AIISBAAGgw5OTIzODI2NzkxMjgiDHxKzntS%2BLg36WQ17irBAmFZHgWxyql%2Fh6WahonOV7hG5C4gwfV68tjIHsvnkHCoCyQNutt3fpMiONiVYY0wEOIlRcMb%2F9pnGjG%2BXqbhxCQg8pBbhYjFG1QA1pxXdpnx7wY2KuVPv5VsJCQ3OUI%2FSzLf7ZfsR08cFsNerggtHf78koaImF8tJmye%2F5f87b9bFTzZiJbTAV7FX1Qg4f1RquZ4RK%2FSFCjAWkcnHmft4PVSzbv9U%2BTnsVQdAsUzkKNsg0DXUJXfcjeoWBzFp2U49oig8wy%2Bj0SC6EabkctODiXSFZ0RHor%2FPbU1OjqLdSCk%2FnBML%2FJ3RrFCf6xfVMuvZv33R8vvhO6N1cwTJ%2FrzNQeuwXk0nHyLVWEUdZgf3nxvt43D%2F3QHnuudsb%2BlrsSsGLNkWDrDstE0v0v93JjukFumsp7xnHUKcDuu1W0RtaiIBzC9haS1Bjq0AvVLfhTmFuO0g2O588Qz4Z%2FiLN3YZQ2gnumpDd%2FoM9Yg%2F20M6dTWHssIia38r7UywG3GmMYn1%2FZzz8AlhkDB93wXpM0nxYV7WUdjmNW0f2sw%2B0pI9oRaHuiwMd6snDEwFgXs0VT8I74AA6kriVFV6ig0xFED9kpBnJbwMeaVX%2BIVpR8WeaKPMszXzbAW2v9Krl0U1FjJ5YAIbocLqOiq4cArpfnfwBx5iwq2G4lJUvnqZjw6HwJ7fBvkb9KsNq87aGpveEwK6ys4Zb7mWauTtVJJ%2FHjv5zdEveM7Z7dg%2B9ohTEbXxhob6taCHKDvY4JL9KMblR%2FiMTuLHUNq0%2FnLatCX8bjZqHor%2FdeQ9vcnqAuOct4yQgqBlYzMrd%2BEWjbJHU57TEeqzeM7SLPAVh4cBMPx9dg%2F&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240730T151534Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=ASIA6ODU57BMGU4ICCH6%2F20240730%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Signature=d099b6d2bd385326c7450e33b592b74a8508d6d22ef6b09198ad28c556bd9d6b'
                                        }
                                    }
                                ]
                            }
                        ]
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
    getGraphData = async (req, res) => {
        try {
            const { shopName } = req.body
            const response = await repository.graphData(shopName);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error in getAuthority' });
        }
    };
}
