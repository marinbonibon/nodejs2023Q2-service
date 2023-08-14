import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TrackCreating1691523825172 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'track',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'artistId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'albumId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'duration',
            type: 'int',
          },
        ],
      }),
      true,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('track');
  }
}
