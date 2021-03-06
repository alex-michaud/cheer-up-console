require('./lib/console')({
  silent: false,//['log', 'info'],
  enabled: true
});

console.log('Simple console.log of a string');
console.warn('Simple console.warn of a string');
console.error('Simple console.error of a string');
console.info('Simple console.info of a string');
console.dir('Simple console.dir of a string');

const sampleObject = {
  param1: 'value1',
  param2: 'value2',
  sub_object: {
    paramA: 'valueA',
    paramB: 'valueB',
  }
};
const sampleArray = ['a','b',3,null,5];

console.log('console.log of an object', sampleObject);
console.info('console.info of an array', sampleArray);
console.memory();

// circular reference
let arr = [];
arr[0] = arr;
arr[1] = 'test value';
console.log('Argument with circular reference', arr);

console.time('time');
for(let i=0; i<10000; i++) {  }
console.timeEnd('time');