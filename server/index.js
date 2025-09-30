// Load environment variables from .env file (for sensitive information like email credentials)
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

// Import dependencies
import express from "express";
import { createTransport } from "nodemailer";
import { json } from "body-parser";
import cors from "cors";

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Enable cross-origin resource sharing
app.use(json()); // Parse JSON request bodies

// Set up Nodemailer transporter for sending emails
const transporter = createTransport({
  service: "gmail", // You can use other services like Outlook, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email (stored in .env file)
    pass: process.env.EMAIL_PASS, // Your email password (stored in .env file)
  },
});

// Route to handle inquiry form submissions
app.post("/api/inquiry", (req, res) => {
  const { fullName, phone, email, division, subject, country, message } = req.body;

  // Setup email options
  const mailOptions = {
    from: email, // From field will be the sender's email
    to: process.env.EMAIL_USER, // To field is the email where the message will be sent
    subject: `New Inquiry from ${fullName}`,
    text: `
      Name: ${fullName}
      Phone: ${phone}
      Email: ${email}
      Division: ${division}
      Subject: ${subject}
      Country: ${country}
      Message: ${message}
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "Error sending email", error });
    }
    res.status(200).json({ message: "Inquiry submitted successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
