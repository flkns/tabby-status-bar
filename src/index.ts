import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import TabbyCoreModule, { ConfigProvider } from 'tabby-core';

import { SettingsTabProvider } from 'tabby-settings';
import { StatusBar_ConfigProvider } from './config';
import { StatusBar_Decorator } from './decorator';
import { StatusBar_Service } from './services/status-bar.service';
import { StatusBar_SettingsTabProvider } from './settings';
import { TerminalDecorator } from 'tabby-terminal';

import { StatusBar_SettingsTabComponent } from 'components/settings.component';

@NgModule({
	imports: [CommonModule, FormsModule, TabbyCoreModule, NgbModule],
	providers: [
		StatusBar_Service,
		{
			provide: ConfigProvider,
			useClass: StatusBar_ConfigProvider,
			multi: true,
		},
		{
			provide: SettingsTabProvider,
			useClass: StatusBar_SettingsTabProvider,
			multi: true,
		},
		{
			provide: TerminalDecorator,
			useClass: StatusBar_Decorator,
			multi: true,
		},
	],
	bootstrap: [StatusBar_SettingsTabComponent],
	declarations: [StatusBar_SettingsTabComponent],
})
export default class StatusBar_Module {
	constructor(private service: StatusBar_Service) {
		this.service.init();
	}
}
