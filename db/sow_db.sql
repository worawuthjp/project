-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2021 at 06:27 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sow_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `empID` bigint(50) NOT NULL,
  `fname` varchar(75) NOT NULL,
  `lname` varchar(75) DEFAULT NULL,
  `preID` bigint(50) NOT NULL,
  `empCode` varchar(50) DEFAULT NULL,
  `farmID` bigint(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `pic_path` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`empID`, `fname`, `lname`, `preID`, `empCode`, `farmID`, `created_at`, `updated_at`, `pic_path`) VALUES
(1, 'Employee', 'Test', 1, 'TEST001', 1, '2021-02-18 06:47:50', '2021-02-18 06:47:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `farm`
--

CREATE TABLE `farm` (
  `farmID` bigint(50) NOT NULL,
  `farmname` varchar(100) NOT NULL,
  `lat` decimal(12,8) DEFAULT NULL,
  `lon` decimal(12,8) DEFAULT NULL,
  `ownerID` bigint(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `farm`
--

INSERT INTO `farm` (`farmID`, `farmname`, `lat`, `lon`, `ownerID`, `created_at`, `updated_at`) VALUES
(1, 'KU PROJECT FARM', NULL, NULL, 1, '2021-02-18 06:46:40', '2021-02-18 06:46:40');

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

CREATE TABLE `owner` (
  `ownerID` bigint(50) NOT NULL,
  `fname` varchar(75) NOT NULL,
  `lname` varchar(75) NOT NULL,
  `preID` bigint(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `owner`
--

INSERT INTO `owner` (`ownerID`, `fname`, `lname`, `preID`, `created_at`, `updated_at`) VALUES
(1, 'OWNER', 'TEST FARM', 1, '2021-02-18 06:46:22', '2021-02-18 06:46:22');

-- --------------------------------------------------------

--
-- Table structure for table `parent`
--

CREATE TABLE `parent` (
  `parentID` bigint(50) NOT NULL,
  `sowID` bigint(50) NOT NULL,
  `parent` bigint(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `posID` bigint(20) NOT NULL,
  `pos_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `farmID` bigint(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`posID`, `pos_name`, `created_at`, `updated_at`, `farmID`) VALUES
(1, 'ตำแน่ง test', '2021-03-06 09:34:17', '2021-03-06 09:34:17', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pos_emp`
--

CREATE TABLE `pos_emp` (
  `pos_emp_id` bigint(50) NOT NULL,
  `posID` bigint(50) NOT NULL,
  `empID` bigint(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pos_emp`
--

INSERT INTO `pos_emp` (`pos_emp_id`, `posID`, `empID`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2021-03-06 09:34:39', '2021-03-06 09:34:39');

-- --------------------------------------------------------

--
-- Table structure for table `prename`
--

CREATE TABLE `prename` (
  `preID` bigint(50) NOT NULL,
  `prename` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prename`
--

INSERT INTO `prename` (`preID`, `prename`, `created_at`, `updated_at`) VALUES
(1, 'นาย', '2021-02-18 06:45:13', '2021-02-18 06:45:13'),
(2, 'นางสาว', '2021-02-18 06:45:13', '2021-02-18 06:45:13'),
(3, 'นาง', '2021-02-18 06:45:25', '2021-02-18 06:45:25');

-- --------------------------------------------------------

--
-- Table structure for table `sow`
--

CREATE TABLE `sow` (
  `sowID` bigint(50) NOT NULL,
  `sowCode` bigint(50) NOT NULL,
  `farmID` bigint(50) NOT NULL,
  `recType` varchar(10) NOT NULL,
  `birthDate` date DEFAULT NULL,
  `breed` varchar(10) NOT NULL,
  `origin` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sow`
--

INSERT INTO `sow` (`sowID`, `sowCode`, `farmID`, `recType`, `birthDate`, `breed`, `origin`, `created_at`, `updated_at`) VALUES
(1, 1111, 1, 'S', NULL, 'ly', NULL, '2021-02-25 08:17:02', '2021-02-25 08:17:02'),
(2, 1112, 1, 'S', NULL, 'ly', NULL, '2021-02-25 08:17:41', '2021-02-25 08:17:41'),
(3, 1113, 1, 'S', NULL, 'ly', NULL, '2021-02-25 08:17:58', '2021-02-25 08:17:58'),
(4, 1114, 1, 'S', NULL, 'ly', NULL, '2021-02-25 08:18:08', '2021-02-25 08:18:08'),
(5, 1115, 1, 'S', NULL, 'ly', NULL, '2021-02-25 08:18:30', '2021-02-25 08:18:30'),
(6, 1116, 1, 'S', NULL, 'ly', NULL, '2021-02-25 08:19:33', '2021-02-25 08:19:33');

-- --------------------------------------------------------

--
-- Table structure for table `sowbirth`
--

CREATE TABLE `sowbirth` (
  `sowBirthID` bigint(50) NOT NULL,
  `sowID` bigint(50) NOT NULL,
  `alive` int(11) NOT NULL,
  `died` int(11) NOT NULL,
  `mummy` int(11) NOT NULL,
  `total_weight` decimal(10,2) NOT NULL,
  `empID` bigint(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sowblock`
--

CREATE TABLE `sowblock` (
  `sowBlockID` bigint(50) NOT NULL,
  `sowID` bigint(50) NOT NULL,
  `unit_block_id` bigint(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sowblock`
--

INSERT INTO `sowblock` (`sowBlockID`, `sowID`, `unit_block_id`, `created_at`, `updated_at`, `status`) VALUES
(1, 1, 1, '2021-02-25 08:22:30', '2021-02-25 08:22:30', 0),
(2, 2, 2, '2021-02-25 08:22:47', '2021-02-25 08:22:47', 1),
(3, 3, 1, '2021-02-27 08:22:50', '2021-02-27 08:22:50', 1),
(4, 4, 3, '2021-02-27 08:22:50', '2021-02-27 08:22:50', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sowmating`
--

CREATE TABLE `sowmating` (
  `sowMatingID` bigint(50) NOT NULL,
  `sowSemenID` bigint(50) NOT NULL,
  `sowID` bigint(50) NOT NULL,
  `empID` bigint(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sowparty`
--

CREATE TABLE `sowparty` (
  `sowPartyID` bigint(50) NOT NULL,
  `from_sow_id` bigint(50) NOT NULL,
  `sowID` bigint(50) NOT NULL,
  `empID` bigint(50) NOT NULL,
  `num` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sowsemen`
--

CREATE TABLE `sowsemen` (
  `sowSemenID` bigint(50) NOT NULL,
  `sowID` bigint(50) NOT NULL,
  `empID` bigint(50) NOT NULL,
  `SemenBarcode` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sowvaccine`
--

CREATE TABLE `sowvaccine` (
  `sowVaccineID` bigint(50) NOT NULL,
  `sowID` bigint(50) NOT NULL,
  `vaccineID` bigint(50) NOT NULL,
  `empID` bigint(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

CREATE TABLE `unit` (
  `unitID` bigint(50) NOT NULL,
  `unitName` varchar(50) NOT NULL,
  `farmID` bigint(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `unit`
--

INSERT INTO `unit` (`unitID`, `unitName`, `farmID`, `created_at`, `updated_at`) VALUES
(1, 'test', 1, '2021-02-25 07:59:15', '2021-02-25 07:59:15');

-- --------------------------------------------------------

--
-- Table structure for table `unit_block`
--

CREATE TABLE `unit_block` (
  `unit_block_id` bigint(50) NOT NULL,
  `blockCode` varchar(50) NOT NULL,
  `row` varchar(10) NOT NULL,
  `col` varchar(10) NOT NULL,
  `unitID` bigint(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `unit_block`
--

INSERT INTO `unit_block` (`unit_block_id`, `blockCode`, `row`, `col`, `unitID`, `created_at`, `updated_at`) VALUES
(1, '1111', '1', '1', 1, '2021-02-25 07:59:49', '2021-02-25 07:59:49'),
(2, '1112', '1', '2', 1, '2021-02-25 08:00:01', '2021-02-25 08:00:01'),
(3, '1113', '1', '3', 1, '2021-02-25 08:00:11', '2021-02-25 08:00:11'),
(4, '1114', '1', '4', 1, '2021-02-25 08:00:21', '2021-02-25 08:00:21'),
(5, '1115', '1', '5', 1, '2021-02-25 08:00:30', '2021-02-25 08:00:30'),
(6, '1117', '1', '6', 1, '2021-02-26 08:01:21', '2021-02-23 08:01:21'),
(7, '1118', '1', '7', 1, '2021-02-26 08:01:21', '2021-02-23 08:01:21');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `empID` bigint(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`empID`, `username`, `password`, `isAdmin`, `created_at`, `updated_at`) VALUES
(1, 'test', 'test', 1, '2021-02-18 11:02:08', '2021-02-18 11:02:08');

-- --------------------------------------------------------

--
-- Table structure for table `vaccine`
--

CREATE TABLE `vaccine` (
  `vaccineID` bigint(50) NOT NULL,
  `vaccineName` varchar(100) NOT NULL,
  `vaccineCode` varchar(50) DEFAULT NULL,
  `farmID` bigint(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`empID`),
  ADD KEY `preID` (`preID`),
  ADD KEY `farmID` (`farmID`);

--
-- Indexes for table `farm`
--
ALTER TABLE `farm`
  ADD PRIMARY KEY (`farmID`),
  ADD KEY `ownerID` (`ownerID`);

--
-- Indexes for table `owner`
--
ALTER TABLE `owner`
  ADD PRIMARY KEY (`ownerID`),
  ADD KEY `preID` (`preID`);

--
-- Indexes for table `parent`
--
ALTER TABLE `parent`
  ADD PRIMARY KEY (`parentID`),
  ADD KEY `sowID` (`sowID`),
  ADD KEY `parent` (`parent`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`posID`),
  ADD KEY `farmID` (`farmID`);

--
-- Indexes for table `pos_emp`
--
ALTER TABLE `pos_emp`
  ADD PRIMARY KEY (`pos_emp_id`),
  ADD KEY `posID` (`posID`),
  ADD KEY `empID` (`empID`);

--
-- Indexes for table `prename`
--
ALTER TABLE `prename`
  ADD PRIMARY KEY (`preID`);

--
-- Indexes for table `sow`
--
ALTER TABLE `sow`
  ADD PRIMARY KEY (`sowID`),
  ADD KEY `farmID` (`farmID`);

--
-- Indexes for table `sowbirth`
--
ALTER TABLE `sowbirth`
  ADD PRIMARY KEY (`sowBirthID`),
  ADD KEY `sowID` (`sowID`,`empID`),
  ADD KEY `empID` (`empID`);

--
-- Indexes for table `sowblock`
--
ALTER TABLE `sowblock`
  ADD PRIMARY KEY (`sowBlockID`),
  ADD KEY `sowID` (`sowID`,`unit_block_id`),
  ADD KEY `unit_block_id` (`unit_block_id`);

--
-- Indexes for table `sowmating`
--
ALTER TABLE `sowmating`
  ADD PRIMARY KEY (`sowMatingID`),
  ADD KEY `sowSemenID` (`sowSemenID`,`sowID`,`empID`),
  ADD KEY `sowID` (`sowID`),
  ADD KEY `empID` (`empID`);

--
-- Indexes for table `sowparty`
--
ALTER TABLE `sowparty`
  ADD PRIMARY KEY (`sowPartyID`),
  ADD KEY `from_sow_id` (`from_sow_id`,`sowID`,`empID`),
  ADD KEY `sowID` (`sowID`),
  ADD KEY `empID` (`empID`);

--
-- Indexes for table `sowsemen`
--
ALTER TABLE `sowsemen`
  ADD PRIMARY KEY (`sowSemenID`),
  ADD KEY `sowID` (`sowID`,`empID`),
  ADD KEY `empID` (`empID`);

--
-- Indexes for table `sowvaccine`
--
ALTER TABLE `sowvaccine`
  ADD PRIMARY KEY (`sowVaccineID`),
  ADD KEY `sowID` (`sowID`,`vaccineID`,`empID`),
  ADD KEY `empID` (`empID`),
  ADD KEY `vaccineID` (`vaccineID`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`unitID`),
  ADD KEY `farmID` (`farmID`);

--
-- Indexes for table `unit_block`
--
ALTER TABLE `unit_block`
  ADD PRIMARY KEY (`unit_block_id`),
  ADD KEY `unitID` (`unitID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD KEY `empID` (`empID`);

--
-- Indexes for table `vaccine`
--
ALTER TABLE `vaccine`
  ADD PRIMARY KEY (`vaccineID`),
  ADD KEY `farmID` (`farmID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `empID` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `farm`
--
ALTER TABLE `farm`
  MODIFY `farmID` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `owner`
--
ALTER TABLE `owner`
  MODIFY `ownerID` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `parent`
--
ALTER TABLE `parent`
  MODIFY `parentID` bigint(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `posID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pos_emp`
--
ALTER TABLE `pos_emp`
  MODIFY `pos_emp_id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `prename`
--
ALTER TABLE `prename`
  MODIFY `preID` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sow`
--
ALTER TABLE `sow`
  MODIFY `sowID` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sowbirth`
--
ALTER TABLE `sowbirth`
  MODIFY `sowBirthID` bigint(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sowblock`
--
ALTER TABLE `sowblock`
  MODIFY `sowBlockID` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sowmating`
--
ALTER TABLE `sowmating`
  MODIFY `sowMatingID` bigint(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sowparty`
--
ALTER TABLE `sowparty`
  MODIFY `sowPartyID` bigint(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sowsemen`
--
ALTER TABLE `sowsemen`
  MODIFY `sowSemenID` bigint(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sowvaccine`
--
ALTER TABLE `sowvaccine`
  MODIFY `sowVaccineID` bigint(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `unit`
--
ALTER TABLE `unit`
  MODIFY `unitID` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `unit_block`
--
ALTER TABLE `unit_block`
  MODIFY `unit_block_id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `vaccine`
--
ALTER TABLE `vaccine`
  MODIFY `vaccineID` bigint(50) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`farmID`) REFERENCES `farm` (`farmID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`preID`) REFERENCES `prename` (`preID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `farm`
--
ALTER TABLE `farm`
  ADD CONSTRAINT `farm_ibfk_1` FOREIGN KEY (`ownerID`) REFERENCES `owner` (`ownerID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `owner`
--
ALTER TABLE `owner`
  ADD CONSTRAINT `owner_ibfk_1` FOREIGN KEY (`preID`) REFERENCES `prename` (`preID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `parent`
--
ALTER TABLE `parent`
  ADD CONSTRAINT `parent_ibfk_1` FOREIGN KEY (`sowID`) REFERENCES `sow` (`sowID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `parent_ibfk_2` FOREIGN KEY (`parent`) REFERENCES `sow` (`sowID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `position`
--
ALTER TABLE `position`
  ADD CONSTRAINT `position_ibfk_1` FOREIGN KEY (`farmID`) REFERENCES `farm` (`farmID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pos_emp`
--
ALTER TABLE `pos_emp`
  ADD CONSTRAINT `pos_emp_ibfk_1` FOREIGN KEY (`posID`) REFERENCES `position` (`posID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pos_emp_ibfk_2` FOREIGN KEY (`empID`) REFERENCES `employee` (`empID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sow`
--
ALTER TABLE `sow`
  ADD CONSTRAINT `sow_ibfk_1` FOREIGN KEY (`farmID`) REFERENCES `farm` (`farmID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sowbirth`
--
ALTER TABLE `sowbirth`
  ADD CONSTRAINT `sowbirth_ibfk_1` FOREIGN KEY (`sowID`) REFERENCES `sow` (`sowID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sowbirth_ibfk_2` FOREIGN KEY (`empID`) REFERENCES `employee` (`empID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sowblock`
--
ALTER TABLE `sowblock`
  ADD CONSTRAINT `sowblock_ibfk_1` FOREIGN KEY (`sowID`) REFERENCES `sow` (`sowID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sowblock_ibfk_2` FOREIGN KEY (`unit_block_id`) REFERENCES `unit_block` (`unit_block_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sowmating`
--
ALTER TABLE `sowmating`
  ADD CONSTRAINT `sowmating_ibfk_1` FOREIGN KEY (`sowSemenID`) REFERENCES `sowsemen` (`sowSemenID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sowmating_ibfk_2` FOREIGN KEY (`sowID`) REFERENCES `sow` (`sowID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sowmating_ibfk_3` FOREIGN KEY (`empID`) REFERENCES `employee` (`empID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sowparty`
--
ALTER TABLE `sowparty`
  ADD CONSTRAINT `sowparty_ibfk_1` FOREIGN KEY (`sowID`) REFERENCES `sow` (`sowID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sowparty_ibfk_2` FOREIGN KEY (`from_sow_id`) REFERENCES `sow` (`sowID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sowparty_ibfk_3` FOREIGN KEY (`empID`) REFERENCES `employee` (`empID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sowsemen`
--
ALTER TABLE `sowsemen`
  ADD CONSTRAINT `sowsemen_ibfk_1` FOREIGN KEY (`sowID`) REFERENCES `sow` (`sowID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sowsemen_ibfk_2` FOREIGN KEY (`empID`) REFERENCES `employee` (`empID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sowvaccine`
--
ALTER TABLE `sowvaccine`
  ADD CONSTRAINT `sowvaccine_ibfk_1` FOREIGN KEY (`empID`) REFERENCES `employee` (`empID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sowvaccine_ibfk_2` FOREIGN KEY (`vaccineID`) REFERENCES `vaccine` (`vaccineID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sowvaccine_ibfk_3` FOREIGN KEY (`sowID`) REFERENCES `sow` (`sowID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `unit`
--
ALTER TABLE `unit`
  ADD CONSTRAINT `unit_ibfk_1` FOREIGN KEY (`farmID`) REFERENCES `farm` (`farmID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `unit_block`
--
ALTER TABLE `unit_block`
  ADD CONSTRAINT `unit_block_ibfk_1` FOREIGN KEY (`unitID`) REFERENCES `unit` (`unitID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`empID`) REFERENCES `employee` (`empID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vaccine`
--
ALTER TABLE `vaccine`
  ADD CONSTRAINT `vaccine_ibfk_1` FOREIGN KEY (`farmID`) REFERENCES `farm` (`farmID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
