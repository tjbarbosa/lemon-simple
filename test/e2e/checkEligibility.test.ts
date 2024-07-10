import request from 'supertest';
import app from '../../src/app'; // Caminho para o seu arquivo de servidor

describe('POST /checkEligibilityClient', () => {
  it('deve verificar a elegibilidade do cliente', async () => {
    const checkEligibilityInput = {
      consumptionClass: 'Residencial',
      tariffModality: 'Convencional',
      connectionType: 'Monofásico',
      consumptionHistory: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
    };

    const response = await request(app)
      .post('clientes/validaCliente/')
      .send(checkEligibilityInput);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('elegivel');
    expect(response.body).toHaveProperty('razao');
    expect(response.body).toHaveProperty('economia_anual_co2');

    // Adicione verificações específicas conforme necessário
    // Exemplo:
    expect(response.body.elegivel).toBe(true);
    expect(response.body.economia_anual_co2).toBeGreaterThan(0);
  });
});
