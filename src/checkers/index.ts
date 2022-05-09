import addressCheckers from './address';
import tokenCheckers from './token';
import userCheckers from './user';

export default [...addressCheckers, ...tokenCheckers, ...userCheckers];