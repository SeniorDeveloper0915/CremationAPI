import HttpStatus               from 'http-status-codes';
import FirstProject             from '../models/first_level_project.model';
import SecondProject            from '../models/second_level_project.model';
import ThirdProject             from '../models/third_level_project.model';
import Product                  from '../models/product.model';
import formidable               from 'formidable';
import fs                       from 'fs';
import date                     from 'date-and-time';


/**
 * Add New First Level Project
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function AddProject(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    FirstProject.forge({
        Project_Name : req.body.project_name, Sort : req.body.sort, Release_Time : Release_Time
    }, {hasTimestamps: true}).save()
        .then(project => res.json({
                error   : false,
                message : "Save New First Level Project Succed!" 
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 *  Get firt level project by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetProjectById(req, res) {
    FirstProject.forge({id: req.params.id})
        .fetch()
        .then(project => {
            console.log(project.toJSON());
            if (!project) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, project: {}
                });
            }
            else {
                res.json({
                    error           : false,
                    project         : project.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Get second level project by first project id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetSecondProject(req, res) {
    FirstProject.forge({id: req.params.id})
        .fetch({withRelated: ['SecondProjects']})
        .then(project => {

            project.SecondProjects().fetch().then(function(projects) {
                console.log(projects);
                if (!projects) {                                                                                           
                    res.status(HttpStatus.NOT_FOUND).json({
                        error: true, project: {}
                    });
                }
                else {
                    res.json({
                        error           : false,
                        project         : projects.toJSON()
                    });
                }
            });
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Get third level project by first project id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetThirdProject(req, res) {
    FirstProject.forge({id: req.params.id})
        .fetch({withRelated: ['ThirdProjects']})
        .then(project => {

            project.ThirdProjects().fetch().then(function(projects) {
                console.log(projects);
                if (!projects) {                                                                                           
                    res.status(HttpStatus.NOT_FOUND).json({
                        error: true, project: {}
                    });
                }
                else {
                    res.json({
                        error           : false,
                        project         : projects.toJSON()
                    });
                }
            });
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Get questions by first project id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetQuestions(req, res) {
    FirstProject.forge({id: req.params.id})
        .fetch({withRelated: ['Questions']})
        .then(project => {

            project.Questions().fetch().then(function(questions) {
                console.log(questions);
                if (!questions) {                                                                                           
                    res.status(HttpStatus.NOT_FOUND).json({
                        error: true, questions: {}
                    });
                }
                else {
                    res.json({
                        error               : false,
                        questions           : questions.toJSON()
                    });
                }
            });
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Get products by first project id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetProduct(req, res) {
    FirstProject.forge({id: req.params.id})
        .fetch({withRelated: ['Products']})
        .then(project => {

            project.Products().fetch().then(function(products) {
                if (!products) {                                                                                           
                    res.status(HttpStatus.NOT_FOUND).json({
                        error: true, products: {}
                    });
                }
                else {
                    res.json({
                        error               : false,
                        products            : products.toJSON()
                    });
                }
            });
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Modify Frist Level Project
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ModifyProject(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    FirstProject.forge({id: req.body.id})
        .fetch({require: true})
        .then(project => project.save({
                Project_Name: req.body.project_name || project.get('Project_Name'),
                Sort        : req.body.sort         || project.get('Sort'),
                Release_Time: Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "Modify First Level Project Succed"
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
 *  Change First Level Project Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ChangeStatus(req, res) {

    FirstProject.forge({id: req.params.id})
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
    FirstProject.forge()
        .fetchAll({withRelated: ['SecondProjects', 'ThirdProjects', 'Products']})
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
 * Get All First Level Projects
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetMenu(req, res) {
    FirstProject.forge()
        .fetchAll({withRelated: ['SecondProjects', 'SecondProjects.ThirdProjects']})
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
 * Delete First Level Project by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteProject(req, res) {
    FirstProject.forge({id: req.params.id})
        .fetch()
        .then(project => {
            SecondProject.forge({First_Project_Id : req.params.id})
                    .fetch()
                    .then(project => {
                        if (project != null)
                            SecondProject.where('First_Project_Id', req.params.id)
                                            .destroy();
                    });
            ThirdProject.forge({First_Project_Id : req.params.id})
                    .fetch()
                    .then(project => {
                        if (project != null)
                        {
                            if (project != null) {
                                var length = project.toJSON().length;
                                for (var i = 0; i < length; i ++) {
                                    Doctor.forge({id : project.toJSON()[i].id})
                                        .fetch({require: true})
                                        .then(doctor => fs.unlinkSync(doctor.get('Before_Img')));
                                    Doctor.forge({id : project.toJSON()[i].id})
                                        .fetch({require: true})
                                        .then(doctor => fs.unlinkSync(doctor.get('Effect_Img')));
                                }
                                ThirdProject.where('First_Project_Id', req.params.id)
                                            .destroy();
                            }
                        }  
                    })
            Product.forge({First_Project_Id : req.params.id})
                    .fetchAll()
                    .then(product => {
                        if (product != null) {
                            Product.where('First_Project_Id', req.params.id)
                                    .destroy();
                        }
                    })
            if (project != null){
                FirstProject.where('id', req.params.id)
                            .destroy();
                res.json({
                    error   : false,
                    message : "Delete First Level Project Succed!"
                })
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}
