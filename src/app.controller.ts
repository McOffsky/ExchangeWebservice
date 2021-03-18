import { Controller, Get, Query } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeQuery } from './DTO/ExchangeQuery';
import IExchangeValue from './Interface/IExchangeValue';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly exchangeService: ExchangeService,
    private configService: ConfigService,
  ) {
    this.exchangeService.init(configService.get<string>('OXR_APP_ID'));
  }

  @Get('exchange')
  async getExchange(@Query() query: ExchangeQuery): Promise<IExchangeValue> {
    return this.exchangeService.exchange(
      query.amount,
      query.sourceCurrency,
      query.targetCurrency,
    );
  }

  @Get('currencies')
  async getCurrencies(): Promise<string[]> {
    return this.exchangeService.getCurrencies();
  }
}
