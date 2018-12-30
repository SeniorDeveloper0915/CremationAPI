import bcrypt                   from 'bcrypt';
import HttpStatus               from 'http-status-codes';
import Skill                    from '../models/skill.model';
import formidable               from 'formidable';
import fs                       from 'fs';
import date                     from 'date-and-time';



/**
 *  Get doctor by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function GetDoctor(req, res) {

    if (req.body.selection == 1) {
        let doctor = await Skill.query()
                .where('First_Project_Id', '=', req.body.id)
                .groupBy('Doctor_Id');
            res.json({
                doctor : doctor
            })
    } else if (req.body.selection == 2) {
        let doctor = await Skill.query()
                .where('Second_Project_Id', '=', req.body.id)
                .groupBy('Doctor_Id');
            res.json({
                doctor : doctor
            })
    } else if (req.body.selection == 3) {
        let doctor = await Skill.query()
                .where('Third_Project_Id', '=', req.body.id)
                .groupBy('Doctor_Id');
            res.json({
                doctor : doctor
            })
    }
}
