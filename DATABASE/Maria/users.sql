-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 07 mars 2019 à 11:16
-- Version du serveur :  5.7.21
-- Version de PHP :  7.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `users`
--

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `utl_id` int(11) NOT NULL AUTO_INCREMENT,
  `utl_pseudo` varchar(30) NOT NULL,
  `utl_nom` varchar(50) NOT NULL,
  `utl_prenom` varchar(50) NOT NULL,
  `utl_date_naissance` date NOT NULL,
  `utl_mail` varchar(70) NOT NULL,
  `utl_mot_de_passe` varchar(64) NOT NULL,
  PRIMARY KEY (`utl_id`),
  UNIQUE KEY `utl_mail` (`utl_mail`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`utl_id`, `utl_pseudo`, `utl_nom`, `utl_prenom`, `utl_date_naissance`, `utl_mail`, `utl_mot_de_passe`) VALUES
(13, 'WaiiM', 'KARDY', 'Anas M', '1994-07-04', 'anasmedkardy@gmail.com', '2829'),
(18, 'DIALLOBoubacar', 'DIALLO', 'Boubacar', '1994-07-04', 'bubakar24@gmail.com', 'buba'),
(19, 'MADJOUDJFarid', 'MADJOUDJ', 'Farid', '1994-07-04', 'faridmadjoudj@gmail.com', 'farid'),
(20, 'FACIMounir', 'FACI', 'Mounir', '1994-07-04', 'Faci95mounir@gmail.com', 'faci');

-- --------------------------------------------------------

--
-- Structure de la table `verification`
--

DROP TABLE IF EXISTS `verification`;
CREATE TABLE IF NOT EXISTS `verification` (
  `ver_code` varchar(255) NOT NULL,
  `ver_statut` int(11) NOT NULL,
  `utilisateur_utl_id` int(11) NOT NULL,
  PRIMARY KEY (`ver_code`),
  KEY `verification_utilisateur_fk` (`utilisateur_utl_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
