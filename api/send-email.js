const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();

app.use(bodyParser.json());

// Email route
app.post('/send-email', (req, res) => {
  const { name, email, whatsapp, message } = req.body;

  // Create a Nodemailer transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: import.meta.env.VITE_GMAIL_USER, //  Gmail address
      pass: import.meta.env.VITE_GMAIL_PASS  // Gmail password
    }
  });

  // Define the email options
  const mailOptions = {
    from: email, // The user's email address
    to: 'elishamugenyi5@gmail.com', // Your email address
    subject: 'New Contact Form Submission',
    text: `You have a new message from ${name} (${email}, WhatsApp: ${whatsapp}):

Message: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
