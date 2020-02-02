import {MigrationInterface, QueryRunner} from "typeorm";

export class Testing1580379680094 implements MigrationInterface {
    name = 'Testing1580379680094'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `approved_lesson` (`id` int NOT NULL AUTO_INCREMENT, `approved` tinyint NOT NULL, `userId` int NULL, `lessonId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `role` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `approved_course` (`id` int NOT NULL AUTO_INCREMENT, `approved` tinyint NOT NULL, `userId` int NULL, `courseId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `course` (`id` int NOT NULL AUTO_INCREMENT, `courseName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `lesson` (`id` int NOT NULL AUTO_INCREMENT, `lessonName` varchar(255) NOT NULL, `courseId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `question` (`id` int NOT NULL AUTO_INCREMENT, `question` varchar(255) NOT NULL, `score` int NOT NULL, `type` text NOT NULL, `lessonId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `answer` (`id` int NOT NULL AUTO_INCREMENT, `answer` text NOT NULL, `score` decimal(5,2) NOT NULL, `questionId` int NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `approved_lesson` ADD CONSTRAINT `FK_676e8333a2e5210f9b029b34151` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `approved_lesson` ADD CONSTRAINT `FK_4a3f2a38b48fbbe0e9faf56634e` FOREIGN KEY (`lessonId`) REFERENCES `lesson`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `approved_course` ADD CONSTRAINT `FK_3a7689a214e6e41ff822f270b8b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `approved_course` ADD CONSTRAINT `FK_73c7a287559f473bfe1b7b0e197` FOREIGN KEY (`courseId`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `lesson` ADD CONSTRAINT `FK_3801ccf9533a8627c1dcb1e33bf` FOREIGN KEY (`courseId`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_328503a049ab618608e47b50742` FOREIGN KEY (`lessonId`) REFERENCES `lesson`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `answer` ADD CONSTRAINT `FK_a4013f10cd6924793fbd5f0d637` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `answer` ADD CONSTRAINT `FK_5a26907efcd78a856c8af5829e6` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `answer` DROP FOREIGN KEY `FK_5a26907efcd78a856c8af5829e6`", undefined);
        await queryRunner.query("ALTER TABLE `answer` DROP FOREIGN KEY `FK_a4013f10cd6924793fbd5f0d637`", undefined);
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_328503a049ab618608e47b50742`", undefined);
        await queryRunner.query("ALTER TABLE `lesson` DROP FOREIGN KEY `FK_3801ccf9533a8627c1dcb1e33bf`", undefined);
        await queryRunner.query("ALTER TABLE `approved_course` DROP FOREIGN KEY `FK_73c7a287559f473bfe1b7b0e197`", undefined);
        await queryRunner.query("ALTER TABLE `approved_course` DROP FOREIGN KEY `FK_3a7689a214e6e41ff822f270b8b`", undefined);
        await queryRunner.query("ALTER TABLE `approved_lesson` DROP FOREIGN KEY `FK_4a3f2a38b48fbbe0e9faf56634e`", undefined);
        await queryRunner.query("ALTER TABLE `approved_lesson` DROP FOREIGN KEY `FK_676e8333a2e5210f9b029b34151`", undefined);
        await queryRunner.query("DROP TABLE `answer`", undefined);
        await queryRunner.query("DROP TABLE `question`", undefined);
        await queryRunner.query("DROP TABLE `lesson`", undefined);
        await queryRunner.query("DROP TABLE `course`", undefined);
        await queryRunner.query("DROP TABLE `approved_course`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
        await queryRunner.query("DROP TABLE `approved_lesson`", undefined);
    }

}
