import { MigrationInterface, QueryRunner } from "typeorm";

export class postAddSlugColumn1615078267832 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE post
        ADD COLUMN slug TEXT CONSTRAINT alphanumeric CHECK (slug ~* '^[a-zA-Z0-9][a-zA-Z0-9\-]+[a-zA-Z0-9]$');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE post
        DROP COLUMN slug;
      `);
  }
}
