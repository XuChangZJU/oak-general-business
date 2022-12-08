import { renameSync, readdirSync, statSync, existsSync } from 'fs-extra';
import { join } from 'path';

function changeDts(path: string) {
    const files = readdirSync(path);

    files.forEach((file) => {
        const stat = statSync(join(path, file));
        if (
            stat.isDirectory()
        ) {
            changeDts(join(path, file));
        } else if (file.endsWith('.wxml')) {
             renameSync(join(path, file), join(path, 'index.xml'));
             console.log(
                 '*******************************************************************************************'
             );
             console.log(
                 `${join(path, file)} change to ${join(path, 'index.xml')}`
             );
        }
    });
}

if (process.argv[2]) {
    console.log(`把${process.argv[2]}路径下的文件后缀为.wxml改为.xml`);
    changeDts(join(process.cwd(), process.argv[2]));
}
else {
    console.log('请输入路径名');
}

