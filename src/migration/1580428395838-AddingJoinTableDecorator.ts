import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingJoinTableDecorator1580428395838 implements MigrationInterface {
    name = 'AddingJoinTableDecorator1580428395838'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `course_required_courses_course` (`courseId_1` int NOT NULL, `courseId_2` int NOT NULL, INDEX `IDX_f825ae4ed66bac048c3b57bef9` (`courseId_1`), INDEX `IDX_2a7e37b02517d3b26220aceb37` (`courseId_2`), PRIMARY KEY (`courseId_1`, `courseId_2`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `lesson_required_lessons_lesson` (`lessonId_1` int NOT NULL, `lessonId_2` int NOT NULL, INDEX `IDX_a886cbf073b08888c46bc9d9a1` (`lessonId_1`), INDEX `IDX_5d5cbe47f4b2417702dcf6ab9e` (`lessonId_2`), PRIMARY KEY (`lessonId_1`, `lessonId_2`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `course_required_courses_course` ADD CONSTRAINT `FK_f825ae4ed66bac048c3b57bef90` FOREIGN KEY (`courseId_1`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `course_required_courses_course` ADD CONSTRAINT `FK_2a7e37b02517d3b26220aceb377` FOREIGN KEY (`courseId_2`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `lesson_required_lessons_lesson` ADD CONSTRAINT `FK_a886cbf073b08888c46bc9d9a12` FOREIGN KEY (`lessonId_1`) REFERENCES `lesson`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `lesson_required_lessons_lesson` ADD CONSTRAINT `FK_5d5cbe47f4b2417702dcf6ab9e2` FOREIGN KEY (`lessonId_2`) REFERENCES `lesson`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `lesson_required_lessons_lesson` DROP FOREIGN KEY `FK_5d5cbe47f4b2417702dcf6ab9e2`", undefined);
        await queryRunner.query("ALTER TABLE `lesson_required_lessons_lesson` DROP FOREIGN KEY `FK_a886cbf073b08888c46bc9d9a12`", undefined);
        await queryRunner.query("ALTER TABLE `course_required_courses_course` DROP FOREIGN KEY `FK_2a7e37b02517d3b26220aceb377`", undefined);
        await queryRunner.query("ALTER TABLE `course_required_courses_course` DROP FOREIGN KEY `FK_f825ae4ed66bac048c3b57bef90`", undefined);
        await queryRunner.query("DROP INDEX `IDX_5d5cbe47f4b2417702dcf6ab9e` ON `lesson_required_lessons_lesson`", undefined);
        await queryRunner.query("DROP INDEX `IDX_a886cbf073b08888c46bc9d9a1` ON `lesson_required_lessons_lesson`", undefined);
        await queryRunner.query("DROP TABLE `lesson_required_lessons_lesson`", undefined);
        await queryRunner.query("DROP INDEX `IDX_2a7e37b02517d3b26220aceb37` ON `course_required_courses_course`", undefined);
        await queryRunner.query("DROP INDEX `IDX_f825ae4ed66bac048c3b57bef9` ON `course_required_courses_course`", undefined);
        await queryRunner.query("DROP TABLE `course_required_courses_course`", undefined);
    }

}
