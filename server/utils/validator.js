import Joi from 'joi';

export default {
    storeUser: {
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        }
    },

    updateUser: {
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        },
        params: {
            userId: Joi.string().hex().required()
        }
    },

    login: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required()
        }
    },

    Banner: {
        body: {
            id                  : Joi.number().required(),
            banner_title        : Joi.string().required(),
            url                 : Joi.number().required(),
            sort                : Joi.number().required()
        }
    },

    AddFirstLevelProject : {
        body: {
            project_name        : Joi.string().required(),
            sort                : Joi.number().required()
        }
    },

    ModifyFirstLevelProject : {
        body : {
            id                  : Joi.number().required(),
            project_name        : Joi.string().required(),
            sort                : Joi.number().required()   
        }
    },

    AddSecondLevelProject : {
        body : {
            first_id            : Joi.string().required(),
            project_name        : Joi.string().required(),
            sort                : Joi.number().required()
        }
    },

    ModifySecondLevelProject : {
        body : {
            id                  : Joi.number().required(),
            first_id            : Joi.string().required(),
            project_name        : Joi.string().required(),
            sort                : Joi.number().required()
        }
    },

    ThirdLevelProject : {
        body : {
            id                  : Joi.number().required(),
            first_id            : Joi.number().required(),
            second_id           : Joi.number().required(),
            project_name        : Joi.string().required(),
            project_alias       : Joi.string().required(),
            description         : Joi.string().required(),
            features            : Joi.string().required(),
            efficiency          : Joi.string().required(),
            proposed_price      : Joi.number().required(),
            time_period         : Joi.string().required(),
            aesthetic_standard  : Joi.string().required(),
            advantages          : Joi.string().required(),
            shortcoming         : Joi.string().required(),
            suitable            : Joi.string().required(),
            risk_warning        : Joi.string().required(),
            pre_precautions     : Joi.string().required(),
            care_considerations : Joi.string().required(),
            effects_treatment   : Joi.string().required(),
            sort                : Joi.number().required()
        }
    },

    DoctorTitle : {
        body : {
            doctor_title        : Joi.string().required(),
            sort                : Joi.number().required()
        }
    },

    ModifyDoctorTitle : {
        body : {
            id                  : Joi.number().required(),
            doctor_title        : Joi.string().required(),
            sort                : Joi.number().required()
        }
    }, 

    Doctor : {
        body : {
            id                  : Joi.number().required(),
            doctor_name         : Joi.string().required(),
            title_id            : Joi.number().required(),
            length              : Joi.number().required(),
            number              : Joi.string().required(),
            address             : Joi.number().required(),
            skills              : Joi.array().required(),
            profile             : Joi.string().required(),
            sort                : Joi.number().required()
        }
    },

    Hospital : {
        body : {
            id                  : Joi.number().required(),
            hospital_name       : Joi.string().required(),
            slogan              : Joi.string().required(),
            qualification       : Joi.string().required(),
            level               : Joi.number().required(),
            license             : Joi.string().required(),
            Address             : Joi.number().required(),
            introduction        : Joi.string().required(),
            sort                : Joi.number().required()
        }
    },

    Case : {
        body : {
            id                  : Joi.number().required(),
            hospital_id         : Joi.number().required(),
            title               : Joi.string().required(),
            time                : Joi.date().required(),
            doctor_id           : Joi.number().required(),
            introduction        : Joi.string().required(),
            sort                : Joi.number().required()
        }
    },

    RaiderCategory : {
        body : {
            category_name         : Joi.string().required(),
            sort                : Joi.number().required()
        }
    },

    ModifyRaiderCategory : {
        body : {
            id                  : Joi.number().required(),
            category_name       : Joi.string().required(),
            sort                : Joi.number().required
        }
    },

    Raider : {
        body : {
            id                  : Joi.number().required(),
            category_id         : Joi.number().required(),
            raider_title        : Joi.string().required(),
            raider_sec_title    : Joi.string().required(),
            content             : Joi.string().required(),
            sort                : Joi.string().required()
        }
    },

    KoreanMedicine : {
        body : {
            title               : Joi.string().required(),
            content             : Joi.string().required()
        }
    },
    
    Member : {
        body : {
            id                  : Joi.number().required(),
            member_name         : Joi.string().required(),
            position            : Joi.string().required(),
            profile             : Joi.string().required(),
            sort                : Joi.number().required()
        }
    },

    CheckId : {
        params : {
            id                  : Joi.number().required()
        }
    },

    CheckName : {
        params : {
            name                : Joi.string().required()
        }
    }
};