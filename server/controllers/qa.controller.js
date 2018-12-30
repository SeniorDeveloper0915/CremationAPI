import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import Qa               from '../models/qa.model';
import Skill            from '../models/skill.model';
import formidable       from 'formidable';
import fs               from 'fs';
import date             from 'date-and-time';
import randomstring     from 'randomstring';


/**
 *  Save New Question
 *
 * @param {object} req
 * @param {object} res
 * @param {string} sel
 * @returns {*}
 */

export function SaveQuestion(req, res) {
    let question_time = new Date();
    date.format(question_time, 'YYYY-MM-DD HH:mm:ss');

    Qa.forge({
        PhoneNumber             : req.body.phonenumber,
        Question_Title          : req.body.question_title, 
        Question_Content        : req.body.question_content,
        Question_Time           : question_time,
        First_Project_Id        : req.body.first_project_id,
        Second_Project_Id       : req.body.second_project_id,
        Third_Project_Id        : req.body.third_project_id,
        Verification            : req.body.verification_code
    }, {hasTimestamps: true}).save()
        .then(question => res.json({
                success: true
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Save Answer
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function SaveAnswer(req, res) {
    let answer_time = new Date();
    date.format(answer_time, 'YYYY-MM-DD HH:mm:ss');

    Qa.forge({id: req.body.id})
        .fetch({require: true})
        .then(question => question.save({
                Doctor_Id           : req.body.doctor_id        || question.get('Doctor_Id'),
                Answer_Content      : req.body.answer_content   || question.get('Answer_Content'),
                Answer_Time         : answer_time,
                Status              : !question.get('Status')
            })
                .then(() => res.json({
                        error   : false,
                        message : "Save Answer Succed"
                    })
                )
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: true,
                        data: {message: err.message}
                    })
                )
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Get Question by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetQuestionById(req, res) {
    Qa.forge({id: req.params.id})
        .fetch()
        .then(question => {
            if (!question) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, question: {}
                });
            } else {
                res.json({
                    error : false,
                    question: question.toJSON(),
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Get All Question & Answers
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetQas(req, res) {
    Qa.forge()
        .fetchAll()
        .then(qas => res.json({
                error: false,
                qas: qas.toJSON(),
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete Qa by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteQa(req, res) {
    console.log(req.params.id);
    Qa.forge({id: req.params.id})
        .fetch({require: true})
        .then(function(qa) {
            console.log(qa.toJSON());
            qa.destroy()
                .then(() => res.json({
                                error: false,
                                data: {message: 'Delete Question & Answer Succed.'}
                            })
                        
                )
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: err
                    })
                );
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Get Question and Answer Count
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function Count(req, res) {
    Qa.count()
        .then(count => res.json({
                error: false,
                count: count
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}