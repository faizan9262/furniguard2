export const htmlContent =(otp)=>{ 
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
`}

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
  