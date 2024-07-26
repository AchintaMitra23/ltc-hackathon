import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "/cloudsql/lloyds-hack-grp-01:us-central1:lunchbox-1",
  database: "postgres",
  password: "lunchbox-1",
  port: 5432,
});

export default pool;