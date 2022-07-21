const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { send } = require('process');
const { response } = require('express');


const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: false }
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr);
});

client.on('authenticated', () => {
  console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
  // Fired if session restore was unsuccessful
  console.error('AUTHENTICATION FAILURE', msg);
});



client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.on('message',msg =>{
  if(msg.body == 'about'){
    msg.reply('program ini dibuat untuk fitur website yang digunakan UKL. POWERD BY '+'*'+'ALVIN'+'*')
  }
})



client.initialize();

module.exports = {
  send: function (tlpn,username, callback) {
    client.sendMessage(tlpn,'Welcome to the club   '+'*'+username+'*' ).then(response =>{
      res.status(200).json({
        status: true,

      })
    }).catch(err =>{
      res.status(500).json({
        status: false
      })
    });
}
,
}