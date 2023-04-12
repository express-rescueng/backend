import axios from 'axios';

/*
    The key from one of your Verification Apps, found here https://dashboard.sinch.com/verification/apps
 */
export const verifyNumber = (TO_NUMBER) => {
    const APPLICATION_KEY = "32b88315-39bc-4c47-97aa-b6e918eb095f";

    /*
        The secret from the Verification App that uses the key above, found here https://dashboard.sinch.com/verification/apps
    */
    const APPLICATION_SECRET = "o5lvhW8V70KQ2Vyn5SJupg==";

    /*
        The number that will receive the SMS. Test accounts are limited to verified numbers.
        The number must be in E.164 Format, e.g. Netherlands 0639111222 -> +31639111222
    */
    // const TO_NUMBER = "+2349025563043";

    const SINCH_URL = "https://verification.api.sinch.com/verification/v1/verifications";

    const basicAuthentication = APPLICATION_KEY + ":" + APPLICATION_SECRET;

    const payload = {
        identity: {
            type: 'number',
            endpoint: TO_NUMBER
        },
        method: 'sms'
    };

    const headers = {
        'Authorization': 'Basic ' + Buffer.from(basicAuthentication).toString('base64'),
        'Content-Type': 'application/json; charset=utf-8'
    };

    axios.post(SINCH_URL, payload, { headers })
        .then(response =>
            console.log(response.data)
        ).catch(error =>
            console.error('There was an error!', error)
        );
};