import fs from 'node:fs'
function callback (err, data) {
    if (err) {
        console.error('Error reading file: ', err);
        return;
    }
    console.log('File content: ', data);
}

/**
 * Callback function for processing text files
 * 
 * @param {*} err 
 * @param {*} data 
 * @returns 
 */
const callback2 = (err, data) => {
    if (err) {
        console.error('Error reading file: ', err);
        return;
    }
    console.log('File content: ', data);
}

fs.readFile('./text2.txt', 'utf-8', callback2);