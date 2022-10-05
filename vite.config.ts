import { join } from 'path';

import { defineConfig, PluginOption, UserConfigExport } from 'vite';

import { angular } from './scripts/angular';
import { main } from './scripts/main';
import { preload } from './scripts/preload';
import { deleteDist, deleteRelease } from './scripts/utils';

async function electron(): Promise<PluginOption[]> {
  return [preload(), main()];
}

const SRC_PATH = join(process.cwd(), 'src');

const onlyFrontEnd = !!process.env.ONLY_FRONT_END;

export default defineConfig(async (options) => {
  const promises: Promise<unknown>[] = [deleteDist()];
  if (options.command === 'build') {
    promises.push(deleteRelease());
  }
  await Promise.all(promises);
  const config: UserConfigExport = {
    base: './',
    clearScreen: false,
    server: {
      port: 3333,
    },
    resolve: {
      alias: {
        '@styles': join(SRC_PATH, 'styles'),
      },
    },
    plugins: [angular()],
    build: {
      rollupOptions: {
        input: {
          app: './src/index.html',
        },
      },
    },
  };
  if (!onlyFrontEnd) {
    config.plugins!.push(await electron());
  }
  return config;
});
