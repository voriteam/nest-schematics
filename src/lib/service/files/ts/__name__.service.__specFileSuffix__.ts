import { TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TransactionalTestContext } from 'typeorm-transactional-tests';

import { createTestingModule } from '@vori/nest/libs/test_helpers';

import { <%= classify(name) %>Service } from './<%= name %>.service';

describe('<%= classify(name) %>Service', () => {
  let module: TestingModule;
  let db: DataSource;
  let transactionalContext: TransactionalTestContext;
  let service: <%= classify(name) %>Service;

  beforeAll(async () => {
    module = await createTestingModule({
      imports: [TypeOrmModule.forFeature([/* Add relevant entities */])],
      providers: [<%= classify(name) %>Service],
    }).compile();

    await module.init();

    db = module.get<DataSource>(DataSource);
    service = module.get<<%= classify(name) %>Service>(<%= classify(name) %>Service);
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    transactionalContext = new TransactionalTestContext(db);
    await transactionalContext.start();
  });

  afterEach(async () => {
    await transactionalContext.finish();
  });

  describe('method', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    // TODO Add relevant tests with database operations
  });
});
