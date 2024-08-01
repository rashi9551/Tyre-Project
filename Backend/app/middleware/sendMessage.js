import request from "request";
export const sendMessageTyre = async () => {
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
                to: '+918606214253',
                type: 'template',
                template: {
                    name: 'renew_message',
                    language: {
                        code: 'en' 
                    },
                    components: [
                        {
                            type: 'header',
                            parameters: [
                                {
                                    type: 'image', 
                                    image: {
                                        link: 'https://thumbs.dreamstime.com/b/mechanic-fixing-car-tire-repair-shop-low-section-auto-61840281.jpg'
                                    }
                                }
                            ]
                        }
                    ]
                }
            })
        };

        const sendRequest = () => {
            return new Promise((resolve, reject) => {
                request(options, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve({ status: true, answer: body });
                    }
                });
            });
        };

        resData = await sendRequest();
    } catch (error) {
        console.error('Error:', error);
        resData.answer = error.message;
    }

    return resData;
};
export const sendMessageTyreOrder = async () => {
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
                to: '+918606214253',
                type: 'template',
                template: {
                    name: 'order_message',
                    language: {
                        code: 'en' 
                    },
                    components: [
                        {
                            type: 'header',
                            parameters: [
                                {
                                    type: 'image', 
                                    image: {
                                        link: 'https://thumbs.dreamstime.com/b/mechanic-fixing-car-tire-repair-shop-low-section-auto-61840281.jpg'
                                    }
                                }
                            ]
                        }
                    ]
                }
            })
        };

        const sendRequest = () => {
            return new Promise((resolve, reject) => {
                request(options, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve({ status: true, answer: body });
                    }
                });
            });
        };

        resData = await sendRequest();
    } catch (error) {
        console.error('Error:', error);
        resData.answer = error.message;
    }

    return resData;
};
