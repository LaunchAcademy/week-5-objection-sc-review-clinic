	/* eslint-disable no-console */
  import { connection } from "../boot.js"

  import MusicianSeeder from "./seeders/MusicianSeeder.js"
  
  class Seeder {
    static async seed() {
      console.log("seeding musicians")
      await MusicianSeeder.seed()

      console.log("Done!")
      await connection.destroy()
    }
  }
  export default Seeder