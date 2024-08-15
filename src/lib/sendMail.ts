const nodemailer = require("nodemailer");

export async function sendMail({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body?: string;
}) {
  const { EMAIL_SENDER, EMAIL_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_SENDER,
      pass: EMAIL_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: EMAIL_SENDER,
      to: [to, "amthucchaydieuthien@gmail.com"],
      subject,
      html: body,
    });
  } catch (error) {
    console.log(error);
  }
}