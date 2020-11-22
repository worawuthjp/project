-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2020 at 08:23 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pig`
--

-- --------------------------------------------------------

--
-- Table structure for table `block`
--

CREATE TABLE `block` (
  `blockID` bigint(50) NOT NULL,
  `blockCode` varchar(50) NOT NULL,
  `row` varchar(10) NOT NULL,
  `col` varchar(10) NOT NULL,
  `unitID` bigint(50) NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` int(11) NOT NULL DEFAULT current_timestamp(),
  `updated_at` int(11) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `block`
--

INSERT INTO `block` (`blockID`, `blockCode`, `row`, `col`, `unitID`, `isDel`, `created_at`, `updated_at`) VALUES
(1, '1111', 'A', '1', 1, 0, 2020, 2020);

-- --------------------------------------------------------

--
-- Table structure for table `farm`
--

CREATE TABLE `farm` (
  `farmID` bigint(50) NOT NULL,
  `farmname` varchar(150) NOT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longtitude` varchar(50) DEFAULT NULL,
  `ownerID` bigint(50) NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `farm`
--

INSERT INTO `farm` (`farmID`, `farmname`, `latitude`, `longtitude`, `ownerID`, `isDel`, `created_at`, `updated_at`) VALUES
(1, 'KU FARM', NULL, NULL, 1, 0, '2020-11-08 13:10:44', '2020-11-08 13:10:44');

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

CREATE TABLE `owner` (
  `ownerID` bigint(50) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `prename` varchar(50) NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `owner`
--

INSERT INTO `owner` (`ownerID`, `fname`, `lname`, `prename`, `isDel`, `created_at`, `updated_at`) VALUES
(1, 'KU', 'TEST', 'TEST', 0, '2020-11-08 13:10:03', '2020-11-08 13:10:03');

-- --------------------------------------------------------

--
-- Table structure for table `sow`
--

CREATE TABLE `sow` (
  `sowID` bigint(50) NOT NULL,
  `uhf` varchar(50) NOT NULL,
  `sowCode` varchar(50) NOT NULL,
  `recType` varchar(5) NOT NULL,
  `birthDate` date NOT NULL,
  `breed` varchar(15) NOT NULL,
  `sire` bigint(50) NOT NULL,
  `dam` bigint(50) NOT NULL,
  `origin` varchar(15) NOT NULL,
  `farmID` bigint(50) NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sow`
--

INSERT INTO `sow` (`sowID`, `uhf`, `sowCode`, `recType`, `birthDate`, `breed`, `sire`, `dam`, `origin`, `farmID`, `isDel`, `created_at`, `updated_at`) VALUES
(2, '1111', '1111', 'S', '2020-11-01', 'ly', 1, 1, 'vcf', 1, 0, '2020-11-08 13:56:27', '2020-11-08 13:56:27');

-- --------------------------------------------------------

--
-- Table structure for table `sowbirth`
--

CREATE TABLE `sowbirth` (
  `sowBirthID` bigint(50) NOT NULL,
  `alive` int(11) NOT NULL,
  `died` int(11) NOT NULL,
  `mummy` int(11) NOT NULL,
  `sowID` bigint(50) NOT NULL,
  `userID` bigint(50) NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sowmating`
--

CREATE TABLE `sowmating` (
  `sowMatingID` bigint(50) NOT NULL,
  `sowSementID` bigint(50) NOT NULL,
  `sowID` bigint(50) NOT NULL,
  `userID` bigint(50) NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` tinyint(1) NOT NULL DEFAULT current_timestamp(),
  `updated_at` tinyint(1) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sowparty`
--

CREATE TABLE `sowparty` (
  `sowPartyID` bigint(50) NOT NULL,
  `from_sow_id` bigint(50) NOT NULL,
  `num` int(11) NOT NULL,
  `sowID` bigint(50) NOT NULL,
  `userID` bigint(50) NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sowsemen`
--

CREATE TABLE `sowsemen` (
  `sowSemenID` bigint(50) NOT NULL,
  `barcode` varchar(25) NOT NULL,
  `sowID` bigint(50) NOT NULL,
  `userID` bigint(50) NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sowsemen`
--

INSERT INTO `sowsemen` (`sowSemenID`, `barcode`, `sowID`, `userID`, `isDel`, `created_at`, `updated_at`) VALUES
(1, '1111', 2, 2, 0, '2020-11-09 16:27:54', '2020-11-09 16:27:54');

-- --------------------------------------------------------

--
-- Table structure for table `sowvaccine`
--

CREATE TABLE `sowvaccine` (
  `sowVaccineID` bigint(50) NOT NULL,
  `vaccine` bigint(50) NOT NULL,
  `sowID` bigint(50) NOT NULL,
  `userID` bigint(50) NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sow_block`
--

CREATE TABLE `sow_block` (
  `sow_block_id` bigint(50) NOT NULL,
  `sowID` bigint(50) NOT NULL,
  `blockID` bigint(50) NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `type_user`
--

CREATE TABLE `type_user` (
  `typeUserID` bigint(50) NOT NULL,
  `typename` varchar(100) NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `type_user`
--

INSERT INTO `type_user` (`typeUserID`, `typename`, `isDel`, `created_at`, `updated_at`) VALUES
(1, 'ผู้พัฒนา', 0, '2020-11-08 13:11:35', '2020-11-08 13:11:35');

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

CREATE TABLE `unit` (
  `unitID` bigint(50) NOT NULL,
  `unitCode` varchar(50) NOT NULL,
  `farmID` bigint(50) NOT NULL,
  `unitName` varchar(50) NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `unit`
--

INSERT INTO `unit` (`unitID`, `unitCode`, `farmID`, `unitName`, `isDel`, `created_at`, `updated_at`) VALUES
(1, '1111', 1, '4/1', 0, '2020-11-09 16:27:54', '2020-11-09 16:27:54');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` bigint(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `pre` varchar(20) NOT NULL,
  `birthDate` date NOT NULL,
  `farmID` bigint(50) NOT NULL,
  `typeUserID` bigint(50) NOT NULL,
  `isDel` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `username`, `password`, `email`, `fname`, `lname`, `pre`, `birthDate`, `farmID`, `typeUserID`, `isDel`, `created_at`, `updated_at`) VALUES
(2, 'jj', 'jj', 'ff', 'worawuth', '55555', 'jj', '0000-00-00', 1, 1, 0, '2020-11-08 13:12:10', '2020-11-08 13:12:10');

-- --------------------------------------------------------

--
-- Table structure for table `vaccine`
--

CREATE TABLE `vaccine` (
  `vaccineID` bigint(50) NOT NULL,
  `vaccineName` varchar(100) NOT NULL,
  `farmID` bigint(50) NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `block`
--
ALTER TABLE `block`
  ADD PRIMARY KEY (`blockID`),
  ADD KEY `unitID` (`unitID`);

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
  ADD PRIMARY KEY (`ownerID`);

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
  ADD KEY `sowID` (`sowID`,`userID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `sowmating`
--
ALTER TABLE `sowmating`
  ADD PRIMARY KEY (`sowMatingID`),
  ADD KEY `sowSementID` (`sowSementID`,`sowID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `sowID` (`sowID`);

--
-- Indexes for table `sowparty`
--
ALTER TABLE `sowparty`
  ADD PRIMARY KEY (`sowPartyID`),
  ADD KEY `sowID` (`sowID`,`userID`),
  ADD KEY `from_sow_id` (`from_sow_id`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `sowsemen`
--
ALTER TABLE `sowsemen`
  ADD PRIMARY KEY (`sowSemenID`),
  ADD KEY `sowID` (`sowID`,`userID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `sowvaccine`
--
ALTER TABLE `sowvaccine`
  ADD PRIMARY KEY (`sowVaccineID`),
  ADD KEY `sowID` (`sowID`,`userID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `vaccine` (`vaccine`);

--
-- Indexes for table `sow_block`
--
ALTER TABLE `sow_block`
  ADD PRIMARY KEY (`sow_block_id`),
  ADD KEY `sowID` (`sowID`,`blockID`),
  ADD KEY `blockID` (`blockID`);

--
-- Indexes for table `type_user`
--
ALTER TABLE `type_user`
  ADD PRIMARY KEY (`typeUserID`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`unitID`),
  ADD KEY `farmID` (`farmID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD KEY `farmID` (`farmID`),
  ADD KEY `type` (`typeUserID`);

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
-- AUTO_INCREMENT for table `block`
--
ALTER TABLE `block`
  MODIFY `blockID` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- AUTO_INCREMENT for table `sow`
--
ALTER TABLE `sow`
  MODIFY `sowID` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sowbirth`
--
ALTER TABLE `sowbirth`
  MODIFY `sowBirthID` bigint(50) NOT NULL AUTO_INCREMENT;

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
  MODIFY `sowSemenID` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sowvaccine`
--
ALTER TABLE `sowvaccine`
  MODIFY `sowVaccineID` bigint(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sow_block`
--
ALTER TABLE `sow_block`
  MODIFY `sow_block_id` bigint(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `type_user`
--
ALTER TABLE `type_user`
  MODIFY `typeUserID` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `unit`
--
ALTER TABLE `unit`
  MODIFY `unitID` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vaccine`
--
ALTER TABLE `vaccine`
  MODIFY `vaccineID` bigint(50) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `block`
--
ALTER TABLE `block`
  ADD CONSTRAINT `block_ibfk_1` FOREIGN KEY (`unitID`) REFERENCES `unit` (`unitID`);

--
-- Constraints for table `farm`
--
ALTER TABLE `farm`
  ADD CONSTRAINT `farm_ibfk_1` FOREIGN KEY (`ownerID`) REFERENCES `owner` (`ownerID`);

--
-- Constraints for table `sow`
--
ALTER TABLE `sow`
  ADD CONSTRAINT `sow_ibfk_3` FOREIGN KEY (`farmID`) REFERENCES `farm` (`farmID`);

--
-- Constraints for table `sowbirth`
--
ALTER TABLE `sowbirth`
  ADD CONSTRAINT `sowbirth_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `sowbirth_ibfk_2` FOREIGN KEY (`sowID`) REFERENCES `sow` (`sowID`);

--
-- Constraints for table `sowmating`
--
ALTER TABLE `sowmating`
  ADD CONSTRAINT `sowmating_ibfk_1` FOREIGN KEY (`sowID`) REFERENCES `sow` (`sowID`),
  ADD CONSTRAINT `sowmating_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `sowmating_ibfk_3` FOREIGN KEY (`sowSementID`) REFERENCES `sowsemen` (`sowSemenID`);

--
-- Constraints for table `sowparty`
--
ALTER TABLE `sowparty`
  ADD CONSTRAINT `sowparty_ibfk_1` FOREIGN KEY (`sowID`) REFERENCES `sow` (`sowID`),
  ADD CONSTRAINT `sowparty_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `sowparty_ibfk_3` FOREIGN KEY (`from_sow_id`) REFERENCES `sow` (`sowID`);

--
-- Constraints for table `sowsemen`
--
ALTER TABLE `sowsemen`
  ADD CONSTRAINT `sowsemen_ibfk_1` FOREIGN KEY (`sowID`) REFERENCES `sow` (`sowID`),
  ADD CONSTRAINT `sowsemen_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

--
-- Constraints for table `sowvaccine`
--
ALTER TABLE `sowvaccine`
  ADD CONSTRAINT `sowvaccine_ibfk_1` FOREIGN KEY (`sowID`) REFERENCES `sow` (`sowID`),
  ADD CONSTRAINT `sowvaccine_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `sowvaccine_ibfk_3` FOREIGN KEY (`vaccine`) REFERENCES `vaccine` (`vaccineID`);

--
-- Constraints for table `sow_block`
--
ALTER TABLE `sow_block`
  ADD CONSTRAINT `sow_block_ibfk_1` FOREIGN KEY (`sowID`) REFERENCES `sow` (`sowID`),
  ADD CONSTRAINT `sow_block_ibfk_2` FOREIGN KEY (`blockID`) REFERENCES `block` (`blockID`);

--
-- Constraints for table `unit`
--
ALTER TABLE `unit`
  ADD CONSTRAINT `unit_ibfk_1` FOREIGN KEY (`farmID`) REFERENCES `farm` (`farmID`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`farmID`) REFERENCES `farm` (`farmID`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`typeUserID`) REFERENCES `type_user` (`typeUserID`);

--
-- Constraints for table `vaccine`
--
ALTER TABLE `vaccine`
  ADD CONSTRAINT `vaccine_ibfk_1` FOREIGN KEY (`farmID`) REFERENCES `farm` (`farmID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
