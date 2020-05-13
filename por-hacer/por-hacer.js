const fs = require('fs');

let listarPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listarPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    })
}

const cargarDB = () => {

    try {
        listarPorHacer = require('../db/data.json');
    } catch (error) {

        listarPorHacer = [];
    }

}
const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listarPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

const getListado = () => {

    cargarDB();
    return listarPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listarPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion
    })
    if (index >= 0) {
        listarPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();

    let index = listarPorHacer.findIndex(tarea => {
        return tarea.descripcion = descripcion;
    })
    if (index >= 0) {
        listarPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}