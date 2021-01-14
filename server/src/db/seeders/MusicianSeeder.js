import Musician from "../../models/Musician.js"

class MusicianSeeder {
  static async seed() {
    const MusiciansData = [
      {
        name: "Dodie",
        vibe: "Depressed British poet that you are constantly rooting for",
        releasedEPs: 8
      },
      {
        name: "Foy Vance",
        vibe: "1890s hipster, except you respect him and his voice reminds you of your old days working on the railroad in the colorados",
        releasedEPs: 5
      }
    ]
    
    for (const singleMusicianData of MusiciansData) {
      const currentMusician = await Musician.query().findOne({ name: singleMusicianData.name })
      if (!currentMusician) {
        await Musician.query().insert(singleMusicianData)
      }
    }
  }
}
export default MusicianSeeder