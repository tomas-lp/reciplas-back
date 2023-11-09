CREATE DATABASE `reciplas`;

CREATE TABLE `reciplas`.productos (
  id     integer   not null AUTO_INCREMENT,
  nombre    varchar(20)  not null,
  cantidad integer not null,
  descripcion    varchar(100)  not null,
  fecha_actualizacion date   null,
  precio    integer  not null,
  PRIMARY KEY (id)
);

CREATE TABLE `reciplas`.materias_primas (
  id     integer   not null AUTO_INCREMENT,
  nombre    varchar(20)  not null,
  cantidad integer not null,
  descripcion    varchar(100)  not null,
  fecha_actualizacion date   null,
  cantidad_min    integer  not null,
  PRIMARY KEY (id)
);
