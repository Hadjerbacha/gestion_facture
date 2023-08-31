/*const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Configuration du transporteur Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Outlook', // ou un autre service de messagerie
  auth: {
    user: 'hadjerb11@outlook.com',
    pass: '112003hadjer',
  },
});

// Contenu de l'e-mail
const mailOptions = {
  from: 'hadjerb11@outlook.com',
  to: 'hadjern224@gmail.com',
  subject: 'Test d\'envoi d\'e-mail avec pièce jointe PDF',
  text: 'Ceci est un test d\'envoi d\'e-mail avec une pièce jointe PDF.',
  attachments: [
    {
      filename: 'table.pdf',
      path: path.join(__dirname, '../table.pdf'),
    },
  ],
};

// Envoi de l'e-mail
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
  } else {
    console.log('E-mail envoyé :', info.response);
  }
});*/
