import * as ts from 'typescript';

import { compilerOptions } from '../tsconfig.json';

const program = ts.createProgram({
    rootNames: [],
    options: compilerOptions as any,
});

console.log('program built');