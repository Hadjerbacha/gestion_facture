/*const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { email, pdfBase64 } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Outlook', // E.g., Gmail, Outlook, etc.
    auth: {
      user: 'hadjerb11@outlook.com',
      pass: '112003hadjer',
    },
  });

  try {
    await transporter.sendMail({
      from: 'hadjerb11@outlook.com',
      to: email,
      subject: 'Factures Exportées',
      text: 'Veuillez trouver ci-joint le PDF des factures exportées.',
      attachments: [
        {
          filename: 'factures.pdf',
          content: Buffer.from(pdfBase64, 'base64'),
        },
      ],
    });

    res.status(200).json({ message: 'E-mail envoyé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail.' });
  }
});

module.exports = router;*/
