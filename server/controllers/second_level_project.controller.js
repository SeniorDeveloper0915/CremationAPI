import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import SecondProject    from '../models/second_level_project.model';
import formidable       from 'formidable';
import fs               from 'fs';
import date             from 'date-and-time';


/**
 * Add New Second Level Project
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function AddProject(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    SecondProject.forge({
        First_Project_Id :  req.body.first_id, Project_Name : req.body.project_name, Sort : req.body.sort, Release_Time : Release_Time
    }, {hasTimestamps: true}).save()
        .then(project => res.json({
                success: true
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );

}


/**
 *  Get second level project by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetProjectById(req, res) {
    SecondProject.forge({id: req.params.id})
        .fetch()
        .then(project => {
            if (!project) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, project: {}
                });
            }
            else {
                res.json({
                    error: false,
                    project: project.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Get second level project id by Name
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetProjectIdByName(req, res) {
    SecondProject.forge({Project_Name: req.params.name})
        .fetch()
        .then(project => {
            if (!project) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, id: {}
                });
            }
            else {
                res.json({
                    error: false,
                    id   : project.get('id')
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Modify Second Level Project
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ModifyProject(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    SecondProject.forge({id: req.body.id})
        .fetch({require: true})
        .then(project => project.save({
                First_Project_Id    : req.body.first_id     || project.get('First_Project_Id'),
                Project_Name        : req.body.project_name || project.get('Project_Name'),
                Sort                : req.body.sort         || project.get('Sort'),
                Release_Time        : Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "Modify Second Level Project Succed"
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
 *  Change Second Level Project Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ChangeStatus(req, res) {

    SecondProject.forge({id: req.params.id})
        .fetch({require: true})
        .then(project => project.save({
                Status : !project.get('Status')
            })
                .then(() => res.json({
                        error   : false,
                        message : "Change Status Succed"
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
 * Get All First Level Projects
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetProjects(req, res) {
    SecondProject.forge()
        .fetchAll()
        .then(project => res.json({
                error: false,
                projects: project.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete Second Level Project by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteProject(req, res) {
    SecondProject.forge({id: req.params.id})
        .fetch({require: true})
        .then(project => project.destroy()
            .then(() => res.json({
                    error: false,
                    data: {message: 'Delete Second Level Project Succed.'}
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
