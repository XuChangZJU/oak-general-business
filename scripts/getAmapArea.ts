/**
 * 用于更新高德数据库中的adCode信息到本地src/data/area.json中
 */
import 'isomorphic-fetch';
import assert from 'assert';
import { writeFileSync } from 'fs-extra';
import { FormCreateData } from 'oak-domain/lib/types/Entity';
import { OpSchema as Area } from 'oak-app-domain/Area/Schema';


const KEY = '4f3d4499850ba51429b9dece8cedd8d2';

async function acquireAmap(keyWords: string, subdistrict: number) {
    const url = `https://restapi.amap.com/v3/config/district?keywords=${encodeURIComponent(keyWords)}&subdistrict=${subdistrict}&key=${KEY}`;

    const res = await fetch(url);
    return res.json();
}


function processRepeatedAdCode(districts: any[], parentAdCode: string) {
    // 高德的street的adCode和父亲相同，这里统一处理一下
    let jdCount = 0;
    let zCount = 100;
    let oCount = 400;
    let xCount = 200;
    const districts2 = districts.map(
        (ele) => {
            const { name, adcode } = ele;
            let ele2 = ele;
            if (adcode === parentAdCode) {
                if (name.endsWith('街道')) {
                    ele2 = Object.assign(ele, { adcode: parseInt(adcode) * 1000 + jdCount });
                    jdCount++;
                }
                else if (name.endsWith('镇')) {
                    ele2 = Object.assign(ele, { adcode: parseInt(adcode) * 1000 + zCount });
                    zCount++;
                }
                else if (name.endsWith('乡')) {
                    ele2 = Object.assign(ele, { adcode: parseInt(adcode) * 1000 + xCount });
                    xCount++;
                }
                else {
                    ele2 = Object.assign(ele, { adcode: parseInt(adcode) * 1000 + oCount });
                    oCount++;
                }
            }
            return ele2;
        }
    );
    return districts2;
}

/**
 * 省份直接取到街道，然后存储
 * @param provinceName
 * @returns {*}
 */
/* function getProvince(provinceName) {
    return acquireAmap(provinceName, 3)
        .then(
            (result) => {
                const { districts: cities, adcode: provinceCode } = result.districts[0];
                cities.forEach(
                    (city) => {
                        const { districts, adcode: cityCode } = city;
                        const districts2 = processRepeatedAdCode(districts, cityCode);
                        saveDistricts(districts2, cityCode);
                        districts2.forEach(
                            (district) => {
                                const { districts: streets, adcode: districtCode } = district;
                                const streets2 = processRepeatedAdCode(streets, districtCode);
                                saveDistricts(streets2, districtCode);
                            }
                        );
                    }
                );
            }
        );
} */


async function main() {
    const areasss: FormCreateData<Area>[] = [];
    const streetsss: FormCreateData<Area>[] = [];
    function saveAreas(areas: any[], parentId: string | null, depth: 0 | 1 | 2 | 3 | 4, dest: FormCreateData<Area>[] = areasss) {
        areas.forEach(
            (ele) => {
                const { adcode, center, citycode, level, name } = ele;
                const coords = center.split(',');
                dest.push({
                    code: adcode,
                    level,
                    parentId,
                    name,
                    depth,
                    id: adcode,
                    center: {
                        type: 'point',
                        coordinate: [parseFloat(coords[0]), parseFloat(coords[1])],
                    },
                });
            }
        );
    }
    
    const result = await acquireAmap('中国', 1);
    const { districts } = result;
    const country = districts[0];
    saveAreas([country], null, 0);
    const { districts: provinces, adcode: countryCode } = country;
    saveAreas(provinces, countryCode, 1);

    for (const dist of provinces) {
        const result2 = await acquireAmap(dist.name, 3);
        const { districts: cities, adcode: provinceCode } = result2.districts[0];
        // cities.forEach((ele: any) => assert(ele.level === 'city'));
        saveAreas(cities, provinceCode, 2);
        for (const city of cities) {
            const { districts, adcode: cityCode } = city;
            const districts2 = processRepeatedAdCode(districts, cityCode);
            // districts2.forEach((ele: any) => assert(ele.level === 'district'));
            saveAreas(districts2, cityCode, 3);
            districts2.forEach(
                (district) => {
                    const { districts: streets, adcode: districtCode } = district;
                    const streets2 = processRepeatedAdCode(streets, districtCode);
                    // streets2.forEach((ele: any) => assert(ele.level === 'street'));
                    saveAreas(streets2, districtCode, 4, streetsss);
                }
            );
        }
    }

    writeFileSync(`${__dirname}/../src/data/area-debug.json`, JSON.stringify(areasss));
    writeFileSync(`${__dirname}/../src/data/area.json`, JSON.stringify(areasss.concat(streetsss)));
}


main().then(
    () => console.log('success')
);
/* 
acquireAmap('中国', 1)
    .then(
        (result) => {
            saveDistricts(result.districts, null);
            const country = result.districts[0];
            const { districts: provinces, adcode: countryCode } = country;
            saveDistricts(provinces, countryCode);
            function provIter(idx) {
                if (idx === provinces.length) {
                    return Promise.resolve();
                }
                const prov = provinces[idx];
                return getProvince(prov.name)
                    .then(
                        () => {
                            console.log(`${prov.name}处理完毕`);
                            return provIter(idx + 1);
                        }
                    );
            }

            return provIter(0);
        }
    )
    .catch(
        (err) => {
            console.error(err);
            process.exit(-1);
        }
    ); */
