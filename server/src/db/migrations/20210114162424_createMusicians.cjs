/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("musicians", (t) => {
    t.bigIncrements("id").primary()
    t.string("name").notNullable().unique()
    t.string("vibe").defaultTo("meh")
    t.integer("releasedEPs").notNullable()
    t.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    t.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("musicians")
};
