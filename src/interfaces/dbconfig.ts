export interface IDbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  seederStorage: string;
  dialect: string;
}