import reduce from 'lodash/reduce';
import add from './a.js';

function myReducer(arrayToReduce) {
  return reduce(arrayToReduce, add, 0)
}

export default myReducer;
