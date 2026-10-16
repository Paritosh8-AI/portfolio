/**
 * Production Email Dispatcher for Portfolio Direct Messages
 * 
 * Routes messages directly to Paritosh's verified inbox:
 * paritoshmukherjee8@gmail.com
 * 
 * Supports:
 * 1. Resend API (Recommended - Set RESEND_API_KEY in Vercel or .env.local)
 * 2. Web3Forms (Optional zero-config forwarder - Set WEB3FORMS_KEY)
 * 3. Graceful fallback to server telemetry logging if keys are not yet configured.
 */

const RECIPIENT_EMAIL = process.env.CONTACT_NOTIFICATION_EMAIL || 'paritoshmukherjee8@gmail.com';

export async function sendContactNotification({ name, email, subject, category, message, id }) {
  const timeStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // 1. Resend API Dispatch (Native fetch - zero extra npm dependencies required)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Paritosh Portfolio <onboarding@resend.dev>',
          to: [RECIPIENT_EMAIL],
          reply_to: email,
          subject: `[Portfolio DM] ${category}: ${subject || 'New Message from ' + name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
              <div style="border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #0f172a; font-size: 20px;">🚀 New Portfolio Direct Message</h2>
                <p style="margin: 4px 0 0; color: #64748b; font-size: 13px;">Received via portfolio communication queue (${timeStr} IST)</p>
              </div>

              <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; width: 100px; font-weight: 600;">Sender:</td>
                    <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Email:</td>
                    <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Category:</td>
                    <td style="padding: 6px 0;"><span style="display: inline-block; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;">${category}</span></td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Subject:</td>
                    <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${subject || 'General Inquiry'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Ref ID:</td>
                    <td style="padding: 6px 0; font-family: monospace; color: #475569; font-size: 12px;">${id || 'N/A'}</td>
                  </tr>
                </table>
              </div>

              <div style="margin-bottom: 24px;">
                <h3 style="color: #0f172a; font-size: 15px; margin: 0 0 8px;">Message Content:</h3>
                <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">
${message}
                </div>
              </div>

              <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Portfolio Inquiry')}" style="display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 600;">
                  Reply Directly to ${name} →
                </a>
              </div>
            </div>
          `,
        }),
      });

      if (response.ok) {
        console.log(`✓ Email successfully dispatched via Resend to ${RECIPIENT_EMAIL}`);
        return { success: true, provider: 'resend' };
      } else {
        const errorData = await response.json();
        console.warn('Resend API returned error:', errorData);
      }
    } catch (err) {
      console.warn('Resend dispatch failed:', err.message);
    }
  }

  // 2. Web3Forms Dispatch (Optional zero-config fallback)
  const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (web3formsKey) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          from_name: `${name} [Portfolio DM]`,
          to_email: RECIPIENT_EMAIL,
          reply_to: email,
          subject: `[Portfolio DM] ${category}: ${subject || 'New Message'}`,
          message: `Sender: ${name} (${email})\nCategory: ${category}\nSubject: ${subject}\nReference ID: ${id}\n\nMessage:\n${message}`,
        }),
      });

      if (response.ok) {
        console.log(`✓ Email successfully dispatched via Web3Forms to ${RECIPIENT_EMAIL}`);
        return { success: true, provider: 'web3forms' };
      }
    } catch (err) {
      console.warn('Web3Forms dispatch failed:', err.message);
    }
  }

  // 3. Fallback: Logged in telemetry stream for admin retrieval
  console.log(`📨 [DM Ingestion] From: "${name}" <${email}> | Category: ${category} | Subject: "${subject}" | Stored for retrieval.`);
  return { success: false, provider: 'none', note: 'Saved to MongoDB/store. Set RESEND_API_KEY to activate automatic email delivery.' };
}

export async function sendEndorsementNotification({ name, role, company, relationship, badge, rating, message, githubUrl }) {
  const timeStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Paritosh Portfolio <onboarding@resend.dev>',
          to: [RECIPIENT_EMAIL],
          subject: `🌟 New Peer Endorsement from ${name} (${role})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
              <h2 style="margin: 0; color: #0f172a; font-size: 20px;">🌟 New Engineering Endorsement</h2>
              <p style="margin: 4px 0 16px; color: #64748b; font-size: 13px;">Received via portfolio guestbook (${timeStr} IST)</p>
              
              <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Role:</strong> ${role} at ${company || 'N/A'}</p>
                <p><strong>Relationship:</strong> ${relationship}</p>
                <p><strong>Rating:</strong> ${'★'.repeat(rating || 5)}</p>
                <p><strong>Specialty Badge:</strong> ${badge}</p>
                ${githubUrl ? `<p><strong>GitHub:</strong> <a href="${githubUrl}">${githubUrl}</a></p>` : ''}
              </div>

              <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #1e293b;">
                ${message}
              </div>
            </div>
          `,
        }),
      });
    } catch (e) {
      console.warn('Failed to send endorsement email alert:', e);
    }
  }

  console.log(`🌟 [Guestbook Endorsement] From: "${name}" (${role}) | Rating: ${rating}/5 | Message: "${message}"`);
}

