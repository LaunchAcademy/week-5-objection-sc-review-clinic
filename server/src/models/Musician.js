const Model = require("./Model")

const uniqueFactory = require("objection-unique")

const unique = uniqueFactory({
    identifiers: ["id"],
    fields: ["name"]
})


class Musician extends unique(Model) {
    static get tableName(){
        return "musicians"
    }

    static get jsonSchema(){
        return {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string", minLength: 1 },
                vibe: { type: "string" },
                releasedEPs: { type: ["integer", "string"] }
            }
        }   
    }

// {
//     name: "Dodie",
//     vibe: "Depressed British poet that you are constantly rooting for",
//     releasedEPs: 8
// },

   
}

module.exports = Musician