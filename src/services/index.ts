import path from 'node:path';
import { readFile, } from 'node:fs/promises';
import { writeFileSync } from 'node:fs';

export const loadFile = async (pathFile: string) => {
    const file = path.resolve(__dirname, pathFile);
    const csv = (await readFile(file)).toString()
    const data = csv.split('\n')

    const result = data.map((item) => item.split(','));

    return result;
}

export const sumPerMonth = async (month: string) => {
    const [_, ...data] = await loadFile('../database/db.csv');
    const initialMonth = (new Date(data[0][0])).getUTCMonth() + 1;
    const lastMonth = (new Date(month)).getUTCMonth() + 1;
    let open = 0;
    let total = 0;
    let paidOut = 0;

    data.forEach((arr) => {
        const [mat, studentMonth, value, status] = arr;
        const currentMonth = (new Date(studentMonth)).getUTCMonth() + 1;

        if (currentMonth >= initialMonth && currentMonth <= lastMonth) {
            if (status === "aberto") {
                open += Number(value);
            } else {
                paidOut += Number(value);
            }
            total += Number(value);
        }

    })

    const inad = open / total // inadimplência
    const percent = Math.round(((open / total) * 100)) + '%';


    return {
        month,
        open,
        total,
        paidOut,
        inad,
        percent
    }
}

export const listStudents = async (month: string) => {
    const [_, ...data] = await loadFile('../database/db.csv');
    const result = data.filter((student) => student[1] === month);
    return result;
}

export const update = async (month: string, mat: string) => {
    let data = await loadFile('../database/db.csv');

    const index = data.findIndex((student) => student[0] === mat && student[1] === month)
    data[index][3] = 'pago';
    const dataString = data.join('\n')
    const file = path.resolve(__dirname, '../database/db.csv');
    console.count('execute')
    writeFileSync(file, dataString)
    return true;
}