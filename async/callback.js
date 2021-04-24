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
