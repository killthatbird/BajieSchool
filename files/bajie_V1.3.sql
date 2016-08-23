/*
Navicat MySQL Data Transfer

Source Server         : BajieSchool
Source Server Version : 50632
Source Host           : localhost:3306
Source Database       : bajie

Target Server Type    : MYSQL
Target Server Version : 50632
File Encoding         : 65001

Date: 2016-08-23 10:13:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity` (
  `act_id` varchar(12) NOT NULL,
  `act_type` varchar(2) DEFAULT NULL,
  `act_title` varchar(100) NOT NULL,
  `act_content` varchar(255) DEFAULT NULL,
  `act_img` varchar(100) DEFAULT NULL,
  `act_time` datetime DEFAULT NULL,
  `act_like` int(5) DEFAULT NULL,
  `act_comment` int(5) DEFAULT NULL,
  `act_follow` int(5) DEFAULT NULL,
  `act_join` int(5) DEFAULT NULL,
  `act_signup` int(5) DEFAULT NULL,
  `act_place` varchar(255) DEFAULT NULL,
  `reserve1` varchar(255) DEFAULT NULL,
  `reserve2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`act_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES ('10000', '0', '周杰伦演唱会', '8月17日，周杰伦将在武汉光谷广场举办演唱会', 'img/activity/act/周杰伦.jpg', '2016-08-16 14:49:44', '520', '2465', '249', '125', '154', '湖北武汉', null, null);

-- ----------------------------
-- Table structure for activity_comment
-- ----------------------------
DROP TABLE IF EXISTS `activity_comment`;
CREATE TABLE `activity_comment` (
  `act_com_id` varchar(12) NOT NULL,
  `username` varchar(16) NOT NULL,
  `act_com_content` varchar(255) DEFAULT NULL,
  `act-com_time` datetime DEFAULT NULL,
  `act_com_like` int(5) DEFAULT NULL,
  PRIMARY KEY (`act_com_id`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of activity_comment
-- ----------------------------

-- ----------------------------
-- Table structure for activity_comment-comment
-- ----------------------------
DROP TABLE IF EXISTS `activity_comment-comment`;
CREATE TABLE `activity_comment-comment` (
  `a_c_c_id` varchar(12) NOT NULL COMMENT '评论ID',
  `act_com_id` varchar(12) NOT NULL COMMENT '原评论ID',
  `username` varchar(16) NOT NULL COMMENT '评论用户',
  `a_c_c_content` varchar(255) DEFAULT NULL COMMENT '评论内容',
  `a_c_c_time` datetime DEFAULT NULL COMMENT '评论时间',
  PRIMARY KEY (`a_c_c_id`,`act_com_id`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of activity_comment-comment
-- ----------------------------

-- ----------------------------
-- Table structure for activity_type
-- ----------------------------
DROP TABLE IF EXISTS `activity_type`;
CREATE TABLE `activity_type` (
  `act_type_id` varchar(2) NOT NULL,
  `act_type_name` varchar(20) NOT NULL,
  PRIMARY KEY (`act_type_id`,`act_type_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of activity_type
-- ----------------------------
INSERT INTO `activity_type` VALUES ('0', '推荐');
INSERT INTO `activity_type` VALUES ('1', '旅游');
INSERT INTO `activity_type` VALUES ('2', '高校');
INSERT INTO `activity_type` VALUES ('3', '明星');
INSERT INTO `activity_type` VALUES ('4', '电影');
INSERT INTO `activity_type` VALUES ('5', '音乐');
INSERT INTO `activity_type` VALUES ('6', '体育');
INSERT INTO `activity_type` VALUES ('7', '恋爱');

-- ----------------------------
-- Table structure for agenda
-- ----------------------------
DROP TABLE IF EXISTS `agenda`;
CREATE TABLE `agenda` (
  `ag_id` varchar(12) NOT NULL COMMENT '日程ID',
  `username` varchar(16) NOT NULL COMMENT '用户名',
  `ag_title` varchar(50) NOT NULL COMMENT '日程标题',
  `ag_remark` varchar(50) DEFAULT NULL COMMENT '日程备注',
  `ag_time` datetime NOT NULL COMMENT '开始时间',
  `ag_remind` datetime DEFAULT NULL COMMENT '提醒时间',
  PRIMARY KEY (`ag_id`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of agenda
-- ----------------------------

-- ----------------------------
-- Table structure for answer
-- ----------------------------
DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer` (
  `ans_id` varchar(12) NOT NULL COMMENT '答案ID',
  `que_id` varchar(12) NOT NULL COMMENT '问题ID',
  `ans_content` varchar(255) DEFAULT NULL COMMENT '答案内容',
  `username` varchar(16) NOT NULL COMMENT '答主用户名',
  `ans_like` int(5) DEFAULT NULL COMMENT '赞同',
  `ans_comment` int(5) DEFAULT NULL COMMENT '评论',
  `ans_time` datetime DEFAULT NULL COMMENT '回答时间',
  PRIMARY KEY (`ans_id`,`que_id`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of answer
-- ----------------------------

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection` (
  `username` varchar(16) DEFAULT NULL COMMENT '用户名',
  `type` varchar(20) DEFAULT NULL COMMENT '收藏对象类型',
  `id` varchar(12) DEFAULT NULL COMMENT '收藏对象ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collection
-- ----------------------------

-- ----------------------------
-- Table structure for login_status
-- ----------------------------
DROP TABLE IF EXISTS `login_status`;
CREATE TABLE `login_status` (
  `username` varchar(16) NOT NULL,
  `status` int(1) NOT NULL,
  `logintime` datetime DEFAULT NULL,
  PRIMARY KEY (`username`,`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login_status
-- ----------------------------
INSERT INTO `login_status` VALUES ('admin', '1', '2016-08-23 09:54:55');

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
  `no_id` varchar(12) NOT NULL,
  `no_content` varchar(255) DEFAULT NULL,
  `type` char(1) DEFAULT NULL,
  `no_url` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`no_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notification
-- ----------------------------

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `que_id` varchar(12) NOT NULL COMMENT '问题ID',
  `que_title` varchar(100) NOT NULL COMMENT '问题标题',
  `que_tags` varchar(50) DEFAULT NULL COMMENT '问题标签',
  `que_content` varchar(255) DEFAULT NULL COMMENT '问题内容',
  `que_img` varchar(100) DEFAULT NULL COMMENT '图片',
  `que_like` int(5) DEFAULT NULL COMMENT '赞同数',
  `que_comment` int(5) DEFAULT NULL COMMENT '评论数',
  `que_time` datetime DEFAULT NULL,
  PRIMARY KEY (`que_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of question
-- ----------------------------

-- ----------------------------
-- Table structure for reminder
-- ----------------------------
DROP TABLE IF EXISTS `reminder`;
CREATE TABLE `reminder` (
  `r_option` varchar(20) NOT NULL,
  `r_value` int(2) NOT NULL,
  PRIMARY KEY (`r_option`,`r_value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of reminder
-- ----------------------------

-- ----------------------------
-- Table structure for setting
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting` (
  `username` varchar(16) NOT NULL,
  `is_update` char(1) DEFAULT NULL,
  `is_shareloc` char(1) DEFAULT NULL,
  `is_showimg` char(1) DEFAULT NULL,
  `reserve1` varchar(255) DEFAULT NULL,
  `reserve2` varchar(255) DEFAULT NULL,
  `reserve3` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of setting
-- ----------------------------

-- ----------------------------
-- Table structure for study
-- ----------------------------
DROP TABLE IF EXISTS `study`;
CREATE TABLE `study` (
  `std_id` varchar(12) NOT NULL,
  `type_id` varchar(2) DEFAULT NULL,
  `std_title` varchar(100) DEFAULT NULL,
  `std_content` varchar(255) DEFAULT NULL,
  `std_like` int(5) DEFAULT NULL,
  `std_comment` int(5) DEFAULT NULL,
  `std_time` datetime DEFAULT NULL,
  PRIMARY KEY (`std_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of study
-- ----------------------------

-- ----------------------------
-- Table structure for study_reply
-- ----------------------------
DROP TABLE IF EXISTS `study_reply`;
CREATE TABLE `study_reply` (
  `std_id` varchar(12) NOT NULL COMMENT '学习ID',
  `username` varchar(16) NOT NULL COMMENT '用户名',
  `std_re_content` varchar(255) DEFAULT NULL COMMENT '回复内容',
  `std_re_time` datetime DEFAULT NULL COMMENT '回复时间',
  `std_re_like` int(5) DEFAULT NULL COMMENT '赞同数',
  PRIMARY KEY (`std_id`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of study_reply
-- ----------------------------

-- ----------------------------
-- Table structure for study_type
-- ----------------------------
DROP TABLE IF EXISTS `study_type`;
CREATE TABLE `study_type` (
  `type_id` varchar(12) NOT NULL,
  `type_name` varchar(20) NOT NULL,
  PRIMARY KEY (`type_id`,`type_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of study_type
-- ----------------------------
INSERT INTO `study_type` VALUES ('500000', '推荐');
INSERT INTO `study_type` VALUES ('500001', '考研');
INSERT INTO `study_type` VALUES ('500002', '英语');
INSERT INTO `study_type` VALUES ('500003', '高数');
INSERT INTO `study_type` VALUES ('500004', '计算机二级');
INSERT INTO `study_type` VALUES ('500005', '财会');
INSERT INTO `study_type` VALUES ('500006', '生科');
INSERT INTO `study_type` VALUES ('500007', '机械');
INSERT INTO `study_type` VALUES ('500008', '土建');
INSERT INTO `study_type` VALUES ('500009', '经管');
INSERT INTO `study_type` VALUES ('500010', '考公');
INSERT INTO `study_type` VALUES ('500011', '四六级');

-- ----------------------------
-- Table structure for test_user
-- ----------------------------
DROP TABLE IF EXISTS `test_user`;
CREATE TABLE `test_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of test_user
-- ----------------------------
INSERT INTO `test_user` VALUES ('1', 'ewqe', 'ewq');

-- ----------------------------
-- Table structure for university
-- ----------------------------
DROP TABLE IF EXISTS `university`;
CREATE TABLE `university` (
  `univ_id` char(5) NOT NULL COMMENT '学校ID',
  `univ_name` varchar(50) NOT NULL COMMENT '学校名称',
  PRIMARY KEY (`univ_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of university
-- ----------------------------
INSERT INTO `university` VALUES ('10486', '武汉大学');
INSERT INTO `university` VALUES ('10500', '湖北工业大学');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(16) NOT NULL COMMENT '用户名',
  `no_id` varchar(12) DEFAULT NULL COMMENT '通知ID',
  `password` varchar(20) NOT NULL COMMENT '密码',
  `sex` char(4) DEFAULT NULL COMMENT '性别',
  `cellphone` char(11) NOT NULL COMMENT '手机号',
  `avatar` varchar(100) DEFAULT NULL COMMENT '头像',
  `university` char(5) NOT NULL COMMENT '大学',
  `institution` varchar(50) DEFAULT NULL COMMENT '学院',
  `enroll_year` char(4) NOT NULL COMMENT '入学年份',
  `level` char(1) DEFAULT NULL COMMENT '学位级别',
  `qq` varchar(10) DEFAULT NULL,
  `wechat` varchar(20) DEFAULT NULL,
  `weibo` varchar(50) DEFAULT NULL,
  `reserve1` varchar(255) DEFAULT NULL COMMENT '预留字段',
  `reserve2` varchar(255) DEFAULT NULL,
  `reserve3` varchar(255) DEFAULT NULL,
  `reserve4` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('admin', '1110831116', 'admin', '1', '13207145966', null, '10486', '信息管理学院', '2011', '1', '249048056', 'xulu0620', 'xldev', null, null, null, null);

-- ----------------------------
-- Table structure for user_activity
-- ----------------------------
DROP TABLE IF EXISTS `user_activity`;
CREATE TABLE `user_activity` (
  `username` varchar(16) NOT NULL COMMENT '用户名',
  `act_id` varchar(12) NOT NULL COMMENT '活动ID',
  `flag` char(1) DEFAULT NULL COMMENT '0——关注的活动；1——收藏的活动；2——参加的活动；3——报名的活动',
  PRIMARY KEY (`username`,`act_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_activity
-- ----------------------------
INSERT INTO `user_activity` VALUES ('admin', 'ua20000', '1');

-- ----------------------------
-- Table structure for user_study
-- ----------------------------
DROP TABLE IF EXISTS `user_study`;
CREATE TABLE `user_study` (
  `username` varchar(16) NOT NULL,
  `std_id` varchar(12) NOT NULL,
  `flag` char(1) DEFAULT NULL,
  PRIMARY KEY (`username`,`std_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_study
-- ----------------------------

-- ----------------------------
-- Table structure for user_studytype
-- ----------------------------
DROP TABLE IF EXISTS `user_studytype`;
CREATE TABLE `user_studytype` (
  `username` varchar(16) NOT NULL,
  `stu_type` varchar(12) NOT NULL,
  PRIMARY KEY (`username`,`stu_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_studytype
-- ----------------------------
INSERT INTO `user_studytype` VALUES ('admin', '50000');
INSERT INTO `user_studytype` VALUES ('admin', '50001');
INSERT INTO `user_studytype` VALUES ('admin', '50002');
INSERT INTO `user_studytype` VALUES ('admin', '50003');
INSERT INTO `user_studytype` VALUES ('admin', '50004');
INSERT INTO `user_studytype` VALUES ('admin', '50005');

-- ----------------------------
-- Table structure for visitor
-- ----------------------------
DROP TABLE IF EXISTS `visitor`;
CREATE TABLE `visitor` (
  `username` varchar(16) NOT NULL COMMENT '访客用户名',
  `date` datetime NOT NULL COMMENT '访问时间',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of visitor
-- ----------------------------
