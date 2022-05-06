import { removeSync, readdirSync, statSync } from 'fs-extra';
import { join } from 'path';

function removeDts(path: string) {
    const files = readdirSync(path);

    files.forEach(
        (file) => {
            const stat = statSync(join(path, file));
            if (stat.isDirectory()) {
                removeDts(join(path, file));
            }
            else if (file.endsWith('.d.ts') || file.endsWith('.js')) {
                removeSync(join(path, file));
                console.log(`remove ${join(path, file)}`);
            }
        }
    );
}

removeDts(join(process.cwd(), 'wechatMp'));

