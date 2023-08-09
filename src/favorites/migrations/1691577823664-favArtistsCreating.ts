import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class FavArtistsCreating1691577823664 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fav_artists',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('fav_artists');
  }
}
