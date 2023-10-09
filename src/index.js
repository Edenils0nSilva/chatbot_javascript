const qrcode = require('qrcode-terminal');
const { Client, Buttons, GroupNotificationTypes } = require('whatsapp-web.js');

// Initialize the client.
const client = new Client();

// Function to handle the payment methods response
function Metodos_Pagamento(msg) {
    if (msg.body === 'PIX') {
        msg.reply('Chave PIX: \n 09701606400');
    } else if (msg.body === 'Cartão') {
        msg.reply('Forma de pagamento com Cartão.');
    } else if (msg.body === 'Dinheiro') {
        msg.reply('Você escolheu a forma de pagamento em Dinheiro.');
    } else {
        msg.reply('Desculpe, a forma de pagamento selecionada é inválida.');
    }
}

// QR code event handler
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

// Initialize the client
client.initialize();

// Message event handler
client.on('message', msg => {
    if (msg.body === 'Ping') {
        msg.reply('olá boa noite, em que posso lhe ajudar,\n *[1] cardapio* \n *[2] forma de pagamento*');

    } else if (msg.body === '1') {
        // Enviando a imagem como resposta
        const imagePath = "./assets/cardapio.jpg"
        msg.sendMedia(imagePath);
        // 'C:\\Users\\PETCC-02\\Music\\fotos DI.jpg';
        //msg.reply('O cardapio é esse', { media: { url: imagePath } });

    } else if (msg.body === '2') {
        msg.reply('Formas de pagamento:\n *PIX* \n *Cartão* \n *Dinheiro*');
    } else if (msg.body === 'PIX' || msg.body === 'Cartão' || msg.body === 'Dinheiro') {
        Metodos_Pagamento(msg);
    }
});

client.on('ready', () => {
    console.log('Client is ready!');
});
