const Model = require("./Model")

const uniqueFactory = require("objection-unique")

const unique = uniqueFactory({
  fields: ["name"],
  identifiers: ["id"],
})

class Musician extends unique(Model) {
  static get tableName() {
    return "musicians"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
        vibe: { type: "string" },
        releasedEps: { type: ["integer", "string"] },
      }
    }
  }
}

module.exports = Musician
