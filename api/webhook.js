export default async function handler(req, res) {
  if (req.method === 'POST') {
    const dados = req.body;

    // A URL que você acabou de copiar do Google
    const URL_GOOGLE = 'https://script.google.com/macros/s/AKfycbysBe4m-qWrfI6B20LBCNnj2ktoaPDZDeasFPGmLa3wXzYoPUgYsMMY_DmiBStGi2OlSQ/exec';

    try {
      // Envia os dados para a Planilha do Google
      await fetch(URL_GOOGLE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      res.status(200).json({ status: 'Sucesso: Enviado para a Planilha' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao enviar para o Google' });
    }
  } else {
    res.status(405).send('Apenas POST permitido');
  }
}
