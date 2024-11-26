import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IAppConfig } from './app.config.model';

@Injectable()
export class AppConfigService {
  static settings: IAppConfig;
  static settingsPromise: Promise<IAppConfig>;

  constructor(private readonly http: HttpClient) {}

  async init(pathDeployJson: string, jsonConfig = false): Promise<void> {
    if (!AppConfigService.settingsPromise) {
      await this.loadConfig(pathDeployJson, jsonConfig);
    }
  }

  private async loadConfig(
    pathConfigData: string,
    jsonConfig = false
  ): Promise<void> {
    if (!jsonConfig) {
      AppConfigService.settingsPromise = this.obtenerJSON(pathConfigData);
      AppConfigService.settings = await AppConfigService.settingsPromise;
    } else {
      AppConfigService.settings = JSON.parse(pathConfigData);
    }
  }

  private async obtenerJSON<T>(pathConfigData: string): Promise<T> {
    const jsonFile = `${pathConfigData}/config.${environment.appConfig}.json`;
    return this.http
      .get(jsonFile)
      .toPromise()
      .then((json) => json as T)
      .catch((err) => {
        throw new Error(
          `No se pudo cargar el archivo '${jsonFile}': ${JSON.stringify(err)}`
        );
      });
  }
}
