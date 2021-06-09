'use strict';
const dbConnector = require('../config/db.config');

exports.create = (patient, response) => {
    dbConnector.query('INSERT INTO Patients SET ?', patient, 
        (error, result) => {
            error? response(error) : response(false, result);
        }
    )
}

exports.findAll = (response) => {
    dbConnector.query("SELECT Patients.*, Guardians.name as guardian_name, Guardians.phone as guardian_phone"  
    +" FROM Patients INNER JOIN Guardians ON Patients.id = Guardians.id_patient", 
        (error, result) => {
            error? response(error) : response(false, result);
        }
    )
}

exports.find = (patientId, response) => {
    dbConnector.query("SELECT Patients.*, Guardians.name as guardian_name, Guardians.phone as guardian_phone"  
    +" FROM Patients INNER JOIN Guardians ON Patients.id = Guardians.id_patient WHERE id = ?", patientId,
        (error, result) => {
            error? response(error) : response(false, result);
        }
    )
}

exports.update = (id, patient, response) => {
    dbConnector.query("UPDATE Patients SET ? WHERE id = ?", [patient, id],
        (error, result) => {
            error? response(error) : response(false, result);
        }
    )
}

exports.delete = (patientId, response) => {
    dbConnector.query("DELETE FROM Patients WHERE id = ?", patientId,
        (error, result) => {
            error? response(error) : response(false, result);
        }
    )
}

