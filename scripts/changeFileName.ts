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
        } else if (file.endsWith('.pc.tsx') || file.endsWith('.tsx')) {
            if (file.endsWith('.pc.tsx')) {
                renameSync(join(path, file), join(path, 'web.pc.tsx'));
                console.log('*******************************************************************************************');
                console.log(`${join(path, file)} change to ${join(path, 'web.pc.tsx')}`);
            }
            else {
                renameSync(join(path, file), join(path, 'web.tsx'));
                console.log(
                    '*******************************************************************************************'
                );
                console.log(
                    `${join(path, file)} change to ${join(path, 'web.tsx')}`
                );
                //  const isExists = existsSync(
                //      join(path, file.replace('.tsx', '.pc.tsx'))
                //  );
                //  if (isExists) {
                //      // renameSync(join(path, file), join(path, 'web.mobile.tsx'));
                //      console.log(
                //          '*******************************************************************************************'
                //      );
                //      console.log(
                //          `${join(path, file)} change to ${join(
                //              path,
                //              'web.tsx'
                //          )}`
                //      );
                //  }
                //  else {
                //      // renameSync(join(path, file), join(path, 'web.tsx'));
                //      console.log('*******************************************************************************************');
                //      console.log(
                //          `${join(path, file)} change to ${join(
                //              path,
                //              'web.tsx'
                //          )}`
                //      );
                //  }
            }
        }
    });
}

if (process.argv[2]) {
    console.log(`把${process.argv[2]}路径下的文件后缀为pc.tsx或.tsx改为web.tsx或mobile.tsx`);
    changeDts(join(process.cwd(), process.argv[2]));
}
else {
    console.log('请输入路径名');
}

