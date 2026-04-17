export default async function handler(req, res) {
  // 1. O Facebook envia os dados para cá
  const { username, numero } = req.body;

  // Validação básica para não enviar lixo para a Kommo
  if (!username || !numero) {
    return res.status(400).json({ error: "Dados ausentes" });
  }

  try {
    // 2. Preparar o "pacote" no formato que a Kommo exige
    const leadKommo = [
      {
        name: `Lead Facebook: ${username}`,
        _embedded: {
          contacts: [
            {
              first_name: username,
              custom_fields_values: [
                {
                  field_id: parseInt(process.env.KOMMO_PHONE_FIELD_ID), // ID do campo telefone
                  values: [{ value: numero }]
                }
              ]
            }
          ]
        }
      }
    ];

    // 3. Enviar para a Kommo
    const response = await fetch(`https://${process.env.KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads/complex`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.KOMMO_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(leadKommo)
    });

    if (response.ok) {
      return res.status(200).json({ message: "Lead enviado para a Kommo com sucesso!" });
    } else {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
