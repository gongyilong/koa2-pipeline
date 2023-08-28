const router = require('koa-router')();
const userController = require('../controller/user');
const serveController = require('../controller/serve');
const projectController = require('../controller/project');

// 用户信息restful
router.post('/api/v1/login', userController.login);
router.post('/api/v1/getUserByName', userController.getUserByName);
router.post('/api/v1/addUser', userController.addUser);
router.post('/api/v1/deleteUser', userController.deleteUser);
router.post('/api/v1/updateUser', userController.updateUser);
router.get('/api/v1/getAllUsers', userController.getAllUsers);
router.post('/api/v1/getUserById', userController.getUserById);

//地图服务restful（增删改查）
router.post('/api/v1/addServe', serveController.addServe);
router.post('/api/v1/deleteServe', serveController.deleteServe);
router.post('/api/v1/updateServe', serveController.updateServe);
router.get('/api/v1/getAllServes', serveController.getAllServes);
router.post('/api/v1/getServeById', serveController.getServeById);
router.post('/api/v1/getServeByType', serveController.getServeByType);

//项目档案管理（增删改查）
router.post('/api/v1/addProject', projectController.addProject);
router.post('/api/v1/deleteProject', projectController.deleteProject);
router.post('/api/v1/updateProject', projectController.updateProject);
router.get('/api/v1/getAllProjects', projectController.getAllProjects);
router.post('/api/v1/getProjectById', projectController.getProjectById);
router.post('/api/v1/getProjectByName', projectController.getProjectByName);

module.exports = router;