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

````javascript
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
let nombre = process.env.NOMBRE || 'Sin nombre';
let web = process.env.MI_WEB || 'no tengo web';

console.log('Hola '+ nombre);
console.log('Mi web es '+ web);
````