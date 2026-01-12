import { DataSource, DataSourceOptions } from "typeorm";
 
const config: DataSourceOptions = {
  type: "postgres",
  host: 'db.pagonila.id',
  port: 47001,
  username: 'ramadhanti_pristya_haliza',
  password: '36f1deb33c',
  database: 'erp_bahan_kopi_aea3c5260a9f4fe7b4171762c65f203d', // <-- nama database
  synchronize: false,
  logging: false,
  migrations: [
    __dirname + '/migration/**.ts' // <-- path "migration" akan dijadikan acuan lokasi untuk men-generate migration database
  ],
  entities: [
    __dirname + '/lib-api/model/**/*.{ts,js}' // <-- "lib-api" = nama sesuai output keluaran generator kode
  ]
};

export const AppDataSource = new DataSource(config);