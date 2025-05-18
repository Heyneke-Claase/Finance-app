require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs');

const app = express();

// Enhanced Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later'
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Enhanced File Upload Handling
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify connection
transporter.verify()
  .then(() => console.log('Email server ready'))
  .catch(err => console.error('Email connection error:', err));

// Enhanced Email Templates
const createApplicationEmail = (data) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .email-container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
      .application-details { margin-top: 20px; }
      .detail-item { margin-bottom: 10px; }
      .detail-item strong { color: #4f46e5; }
    </style>
  </head>
  <body>
    <div class="email-container">
      <h2>New Loan Application</h2>
      <div class="application-details">
        ${Object.entries(data).map(([key, value]) => `
          <div class="detail-item">
            <strong>${key}:</strong> <span>${value}</span>
          </div>
        `).join('')}
      </div>
    </div>
  </body>
  </html>
`;

// Loan Application Endpoint
app.post('/api/applications', upload.array('documents'), async (req, res) => {
  try {
    const {
      'first-name': firstName,
      'last-name': lastName,
      email,
      phone,
      'id-number': idNumber,
      'loan-amount': loanAmount,
      'repayment-period': repaymentPeriod,
      'employment-status': employmentStatus,
      'monthly-income': monthlyIncome
    } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !idNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    // Prepare email content
    const applicationData = {
      Name: `${firstName} ${lastName}`,
      Email: email,
      Phone: phone,
      'ID Number': idNumber,
      'Loan Amount': `R${loanAmount}`,
      'Repayment Period': `${repaymentPeriod} months`,
      'Employment Status': employmentStatus,
      'Monthly Income': `R${monthlyIncome}`,
      'Documents Uploaded': `${req.files?.length || 0}`
    };

    const mailOptions = {
      from: `"HC Financial Solutions" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Loan Application from ${firstName} ${lastName}`,
      html: createApplicationEmail(applicationData),
      attachments: req.files?.map(file => ({
        filename: file.originalname,
        content: file.buffer
      })) || []
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation to applicant
    await transporter.sendMail({
      from: `"HC Financial Solutions" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Application Has Been Received',
      html: `
        <p>Dear ${firstName},</p>
        <p>Thank you for your loan application of R${loanAmount}.</p>
        <p>We will review your application and contact you within 2 business days.</p>
        <p>Best regards,<br>HC Financial Solutions</p>
      `
    });

    res.json({
      success: true,
      message: 'Application submitted successfully!'
    });

  } catch (error) {
    console.error('Application error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again later.'
    });
  }
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject = 'Website Contact', message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    await transporter.sendMail({
      from: `"HC Financial Solutions" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact: ${subject}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email
    });

    res.json({
      success: true,
      message: 'Your message has been sent successfully!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// Serve frontend (only if index.html exists)
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // In development, if index.html doesn't exist, return a JSON message
    res.status(404).json({
      success: false,
      message: 'Frontend not built. Please run "npm run build" in your React app.'
    });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});