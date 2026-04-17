export default async function handler(req, res) {
  if (req.method === 'POST') {
    const dados = req.body;

    // A URL que você copiou do Google Apps Script
    const URL_GOOGLE = 'https://script.google.com/macros/s/AKfycbwepD3rpXlKhQb3KCQAxkO4qkiu7BJGVkCcOGiuJCza6L3MfOXrPPBreqInGZ19HFwBNQ/exec';

    // Envia o dado para a planilha
    await fetch(URL_GOOGLE, {
      method: 'POST',
      body: JSON.stringify(dados),
    });

    res.status(200).json({ status: 'salvo_na_planilha' });
  } else {
    res.status(405).send('Use POST');
  }
}
