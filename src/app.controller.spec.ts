import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ExchangeService } from './exchange.service';

describe('AppController', () => {
  let appController: AppController;
  let exchangeService: ExchangeService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ExchangeService],
    }).compile();

    appController = app.get<AppController>(AppController);
    exchangeService = app.get<ExchangeService>(ExchangeService);
  });

  describe('getCurrencies', () => {
    it('should return promise', () => {
      expect(appController.getCurrencies()).toBeInstanceOf(Promise);
    });

    it('should contain at least "USD"', async () => {
      const result = ['USD'];
      jest
        .spyOn(exchangeService, 'getCurrencies')
        .mockImplementation((): Promise<string[]> => Promise.resolve(result));

      expect(await appController.getCurrencies()).toBe(result);
    });
  });

  describe('getExchange', () => {
    it('should return promise', () => {
      expect(appController.getCurrencies()).toBeInstanceOf(Promise);
    });

    it('should take in valid query and return correct value', async () => {
      const exchangeQuery = {
        amount: 30,
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
      };

      expect(await appController.getExchange(exchangeQuery)).toHaveProperty(
        'source.currency',
        exchangeQuery.sourceCurrency,
      );

      expect(await appController.getExchange(exchangeQuery)).toHaveProperty(
        'target.currency',
        exchangeQuery.targetCurrency,
      );
    });
  });
});
