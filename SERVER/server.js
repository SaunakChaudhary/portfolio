require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/contactme", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }

    // Check if required environment variables exist
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      !process.env.EMAIL_HOST ||
      !process.env.EMAIL_PORT
    ) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Create a transporter to send the email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Check if the email is valid for sending
    transporter.verify((error, success) => {
      if (error) {
        console.error("Email verification error:", error);
        return res.status(500).json({
          message: "Failed to send email. Email configuration error.",
        });
      }
      console.log("Email is ready to send");

      // Mail options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thank you for contacting me",
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Thank you for reaching out!</h2>
        <p>I have received your message and will get back to you as soon as possible.</p>
        <p style="margin-top: 20px;">Best regards,<br>Saunak Chaudhary</p>
        </div>
      `,
      };

    const mailOptions1 = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 15px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br>${message}</p>
        </div>
        <p style="color: #666; margin-top: 20px; font-size: 12px;">This message was sent from your portfolio contact form.</p>
        </div>
      `,
    };

      // Send the email
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Error sending email:", err);
          return res
            .status(500)
            .json({ message: "Failed to send email. Please try again later." });
        }
        console.log("Email sent:", info.response);
        return res.status(200).json({ message: "Thank you for contacting us" });
      });

      transporter.sendMail(mailOptions1, (err, info) => {
        if (err) {
          console.error("Error sending email:", err);
          return res
            .status(500)
            .json({ message: "Failed to send email. Please try again later." });
        }
        console.log("Email sent:", info.response);
        return res.status(200).json({});
      });
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Failed to send email. Please try again later." });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening to the PORT ${process.env.PORT}`);
});
