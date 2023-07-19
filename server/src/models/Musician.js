const Model = require("./Model.js")

class Musician extends Model {
    static get tableName(){
        return "musicians"
    }

    static get jsonSchema(){
        return {
            type: "object", 
            required: ["name"],
            properties: {
                name: { type: "string" },
                vibe: { type: "string" },
                releasedEPs: { type: ["string", "integer"]},
            }
        }
    }
}

module.exports = Musician 