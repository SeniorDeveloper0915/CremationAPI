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
import caseRoutes 				from './case.route';
import raiderCategoryRoutes		from './raider_category.route';
import raiderRoutes 			from './raider.route';
import koreanRoutes 			from './korean.route';
import memberRoutes 			from './member.route';
import contactRoutes 			from './contact.route';
import copyrightRoutes 			from './copyright.route';
import helpcenterRoutes 		from './helpcenter.route';
import dynamicRoutes 			from './dynamic.route';
import industryRoutes 			from './industry.route';
import recruitmentRoutes 		from './recruitment.route';
import guideRoutes 				from './guide.route';
import productRoutes 			from './product.route';

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

//mount Case at /case
router.use('/case', caseRoutes);

//mount Raider_Category at /raider_category
router.use('/raider_category', raiderCategoryRoutes);

//mount Raider at /raider
router.use('/raider', raiderRoutes);

//mount Korean Medicine at /korean
router.use('/korean', koreanRoutes);

//mount Core Team /member
router.use('/member', memberRoutes);

//mount Contact Us /contact
router.use('/contact', contactRoutes);

//mount CopyRight /copyright
router.use('/copyright', copyrightRoutes);

//mount HelpCenter /helpcenter
router.use('/helpcenter', helpcenterRoutes);

//mount Dynamic /dynamic
router.use('/dynamic', dynamicRoutes);

//mount Industry Information /industry
router.use('/industry', industryRoutes);

//mount Recruitment /recruitment
router.use('/recruitment', recruitmentRoutes);

//mount Guide /guide
router.use('/guide', guideRoutes);

//mount Product /product
router.use('/product', productRoutes);

export default router;