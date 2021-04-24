## node fundamentos

````javascript
console.log('Hola mundo');
let i = 0;
setInterval(function() {
    console.log(i);
    i++;
}, 1000);

console.log('Segunda instrucción');
````

# Env

````javascript
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
let nombre = process.env.NOMBRE || 'Sin nombre';
let web = process.env.MI_WEB || 'no tengo web';

console.log('Hola '+ nombre);
console.log('Mi web es '+ web);
````

## instalar pm2 y nodemon

````bash
npm install pm2 -g
pm2 start

pm2 status
pm2 log
pm2 stop nameapp
$ pm2 restart app_name
$ pm2 reload app_name
$ pm2 stop app_name
$ pm2 delete app_name
````

## Callback
````javascript
function hola(nombre, callback) {
    setTimeout(function() {
        console.log('hola ' + nombre)
        callback(nombre)
    }, 1000)
}

function adios(nombre, callback) {
    setTimeout(function() {
        console.log('Adios', nombre);
        callback();
    }, 1000)
}

console.log('iniciando proceso')

hola('Andrés', function() {})
adios('Andrés', function() {})
````

## Callback Hell
````javascript

function hola(nombre, miCallback) {
    setTimeout(function () {
        console.log('Hola, '+ nombre);
        miCallback(nombre);
    }, 1500);
}

function hablar(callbackHablar) {
    setTimeout(function() {
        console.log('Bla bla bla bla...');
        callbackHablar();
    }, 1000);
}

function adios(nombre, otroCallback) {
    setTimeout(function() {
        console.log('Adios', nombre);
        otroCallback();
    }, 1000);
}

function conversacion(nombre, veces, callback) {
    if (veces > 0) {
        hablar(function () {
            conversacion(nombre, --veces, callback);
        })
    } else {
        adios(nombre, callback);
    }
}


hola('Carlos', function (nombre) {
    hablar(function () {
        hablar(function () {
            hablar(function () {
                adios(nombre, function() {
                    console.log('Terminando proceso...');
                });
            });
        });
    });
});
````

## Promesas
````javascript
function hola(nombre) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('Hola, '+ nombre);
            resolve(nombre);
        }, 1500);
    });
    
}

function hablar(nombre) {
    return new Promise( (resolve, reject) => {
        setTimeout(function() {
            console.log('Bla bla bla bla...');
            //resolve(nombre);
            reject('Hay un error');
        }, 1000);
    });
}

function adios(nombre) {
    return new Promise( (resolve, reject) => {
        setTimeout(function() {
            console.log('Adios', nombre);
            resolve();
        }, 1000);
    });
}

// ---

console.log('Iniciando el proceso..');
hola('Carlos')
    .then(hablar)
    .then(hablar)
    .then(hablar)
    .then(hablar)
    .then(adios)
    .then((nombre) => {
        console.log('Terminado el proceso');
    })
    .catch(error => {
        console.error('Ha habido un error:');
        console.error(error);
    })

````

## Async await

````javascript
async function hola(nombre) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('Hola, '+ nombre);
            resolve(nombre);
        }, 1500);
    });
    
}

async function hablar(nombre) {
    return new Promise( (resolve, reject) => {
        setTimeout(function() {
            console.log('Bla bla bla bla...');
            //resolve(nombre);
            resolve('Hay un error');
        }, 1000);
    });
}

async function adios(nombre) {
    return new Promise( (resolve, reject) => {
        setTimeout(function() {
            console.log('Adios', nombre);
            resolve();
        }, 1000);
    });
}

async function main() {
    let nombre = await hola('Carlos');
    await hablar();
    await hablar();
    await hablar();
    await adios(nombre);
    console.log('Termina el proceso');
}

console.log('Empezamos el proceso');
main();
console.log('Va a ser la segunda instrucción')
````

````javascript
const fs = require('fs');

function leer(ruta, cb) {
    fs.readFile(ruta, (err, data) => {
        cb(data.toString());
    })
}

function escribir(ruta, contenido, cb) {
    fs.writeFile(ruta, contenido, function (err) {
        if (err) {
            console.error('No he podido escribirlo', err);
        } else {
            console.log('Se ha escrito correctamente');
        }

    });
}

function borrar(ruta, cb) {
    fs.unlink(ruta, cb);
}

// escribir(__dirname + '/archivo1.txt', 'Soy un archivo nuevo', console.log);
// leer(__dirname + '/archivo1.txt', console.log)
borrar(__dirname + '/archivo1.txt', console.log);

````

## Console
````javascript

console.log()
console.info()
console.warn()
console.error()

console.table()
console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }]);
┌─────────┬─────┬─────┐
│ (index) │  a  │  b  │
├─────────┼─────┼─────┤
│    0    │  1  │ 'Y' │
│    1    │ 'Z' │  2  │
└─────────┴─────┴─────┘

console.group();
console.groupEnd();

EJEMPLO 1
console.group('despedida');
	console.log('adios');
	console.group();
		console.log('Carlos');
	console.groupEnd();
console.groupEnd();

console.count('veces');
console.count('veces');
console.count('veces');
console.countReset('veces');
console.count('veces');
````
## Error

````javascript
function otraFuncion() {
    serompe();
}

function serompe() {
    return 3 + z;
}

function seRompeAsincrona(cb) {
    setTimeout(function () {
        try {
            return 3 + z;
        } catch (err) {
            console.error('Error en mi función asícnrona');
            cb(err);
        }
    })
}

try {
    //otraFuncion();
    seRompeAsincrona(function (err) {
        console.log (err.message)
    });
} catch(err) {
    console.error('Vaya, algo se ha roto...');
    console.error(err);
    console.log('Pero no pasa nada, lo hemos capturado');
}

console.log('esto de aqui está al final');
````

## process
````javascript
const { exec, spawn } = require('child_process');

exec('node modulos/consola.js', (err, stdout, sterr) => {
    if (err) {
        console.error(err);
        return false;
    }

    console.log(stdout);
})

let proceso = spawn('ls', ['-la']);

console.log(proceso.pid);
console.log(proceso.connected);

proceso.stdout.on('data', function (dato) {
    console.log('¿Está muerto?');
    console.log(proceso.killed);
    console.log(dato.toString())
});

proceso.on('exit', function() {
    console.log('el proeso terminó');
    console.log(proceso.killed)
})
````
## Nativos
````javascript
const miAddon = require('./build/Release/addon');

console.log(miAddon.hola());
````
## Http
````javascript
const http = require('http');

http.createServer(router).listen(3000);

function router(req, res) {
    console.log('Nueva petición!');
    console.log(req.url);

    switch (req.url) {
        case '/hola':
            let saludo = hola();
            res.write(saludo);
            res.end();
            break;
        
        default:
            res.write('Error 404: No se lo que quieres');
            res.end();
    }

    res.writeHead(201, { 'Content-Type': 'text/plain' })

    // Escribir respuesta al usuario
    res.write('Hola, ya se usar HTTP de NodeJS');

    res.end();
}

function hola() {
    return 'Hola, que tal';
}

console.log("Escuchando http en el puerto 3000");
````
## os
````javascript
const os = require('os');

console.log(os.arch());
console.log(os.platform());

console.log(os.cpus().length);

console.log(os.constants);

const SIZE = 1024;
function kb(bytes) { return bytes / SIZE }
function mb(bytes) { return kb(bytes) / SIZE }
function gb(bytes) { return mb(bytes) / SIZE }

console.log(os.freemem());
console.log(kb(os.freemem()));
console.log(mb(os.freemem()));
console.log(gb(os.freemem()));

console.log(gb(os.totalmem()));

console.log(os.homedir())
console.log(os.tmpdir())

console.log(os.hostname());
console.log(os.networkInterfaces());

````
## Process
````javascript
// const p = require('process');

process.on('beforeExit', () => {
    console.log('el proceso va a terminar');
});

process.on('exit', () => {
    console.log('Ale, el proceso acabó');
    setTimeout(() => {
        console.log('Esto no se va a ver nunca');
    }, 0);
});

setTimeout(() => {
    console.log('Esto se va a ver');
}, 0);

process.on('uncaughtException', (err, origen) => {
    console.error('Vaya se nos ha olvidado capturar un error');
    setTimeout(() => {
        console.log('Esto viene desde las excepciones');
    }, 0);
});


funcionQueNoExiste();

console.log('Esto si el error no se recoje, no sale');
````

## experimental
````javascript
import modulo from './modulo.mjs'

console.log(modulo.prop1);
modulo.saludar();
````

## bcrypt
````javascript

const bcrypt = require('bcrypt');

const password = '1234Segura!';

bcrypt.hash(password, 5, function(err, hash) {
    console.log(hash); 

    bcrypt.compare('password', hash, function(err, res) {
        // console.log(err)
        console.log(res)
    })
});
````

## moment
````javascript
const moment = require('moment');

let ahora = moment();

// console.log(ahora.toString());
console.log(ahora.format('YYYY/MM/DD - HH:mm'));

````


## sharp
````javascript
const sharp = require('sharp');

sharp('original.png')
    .resize(80)
    .grayscale()
    .toFile('resized.png');

````

## buffer
````javascript
let buffer = Buffer.alloc(4);
let buffer = Buffer.from([1, 2, 5]);
let buffer = Buffer.from('Hola');

console.log(buffer);

// --

let abc = Buffer.alloc(26);
console.log(abc);

for (let i = 0; i < 26; i++) {
    abc[i] = i + 97;
}

console.log(abc.toString());


````

## stream
````javascript
const fs = require('fs');
const stream = require('stream');
const util = require('util');

let data = '';

let readableStream = fs.createReadStream(__dirname + '/input.txt');
readableStream.setEncoding('UTF8');

readableStream.on('data', function (chunk) {
    data += chunk;
});

readableStream.on('end', function() {
    console.log(data);
});

process.stdout.write('hola')
process.stdout.write('que')
process.stdout.write('tal')

const Transform = stream.Transform;

function Mayus() {
    Transform.call(this);
}
util.inherits(Mayus, Transform);

Mayus.prototype._transform = function(chunk, codif, cb) {
    chunkMayus = chunk.toString().toUpperCase();
    this.push(chunkMayus);
    cb();
}

let mayus = new Mayus();

readableStream
    .pipe(mayus)
    .pipe(process.stdout);


````

## time
````javascript
console.time('todo');
let suma = 0;
console.time('bucle');
for (let i = 0; i < 100000000; i++) {
    suma += 1;
}
console.timeEnd('bucle');

let suma2 = 0;
console.time('bucle 2');
for (let j = 0; j < 1000000000; j++) {
    suma2 += 1;
}
console.timeEnd('bucle 2');

console.time('asincrono');
console.log('Empieza el proceso async')
asincrona()
    .then(() => {
        console.timeEnd('asincrono');
    });

console.timeEnd('todo');

function asincrona() {
    return new Promise( (resolve) => {
        setTimeout(function () {
            console.log('Termina el proceso asíncrono');
            resolve();
        }, 1000)
    })
}

````
## throw
````javascript
function asincrona(callback) {
    setTimeout(function() {
        try {
            let a = 3 + z;
            callback(null, a);
        } catch (e) {
            callback(e);
        }
    }, 1000);
}


asincrona(function (err, dato) {
    if (err) {
        console.error('Tenemos un error');
        console.error(err);
        return false;
        // throw err; // NO VA A FUNCIONAR
    }

    console.log('todo ha ido bien, mi data es', dato);
})
````
