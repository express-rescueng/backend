import axios from 'axios';
import User from '../models/user.js';


const verifyOtp = async (req, res) => {
    /*
        The key from one of your Verification Apps, found here https://dashboard.sinch.com/verification/apps
     */
    const TO_NUMBER = req.session.number;
    console.log(req.body);
    const CODE = req.body.otp;
    const APPLICATION_KEY = "32b88315-39bc-4c47-97aa-b6e918eb095f";

    /*
        The secret from the Verification App that uses the key above, found here https://dashboard.sinch.com/verification/apps
    */
    const APPLICATION_SECRET = "o5lvhW8V70KQ2Vyn5SJupg==";

    /*
        The number that will receive the SMS. Test accounts are limited to verified numbers.
        The number must be in E.164 Format, e.g. Netherlands 0639111222 -> +31639111222
    */
    // const TO_NUMBER = "<REPLACE_WITH_YOUR_NUMBER>";

    /*
        The code which was sent to the number.
    */
    // const CODE = "<REPLACE_WITH_YOUR_CODE>"

    const SINCH_URL = "https://verification.api.sinch.com/verification/v1/verifications/number/" + TO_NUMBER;

    const basicAuthentication = APPLICATION_KEY + ":" + APPLICATION_SECRET;

    const payload = {
        method: 'sms',
        sms: {
            code: CODE
        }
    };

    const headers = {
        'Authorization': 'Basic ' + Buffer.from(basicAuthentication).toString('base64'),
        'Content-Type': 'application/json; charset=utf-8'
    };

    axios.put(SINCH_URL, payload, { headers })
        .then(response => {
            console.log(response.data);
            const user = User.findOne({ phone: TO_NUMBER });

            user.save();
        })
        .then(res.send('OTP Verified'))
        .catch(error => {
            console.error('There was an error!', error);
        });




};
export default verifyOtp;