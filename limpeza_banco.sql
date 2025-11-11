-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para controle_de_estoque
DROP DATABASE IF EXISTS `controle_de_estoque`;
CREATE DATABASE IF NOT EXISTS `controle_de_estoque` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `controle_de_estoque`;

-- Copiando estrutura para tabela controle_de_estoque.movimentacao
DROP TABLE IF EXISTS `movimentacao`;
CREATE TABLE IF NOT EXISTS `movimentacao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `produto_id` int(11) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `quantidade` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `produto_id` (`produto_id`),
  CONSTRAINT `produto_id` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`produto_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela controle_de_estoque.movimentacao: ~2 rows (aproximadamente)
DELETE FROM `movimentacao`;
INSERT INTO `movimentacao` (`id`, `produto_id`, `tipo`, `quantidade`) VALUES
	(1, 1, 'saida', 5),
	(2, 1, 'entrada', 5),
	(3, 1, 'entrada', 5),
	(4, 1, 'entrada', 5),
	(5, 1, 'saida', 5),
	(6, 1, 'saida', 5),
	(7, 1, 'saida', 2),
	(8, 1, 'saida', 5);

-- Copiando estrutura para tabela controle_de_estoque.produto
DROP TABLE IF EXISTS `produto`;
CREATE TABLE IF NOT EXISTS `produto` (
  `produto_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `volume` varchar(50) NOT NULL,
  `tipo_embalagem` varchar(50) NOT NULL,
  `aplicacao` varchar(50) NOT NULL,
  `estoque` int(11) DEFAULT NULL,
  `estoque_minimo` int(11) NOT NULL,
  PRIMARY KEY (`produto_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela controle_de_estoque.produto: ~2 rows (aproximadamente)
DELETE FROM `produto`;
INSERT INTO `produto` (`produto_id`, `nome`, `marca`, `volume`, `tipo_embalagem`, `aplicacao`, `estoque`, `estoque_minimo`) VALUES
	(1, 'Detergente', 'Marca X', '500ml', 'Plástica', 'Doméstica', 2, 5),
	(2, 'desinfetante ', 'veja', '5', 'caixa', 'em casa', 5, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
