import { Injectable } from '@angular/core';
import { SettingsTabProvider } from 'tabby-settings';
import { StatusBar_SettingsTabComponent } from 'components/settings.component';

/** @hidden */
@Injectable()
export class StatusBar_SettingsTabProvider extends SettingsTabProvider {
	id = 'statusBar';
	title = 'Status Bar';

	getComponentType(): unknown {
		return StatusBar_SettingsTabComponent;
	}
}
