import http from 'http'
import { Readable } from 'stream'
import { randomUUID } from 'node:crypto'

function* run (){
    for (let i = 0; i < 99; i++) {
        const data = {
            id: randomUUID(),
            name: `Product ${i}`,
        }
      
        yield data
    }
}

function handler(req, res){
 const readable = new Readable({
    read() {
        for (const data of run()){
            console.log('sending data', data);
            this.push(JSON.stringify(data) + "\n")
        }
        
        //informar que os dados acabaram
        this.push(null)
    }
   })

   readable.pipe(res)
}

http.createServer(handler)
.listen(3000)
.on('listening', () => {
    console.log('server running at 3000');
})

