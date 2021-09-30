import { ConfigService, LogService, Logger } from 'tabby-core';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StatusBar_Service {
	public visible = true;

	private availablePlugins: string[];
	private enabledPlugins: string[];

	private logger: Logger;

	constructor(private config: ConfigService, log: LogService) {
		this.logger = log.create('statusBar');
		this.logger.info('starting...');
	}

	init(): void {
		this.logger.info('initializing...');

		this.config
			.load()
			.then(() => this.load())
			.catch(this.logger.error);
	}

	async load(): Promise<void> {
		this.logger.info(`loading plugin...`);

		this.visible = this.config.store.statusBar.visible;
		this.availablePlugins = this.config.store.statusBar.availablePlugins;
		this.enabledPlugins = this.config.store.statusBar.enabledPlugins;

		this.logger.info('available plugins:', this.getAvailable());
		this.logger.info('enabled plugins:', this.getEnabled());
	}

	show(): void {
		this.logger.info('showing status bar!');
		this.visible = true;
	}

	async hide(): Promise<void> {
		this.logger.info('hiding status bar!');
		this.visible = false;
	}

	toggleVisible(): void {
		this.visible ? this.hide() : this.show();
	}

	getEnabled(): string[] {
		return this.enabledPlugins;
	}

	getAvailable(): string[] {
		return this.availablePlugins;
	}

	isEnabled(plugin: string): boolean {
		return this.enabledPlugins.includes(plugin);
	}

	togglePlugin(plugin: string): void {
		this.isEnabled(plugin)
			? this.disablePlugin(plugin)
			: this.enablePlugin(plugin);

		this.logger.info(this.config.store.statusBar.enabledPlugins);
	}

	async enablePlugin(plugin: string): Promise<void> {
		this.logger.info(`enabling plugin: ${plugin}`);
		try {
			this.enabledPlugins = this.config.store.statusBar.enabledPlugins.filter(
				(x: string) => x !== plugin
			);
			this.enabledPlugins.push(plugin);
			this.config.store.statusBar.enabledPlugins = this.enabledPlugins;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async disablePlugin(plugin: string): Promise<void> {
		this.logger.info(`disabling plugin: ${plugin}`);
		try {
			this.enabledPlugins = this.config.store.statusBar.enabledPlugins.filter(
				(x: string) => x !== plugin
			);
			this.config.store.statusBar.enabledPlugins = this.enabledPlugins;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	savePlugins(): void {
		this.config.save();
	}

	log(message: string): void {
		this.logger.info(message);
	}

	// error(error: string): void {
	// 	this.logger.error(error);
	// }
}
