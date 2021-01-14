const Model = require("./Model")

const uniqueFactory = require("objection-unique")

const unique = uniqueFactory({
  fields: ["name"],
  identifiers: ["id"]
})

class Musician extends unique(Model) {
  static get tableName(){
    return "musicians"
  }

  static get jsonSchema(){
    return {
      type: "object",
      required: ["name", "releasedEPs"],
      properties: {
        name: { type: "string"},
        vibe: { type: "string"},
        releasedEPs: { type: [ "string", "integer"] }
      }
    }
  }
}

module.exports = Musician