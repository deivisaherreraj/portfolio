export interface IAppConfig {
  env: {
    name: string;
  };
  baseAPI: string;
  pathADFS: string;
  subscriptionKey: string;
  appInsights: {
    instrumentationKey: string;
  };
  Identification: {
    link: string;
    style: string;
  };
  Autenticacion?: {
    link?: string;
    style?: string;
    codigoAplicacion?: string;
  };
  NotificacionesPush: {
    link: string;
    style: string;
  };
  autorizacion: {
    subscriptionKey: string;
    clientId: string;
    inProduction: boolean;
    url:string;
  };
}
