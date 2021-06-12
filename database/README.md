# Diccionario de datos

## Hospitals
Representa el lugar de origen de los pacientes registrados, guarda el nombre del hospital y la ciudad de origen.

| Columna | tipo de dato  | acepta nulos | Llave primaria | Llave extranjera |
| ------- | ------------- | ------------ | -------------- | ---------------- |
| id      | int (11)      | - [x]        | - [x]          | - [ ]            |
| name    | varchar (100) | - [x]        | - [ ]          | - [ ]            |
| city    | varchar (50)  | - [x]        | - [ ]          | - [ ]            |

## Patients
Guarda toda la información personal del paciente así como la fecha de inscripción. Se relaciona con la entidad Hospitals de forma muchos a uno.

| Columna          | tipo de dato  | acepta nulos | Llave primaria | Llave extranjera |
| ---------------- | ------------- | ------------ | -------------- | ---------------- |
| id               | int (11)      | - [x]        | - [x]          | - [ ]            |
| names            | varchar (100) | - [x]        | - [ ]          | - [ ]            |
| last_name        | varchar (50)  | - [x]        | - [ ]          | - [ ]            |
| second_last_name | varchar (50)  | - [x]        | - [ ]          | - [ ]            |
| sex              | enum('M','F') | - [x]        | - [ ]          | - [ ]            |
| birthday         | date          | - [x]        | - [ ]          | - [ ]            |
| inscription_date | date          | - [x]        | - [ ]          | - [ ]            |
| id_hospital      | int(11)       | - [x]        | - [ ]          | - [x]            |

## Guardians
Guarda la información relacionada al tutor del paciente registrado. Se relaciona con la entidad Patients de forma uno a uno.

| Columna    | tipo de dato  | acepta nulos | Llave primaria | Llave extranjera |
| ---------- | ------------- | ------------ | -------------- | ---------------- |
| id_patient | int (11)      | - [x]        | - [x]          | - [x]            |
| name       | varchar (100) | - [x]        | - [ ]          | - [ ]            |
| city       | varchar (10)  | - [x]        | - [ ]          | - [ ]            |