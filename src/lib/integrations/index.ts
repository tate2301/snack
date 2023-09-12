import { PluginManagerInstance } from './manager';
import { Plugin } from './types';

export const availablePlugins: Array<Plugin> = [
    {
        name: "@snack/weather",
        value: "WeatherPlugin",
        label: "Weather"
    }
]

const SnackPluginManager = PluginManagerInstance;

export default SnackPluginManager;
