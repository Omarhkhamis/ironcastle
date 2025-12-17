import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
    };

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required." }),
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM ?? user;
    const to = process.env.SMTP_TO ?? "Info@ironcastle.ae";

    if (!host || !user || !pass || !from || !to) {
      return new Response(
        JSON.stringify({
          error:
            "SMTP configuration missing. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO."
        }),
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone ?? "N/A"}\n\nMessage:\n${message ?? ""}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone ?? "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${(message ?? "").replace(/\n/g, "<br/>")}</p>
      `
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error("Contact form error", error);
    return new Response(
      JSON.stringify({ error: "Failed to send message." }),
      { status: 500 }
    );
  }
}
