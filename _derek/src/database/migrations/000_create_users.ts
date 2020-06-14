import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("users", (table) => {
    table.string("id").primary();
    table.string("locale").notNullable().defaultTo("en-US");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("users");
}
