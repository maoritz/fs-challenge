import log from '@ajar/marker';
import fs from 'fs/promises';

async function myReadFile() {
    try {
      const data = await fs.readdir('./LEADS');

      const output = []
 
      for (let file of data){
        const fileContent = await fs.readFile(`./LEADS/${file}`,'utf-8')
        const lines = fileContent.split('\r\n')
        for (let user of lines){
            let [id, fullName, email] = user.split(',')
            fullName = fullName.split(/"/g)
            
            const userObj = {
                id,
                fullName: fullName[1],
                email
            }
            output.push(userObj)
 
        } 
    }
    return output
    // console.log(output)


    } catch (err) {
      console.log(err);
    }
  }
myReadFile()


  async function myWriteFile(){
    const data = await myReadFile()
    let jsonData = JSON.stringify(data,null,2)

    console.log(jsonData)

    fs.writeFile('./result.json',jsonData,function (err) {
        if (err) {
            console.log(err)
            return;
        }
        else{
            console.log('File has been written succesfuly')
        }
    })
  }

myWriteFile()

