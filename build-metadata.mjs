import fs from 'node:fs/promises';

const versions = [
	'unstable',
	'v0.9.0',
	'0.8.2',
	'0.8.1',
	'0.8.0',
	'0.7.0'
];

const buildTools = [
	'parcel',
	'rollup'
];

(async () => {
	const metadata = [];
	for (const version of versions) {
		const meta = {
			version,
			builds: []
		};

		for (const tool of buildTools) {
			let size = null;

			try {
				const stats = await fs.lstat(`apps/listing-${version}/dist-${tool}/listing.js`);
				size = stats.size;
			} catch (err) {
				console.warn(err);
			}

			meta.builds.push({ tool, size });
		}

		metadata.push(meta);
	}

	try {
		fs.writeFile('metadata.json', JSON.stringify(metadata, undefined, 4));
	} catch (err) {
		console.error(err);
	}
})();
