import { createTransport } from 'nodemailer';

const transporter = createTransport({
  service: "gmail", // Or another email service like Outlook, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { fullName, phone, email, division, subject, country, message } = req.body;

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
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

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: "Inquiry submitted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error sending email", error });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
