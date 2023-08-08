import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AlbumCreating1691413282560 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'album',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'year',
            type: 'int'
          },
          {
            name: 'artistId',
            type: 'varchar',
            isNullable: true
          }
        ]
      }),
      true
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('album');
  }
}
