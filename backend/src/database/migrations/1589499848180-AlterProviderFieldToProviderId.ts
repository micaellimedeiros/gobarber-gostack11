import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1589499848180
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    // Criar a chave estrangeira
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'], // Vai receber a chave estrangeira
        referencedColumnNames: ['id'], // Da coluna 'id', da tabela de 'users'
        referencedTableName: 'users',
        onDelete: 'SET NULL', // Quando deletar esse provider, vai setar o 'provider_id' como 'null'
        onUpdate: 'CASCADE', // Quando atualizar o id do provider, vai atualizar o provider_id, nas tabela que estao relacionadas, como a tabela 'users'
      }),
    );
  }

  // Quando apagar essa migration, Fazer ao contrario do metodo 'up'
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
