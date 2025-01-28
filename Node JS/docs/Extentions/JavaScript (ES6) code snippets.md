## Import and export
imp→	imports entire module import fs from 'fs';
imn→	imports entire module without module name import 'animate.css'
imd→	imports only a portion of the module using destructing import {rename} from 'fs';
ime→	imports everything as alias from the module import * as localAlias from 'fs';
ima→	imports only a portion of the module as alias import { rename as localRename } from 'fs';
rqr→	require package require('');
req→	require package to const const packageName = require('packageName');
mde→	default module.exports module.exports = {};
env→	exports name variable export const nameVariable = localVariable;
enf→	exports name function export const log = (parameter) => { console.log(parameter);};
edf→	exports default function export default function fileName (parameter){ console.log(parameter);};
ecl→	exports default class export default class Calculator { };
ece→	exports default class by extending a base one export default class Calculator extends BaseClass { };

## Class helpers

con→	adds default constructor in the class constructor() {}
met→	creates a method inside a class add() {}
pge→	creates a getter property get propertyName() {return value;}
pse→	creates a setter property set propertyName(value) {}

## Various methods

fre→	forEach loop in ES6 syntax array.forEach(currentItem => {})
fof→	for ... of loop for(const item of object) {}
fin→	for ... in loop for(const item in object) {}
anfn→	creates an anonymous function (params) => {}
nfn→	creates a named function const add = (params) => {}
dob→	destructing object syntax const {rename} = fs
dar→	destructing array syntax const [first, second] = [1,2]
sti→	set interval helper method setInterval(() => {});
sto→	set timeout helper method setTimeout(() => {});
prom→	creates a new Promise return new Promise((resolve, reject) => {});
thenc→	adds then and catch declaration to a promise .then((res) => {}).catch((err) => {});

## Console methods

cas→	console alert method console.assert(expression, object)
ccl→	console clear console.clear()
cco→	console count console.count(label)
cdb→	console debug console.debug(object)
cdi→	console dir console.dir
cer→	console error console.error(object)
cgr→	console group console.group(label)
cge→	console groupEnd console.groupEnd()
clg→	console log console.log(object)
clo→	console log object with name console.log('object :>> ', object);
ctr→	console trace console.trace(object)
cwa→	console warn console.warn
cin→	console info console.info
clt→	console table console.table
cti→	console time console.time
cte→	console timeEnd console.timeEnd

----------------

## Import and export

:::row:::
    :::column:::
        `imp→`
    :::column-end:::
    :::column:::
        imports entire module `import fs from 'fs';`
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `imn→`
    :::column-end:::
    :::column:::
        imports entire module without module name `import 'animate.css'`
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `imd→`
    :::column-end:::
    :::column:::
        imports only a portion of the module using destructing `import {rename} from 'fs';`
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `ime→`
    :::column-end:::
    :::column:::
        imports everything as alias from the module import \* as localAlias from 'fs';
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `ima→`
    :::column-end:::
    :::column:::
        imports only a portion of the module as alias import { rename as localRename } from 'fs';
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `rqr→`
    :::column-end:::
    :::column:::
        require package require('');
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `req→`
    :::column-end:::
    :::column:::
        require package to const const packageName = require('packageName');
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `mde→`
    :::column-end:::
    :::column:::
        default module.exports module.exports = {};
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `env→`
    :::column-end:::
    :::column:::
        exports name variable export const nameVariable = localVariable;
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `enf→`
    :::column-end:::
    :::column:::
        exports name function export const log = (parameter) => { console.log(parameter);};
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `edf→`
    :::column-end:::
    :::column:::
        exports default function export default function fileName (parameter){ console.log(parameter);};
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `ecl→`
    :::column-end:::
    :::column:::
        exports default class export default class Calculator { };
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `ece→`
    :::column-end:::
    :::column:::
        exports default class by extending a base one export default class Calculator extends BaseClass { };
    :::column-end:::
:::row-end:::


## Class helpers
:::row:::
    :::column:::
        `con→`
    :::column-end:::
    :::column:::
        adds default constructor in the class constructor() {}
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `met→`
    :::column-end:::
    :::column:::
        creates a method inside a class add() {}
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `pge→`
    :::column-end:::
    :::column:::
        creates a getter property get propertyName() {return value;}
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `pse→`
    :::column-end:::
    :::column:::
        creates a setter property set propertyName(value) {}
    :::column-end:::
:::row-end:::


## Various methods

:::row:::
    :::column:::
        `fre→`
    :::column-end:::
    :::column:::
        forEach loop in ES6 syntax array.forEach(currentItem => {})
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `fof→`
    :::column-end:::
    :::column:::
        for ... of loop for(const item of object) {}
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `fin→`
    :::column-end:::
    :::column:::
        for ... in loop for(const item in object) {}
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `anfn→`
    :::column-end:::
    :::column:::
        creates an anonymous function (params) => {}
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `nfn→`
    :::column-end:::
    :::column:::
        creates a named function const add = (params) => {}
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `dob→`
    :::column-end:::
    :::column:::
        destructing object syntax const {rename} = fs
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `dar→`
    :::column-end:::
    :::column:::
        destructing array syntax const [first, second] = [1,2]
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `sti→`
    :::column-end:::
    :::column:::
        set interval helper method setInterval(() => {});
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `sto→`
    :::column-end:::
    :::column:::
        set timeout helper method setTimeout(() => {});
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `prom→`
    :::column-end:::
    :::column:::
        creates a new Promise return new Promise((resolve, reject) => {});
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `thenc→`
    :::column-end:::
    :::column:::
        adds then and catch declaration to a promise .then((res) => {}).catch((err) => {});
    :::column-end:::
:::row-end:::



## Console methods
:::row:::
    :::column:::
        `cas→`
    :::column-end:::
    :::column:::
        console alert method console.assert(expression, object)
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `ccl→`
    :::column-end:::
    :::column:::
        console clear console.clear()
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `cco→`
    :::column-end:::
    :::column:::
        console count console.count(label)
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `cdb→`
    :::column-end:::
    :::column:::
        console debug console.debug(object)
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `cdi→`
    :::column-end:::
    :::column:::
        console dir console.dir
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `cer→`
    :::column-end:::
    :::column:::
        console error console.error(object)
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `cgr→`
    :::column-end:::
    :::column:::
        console group console.group(label)
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `cge→`
    :::column-end:::
    :::column:::
        console groupEnd console.groupEnd()
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `clg→`
    :::column-end:::
    :::column:::
        console log console.log(object)
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `clo→`
    :::column-end:::
    :::column:::
        console log object with name console.log('object :>> ', object);
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `ctr→`
    :::column-end:::
    :::column:::
        console trace console.trace(object)
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `cwa→`
    :::column-end:::
    :::column:::
        console warn console.warn
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `cin→`
    :::column-end:::
    :::column:::
        console info console.info
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `clt→`
    :::column-end:::
    :::column:::
        console table console.table
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `cti→`
    :::column-end:::
    :::column:::
        console time console.time
    :::column-end:::
:::row-end:::

:::row:::
    :::column:::
        `cte→`
    :::column-end:::
    :::column:::
        console timeEnd console.timeEnd
    :::column-end:::
:::row-end:::