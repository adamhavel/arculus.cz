import { getStore } from "@netlify/blobs";

export default async (request, context) => {
	try {
		const data = await request.json();
		const { payload } = data;
		const { BUILD_HOOK_URL } = process.env;

		console.log("Form data:", payload);

		const filename = `${payload.data.id}.csv`;
		const store = getStore("events");
		let content = await store.get(filename);

		content = content ? content + `\n${payload.data.email}` : `E-mail\n${payload.data.email}`;

		await store.set(filename, content, {
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
