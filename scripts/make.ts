import chalk from 'chalk';
import spawn from 'cross-spawn';

    // ts-node scripts/build-app-domain & npm link ./app-domain
    console.log(`${chalk.greenBright(`build general-app-domain`)}`);

    const result = spawn.sync(
        'ts-node',
        [require.resolve('./buildBaseEntityDict.ts')],
        {
            stdio: 'inherit',
            shell: true,
        }
    );
    // const result2 = spawn.sync('npm -v', [], { stdio: 'inherit', shell: true });

    if (result.status === 0) {
        console.log(`${chalk.greenBright(`build 执行完成`)}`);
    } else {
        Error(`${chalk.redBright(`build 执行失败`)}`);
        process.exit(1);
    }

    console.log(`${chalk.greenBright(`npm link general-app-domain`)}`);

    const isWin = process.platform === 'win32';
    const result2 = !isWin ? spawn.sync(
        'sudo',
        [`npm link ${process.cwd()}/src/general-app-domain`],
        {
            stdio: 'inherit',
            shell: true,
        }
    ) : spawn.sync(
        'npm',
        [`link ${process.cwd()}/src/general-app-domain`],
        {
            stdio: 'inherit',
            shell: true,
        }
    );

    if (result2.status === 0) {
        console.log(`${chalk.greenBright(`link 执行完成`)}`);
    } else {
        Error(`${chalk.redBright(`link 执行失败`)}`);
        process.exit(1);
    }
