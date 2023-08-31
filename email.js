/*const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'Outlook',
  auth: {
    user: 'hadjerb11@outlook.com',
    pass: '112003hadjer'
  }
});

app.post('/send-email', (req, res) => {
  const { filename, filePath, recipientEmail } = req.body;

  const mailOptions = {
    from: 'hadjerb11@outlook.com',
    to: recipientEmail,
    subject: 'Tableau PDF',
    text: 'Veuillez trouver ci-joint le fichier PDF contenant votre tableau.',
    attachments: [
      {
        filename: filename,
        path: filePath
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});*/
