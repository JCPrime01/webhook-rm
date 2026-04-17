// Captura o que vem do ReqBin
const { username, numero } = req.body; 

// Na parte que envia para o Google Sheets, muda o '0' pela variável 'numero'
const values = [
  [
    new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }), 
    username, 
    numero, // <--- Aqui é onde o número entra na Coluna C!
    "Evento Recebido"
  ]
];
