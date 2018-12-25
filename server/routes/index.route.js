import express 					from 'express';
import authRoutes 				from './auth.route';
import userRoutes 				from './user.route';
import bannerRoutes 			from './banner.route';
import firstLevelProjectRoutes 	from './first_level_project.route';
import secondLevelProjectRoutes from './second_level_project.route';
import thirdLevelProjectRoutes  from './third_level_project.route';
import doctorTitleRoutes		from './doctor_title.route';
import doctorRoutes 			from './doctor.route';
import nationRoutes 			from './nation.route';
import hospitalRoutes 			from './hospital.route';

const router = express.Router();

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/users', userRoutes);

// mount banner routes at /banner
router.use('/banner', bannerRoutes);

//mount First Level Project at /first_level_project
router.use('/first_level_project', firstLevelProjectRoutes);

//mount Second Level Project at /second_level_project
router.use('/second_level_project', secondLevelProjectRoutes);

//mount Third Level Project at /third_level_project
router.use('/third_level_project', thirdLevelProjectRoutes);

//mount Doctor Title at /doctor_title
router.use('/doctor_title', doctorTitleRoutes);

//mount Doctor at /doctor
router.use('/doctor', doctorRoutes);

//mount Nation at /nation
router.use('/nation', nationRoutes);

//mount Hospital at /hospital
router.use('/hospital', hospitalRoutes);
export default router;