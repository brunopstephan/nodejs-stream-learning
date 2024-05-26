import axios from 'axios'

const url = 'http://localhost:3000'

import { Transform, Writable } from 'stream'


async function consume() {
    const  response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })

    return response.data
}

const stream = await consume()

stream
.pipe(
    new Transform({
        transform(chunk, encoding, callback){
            const item = JSON.parse(chunk)

            const myNumber = /\d+/.exec(item.name)[0]

            let name = item.name
            if(myNumber % 2 === 0) name = name.concat(' é par')
            else name = name.concat(' é ímpar')

            item.name = name

            callback(null, JSON.stringify(item))
        }
    })
)
.pipe(new Writable({
    write(chunk, encoding, callback){
        console.log('chego', chunk.toString())
        callback()
    }
}))

