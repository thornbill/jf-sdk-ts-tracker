import { Jellyfin } from '@jellyfin/sdk';
import { getItemsApi } from '@jellyfin/sdk/lib/utils/api/items-api.js';
import { ItemFields } from '@jellyfin/sdk/lib/generated-client/models/index.js';

import { AppInfo, ServerInfo } from 'listing-common/constants.mjs';

const jellyfin = new Jellyfin(AppInfo);

(async () => {
	const api = jellyfin.createApi(ServerInfo.url);
	const auth = await api.authenticateUserByName(
		ServerInfo.auth.username,
		ServerInfo.auth.password
	);
	const user = auth.data.User;

	const items = await getItemsApi(api).getItemsByUserId({
		userId: user.Id,
		fields: [ ItemFields.Path ],
		recursive: true
	});

	items.data.Items.forEach(item => {
		console.log(`${item.Id}\t${item.Name}\t${item.Path}`);
	});
})();
