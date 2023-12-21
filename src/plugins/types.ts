
export interface PluginInterface {
    enabled: boolean;
    permissions: PluginPermissions;

    setup: () => void;
    teardown: () => void;
    getComponent: () => JSX.Element;
}

export type Plugin = {
  name: string
  label: string
  value: string
}

// src/lib/integrations/PluginPermissions.ts

export interface PluginPermissions {
  canAccessSettings: boolean;
  // Add more permissions here
}