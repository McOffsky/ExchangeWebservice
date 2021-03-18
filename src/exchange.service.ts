import { Injectable } from '@nestjs/common';
import * as oxr from 'open-exchange-rates';
import * as fx from 'money';
import IExchangeValue from './Interface/IExchangeValue';

@Injectable()
export class ExchangeService {
  init(app_id: string) {
    oxr.set({ app_id: app_id });
  }

  exchange(
    amount: number,
    sourceCurrency: string,
    targetCurrency: string,
  ): Promise<IExchangeValue> {
    return new Promise((resolve, reject) => {
      oxr.latest(() => {
        fx.rates = oxr.rates;
        fx.base = oxr.base;

        try {
          resolve({
            source: {
              amount: amount,
              currency: sourceCurrency,
            },
            target: {
              amount: fx(amount).from(sourceCurrency).to(targetCurrency),
              currency: targetCurrency,
            },
          });
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  getCurrencies(): Promise<string[]> {
    return new Promise((resolve) => {
      oxr.latest(() => {
        const currencies = Object.keys(oxr.rates);
        currencies.unshift(oxr.base);
        resolve(currencies);
      });
    });
  }
}
