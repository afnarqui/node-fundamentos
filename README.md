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