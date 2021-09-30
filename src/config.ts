import { ConfigProvider } from 'tabby-core';

/** @hidden */
export class StatusBar_ConfigProvider extends ConfigProvider {
	defaults = {
		statusBar: {
			visible: true,
			// fontFamily: '',
			// colors: [],
			availablePlugins: ['hostname', 'test'],
			enabledPlugins: ['hostname'],
		},
	};

	platformDefaults = {};
}
