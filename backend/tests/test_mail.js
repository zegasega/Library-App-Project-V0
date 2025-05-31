const mailjet = require('node-mailjet');
const client = mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

client
  .post('send', { version: 'v3.1' })
  .request({
    Messages: [
      {
        From: {
          Email: 'pilot@mailjet.com',
          Name: 'Mailjet Pilot',
        },
        To: [
          {
            Email: 'zegasega11@gmail.com',
            Name: 'passenger 1',
          },
        ],
        Subject: 'Your email flight plan!',
        TextPart: 'Dear passenger 1, welcome to Mailjet! May the delivery force be with you!',
        HTMLPart:
          '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
      },
    ],
  })
  .then((result) => {
    console.log(result.body);
  })
  .catch((err) => {
    console.error('Error status code:', err.statusCode);
    console.error(err.message || err);
  });
