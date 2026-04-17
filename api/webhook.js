import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Apenas POST permitido' });
  }

  // 1. Captura os dados exatamente como você vai enviar no ReqBin
  // Usamos nomes simples para evitar erro de acentuação
  const { username, numero } = req.body;

  // Log para você ver no painel da Vercel se os dados chegaram
  console.log("Dados recebidos:", { username, numero });

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 2. Monta a linha da planilha
    const values = [
      [
        new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        username || 'Nome não enviado', // Fallback caso venha vazio
        numero || 'Número não enviado', // Fallback caso venha vazio
        "Evento Recebido"
      ]
    ];

    // 3. Envia para a planilha
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.ID_PLANILHA,
      range: 'Página1!A:D', // Ajuste o nome da aba se necessário
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    return res.status(200).json({ status: 'Sucesso!', recebido: { username, numero } });

  } catch (error) {
    console.error("ERRO NA PLANILHA:", error);
    return res.status(500).json({ error: 'Erro ao salvar na planilha', detalhes: error.message });
  }
}
