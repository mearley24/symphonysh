
/**
 * Generates HTML email content for business notification
 */
export function generateBusinessEmailHtml(appointment: any, formattedDate: string, formattedTime: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h1 style="color: #333; text-align: center;">New Appointment Scheduled</h1>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <h2 style="margin-top: 0; color: #0056b3;">${appointment.name}</h2>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${formattedTime}</p>
        <p style="margin: 5px 0;"><strong>Service:</strong> ${appointment.service}</p>
      </div>
      <div style="margin-bottom: 20px;">
        <h3>Contact Information:</h3>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${appointment.email}</p>
        <p style="margin: 5px 0;"><strong>Phone:</strong> ${appointment.phone}</p>
      </div>
      ${appointment.message ? `
      <div style="margin-bottom: 20px;">
        <h3>Message:</h3>
        <p style="background-color: #f8f9fa; padding: 10px; border-radius: 5px;">${appointment.message}</p>
      </div>
      ` : ''}
      <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
        <p>This is an automated notification from Symphony Smart Homes. Generated at: ${new Date().toISOString()}</p>
      </div>
    </div>
  `;
}

/**
 * Generates HTML email content for customer confirmation
 */
export function generateCustomerEmailHtml(appointment: any, formattedDate: string, formattedTime: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h1 style="color: #333; text-align: center;">Appointment Confirmation</h1>
      <p style="font-size: 16px; line-height: 1.5;">Dear ${appointment.name},</p>
      <p style="font-size: 16px; line-height: 1.5;">Thank you for scheduling a consultation with Symphony Smart Homes. We're looking forward to discussing your project.</p>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h2 style="margin-top: 0; color: #0056b3;">Appointment Details</h2>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${formattedTime}</p>
        <p style="margin: 5px 0;"><strong>Service:</strong> ${appointment.service}</p>
      </div>
      
      <p style="font-size: 16px; line-height: 1.5;">If you need to reschedule or have any questions, please contact us at info@symphonysh.com or call our office.</p>
      
      <p style="font-size: 16px; line-height: 1.5;">We've attached a calendar event to this email that you can add to your calendar.</p>
      
      <p style="font-size: 16px; line-height: 1.5;">Best regards,<br>Symphony Smart Homes Team</p>
      
      <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
        <p>This is an automated confirmation. Please do not reply to this email. Generated at: ${new Date().toISOString()}</p>
      </div>
    </div>
  `;
}
