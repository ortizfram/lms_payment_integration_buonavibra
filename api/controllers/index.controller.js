// controllers/indexController.js
import sendEmailContactForm from "../utils/sendEmailContactForm.js";

const sendEmail = async (req, res) => {
  const { name, email, msg } = req.body;

  //send email
  // 3. SEND TOKEN BACK TO THE USER EMAIL.
  const emailInfo = await sendEmailContactForm(
    email,
    "BuonaVibra 📫 Formulario de Contacto",
    `[${name} | ${email}] te ha escrito : ${msg}`,
    ``
  );

  console.log("\n\nemail sent\n\n");
  res.status(200).json({ success: "sent" });
};

export default sendEmail
