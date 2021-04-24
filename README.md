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