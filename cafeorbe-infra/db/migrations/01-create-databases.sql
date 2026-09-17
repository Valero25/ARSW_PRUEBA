-- Una base de datos por servicio de dominio. Cada servicio administra su
-- propio esquema con Flyway/Liquibase desde su propio repositorio.
CREATE DATABASE cafeorbe_identity;
CREATE DATABASE cafeorbe_auction;
CREATE DATABASE cafeorbe_streaming;
CREATE DATABASE cafeorbe_store;
CREATE DATABASE cafeorbe_shipping;
