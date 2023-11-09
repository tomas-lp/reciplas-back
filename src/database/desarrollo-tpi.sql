CREATE DATABASE `desarrollo-tpi`;

CREATE TABLE `desarrollo-tpi`.productos (
 id     integer   not null AUTO_INCREMENT,
 nombre    varchar(20)  not null,
 stock    integer   not null,
 precioVenta    decimal(12,2) not null,
 categoria   varchar(20)  null,
 fecha_actualizacion date   null,
 CONSTRAINT pk_productos 
  PRIMARY KEY (id)
);
 

CREATE TABLE `desarrollo-tpi`.compras (
 id     integer   not null AUTO_INCREMENT,
 fecha    date   not null,
 proveedor   varchar(50)  null,
  CONSTRAINT pk_compras 
  PRIMARY KEY (id)
);


CREATE TABLE `desarrollo-tpi`.linea_compras (
 id_compra   integer   not null,
 linea    integer   not null,
 id_producto   integer   not null,
 cantidad   integer   not null,
 precio_unitario  decimal(12,2) not null,
 CONSTRAINT pk_linea_compras 
  PRIMARY KEY (id_compra, linea),
 CONSTRAINT fk_linea_compras_ref_producto 
  FOREIGN KEY (id_producto)
  REFERENCES productos (id) ON DELETE CASCADE,
 CONSTRAINT fk_linea_compras_ref_compras 
  FOREIGN KEY (id_compra) 
  REFERENCES compras (id) ON DELETE CASCADE
);


CREATE TABLE `desarrollo-tpi`.ventas (
 id     integer   not null AUTO_INCREMENT,
 fecha    date   not null,
 cliente    varchar(50)  null,
 CONSTRAINT pk_ventas 
  PRIMARY KEY (id)
); 


CREATE TABLE `desarrollo-tpi`.linea_ventas (
 id_venta   integer   not null,
 linea    integer   not null,
 id_producto   integer   not null,
 cantidad   integer   not null,
 precio_unitario  decimal(12,2) not null,
 CONSTRAINT pk_linea_ventas 
  PRIMARY KEY (id_venta, linea),
 CONSTRAINT fk_linea_ventas_ref_productos
  FOREIGN KEY (id_producto) 
  REFERENCES productos (id) ON DELETE CASCADE,
 CONSTRAINT fk_linea_ventas_ref_ventas
  FOREIGN KEY (id_venta) 
  REFERENCES ventas (id) ON DELETE CASCADE
);