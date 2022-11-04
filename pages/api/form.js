export default async function handler(req, res) {
	const body = req.body;

	const emailValid =
		/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
			body.email
		);

	if (!body.name || !body.email || !body.message || !emailValid) {
		return res.status(400).json({ data: 'error' });
	}

	const params = {
		username: `${body.name}`,
		avatar_url: process.env.AVATAR_URL,
		embeds: [
			{
				fields: [
					{ name: 'Name', value: body.name },
					{
						name: 'Email',
						value: body.email,
					},
					{ name: 'Message', value: body.message },
				],
			},
		],
	};

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(params),
	};

	try {
		await fetch(process.env.DISCORD_WEBHOOK, options);
		res.status(200).json({ res: true });
	} catch (e) {
		res.status(500).json({ res: false });
	}
}
