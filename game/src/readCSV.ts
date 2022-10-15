const { convertArrayToCSV } = require('convert-array-to-csv');
const converter = require('convert-array-to-csv');
import { readFileSync } from 'fs';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const board = [['S', 'S', 'S', 'SG', 'breeze', 'stench', 'W', 'stench', 'S', 'S'],
['S', 'S', 'S', 'breeze', 'P', 'breeze', 'stench', 'S', 'S', 'S'],
['S', 'S', 'S', 'S', 'breeze', 'S', 'S', 'S', 'S', 'S'], 
['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
['S', 'S', 'breeze', 'S', 'S', 'S', 'S', 'S', 'S', 'S'], 
['S', 'breeze', 'P', 'breeze', 'S', 'S', 'S', 'S', 'S', 'S'],
['S', 'SG', 'breeze', 'S', 'S', 'S', 'S', 'S', 'breeze', 'S'],
['S', 'S', 'S', 'S', 'S', 'S', 'S', 'breeze', 'P', 'breeze'],
['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'breeze', 'S'],
['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S']]


const csvFromArrayOfObjects = convertArrayToCSV(board);
console.log(csvFromArrayOfObjects);
const csvWriter = createCsvWriter({
    path: 'file.csv',
});







    const immediatelyResolvedPromise = () => {
        const resultPromise = new Promise((resolve, reject) => {
            resolve(csvWriter.writeRecords(board))
        })
        return  resultPromise
    }

    immediatelyResolvedPromise();
