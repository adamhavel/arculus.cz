import { getStore } from '@netlify/blobs';
import { promises as fs } from 'fs';
import path from 'path';

export default {
	onPreBuild: async ({ utils, constants }) => {
		const { IS_LOCAL, SITE_ID, NETLIFY_API_TOKEN } = constants;

		try {
			const store = getStore({
				name: IS_LOCAL ? 'site:events' : 'events',
				siteID: SITE_ID,
				token: NETLIFY_API_TOKEN,
			});

			const { blobs: events } = await store.list();

			const eventEntries = await Promise.all(
				events.map(async ({ key }) => {
					const eventCsv = await store.get(key);

					return [
						key.replace('.csv', ''),
						eventCsv.split('\n').length - 1,
					];
				})
			);

			const attendance = Object.fromEntries(eventEntries);

			await fs.writeFile(
				'data/attendance.json',
				JSON.stringify(attendance, null, 2)
			);

			console.log(`Created attendance.json with ${events.length} entries`);
		} catch (error) {
			utils.build.failBuild('Failed to process events', {
				error,
			});
		}
	},
};
