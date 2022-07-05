import { MigrationInterface, QueryRunner } from "typeorm";

export class employee1656984327913 implements MigrationInterface {
    name = 'employee1656984327913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact_info" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "phone" varchar, "email" varchar NOT NULL, "employeeId" integer, CONSTRAINT "REL_f188a018423a2cc75535509ff9" UNIQUE ("employeeId"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "employeeId" integer)`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_contact_info" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "phone" varchar, "email" varchar NOT NULL, "employeeId" integer, CONSTRAINT "REL_f188a018423a2cc75535509ff9" UNIQUE ("employeeId"), CONSTRAINT "FK_f188a018423a2cc75535509ff97" FOREIGN KEY ("employeeId") REFERENCES "employee" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_contact_info"("id", "phone", "email", "employeeId") SELECT "id", "phone", "email", "employeeId" FROM "contact_info"`);
        await queryRunner.query(`DROP TABLE "contact_info"`);
        await queryRunner.query(`ALTER TABLE "temporary_contact_info" RENAME TO "contact_info"`);
        await queryRunner.query(`CREATE TABLE "temporary_task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "employeeId" integer, CONSTRAINT "FK_07278e1532a8daa462123fb7bc1" FOREIGN KEY ("employeeId") REFERENCES "employee" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_task"("id", "name", "employeeId") SELECT "id", "name", "employeeId" FROM "task"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`ALTER TABLE "temporary_task" RENAME TO "task"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" RENAME TO "temporary_task"`);
        await queryRunner.query(`CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "employeeId" integer)`);
        await queryRunner.query(`INSERT INTO "task"("id", "name", "employeeId") SELECT "id", "name", "employeeId" FROM "temporary_task"`);
        await queryRunner.query(`DROP TABLE "temporary_task"`);
        await queryRunner.query(`ALTER TABLE "contact_info" RENAME TO "temporary_contact_info"`);
        await queryRunner.query(`CREATE TABLE "contact_info" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "phone" varchar, "email" varchar NOT NULL, "employeeId" integer, CONSTRAINT "REL_f188a018423a2cc75535509ff9" UNIQUE ("employeeId"))`);
        await queryRunner.query(`INSERT INTO "contact_info"("id", "phone", "email", "employeeId") SELECT "id", "phone", "email", "employeeId" FROM "temporary_contact_info"`);
        await queryRunner.query(`DROP TABLE "temporary_contact_info"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "contact_info"`);
    }

}
