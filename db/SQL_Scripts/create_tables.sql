-- murmur_schema.users definition
CREATE TABLE `users` (
  `Name` varchar(100) NOT NULL,
  `Id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- murmur_schema.followers definition
CREATE TABLE `followers` (
  `UserId` bigint NOT NULL,
  `FollowingUserId` bigint NOT NULL,
  PRIMARY KEY (`UserId`,`FollowingUserId`),
  KEY `followers_FK_1` (`FollowingUserId`),
  CONSTRAINT `followers_FK` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`),
  CONSTRAINT `followers_FK_1` FOREIGN KEY (`FollowingUserId`) REFERENCES `users` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- murmur_schema.posts definition
CREATE TABLE `posts` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Content` longtext,
  `UserId` bigint NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `posts_FK` (`UserId`),
  CONSTRAINT `posts_FK` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- murmur_schema.userpostlike definition
CREATE TABLE `userpostlike` (
  `UserId` bigint NOT NULL,
  `PostId` bigint NOT NULL,
  PRIMARY KEY (`UserId`,`PostId`),
  KEY `userpostlike_FK_1` (`PostId`),
  CONSTRAINT `userPostLike_FK` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`),
  CONSTRAINT `userpostlike_FK_1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

