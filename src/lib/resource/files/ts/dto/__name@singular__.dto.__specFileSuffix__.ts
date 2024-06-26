import { faker } from '@faker-js/faker';
import { instanceToPlain } from 'class-transformer';

import { getDataSource } from '@vori/providers/database';

import { makeDatabaseID } from '@vori/utils/VoriRandom';

import { make<%= singular(classify(name)) %> } from '../fakers/<%= singular(name) %>.faker';
import { <%= singular(classify(name)) %>Dto } from './<%= singular(name) %>.dto';

describe('<%= singular(classify(name)) %>Dto', () => {
  beforeAll(async () => {
    await getDataSource();
  });

  describe('constructor', () => {
    it('converts an entity to a DTO', () => {
      const <%= singular(camelize(name)) %> = make<%= singular(classify(name)) %>({
        id: makeDatabaseID(),
      });
      const dto = instanceToPlain(new <%= singular(classify(name)) %>Dto(<%= singular(camelize(name)) %>));

      expect(dto).toMatchObject({
        id: <%= singular(camelize(name)) %>.id,
        created_at: <%= singular(camelize(name)) %>.createdAt.toISOString(),
        updated_at: <%= singular(camelize(name)) %>.updatedAt.toISOString(),
      });
    });
  });
});
