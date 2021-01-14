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
        name: {type: "string", minLength: 2, maxLength: 50 },
        vibe: { type: "string", minLength: 1, maxLength: 100},
        releasedEPs: { type: ["string", "integer"], minimum: 2, maximum: 15}
      }
    }
  }
}

module.exports = Musician