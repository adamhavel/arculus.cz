import { getStore } from '@netlify/blobs';

const columns = {
	name: 'Jméno',
	surname: 'Příjmení',
	phone: 'Telefon',
	email: 'E-mail',
	address: 'Adresa',
	city: 'Město',
	postcode: 'PSČ',
};

export default async (request, context) => {
	try {
		const data = await request.json();
		const { payload } = data;
		const { BUILD_HOOK_URL } = process.env;
		const filename = `${payload.data.id}.csv`;
		const store = getStore('events');
		let content = await store.get(filename);

		console.log('Form data:', payload);

		const headers = Object.values(columns).join(',');
		const row = Object.keys(columns)
			.map((key) => payload.data[key])
			.join(',');

		content = content ? `${content}\n${row}` : `${headers}\n${row}`;

		await store.set(filename, content, {
			metadata: {
				'Content-Type': 'text/csv',
			},
		});

		await fetch(BUILD_HOOK_URL, { method: 'POST' });

		return new Response(
			JSON.stringify({
				success: true,
				filename: filename,
				data: payload,
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		return new Response(error.message, {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
