const Model = require("./Model")
const uniqueFactory = require("objection-unique")

const unique = uniqueFactory({
  fields: ["name"],
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
        releasedEPs: { type: ["integer", "string"] },
      },
    }
  }
}

module.exports = Musician
