import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'tabby-core';
import { StatusBar_Service } from './../services/status-bar.service';

/** @hidden */
@Component({
	template: require('./settings.component.pug'),
})
export class StatusBar_SettingsTabComponent implements OnInit {
	public enabledPlugins: string[];
	public availablePlugins: string[];

	constructor(
		private config: ConfigService,
		public statusBarManager: StatusBar_Service
	) {}

	ngOnInit(): void {
		this.getPlugins();
	}

	getPlugins(): void {
		this.enabledPlugins = this.statusBarManager.getEnabled();
		this.availablePlugins = this.statusBarManager.getAvailable();
	}

	async togglePlugin(plugin: string): Promise<void> {
		this.statusBarManager.togglePlugin(plugin);
		this.config.save();
	}

	isEnabled(plugin: string): boolean {
		return this.statusBarManager.isEnabled(plugin);
	}
}
