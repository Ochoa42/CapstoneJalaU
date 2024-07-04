import fs from 'node:fs/promises'


fs.readFile('./text2.txt', 'utf-8')
.then((data) => {
    console.log('File content: ', data);
}).catch((err) => {
    console.error('Error reading the file: ', err);
})

async function readFile() {
    try {
        const data = await fs.readFile('./text2.txt', 'utf-8');
        console.log('File content: ', data);
    } catch (error) {
        console.error('Error reading the file: ', error);
    }
}

readFile();