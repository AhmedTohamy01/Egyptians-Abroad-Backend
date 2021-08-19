const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'admin@gulfschools.net',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  })
}

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'admin@gulfschools.net',
    subject: 'Sorry to see you go!',
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  })
}

const sendDirectMessage = (
  senderName,
  senderEmail,
  recipientName,
  recipientEmail,
  message
) => {
  sgMail.send({
    to: recipientEmail,
    from: 'admin@gulfschools.net',
    subject: `You got a message from ${senderName} through EgyptiansAbroad!`,
    text: `Hi ${recipientName}, The user ${senderName} sent you this message: ${message}. 
			you can reply him directly by sending to his email: ${senderEmail}.	
		`,
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
  sendDirectMessage,
}
