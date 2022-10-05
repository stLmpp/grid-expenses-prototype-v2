import run from '@angular/cli';
import { PluginOption, ResolvedConfig } from 'vite';

function build(): PluginOption {
  let config: ResolvedConfig | undefined;
  return {
    name: 'vite-plugin-angular-build',
    apply: 'build',
    configResolved: (resolvedConfig) => {
      config = resolvedConfig;
    },
    writeBundle: async () => {
      const args = ['build'];
      if (!config?.isProduction) {
        args.push('--configuration=development');
      }
      await run({
        cliArgs: args,
      });
    },
  };
}

function serve(): PluginOption {
  return {
    name: 'vite-plugin-angular-serve',
    apply: 'serve',
    configureServer: () => {
      run({
        cliArgs: ['serve'],
      });
    },
  };
}

export function angular(): PluginOption[] {
  return [serve(), build()];
}
