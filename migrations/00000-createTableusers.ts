import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(80) NOT NULL UNIQUE,
      password_hash varchar (80) NOT NULL,
/*       is_Admin BOOLEAN DEFAULT false
 */    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}

// postgresql://nextjs-ecommerce-store:postgres@localhost:5432/mydatabase
