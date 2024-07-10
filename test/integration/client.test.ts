import request from 'supertest';
import app from '../../src/app';
import { ClientTypeInput } from '../../src/dto/client.dto';
import { ValidConsumptionClassEnum, ValidTariffModalityEnum, ConnectionTypeEnum } from '../../src/types/client.type';

describe('Cliente API', () => {
  it('should return 200 for a valid cliente', async () => {
    // const cliente = {
    //   classe_de_consumo: 'residencial',
    //   modalidade_tarifaria: 'convencional',
    //   tipo_de_conexao: 'monofasico',
    //   historico_de_consumo: [420, 430, 400, 410, 415, 420, 425, 430, 410, 415, 420, 430]
    // };

    const validClientData: ClientTypeInput = {
      consumptionClass: ValidConsumptionClassEnum.residential,
      tariffModality: ValidTariffModalityEnum.conventional,
      connectionType: ConnectionTypeEnum.singlePhase,
      consumptionHistory: [100, 120, 150, 130, 110, 90, 140, 180, 160, 120, 100, 80],
    };

    const response = await request(app)
      .post('/clientes')
      .send(validClientData)
      .expect(200);

    expect(response.body.elegivel).toBe(true);
  });

  // it('should return 400 for an invalid cliente', async () => {
  //   const cliente = {
  //     classe_de_consumo: 'poderPublico',
  //     modalidade_tarifaria: 'azul',
  //     tipo_de_conexao: 'trifasico',
  //     historico_de_consumo: [800, 820, 830, 840, 850, 860, 870, 880, 890, 900, 910, 920]
  //   };

  //   const response = await request(app)
  //     .post('/clientes')
  //     .send(cliente)
  //     .expect(400);

  //   expect(response.body.elegivel).toBe(false);
  // });
});
