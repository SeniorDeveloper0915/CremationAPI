import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import Nation           from '../models/nation.model';
import formidable       from 'formidable';
import fs               from 'fs';
import date             from 'date-and-time';


/**
 *  Get nation by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetNationById(req, res) {
    Nation.forge({id: req.params.id})
        .fetch()
        .then(nation => {
            if (!nation) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, nation: {}
                });
            }
            else {
                res.json({
                    error: false,
                    nation: nation.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Get doctors by nation id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetDoctors(req, res) {
    Nation.forge({id: req.params.id})
        .fetch({withRelated: ['Doctors']})
        .then(nation => {

            nation.Doctors().fetch().then(function(doctors) {
                console.log(doctors);
                if (!doctors) {                                                                                        
                    res.status(HttpStatus.NOT_FOUND).json({
                        error: true, doctors: {}
                    });
                }
                else {
                    res.json({
                        error           : false,
                        doctors         : doctors.toJSON()
                    });
                }
            });
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: true
            })
        );
}

/**
 * Get All Nations
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetNations(req, res) {
    Nation.forge()
        .fetchAll()
        .then(nations => res.json({
                error: false,
                nations: nations.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}
