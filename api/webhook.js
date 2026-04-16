export default function handler(req, res) {
  // Verificamos se a casa está enviando um POST (padrão de webhooks)
  if (req.method === 'POST') {
    
    // O 'req.body' contém o FTD, registro e depósitos
    console.log("--- NOVO EVENTO DA CASA ---");
    console.log(req.body); 
    console.log("---------------------------");

    // Responde 200 para a casa não achar que deu erro e ficar reenviando
    res.status(200).json({ status: 'recebido' });
  } else {
    // Se alguém tentar acessar pelo navegador, verá isso:
    res.status(405).send('Método não permitido. Use POST.');
  }
}
