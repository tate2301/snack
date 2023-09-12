// src/lib/integrations/PluginManager.ts
import React from 'react';
import path from 'path';
import fs from 'fs';
import { Plugin, PluginInterface } from './types';
import { userDataPath } from '../core/redux-storage';
import { availablePlugins } from '.';
import { PluginContextProvider } from './context/PluginContext';

class PluginManager {
	private plugins: { [key: string]: PluginInterface } = {};

	async registerPlugin(data: Plugin) {
		const pluginModule = await import(`./plugins/${data.name}`);
		const plugin = new pluginModule.default();
		this.plugins[plugin.constructor.name] = plugin;
	}

	enablePlugin(pluginName: string) {
		const plugin = this.plugins[pluginName];
		if (plugin) {
			plugin.enabled = true;
			plugin.setup();
		}
	}

	disablePlugin(pluginName: string) {
		const plugin = this.plugins[pluginName];
		if (plugin) {
			plugin.enabled = false;
			plugin.teardown();
		}
	}

	async installPlugin(plugin: PluginInterface) {
		this.plugins[plugin.constructor.name] = plugin;
	}

	loadPlugin(plugin: PluginInterface) {
		this.plugins[plugin.constructor.name] = plugin;
		plugin.setup();
	}

	unloadPlugin(pluginName: string) {
		const plugin = this.plugins[pluginName];
		if (plugin) {
			plugin.teardown();
			delete this.plugins[pluginName];
		}
	}

	getPlugin(pluginName: string): PluginInterface | undefined {
		return this.plugins[pluginName];
	}

	getPluginComponent(pluginName: string): JSX.Element | null {
		const plugin = this.plugins[pluginName];
		if (plugin && plugin.enabled) {
			return (
				<PluginContextProvider permissions={plugin.permissions}>
					{plugin.getComponent()}
				</PluginContextProvider>
			);
		}
		return null;
	}

	savePlugins() {
		const pluginData = Object.values(this.plugins).map((plugin) => ({
			name: plugin.constructor.name,
			enabled: plugin.enabled,
			meta: availablePlugins.find((p) => p.value === plugin.constructor.name),
		}));

		const pluginsFilePath = path.join(userDataPath, 'plugins.json');
		fs.writeFileSync(pluginsFilePath, JSON.stringify(pluginData));
	}

	loadPlugins() {
		const pluginsFilePath = path.join(userDataPath, 'plugins.json');
		if (fs.existsSync(pluginsFilePath)) {
			const pluginData = JSON.parse(fs.readFileSync(pluginsFilePath, 'utf-8'));

			pluginData.forEach(
				({ name, enabled }: { name: string; enabled: boolean }) => {
					const plugin = availablePlugins.find(
						(p) => p.value === plugin.constructor.name,
					);
					this.registerPlugin(plugin);
					if (enabled) {
						this.enablePlugin(name);
					}
				},
			);
		}
	}
}

export const PluginManagerInstance = new PluginManager();
