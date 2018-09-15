# cheer-up-console
Drop-in replacement for Node.js console

Simply load the module at the beginning of your file and 
any subsequent call to one of the following console method 
will produce a colorful and more readable output.

1. console.log
2. console.error
3. console.warn
4. console.info
5. console.dir

## Install

```
npm i cheer-up-console
```

## Use

```
require('cheer-up-console')(options);
```

## Options

Options should be passed as a json object.


| Param | Accepted values | default |
| ----- | --------------- | ------- |
| enabled | true or false | true |
| silent | true, false, list | true |


### silent param

The ***silent*** param can also accept a list of 
console methods that you want to silence. 

For example, if you want to silence all the console.log and console.info, 
you can pass the param `['log', 'info']`. All the other console methods 
will continue to produce an output.
