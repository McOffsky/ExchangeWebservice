import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/currencies (GET)', () => {
    return request(app.getHttpServer())
      .get('/currencies')
      .expect(200)
      .expect((res) => {
        if (!res.body.includes('USD')) {
          throw new Error('response does not include USD currency');
        }
        if (res.body.length < 1) {
          throw new Error('response does not contain any currencies');
        }
      });
  });

  it('/exchange (GET) - empty query handling', () => {
    return request(app.getHttpServer())
      .get('/exchange')
      .expect(400);
  });

  it('/exchange (GET) - malformed query handling', () => {
    return request(app.getHttpServer())
      .get('/exchange?amount=test&sourceCurrency=USD&targetCurrency=123')
      .expect(400);
  });

  it('/exchange (GET) - correct query handling', () => {
    return request(app.getHttpServer())
      .get('/exchange?amount=123&sourceCurrency=USD&targetCurrency=EUR')
      .expect(200)
      .expect((res) => {
        console.log(typeof res.body.source.amount);
        if (res.body.source.amount !== '123') {
          throw new Error('wrong source amount returned!');
        }
        if (res.body.source.currency !== 'USD') {
          throw new Error('wrong source currency returned!');
        }
        if (typeof res.body.target.amount === 'undefined') {
          throw new Error('target amount missing!');
        }
        if (res.body.target.currency !== 'EUR') {
          throw new Error('wrong target currency returned!');
        }
      });
  });
});
