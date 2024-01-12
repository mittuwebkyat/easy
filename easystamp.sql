-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 09, 2024 at 11:15 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `easystamp`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` bigint(20) NOT NULL,
  `image` text NOT NULL,
  `url` varchar(150) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `collection`
--

CREATE TABLE `collection` (
  `collection_id` bigint(20) NOT NULL,
  `collection_name` varchar(200) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `collection`
--

INSERT INTO `collection` (`collection_id`, `collection_name`, `date`, `status`) VALUES
(1, 'Trodat Flashy', '2023-12-29', 1),
(2, 'Sun Stamper', '2023-12-29', 1);

-- --------------------------------------------------------

--
-- Table structure for table `collection_product`
--

CREATE TABLE `collection_product` (
  `collection_product_id` bigint(20) NOT NULL,
  `product_id` int(11) NOT NULL,
  `collection_id` bigint(20) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `collection_product`
--

INSERT INTO `collection_product` (`collection_product_id`, `product_id`, `collection_id`, `status`) VALUES
(1, 3, 1, 1),
(2, 4, 1, 1),
(3, 5, 1, 1),
(4, 2, 1, 1),
(5, 9, 1, 1),
(6, 10, 1, 1),
(7, 11, 1, 1),
(8, 12, 1, 1),
(9, 13, 1, 1),
(10, 14, 1, 1),
(11, 15, 1, 1),
(12, 16, 1, 1),
(13, 18, 1, 1),
(14, 19, 1, 1),
(15, 6, 2, 1),
(16, 7, 2, 1),
(17, 8, 2, 1),
(18, 17, 2, 1),
(19, 20, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

CREATE TABLE `tbl_category` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `date` varchar(200) NOT NULL,
  `time` varchar(200) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`id`, `name`, `date`, `time`, `status`) VALUES
(1, 'ddd', '29-12-2023', '02:26 pm', 1),
(2, ' Stamp', '29-12-2023', '03:10 pm', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_login`
--

CREATE TABLE `tbl_login` (
  `login_id` bigint(20) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_login`
--

INSERT INTO `tbl_login` (`login_id`, `username`, `password`, `status`) VALUES
(1, 'admin', '827ccb0eea8a706c4c34a16891f84e7b', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product`
--

CREATE TABLE `tbl_product` (
  `id` bigint(20) NOT NULL,
  `category_id` int(11) NOT NULL,
  `sub_cat_id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` varchar(200) NOT NULL,
  `discount_price` int(11) NOT NULL,
  `weight` varchar(100) NOT NULL,
  `discription` text NOT NULL,
  `size` longtext NOT NULL,
  `date` varchar(200) NOT NULL,
  `time` varchar(200) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_product`
--

INSERT INTO `tbl_product` (`id`, `category_id`, `sub_cat_id`, `name`, `price`, `discount_price`, `weight`, `discription`, `size`, `date`, `time`, `status`) VALUES
(1, 2, 0, 'Sun Stamper', '500', 450, '0', 'Proin ultrices eleifend nibh, in bibendum augue congue id. Nunc ex felis, gravida sit amet metus a, tempor euismod orci.', '', '29-12-2023', '04:03 pm', 0),
(3, 2, 8, ' Trodat Flashy 6330  ', '480', 420, '0', 'Duis euismod cursus nibh in semper. Sed eu enim lorem. Donec tempor porta nulla sit amet auctor. Pellentesque vel condimentum purus. Duis in consequat justo.', '10*10,20*20', '29-12-2023', '04:22 pm', 1),
(4, 2, 8, 'Trodat Flashy 6330 (pocket type) ', '430', 380, '1', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Donec eu erat vel enim hendrerit mattis nec ut lacus. Aenean eu orci ut justo fermentum mattis. Etiam est tortor, blandit id pellentesque quis, pulvinar eget leo.&nbsp;</span><br></div>', '', '29-12-2023', '04:26 pm', 1),
(5, 2, 8, 'Trodat flashy 6340', '700', 450, '1', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Duis euismod cursus nibh in semper. Sed eu enim lorem. Donec tempor porta nulla sit amet auctor. Pellentesque vel condimentum purus. Duis in consequat justo. Suspendisse porta erat enim, sed laoreet nibh porttitor eu. Morbi id interdum metus. Duis leo metus, consequat ac fermentum ut, porttitor ut neque.</span><br></div>', '', '29-12-2023', '04:31 pm', 1),
(2, 2, 7, 'Trodat Flashy 6907 ', '780', 550, '0', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Proin ultrices eleifend nibh, in bibendum augue congue id. Nunc ex felis, gravida sit amet metus a, tempor euismod orci.</span><br></div>', '', '29-12-2023', '04:09 pm', 1),
(6, 2, 8, 'Sun Stamper Q (pocket type)', '460', 400, '3', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">&nbsp;Nunc ex felis, gravida sit amet metus a, tempor euismod orci. Maecenas sit amet commodo mauris. Aenean aliquet feugiat enim et imperdiet.</span><br></div>', '', '29-12-2023', '04:34 pm', 1),
(7, 2, 8, ' Sun stamper S', '640', 600, '2', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Proin id lacus nisl. Praesent dictum risus nec sapien porta semper quis in eros. Vestibulum eu tincidunt felis, nec vulputate arcu. Praesent at erat dui. Vivamus lobortis sodales mi ut condimentum. Aenean id tellus mattis, vehicula diam fringilla, convallis urna. Maecenas ut diam mi. Pellentesque mauris odio, congue at tempor ac, aliquet quis leo. Mauris posuere orci id quam posuere, id feugiat arcu porta. Phasellus eros nisi, aliquet sit amet mauris in, elementum congue dolor.</span><br></div>', '', '29-12-2023', '04:38 pm', 1),
(8, 2, 8, 'Sun stamper Z ', '725', 650, '1', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">&nbsp;Aenean aliquet feugiat enim et imperdiet. Nunc dictum enim nec arcu pharetra tempor. Vestibulum ut mi ac nunc viverra molestie sit amet nec diam. Praesent at dolor lectus. Aliquam erat volutpat. Donec iaculis tristique imperdiet. Mauris rhoncus odio euismod metus sagittis, sed ultrices sapien auctor. Vestibulum congue, dolor ut cursus ornare, sem erat finibus elit, id vulputate tellus tellus nec arcu. In sit amet tincidunt mauris.</span><br></div>', '', '29-12-2023', '04:40 pm', 1),
(9, 2, 7, ' Trodat Flashy 6900 ', '360', 300, '0', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">&nbsp;Suspendisse porta erat enim, sed laoreet nibh porttitor eu. Morbi id interdum metus. Duis leo metus, consequat ac fermentum ut, porttitor ut neque.</span><br></div>', '', '29-12-2023', '04:43 pm', 1),
(10, 2, 7, 'Trodat Flashy 6901', '390', 320, '1', '<div>&nbsp;Vivamus lobortis sodales mi ut condimentum. Aenean id tellus mattis, vehicula diam fringilla, convallis urna. Maecenas ut diam mi. Pellentesque mauris odio, congue at tempor ac, aliquet quis leo. Mauris posuere orci id quam posuere, id feugiat arcu porta. Phasellus eros nisi, aliquet sit amet mauris in, elementum congue dolor.Donec eu erat vel enim hendrerit mattis nec ut lacus. Aenean eu orci ut justo fermentum mattis. Etiam est tortor, blandit id pellentesque quis, pulvinar eget leo. Cras porta ornare erat. Etiam placerat tincidunt sagittis. Aenean quam diam, tempus a interdum at, ullamcorper congue justo. Aliquam efficitur finibus libero, ut dictum elit.</div>', '', '29-12-2023', '04:46 pm', 1),
(11, 2, 7, 'Trodat Flashy 6903 ', '510', 420, '1', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Duis euismod cursus nibh in semper. Sed eu enim lorem. Donec tempor porta nulla sit amet auctor. Pellentesque vel condimentum purus. Duis in consequat justo. Suspendisse porta erat enim, sed laoreet nibh porttitor eu. Morbi id interdum metus. Duis leo metus, consequat ac fermentum ut, porttitor ut neque.</span><br></div>', '', '29-12-2023', '04:48 pm', 1),
(12, 2, 7, 'Trodat Flashy 6906', '720', 550, '1', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Proin ultrices eleifend nibh, in bibendum augue congue id. Nunc ex felis, gravida sit amet metus a, tempor euismod orci. Maecenas sit amet commodo mauris. Aenean aliquet feugiat enim et imperdiet. Nunc dictum enim nec arcu pharetra tempor. Vestibulum ut mi ac nunc viverra molestie sit amet nec diam. Praesent at dolor lectus. Aliquam erat volutpat. Donec iaculis tristique imperdiet. Mauris rhoncus odio euismod metus sagittis, sed ultrices sapien auctor. Vestibulum congue, dolor ut cursus ornare, sem erat finibus elit, id vulputate tellus tellus nec arcu. In sit amet tincidunt mauris.</span><br></div>', '', '29-12-2023', '04:52 pm', 1),
(13, 2, 7, 'Trodat Flashy 6902', '500', 450, '1', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Proin ultrices eleifend nibh, in bibendum augue congue id. Nunc ex felis, gravida sit amet metus a, tempor euismod orci. Maecenas sit amet commodo mauris. Aenean aliquet feugiat enim et imperdiet. Nunc dictum enim nec arcu pharetra tempor. Vestibulum ut mi ac nunc viverra molestie sit amet nec diam. Praesent at dolor lectus. Aliquam erat volutpat. Donec iaculis tristique imperdiet. Mauris rhoncus odio euismod metus sagittis, sed ultrices sapien auctor. Vestibulum congue, dolor ut cursus ornare, sem erat finibus elit, id vulputate tellus tellus nec arcu. In sit amet tincidunt mauris.</span><br></div>', '', '29-12-2023', '04:58 pm', 1),
(14, 2, 7, 'Trodat Flashy 6905', '600', 450, '1', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Duis euismod cursus nibh in semper. Sed eu enim lorem. Donec tempor porta nulla sit amet auctor. Pellentesque vel condimentum purus. Duis in consequat justo. Suspendisse porta erat enim, sed laoreet nibh porttitor eu. Morbi id interdum metus. Duis leo metus, consequat ac fermentum ut, porttitor ut neque.</span><br></div>', '', '29-12-2023', '05:01 pm', 1),
(15, 2, 7, 'Trodat Flashy 6904', '600', 520, '-2', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat justo consequat orci finibus, pretium convallis dolor aliquam. Proin vitae est sem. Pellentesque accumsan auctor pretium. Nam a convallis augue. Curabitur at facilisis enim, id commodo erat. Aenean dictum vehicula nulla quis laoreet. Pellentesque accumsan nulla porta ante rutrum aliquam. Quisque blandit arcu a justo lobortis faucibus. Quisque arcu tortor, rutrum nec odio sit amet, ultrices sollicitudin mauris.</span><br></div>', '', '29-12-2023', '05:04 pm', 1),
(16, 2, 7, ' Trodat Flashy 6907 ', '780', 550, '1', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat justo consequat orci finibus, pretium convallis dolor aliquam. Proin vitae est sem. Pellentesque accumsan auctor pretium. Nam a convallis augue. Curabitur at facilisis enim, id commodo erat. Aenean dictum vehicula nulla quis laoreet. Pellentesque accumsan nulla porta ante rutrum aliquam. Quisque blandit arcu a justo lobortis faucibus. Quisque arcu tortor, rutrum nec odio sit amet, ultrices sollicitudin mauris.</span><br></div>', '', '29-12-2023', '05:06 pm', 1),
(17, 2, 7, ' Sun Stamp V ', '745', 650, '1', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat justo consequat orci finibus, pretium convallis dolor aliquam. Proin vitae est sem. Pellentesque accumsan auctor pretium. Nam a convallis augue. Curabitur at facilisis enim, id commodo erat. Aenean dictum vehicula nulla quis laoreet. Pellentesque accumsan nulla porta ante rutrum aliquam. Quisque blandit arcu a justo lobortis faucibus. Quisque arcu tortor, rutrum nec odio sit amet, ultrices sollicitudin mauris.</span><br></div>', '', '29-12-2023', '05:08 pm', 1),
(18, 2, 10, ' Trodat Flashy 6906', '720', 500, '1', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat justo consequat orci finibus, pretium convallis dolor aliquam. Proin vitae est sem. Pellentesque accumsan auctor pretium. Nam a convallis augue. Curabitur at facilisis enim, id commodo erat. Aenean dictum vehicula nulla quis laoreet. Pellentesque accumsan nulla porta ante rutrum aliquam. Quisque blandit arcu a justo lobortis faucibus. Quisque arcu tortor, rutrum nec odio sit amet, ultrices sollicitudin mauris.</span><br></div>', '', '29-12-2023', '05:10 pm', 1),
(19, 2, 10, 'Trodat Flashy 6907', '780', 550, '1', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat justo consequat orci finibus, pretium convallis dolor aliquam. Proin vitae est sem. Pellentesque accumsan auctor pretium. Nam a convallis augue. Curabitur at facilisis enim, id commodo erat. Aenean dictum vehicula nulla quis laoreet. Pellentesque accumsan nulla porta ante rutrum aliquam. Quisque blandit arcu a justo lobortis faucibus. Quisque arcu tortor, rutrum nec odio sit amet, ultrices sollicitudin mauris.</span><br></div>', '', '29-12-2023', '05:13 pm', 1),
(20, 2, 10, 'Sun Stamp V', '745', 650, '1', '<div><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat justo consequat orci finibus, pretium convallis dolor aliquam. Proin vitae est sem. Pellentesque accumsan auctor pretium. Nam a convallis augue. Curabitur at facilisis enim, id commodo erat. Aenean dictum vehicula nulla quis laoreet. Pellentesque accumsan nulla porta ante rutrum aliquam. Quisque blandit arcu a justo lobortis faucibus. Quisque arcu tortor, rutrum nec odio sit amet, ultrices sollicitudin mauris.</span><br></div>', '', '29-12-2023', '05:14 pm', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_images`
--

CREATE TABLE `tbl_product_images` (
  `id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `file_name` text NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_product_images`
--

INSERT INTO `tbl_product_images` (`id`, `product_id`, `file_name`, `status`) VALUES
(1, 1, 'DSC_0428-web.jpg', 0),
(2, 2, 'DSC_0657-web.jpg', 1),
(3, 3, 'DSC_0657-web.jpg', 1),
(4, 3, 'DSC_0694.jpg', 1),
(5, 3, 'DSC_0702.jpg', 0),
(6, 2, 'DSC_0657-web.jpg', 0),
(7, 2, 'DSC_0702.jpg', 0),
(8, 2, 'DSC_0694.jpg', 0),
(9, 4, 'Trodat Flashy 6330 (pocket type) 2.jpg', 1),
(10, 4, 'Trodat Flashy 6330 (pocket type) 3.jpg', 1),
(11, 4, 'Trodat Flashy 6330 (pocket type).jpg', 1),
(12, 5, 'Trodat flashy 6340 1.jpeg', 1),
(13, 5, 'Trodat flashy 6340 2.jpg', 1),
(14, 5, 'Trodat flashy 6340.jpg', 1),
(15, 6, 'sunstamp q pocket 1.jpeg', 1),
(16, 6, 'sunstamp q pocket 2.jpg', 1),
(17, 6, 'sunstamp q pocket 3.jpg', 1),
(18, 7, 'Sun stamper S  1.jpeg', 1),
(19, 7, 'Sun stamper S  2.jpg', 1),
(20, 7, 'Sun stamper S 3.jpg', 1),
(21, 8, 'Sun stamper Z 1.jpg', 1),
(22, 8, 'Sun stamper Z 2.jpg', 1),
(23, 8, 'Sun stamper Z 3.jpg', 1),
(24, 9, 'Trodat Flashy 6900  3.jpg', 1),
(25, 9, 'Trodat Flashy 6900 1.jpg', 1),
(26, 9, 'Trodat Flashy 6900 2.jpg', 1),
(27, 10, 'Trodat Flashy 6901 1.jpg', 1),
(28, 10, 'Trodat Flashy 6901 2.jpg', 1),
(29, 10, 'Trodat Flashy 6901 3.jpg', 1),
(30, 11, 'Trodat Flashy 6903 1.jpg', 1),
(31, 11, 'Trodat Flashy 6903 2.jpg', 1),
(32, 11, 'Trodat Flashy 6903 3.jpg', 1),
(33, 12, 'Trodat Flashy 6906 1.jpg', 1),
(34, 12, 'Trodat Flashy 6906 2.jpg', 1),
(35, 12, 'Trodat Flashy 6906 3.jpg', 1),
(36, 13, 'Trodat Flashy 6902 1.jpg', 1),
(37, 13, 'Trodat Flashy 6902 2.jpg', 1),
(38, 13, 'Trodat Flashy 6902 3.jpg', 1),
(39, 14, 'Trodat Flashy 6905 1.jpg', 1),
(40, 14, 'Trodat Flashy 6905 2.jpg', 1),
(41, 14, 'Trodat Flashy 6905 3.jpg', 1),
(42, 15, 'Trodat Flashy 6904 1.jpg', 1),
(43, 15, 'Trodat Flashy 6904 2.jpg', 1),
(44, 15, 'Trodat Flashy 6904 3.jpg', 1),
(45, 16, 'Trodat Flashy 6907 1.jpg', 1),
(46, 16, 'Trodat Flashy 6907 2.jpg', 1),
(47, 16, 'Trodat Flashy 6907 3.jpg', 1),
(48, 17, 'Sun Stamp V  1.jpg', 1),
(49, 17, 'Sun Stamp V  2.jpg', 1),
(50, 17, 'Sun Stamp V  3.jpg', 1),
(51, 18, 'Trodat Flashy 6906 1.jpg', 1),
(52, 18, 'Trodat Flashy 6906 2.jpg', 1),
(53, 18, 'Trodat Flashy 6906 3.jpg', 1),
(54, 19, 'Trodat Flashy 6907 1.jpg', 1),
(55, 19, 'Trodat Flashy 6907 2.jpg', 1),
(56, 19, 'Trodat Flashy 6907 3.jpg', 1),
(57, 20, 'Sun Stamp V  1.jpg', 1),
(58, 20, 'Sun Stamp V  2.jpg', 1),
(59, 20, 'Sun Stamp V  3.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sub_category`
--

CREATE TABLE `tbl_sub_category` (
  `id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `file_name` varchar(200) NOT NULL,
  `date` varchar(200) NOT NULL,
  `time` varchar(200) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_sub_category`
--

INSERT INTO `tbl_sub_category` (`id`, `category_id`, `name`, `file_name`, `date`, `time`, `status`) VALUES
(1, 1, 'cdsaa', 'travinno-logo.png', '29-12-2023', '02:27 pm', 0),
(2, 1, 'cdsaa', 'Rectangle_3872-removebg-preview.png', '29-12-2023', '02:28 pm', 0),
(3, 1, 'cdsaa', 'Relit Health Care Logo.jpeg', '29-12-2023', '02:28 pm', 0),
(4, 1, 'Sarath', 'Relit Health Care Logo.jpeg', '29-12-2023', '02:28 pm', 0),
(5, 2, 'Wax Seal Stamp', 'wax-seal-stamp.jpg', '29-12-2023', '03:55 pm', 0),
(6, 2, 'Wax Seal Stamp', 'wax-seal-stamp.jpg', '29-12-2023', '03:55 pm', 0),
(7, 2, 'Rectangle', 'DSC_0428-web.jpg', '29-12-2023', '04:01 pm', 1),
(8, 2, 'Square/Round', 'DSC_0428-web.jpg', '29-12-2023', '04:12 pm', 1),
(9, 0, 'OVAL', 'DSC_0562-web.jpg', '29-12-2023', '04:15 pm', 0),
(10, 2, 'Oval', 'DSC_0562-web.jpg', '29-12-2023', '04:17 pm', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`collection_id`);

--
-- Indexes for table `collection_product`
--
ALTER TABLE `collection_product`
  ADD PRIMARY KEY (`collection_product_id`);

--
-- Indexes for table `tbl_category`
--
ALTER TABLE `tbl_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_login`
--
ALTER TABLE `tbl_login`
  ADD PRIMARY KEY (`login_id`);

--
-- Indexes for table `tbl_product`
--
ALTER TABLE `tbl_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_product_images`
--
ALTER TABLE `tbl_product_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sub_category`
--
ALTER TABLE `tbl_sub_category`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `collection`
--
ALTER TABLE `collection`
  MODIFY `collection_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `collection_product`
--
ALTER TABLE `collection_product`
  MODIFY `collection_product_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_login`
--
ALTER TABLE `tbl_login`
  MODIFY `login_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_product`
--
ALTER TABLE `tbl_product`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tbl_product_images`
--
ALTER TABLE `tbl_product_images`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `tbl_sub_category`
--
ALTER TABLE `tbl_sub_category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
