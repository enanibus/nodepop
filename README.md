# Nodepop API

**Práctica JS/Node.js/MongoDB - KeepCoding Startup Engineering Master III**

Backend para dar soporte a una aplicación de venta de artículos de segunda mano.

## Instrucciones

Requisitos de instalación:

- Node >= 4.0
- MongoDB
- Git

### Instalación

	$ git clone https://github.com/enanibus/nodepop.git
	$ cd nodepop
	$ npm install
      
### Arrancar servidor
	$ npm start
      
### Arrancar la base de datos
	$ npm run installDB
	
## Documentación detallada
Mirar en la [wiki](https://github.com/enanibus/nodepop/wiki) del proyecto

## Operaciones
Los servicios que proporciona el API son:

- **Registro** (nombre, email, contraseña)
- **Autenticación** (email, contraseña)
- **Lista de anuncios** (paginada, con filtros de búsqueda)
- **Guardar token de push** (para notificaciones push)
- **Lista de tags existentes** (categorías de anuncios)

## URLs DevOps

- [Nodepop API](http://nodepop.jacoboenriquez.com/)
- [Ruta de imágenes de anuncios/bici BH](http://nodepop.jacoboenriquez.com/images/anuncios/bici2.jpg)
- [IP servidor](http://52.37.152.144/)

#### Ejemplos de archivos estáticos DevOps
- Al acceder al enlace principal del API *[Nodepop API](http://nodepop.jacoboenriquez.com/)*, se puede comprobar que nginx devuelve la hoja de estilos del directorio `/public/stylesheets/style.css` con la cabecera personalizada X-Owner
- Al acceder al enlace *[Ruta de imágenes de anuncios/bici BH](http://nodepop.jacoboenriquez.com/images/anuncios/bici2.jpg)*, se puede comprobar que nginx devuelve la foto del directorio `/public/images/anuncios/bici2.jpg` con la cabecera personalizada X-Owner

## Changelog

* 0.0.1: start
* 0.0.2: inclusión de URLs en README.md entrega práctica curso DevOps


## Autor

&copy; 2016 Jacobo Enríquez.


