import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Please confirm your email address",
    html: `
                <div>
                    <h1>Click on the link below to confirm your email address</h1>
                    <a href="${confirmLink}">${confirmLink}</a>
                </div>
            `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
                <div>
                    <h1>Click on the link below to reset your password</h1>
                    <a href="${resetLink}">${resetLink}</a>
                </div>
            `,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `
                <div>
                    <h1>Two-factor authentication token: ${token}</h1>
                </div>
            `,
  });
};
