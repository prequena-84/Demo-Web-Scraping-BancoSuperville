const express = require('express');
const router =  express.Router();
const bodyparse = require('body-parser');
const puppeteer = require('puppeteer');
const path = require('path');
const jsdom = require('jsdom');
//const got = require('got');
const { JSDOM } = jsdom;
const proceso = require('node:process'); 
const { timeout } = require('puppeteer');
const { promiseHooks } = require('v8');

let
    url = 'https://www.supervielle.com.ar/',
    navegador,
    nroImg = 0,
    timeSetInterval = 3000,
    nameInterval
;

const ExScraping = function(sm) {
    nameInterval = setInterval(() => {
        ActivarScraping1(url);
    }, sm);
}

async function ActivarScraping1(url) {
    try {

        //Numeralizador de Historial de Iamgenes (Ejemplo burdo)
        nroImg++; 
        //Desactivar el SetIntervalo
        clearInterval(nameInterval)


        //Configuración del Navegador de Test Chomium para utilizar Puppeteer
        navegador = await puppeteer.launch({
            executablePath:'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
            headless: false,
            slowMo: 100,
            devtools: false,
            ignoreDefaultArgs: [/*'--disable-extensions'*/],
            args:[
                //'--incognito', 
                `--window-size=1020,750`,
            ],
            defaultViewport:{
                width:1020,
                height:750
            }
        });

        //Oculta las notificaciones del Navegador
        const context = navegador.defaultBrowserContext();

        //Bloqueo GPS, Notificaciones y Deteccion de usuario en linea
        await context.overridePermissions(
            url, 
            ['geolocation']
        );

        pagina = await navegador.pages();
        pagina = pagina[0];

        await Promise.all([
            pagina.goto(url, {waitUntil:'load'})
        ]);

        //Aplicar/Quitar Zoom la ventana del navegador
        await pagina.evaluate(() => {
            document.body.style.zoom = "90%";
        });

        //Funcion para realizar el Capture de Pantalla
        await Promise.all([
            pagina.screenshot({ path: path.resolve(__dirname, `../img/${`Img-${nroImg}`}.png`) })
        ]);

        await Promise.all([
            pagina.close()
        ]);

        ExScraping(timeSetInterval);
       
    } catch(err) {
       console.log(err); 
    };
};

async function screenshot() {
    try {
        nroImg++; 
        await pagina.screenshot({ path: path.resolve(__dirname, `../img/${`Img-${nroImg}`}.png`) }); 
        console.log('realizo screenshot');  
    } catch(err) {
        console.log(err);
    }
};

module.exports = ExScraping(timeSetInterval);