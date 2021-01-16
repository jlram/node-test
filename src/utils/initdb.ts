import * as dotenv from "dotenv"
import * as fs from "fs-extra"
import { Client } from "pg"

export const init = async () => {    
    dotenv.config() // grabs .env information
    // create an instance of the PostgreSQL client
    const client = new Client()
    try {
        await client.connect()
        // reads initdb.pgsl
        const sql = await fs.readFile( "./src/utils/initdb.pgsql", { encoding: "UTF-8" } )
        // reads each line
        const statements = sql.split( /;\s*$/m )
        for ( const statement of statements ) {
            if ( statement.length > 3 ) {
                // execute each of the statements
                await client.query( statement )
            }
        }
    } catch ( err ) {
        console.log( err )
        throw err
    } finally {
        await client.end()
    }
}

init().then( () => {
    console.log( "Database loaded" )
} ).catch( () => {
    console.log( "Found some errors" )
} )