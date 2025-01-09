import { getStore } from "@netlify/blobs";

export default async (request, context) => {
	try {
		const data = await request.json();
		const { payload } = data;

		console.log("Form data:", payload);

		const filename = `${payload.name}.csv`;
		const store = getStore("events");

		try {
			const list = await store.list();
			console.log("Current store contents:", list);
		} catch (e) {
			console.error("Error accessing store:", e);
		}

		await store.setJSON(filename, payload);

		return new Response(
			JSON.stringify({
				success: true,
				filename: filename,
				data: payload,
			}),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			}
		);
	} catch (error) {
		return new Response(error.message, {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
