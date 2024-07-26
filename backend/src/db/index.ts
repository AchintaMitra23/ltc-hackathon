import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "35.188.164.217",
  database:  "postgres",
  password:  "lunchbox-1",
  port: 5432,
});

export default pool;
