import { getStore } from "@netlify/blobs";

export default async (request, context) => {
	try {
		const data = await request.json();
		const { payload } = data;
		const { BUILD_HOOK_URL } = process.env;

		console.log("Form data:", payload);

		const filename = `${payload.data.id}/${payload.data.email}.csv`;
		const store = getStore("events");

		try {
			const list = await store.list();
			console.log("Current store contents:", list);
		} catch (e) {
			console.error("Error accessing store:", e);
		}

		await store.set(filename, `E-mail\n${payload.email}`, {
			metadata: {
				"Content-Type": "text/csv",
			},
		});

		await fetch(BUILD_HOOK_URL, { method: "POST" });

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
