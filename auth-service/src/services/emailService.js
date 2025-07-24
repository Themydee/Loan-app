import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

// Generate verification email HTML template
const generateVerificationEmailTemplate = (userName, verificationLink) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - LoanApp</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #007bff;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #007bff;
                margin-bottom: 10px;
            }
            .verify-btn {
                display: inline-block;
                background-color: #007bff;
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
                font-weight: bold;
                text-align: center;
            }
            .verify-btn:hover {
                background-color: #0056b3;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                font-size: 14px;
                color: #666;
                text-align: center;
            }
            .warning {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">LoanApp</div>
                <p>Welcome to Your Financial Future</p>
            </div>
            
            <h2>Hi ${userName}!</h2>
            
            <p>Thank you for registering with LoanApp. To complete your registration and start your loan application process, please verify your email address.</p>
            
            <div style="text-align: center;">
                <a href="${verificationLink}" class="verify-btn">
                    Verify My Email Address
                </a>
            </div>
            
            <p>If the button above doesn't work, you can also copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 3px;">
                ${verificationLink}
            </p>
            
            <div class="warning">
                <strong>Important:</strong> This verification link will expire in 24 hours for security reasons.
            </div>
            
            <p>If you didn't create an account with LoanApp, please ignore this email.</p>
            
            <div class="footer">
                <p>This is an automated message from LoanApp.</p>
                <p>Need help? Contact our support team at support@loanapp.com</p>
                <p>&copy; 2025 LoanApp. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Generate password reset email template
const generatePasswordResetEmailTemplate = (userName, resetLink) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password - LoanApp</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #dc3545;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #dc3545;
                margin-bottom: 10px;
            }
            .reset-btn {
                display: inline-block;
                background-color: #dc3545;
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
                font-weight: bold;
                text-align: center;
            }
            .reset-btn:hover {
                background-color: #c82333;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                font-size: 14px;
                color: #666;
                text-align: center;
            }
            .warning {
                background-color: #f8d7da;
                border: 1px solid #f5c6cb;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
                color: #721c24;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">LoanApp</div>
                <p>Password Reset Request</p>
            </div>
            
            <h2>Hi ${userName}!</h2>
            
            <p>We received a request to reset your password for your LoanApp account.</p>
            
            <div style="text-align: center;">
                <a href="${resetLink}" class="reset-btn">
                    Reset My Password
                </a>
            </div>
            
            <p>If the button above doesn't work, you can also copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 3px;">
                ${resetLink}
            </p>
            
            <div class="warning">
                <strong>Security Notice:</strong> This password reset link will expire in 1 hour for security reasons.
            </div>
            
            <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
            
            <div class="footer">
                <p>This is an automated message from LoanApp.</p>
                <p>Need help? Contact our support team at support@loanapp.com</p>
                <p>&copy; 2025 LoanApp. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Send verification email
export const sendVerificationEmail = async (userEmail, userName, verificationToken) => {
  try {
    // Build verification link
    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
    
    const mailOptions = {
      from: {
        name: 'LoanApp',
        address: process.env.SENDER_EMAIL 
      },
      to: userEmail,
      subject: 'Verify Your Email Address - LoanApp',
      html: generateVerificationEmailTemplate(userName, verificationLink),
      text: `Hi ${userName}!\n\nPlease verify your email address by clicking this link: ${verificationLink}\n\nThis link will expire in 24 hours.\n\nIf you didn't create an account, please ignore this email.\n\nBest regards,\nLoanApp Team`
    };

    const result = await transporter.sendMail(mailOptions);
    
    console.log('Verification email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, error: error.message };
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (userEmail, userName, resetToken) => {
  try {
    
    // Build reset link
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    // For API-only reset: `${process.env.API_BASE_URL}/api/auth/reset-password/${resetToken}`
    
    const mailOptions = {
      from: {
        name: 'LoanApp',
        address: process.env.SENDER_EMAIL 

      },
      to: userEmail,
      subject: 'Reset Your Password - LoanApp',
      html: generatePasswordResetEmailTemplate(userName, resetLink),
      text: `Hi ${userName}!\n\nWe received a request to reset your password. Click this link to reset it: ${resetLink}\n\nThis link will expire in 1 hour.\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nLoanApp Team`
    };

    const result = await transporter.sendMail(mailOptions);
    
    console.log('Password reset email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error: error.message };
  }
};