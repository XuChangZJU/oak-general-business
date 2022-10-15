import areaTotal from './area.json';
import fs from 'fs';

const provinceName = process.argv[2] || '浙江省';
const level = process.argv[3] || 'district';
const cityNumber = process.argv[4] ? parseInt(process.argv[4]) : 2;

type Area = {
    id: string;
    level: 'country' | 'province' | 'city' | 'district' | 'street';
    parentId: string;
    name: string;
};

function outputData(output: Area[]) {
    fs.writeFileSync(`${__dirname}/../src/data/areaDebug.json`, JSON.stringify(output));
    console.log(`输出areaDebug.json完成，共输出了${output.length}行数据`);
}

// 输出
function main() {
    console.log(`准备输出${provinceName}的前${cityNumber}个市的地区数据，输出到${level}层为止`);
    const areaTotal2 = areaTotal as Area[];
    const output = [] as Area[];
    const province = areaTotal2.find(
        ele => ele.level === 'province' && ele.name === provinceName
    );
    if (!province) {
        console.error(`找不到名为${provinceName}的省`);
        return;
    }
    output.push(province);
    const country = areaTotal2.find(
        ele => ele.id === province.parentId
    );
    output.push(country!);
    const cities = areaTotal2.filter(
        ele => ele.parentId === province.id
    ).sort(
        (ele1, ele2) => parseInt(ele1.id) - parseInt(ele2.id)
    );
    const cities2 = cities.slice(0, cityNumber);
    output.push(...cities2);

    if (level === 'city') {
        outputData(output);
        return;
    }

    const districts = areaTotal2.filter(
        ele => cities2.find(city => ele.parentId === city.id)
    );
    output.push(...districts);

    if (level === 'district') {
        outputData(output);
        return;
    }

    const streets = areaTotal2.filter(
        ele => districts.find(district => ele.parentId === district.id)
    );
    output.push(...streets);    
    outputData(output);
}

main();

