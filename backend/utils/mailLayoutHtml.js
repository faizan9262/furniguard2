export const htmlContent = (otp) => {
  return `
  <div style="max-width: 600px; margin: auto; padding: 30px; background-color: #f4f4f4; font-family: Arial, sans-serif; color: #333; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
  <div style="text-align: center;">
    <h2 style="color: #4CAF50;">🔐 Email Verification</h2>
    <p style="font-size: 16px;">Hi there,</p>
    <p style="font-size: 16px;">Your One-Time Password (OTP) for email verification is:</p>

    <div style="margin: 20px auto; padding: 10px 20px; background-color: #fff; border: 1px dashed #4CAF50; display: inline-block; font-size: 24px; font-weight: bold; letter-spacing: 3px; color: #000;">
      ${otp}
    </div>

    <p style="font-size: 14px; color: #777;">This OTP is valid for <strong>10 minutes</strong>.</p>
    <p style="font-size: 14px; color: #777;">If you did not request this, please ignore this email.</p>
    
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
    <p style="font-size: 12px; color: #999;">FurniGuard | www.furniguard.com</p>
  </div>
</div>
`;
};

export const appointmentDeletedEmail = ({
  appointmentData,
  designer,
  user,
  reason,
  type,
}) => {
  return `
  <div style="max-width: 600px; margin: auto; padding: 30px; background-color: #f9f9f9; font-family: Arial, sans-serif; color: #333; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <div style="text-align: center;">
      <h2 style="color: #e53935;">Appointment Cancelled</h2>

      <p style="font-size: 16px;">Hello ${
        type === "user" ? user.username : designer.user.username
      },</p>

      <p style="font-size: 16px;">
        We regret to inform you that the following appointment has been <strong>deleted</strong>.
      </p>

      <div style="margin: 20px auto; padding: 15px 25px; background-color: #fff; border: 1px solid #e53935; border-radius: 6px; text-align: left; display: inline-block;">
        <p style="margin: 0; font-size: 14px;"><strong>Created At:</strong> ${appointmentData.updatedAt.toLocaleString(
          "en-IN",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }
        )}</p>
        <p style="margin: 0; font-size: 14px;"><strong>Scheduled Date:</strong> ${appointmentData.appointmentDate.toLocaleString(
          "en-IN",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }
        )}</p>
        <p style="margin: 0; font-size: 14px;"><strong>User Name:</strong> ${
          user.username
        }</p>
        <p style="margin: 0; font-size: 14px;"><strong>Designer Name:</strong> ${
          designer.user.username
        }</p>
        <p style="margin: 0; font-size: 14px;"><strong>Mode:</strong> ${
          appointmentData.appointmentMode
        }</p>
        <p style="margin: 0; font-size: 14px;"><strong>Address:</strong> ${
          appointmentData.locationAddress
        }</p>
      </div>

      <p style="font-size: 14px; color: #d32f2f; margin-top: 10px;">
        <strong>Reason:</strong> ${reason}
      </p>

      <p style="font-size: 14px; color: #777;">If you believe this was a mistake, please contact our support team.</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
      <p style="font-size: 12px; color: #999;">FurniGuard | www.furniguard.com</p>
    </div>
  </div>
  `;
};

export const htmlResetContent = (resetLink) => {
  return `
    <div style="max-width: 600px; margin: auto; padding: 30px; background-color: #f4f4f4; font-family: Arial, sans-serif; color: #333; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <div style="text-align: center;">
        <h2 style="color: #4CAF50;">🔒 Reset Your Password</h2>
        <p style="font-size: 16px;">Hi there,</p>
        <p style="font-size: 16px;">You recently requested to reset your password. Click the button below to continue:</p>
  
        <a href="${resetLink}" style="display: inline-block; margin: 20px auto; padding: 12px 24px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Reset Password
        </a>
  
        <p style="font-size: 14px; color: #777;">This link will expire in <strong>10 minutes</strong>.</p>
        <p style="font-size: 14px; color: #777;">If you did not request this, please ignore this email.</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
        <p style="font-size: 12px; color: #999;">FurniGuard | www.furniguard.com</p>
      </div>
    </div>
    `;
};

export const htmlRegisterContent = () => {
  return `
      <div style="font-family: 'Roboto', sans-serif; background-color: #f5f5f5; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://res.cloudinary.com/dnucvxpab/image/upload/v1735625188/logo_d82mp0.png" alt="Furniguard Logo" style="width: 150px;" />
            <h2 style="color: #4CAF50; margin-bottom: 10px;">Welcome to Furniguard!</h2>
          </div>
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            Thank you for registering with Furniguard. We're excited to help you transform your home with our innovative products and design services.
          </p>
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            Stay tuned for more updates, exciting offers, and home styling inspiration tailored just for you!
          </p>
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            If you have any questions, feel free to contact us. We’re always happy to help.
          </p>
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            Best Regards,<br>The Furniguard Team
          </p>
          <div style="border-top: 1px solid #ddd; margin: 30px 0;"></div>
          <div style="font-size: 12px; color: #999; text-align: center; margin-top: 40px;">
            Furniguard | <a href="https://www.furniguard.com" style="color: #999; text-decoration: none;">www.furniguard.com</a>
          </div>
        </div>
      </div>
    `;
};

export const htmlLoginAlertContent = () => {
  return `
      <div style="font-family: 'Roboto', sans-serif; background-color: #f5f5f5; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://res.cloudinary.com/dnucvxpab/image/upload/v1735625188/logo_d82mp0.png" alt="Furniguard Logo" style="width: 150px;" />
            <h2 style="color: #4CAF50; margin-bottom: 10px;">Login Alert</h2>
          </div>
  
          <p style="font-size: 16px; color: #555; line-height: 1.6;">Hi there,</p>
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            We noticed a login attempt to your Furniguard account. If this was you, welcome back!
          </p>
  
          <div style="background-color: #ff4d4f; color: white; padding: 15px; border-radius: 6px; margin-top: 20px; font-weight: bold;">
            🚨 Login Alert: If this wasn't you, please secure your account immediately.
          </div>
  
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            If the login was intentional, feel free to continue exploring our design tools and product collections.
          </p>
          <p style="font-size: 16px; color: #555; line-height: 1.6;">Need help? Contact our support team anytime.</p>
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            Best Regards,<br>The Furniguard Team
          </p>
  
          <div style="border-top: 1px solid #ddd; margin: 30px 0;"></div>
  
          <div style="font-size: 12px; color: #999; text-align: center; margin-top: 40px;">
            Furniguard | <a href="https://www.furniguard.com" style="color: #999; text-decoration: none;">www.furniguard.com</a>
          </div>
        </div>
      </div>
    `;
};
