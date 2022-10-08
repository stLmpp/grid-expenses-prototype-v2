import { mkdir } from 'fs/promises';
import { homedir } from 'os';
import { join } from 'path';

import { app } from 'electron';

import { Injectable } from '../../di/injectable';
import { pathExists } from '../../util/path-exists';

@Injectable()
export class ConfigService {
  readonly distPath = devMode ? join(process.cwd(), 'dist') : join(app.getAppPath(), 'dist');
  readonly appPath = join(homedir(), '.grid-expenses');
  readonly appDataPath = this._getHomePath();
  readonly databasePath = join(this.appDataPath, 'database');
  readonly logPath = join(this.appDataPath, 'log');

  private _getHomePath(): string {
    const paths = [this.appPath];
    if (devMode) {
      paths.push('dev');
    }
    return join(...paths);
  }

  static readonly instance = new ConfigService();

  static async init(): Promise<ConfigService> {
    const config = this.instance;
    const fusFolderExists = await pathExists(config.appPath);
    if (!fusFolderExists) {
      await mkdir(config.appPath);
    }
    if (devMode) {
      const devPathExists = await pathExists(config.appDataPath);
      if (!devPathExists) {
        await mkdir(config.appDataPath);
      }
    }
    const logPathExists = await pathExists(config.logPath);
    if (!logPathExists) {
      await mkdir(config.logPath);
    }
    const databasePathExists = await pathExists(config.databasePath);
    if (!databasePathExists) {
      await mkdir(config.databasePath);
    }
    return config;
  }
}
