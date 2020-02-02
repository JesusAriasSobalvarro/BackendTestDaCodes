import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingDecimalToQuestionScore1580430408265 implements MigrationInterface {
    name = 'AddingDecimalToQuestionScore1580430408265'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `score`", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD `score` decimal(5,2) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `score`", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD `score` int NOT NULL", undefined);
    }

}
