
const User = require('../models/user.js');

const uploadFile = async (req, res) => {
    console.log(req.session.user);
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    const name = req.session.user.firstName;
    const file = req.files.file;
    const fileName = file.name + '-' + name + '-' + Date.now() + path.extname(file.name);
    const filePath = path.join(__dirname, '../uploads', fileName);
    file.mv(filePath);
    User.findOne({ email: req.session.user.email }, (err, user) => {
        if (err) {
            console.log(err);
        }
        user.profilePic = fileName;
        user.save();
    });
    res.redirect('/home');
};
module.export = uploadFile;