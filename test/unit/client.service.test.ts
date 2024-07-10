import { ClienteService } from '../../src/services/cliente-service';

describe('ClienteService', () => {
  const clienteService = new ClienteService();

  it('should return elegivel for a valid cliente', () => {
    const cliente = {
      classeDeConsumo: 'residencial',
      modalidadeTarifaria: 'convencional',
      tipoDeConexao: 'monofasico',
      historicoDeConsumo: [420, 430, 400, 410, 415, 420, 425, 430, 410, 415, 420, 430]
    };
    const resultado = clienteService.checarElegibilidade(cliente);
    expect(resultado.elegivel).toBe(true);
  });

  it('should return not elegivel for an invalid cliente', () => {
    const cliente = {
      classeDeConsumo: 'poderPublico',
      modalidadeTarifaria: 'azul',
      tipoDeConexao: 'trifasico',
      historicoDeConsumo: [800, 820, 830, 840, 850, 860, 870, 880, 890, 900, 910, 920]
    };
    const resultado = clienteService.checarElegibilidade(cliente);
    expect(resultado.elegivel).toBe(false);
  });
});
