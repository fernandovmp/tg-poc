import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ConfigurarBancoDeDados1609342495733 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tarefa',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true,
                    },
                    {
                        name: 'titulo',
                        type: 'varchar(20)',
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: ['incompleto', 'completo'],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tarefa');
    }
}
