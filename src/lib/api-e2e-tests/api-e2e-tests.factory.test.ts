import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { ApiE2eTestsOptions } from './api-e2e-tests.schema';

describe('API E2E Tests Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json'),
  );

  it('should generate e2e test file', async () => {
    const options: ApiE2eTestsOptions = {
      name: 'users',
      flat: true,
    };
    const tree: UnitTestTree = await runner
      .runSchematicAsync('api-e2e-tests', options)
      .toPromise();
    const files: string[] = tree.files;

    expect(
      files.find((filename) => filename === '/users.e2e.spec.ts'),
    ).toBeDefined();
  });

  it('should generate e2e test with correct structure', async () => {
    const options: ApiE2eTestsOptions = {
      name: 'users',
      flat: true,
    };
    const tree: UnitTestTree = await runner
      .runSchematicAsync('api-e2e-tests', options)
      .toPromise();

    const content = tree.readContent('/users.e2e.spec.ts');
    expect(content).toContain('describe(\'/v1/users\'');
    expect(content).toContain('POST /v1/users');
    expect(content).toContain('GET /v1/users');
    expect(content).toContain('GET /v1/users/:id');
    expect(content).toContain('PATCH /v1/users/:id');
    expect(content).toContain('DELETE /v1/users/:id');
  });

  it('should handle plural names correctly', async () => {
    const options: ApiE2eTestsOptions = {
      name: 'users',
      flat: true,
    };
    const tree: UnitTestTree = await runner
      .runSchematicAsync('api-e2e-tests', options)
      .toPromise();

    const content = tree.readContent('/users.e2e.spec.ts');
    expect(content).toContain('UserDto');
    expect(content).toContain('CreateUserDto');
    expect(content).toContain('User ');
    expect(content).toContain('UsersService');
  });

  it('should generate e2e test with custom spec suffix', async () => {
    const options: ApiE2eTestsOptions = {
      name: 'users',
      flat: true,
      specFileSuffix: 'test',
    };
    const tree: UnitTestTree = await runner
      .runSchematicAsync('api-e2e-tests', options)
      .toPromise();
    const files: string[] = tree.files;

    expect(
      files.find((filename) => filename === '/users.e2e.spec.ts'),
    ).toBeUndefined();
    expect(
      files.find((filename) => filename === '/users.e2e.test.ts'),
    ).toBeDefined();
  });

  it('should normalize names to kebab-case', async () => {
    const options: ApiE2eTestsOptions = {
      name: 'userProfiles',
      flat: true,
    };
    const tree: UnitTestTree = await runner
      .runSchematicAsync('api-e2e-tests', options)
      .toPromise();
    const files: string[] = tree.files;

    expect(
      files.find((filename) => filename === '/user-profiles.e2e.spec.ts'),
    ).toBeDefined();
  });
});
