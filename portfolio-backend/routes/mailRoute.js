// routes/mailRoute.js
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const YOUR_EMAIL = process.env.SMTP_EMAIL;
const YOUR_APP_PASSWORD = process.env.SMTP_PASSWORD;


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: `${YOUR_EMAIL}`,
    pass: `${YOUR_APP_PASSWORD}`,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.post("/send-mail", async (req, res) => {
  const { name, email, message } = req.body;

  const mailToOwner = {
    from: email,
    to: YOUR_EMAIL,
    subject: "New Contact Form Submission",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .header p {
            margin: 8px 0 0 0;
            opacity: 0.9;
            font-size: 14px;
          }
          .content {
            padding: 30px;
          }
          .field {
            margin-bottom: 25px;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
          }
          .field:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          .field-label {
            font-weight: 600;
            color: #555;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          .field-value {
            font-size: 16px;
            color: #333;
            word-wrap: break-word;
          }
          .message-content {
            background-color: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 15px;
            border-radius: 4px;
            white-space: pre-wrap;
          }
          .email-link {
            color: #667eea;
            text-decoration: none;
          }
          .email-link:hover {
            text-decoration: underline;
          }
          .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #eee;
          }
          .timestamp {
            font-size: 12px;
            color: #888;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Contact Form Submission</h1>
            <p>You have received a new message from your website</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="field-label">Name</div>
              <div class="field-value">${name}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Email Address</div>
              <div class="field-value">
                <a href="mailto:${email}" class="email-link">${email}</a>
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">Message</div>
              <div class="field-value">
                <div class="message-content">${message}</div>
              </div>
            </div>
            
            <div class="timestamp">
              Received: ${new Date().toLocaleString()}
            </div>
          </div>
          
          <div class="footer">
            <p>This email was automatically generated from your website's contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  const acknowledgment = {
    from: YOUR_EMAIL,
    to: email,
    subject: "Thanks for contacting me!",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Message</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .header p {
            margin: 8px 0 0 0;
            opacity: 0.9;
            font-size: 14px;
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin-bottom: 20px;
          }
          .message {
            font-size: 16px;
            line-height: 1.7;
            color: #555;
            margin-bottom: 25px;
          }
          .highlight-box {
            background-color: #f8f9fa;
            border-left: 4px solid #4CAF50;
            padding: 20px;
            border-radius: 4px;
            margin: 25px 0;
          }
          .highlight-box h3 {
            margin: 0 0 10px 0;
            color: #4CAF50;
            font-size: 16px;
          }
          .highlight-box p {
            margin: 0;
            color: #666;
            font-size: 14px;
          }
          .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
          .signature-name {
            font-weight: 600;
            color: #333;
            font-size: 16px;
          }
          .signature-title {
            color: #666;
            font-size: 14px;
            margin-top: 5px;
          }
          .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #eee;
          }
          .footer a {
            color: #4CAF50;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
          .checkmark {
            display: inline-block;
            margin-right: 8px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Message Received!</h1>
            <p>Thank you for reaching out</p>
          </div>
          
          <div class="content">
            <div class="greeting">Hi ${name},</div>
            
            <div class="message">
              Thank you for taking the time to contact me! I've successfully received your message and really appreciate you reaching out.
            </div>
            
            <div class="highlight-box">
              <h3><span class="checkmark">⏰</span>What happens next?</h3>
              <p>I'll review your message and get back to you within 24-48 hours. If your inquiry is urgent, please don't hesitate to reach out directly.</p>
            </div>
            
            <div class="message">
              In the meantime, feel free to explore my website or connect with me on social media. I'm looking forward to our conversation!
            </div>
            
            <div class="signature">
              <div class="signature-name">Best regards,</div>
              <div class="signature-name">Aswin Raj</div>
              <div class="signature-title">Full Stack Developer</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated confirmation email.</p>
            <p>If you have any immediate concerns, please reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(acknowledgment);
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending mail:", error);
    res.status(500).json({ success: false, error: "Email failed to send" });
  }
});

module.exports = router;
