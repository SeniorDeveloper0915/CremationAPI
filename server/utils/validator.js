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
            first_id            : Joi.number().required(),
            project_name        : Joi.string().required(),
            sort                : Joi.number().required()
        }
    },

    ModifySecondLevelProject : {
        body : {
            id                  : Joi.number().required(),
            first_id            : Joi.number().required(),
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
            address             : Joi.number().required(),
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
            category_name       : Joi.string().required(),
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
            sort                : Joi.number().required()
        }
    },

    KoreanMedicine : {
        body : {
            id                  : Joi.number().required(),
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

    ContactUs : {
        body : {
            id                  : Joi.number().required(),
            information         : Joi.string().required()
        }
    },
    
    CopyRight : {
        body : {
            id                  : Joi.number().required(),
            title               : Joi.string().required(),
            content             : Joi.string().required()
        }
    },
    
    HelpCenter : {
        body : {
            id                  : Joi.number().required(),
            title               : Joi.string().required(),
            content             : Joi.string().required()
        }
    },

    Dynamic : {
        body : {
            id                  : Joi.number().required(),
            dynamic_title       : Joi.string().required(),
            dynamic_subtitle    : Joi.string().required(),
            dynamic_content     : Joi.string().required(),
            sort                : Joi.string().required()
        }
    },

    Industry : {
        body : {
            id                  : Joi.number().required(),
            industry_title      : Joi.string().required(),
            industry_subtitle   : Joi.string().required(),
            industry_content    : Joi.string().required(),
            sort                : Joi.string().required()
        }
    },

    Recruitment : {
        body : {
            id                  : Joi.number().required(),
            link                : Joi.string().required()
        }
    },

    Guide : {
        body : {
            id                  : Joi.number().required(),
            page_title          : Joi.string().required(),
            url                 : Joi.string().required            
        }
    },

    Product : {
        body : {
            id                  : Joi.number().required(),
            product_title       : Joi.string().required(),
            origin_price        : Joi.number().required(),
            start_price         : Joi.number().required(),
            booking             : Joi.number().required(),
            first_project_id    : Joi.number().required(),
            second_project_id   : Joi.number().required(),
            third_project_id    : Joi.number().required(),
            price_description   : Joi.string().required(),
            details             : Joi.string().required()
        }
    },

    User : {
        body : {
            id                  : Joi.number().required(),
            userid              : Joi.string().required(),
            account             : Joi.string().required(),
            nickname            : Joi.string().required(),
            email               : Joi.string().required(),
            password            : Joi.string().required(),
            gender              : Joi.number().required(),
            birthday            : Joi.date().required(),
            area                : Joi.number().required()    
        }
    },

    Question : {
        body : {
            question_title      : Joi.string().required(),
            question_content    : Joi.string().required(),
            first_project_id    : Joi.number().required(),
            second_project_id   : Joi.number().required(),
            third_project_id    : Joi.number().required(),
            phonenumber         : Joi.string().required(),
            verification_code   : Joi.string().required()
        }
    },
    
    Answer : {
        body : {
            id                  : Joi.number().required(),
            doctor_id           : Joi.number().required(),
            answer_content      : Joi.string().required(),
        }
    },

    Notification : {
        body : {
            id                  : Joi.number().required(),
            title               : Joi.string().required(),
            notice              : Joi.string().required()
        }
    },

    Order : {
        body : {
            user_id             : Joi.string().required(),
            user_account        : Joi.string().required(),
            phonenumber         : Joi.string().required(),
            product_name        : Joi.string().required(),
            order_amount        : Joi.number().required(),
            order_status        : Joi.number().required()  
        }
    },

    RefundOrder : {
        body : {
            order_id            : Joi.number().required(),
            user_id             : Joi.string().required(),
            phonenumber         : Joi.string().required(),
            order_date          : Joi.date().required(),
            refund_reason       : Joi.string().required()
        }
    },

    RefundFail : {
        body : {
            order_id            : Joi.number().required(),
            user_id             : Joi.string().required(),
            phonenumber         : Joi.string().required(),
            order_date          : Joi.date().required(),
            refund_date         : Joi.date().required(),
            refund_reason       : Joi.string().required(),
            fail_reason         : Joi.string().required()   
        }
    },

    CheckId : {
        params : {
            id                  : Joi.number().required()
        }
    },

    CheckText : {
        body : {
            text                : Joi.string().required(),
            start               : Joi.number().required(),
            cnt                 : Joi.number().required()
        }
    },

    CheckName : {
        params : {
            name                : Joi.string().required()
        }
    }, 

    CheckUserID : {
        body : {
            userId              : Joi.string().required()
        }
    },

    CheckSkill : {
        body : {
            selection           : Joi.number().required(),
            id                  : Joi.number().required(),
        }
    },

    CheckPublicity : {
        params : {
            selection           : Joi.number().required(),
            id                  : Joi.number().required()
        }
    },

    CheckLoadMore : {
        body : {
            start               : Joi.number().required(),
            cnt                 : Joi.number().required()
        }
    },
    
    CheckFilter : {
        body : {
            first               : Joi.number().required(),
            second              : Joi.number().required(),
            third               : Joi.number().required(),
            title               : Joi.number().required(),
            start               : Joi.number().required(),
            cnt                 : Joi.number().required()
        }
    },

    CheckRelated : {
        body : {
            first               : Joi.number().required(),
            second              : Joi.number().required()
        }
    }
};