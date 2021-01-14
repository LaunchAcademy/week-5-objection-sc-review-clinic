import Musician from "../../models/Musician.js"

class MusicianSeeder {
  static async seed() {
    const MusiciansData = [
      {
        title: "50th Birthday",
        location: "Italy",
        length: 9
      },
      {
        title: "Joe's Bachelor Party",
        location: "New Hampshire"
      }
    ]
    
    for (const singleMusicianData of MusiciansData) {
      const currentMusician = await Musician.query().findOne({ title: singleMusicianData.title })
      if (!currentMusician) {
        await Musician.query().insert(singleMusicianData)
      }
    }
  }
}
export default MusicianSeeder