import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class FavTracksCreating1691577838782 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fav_tracks',
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
    await queryRunner.dropTable('fav_tracks');
  }
}
