var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
transporter.sendMail({
    from: 'xijinping@163.com',
    to: 'phoebe.sun@loweprofero.com',
    subject: '少年，我看好你哦',
    text: '少年，我看好你哦'
});
