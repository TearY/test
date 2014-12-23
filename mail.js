var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
transporter.sendMail({
    from: '123@163.com',
    to: 'krabs.xie@loweprofero.com',
    subject: '准备gg',
    text: 'lol搞起啊'
});