const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReservationConfirmation = async (userEmail, reservation) => {
  try {
    const mailOptions = {
      from: `"Bamboo Paradise Hotel" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Reservation Confirmed - ${reservation.reservation_number}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d5016;">🌿 Bamboo Paradise Hotel</h2>
          <h3>Reservation Confirmed!</h3>
          <p>Dear Guest,</p>
          <p>Your reservation has been confirmed. Here are your booking details:</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Reservation Number:</strong> ${reservation.reservation_number}</p>
            <p><strong>Room:</strong> ${reservation.room_category} - Room ${reservation.room_number}</p>
            <p><strong>Check-in:</strong> ${new Date(reservation.check_in_date).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> ${new Date(reservation.check_out_date).toLocaleDateString()}</p>
            <p><strong>Guests:</strong> ${reservation.adults} Adult(s), ${reservation.children} Child(ren)</p>
            <p><strong>Total Amount:</strong> $${parseFloat(reservation.total_amount).toFixed(2)}</p>
          </div>
          
          <p>We look forward to welcoming you!</p>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            If you have any questions, please contact us at ${process.env.EMAIL_USER}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent to:', userEmail);
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    // Don't throw error - email failure shouldn't break the reservation
  }
};

const sendContactFormNotification = async (contactData) => {
  try {
    const mailOptions = {
      from: `"Bamboo Paradise Hotel" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message: ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${contactData.message}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Contact notification sent');
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
  }
};

const sendPasswordResetEmail = async (userEmail, resetToken) => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: `"Bamboo Paradise Hotel" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d5016;">🌿 Bamboo Paradise Hotel</h2>
          <h3>Password Reset Request</h3>
          <p>You requested to reset your password. Click the button below to proceed:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: #2d5016; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            This link will expire in 1 hour. If you didn't request this, please ignore this email.
          </p>
          
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            Or copy this link: ${resetUrl}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent to:', userEmail);
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
  }
};

module.exports = {
  sendReservationConfirmation,
  sendContactFormNotification,
  sendPasswordResetEmail,
};
