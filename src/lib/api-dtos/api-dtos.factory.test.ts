import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { ApiDtosOptions } from './api-dtos.schema';

describe('API DTOs Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json'),
  );

  it('should generate DTO files', async () => {
    const options: ApiDtosOptions = {
      name: 'users',
      flat: true,
    };
    const tree: UnitTestTree = await runner
      .runSchematicAsync('api-dtos', options)
      .toPromise();
    const files: string[] = tree.files;

    expect(
      files.find((filename) => filename === '/dto/user.dto.ts'),
    ).toBeDefined();
  });

  it('should generate DTO with correct class names', async () => {
    const options: ApiDtosOptions = {
      name: 'users',
      flat: true,
    };
    const tree: UnitTestTree = await runner
      .runSchematicAsync('api-dtos', options)
      .toPromise();

    const content = tree.readContent('/dto/user.dto.ts');
    expect(content).toContain('export class UserDto');
    expect(content).toContain('export class CreateUserDto');
    expect(content).toContain('export class UpdateUserDto');
  });

  it('should use @nestjs/swagger when isSwaggerInstalled is true', async () => {
    const options: ApiDtosOptions = {
      name: 'users',
      flat: true,
      isSwaggerInstalled: true,
    };
    const tree: UnitTestTree = await runner
      .runSchematicAsync('api-dtos', options)
      .toPromise();

    const content = tree.readContent('/dto/user.dto.ts');
    expect(content).toContain('from \'@nestjs/swagger\'');
  });

  it('should use @nestjs/mapped-types when isSwaggerInstalled is false', async () => {
    const options: ApiDtosOptions = {
      name: 'users',
      flat: true,
      isSwaggerInstalled: false,
    };
    const tree: UnitTestTree = await runner
      .runSchematicAsync('api-dtos', options)
      .toPromise();

    const content = tree.readContent('/dto/user.dto.ts');
    expect(content).toContain('from \'@nestjs/mapped-types\'');
  });

  describe('spec file generation', () => {
    it('should generate spec file when spec is true', async () => {
      const options: ApiDtosOptions = {
        name: 'users',
        flat: true,
        spec: true,
      };
      const tree: UnitTestTree = await runner
        .runSchematicAsync('api-dtos', options)
        .toPromise();
      const files: string[] = tree.files;

      expect(
        files.find((filename) => filename === '/dto/user.dto.spec.ts'),
      ).toBeDefined();
    });

    it('should not generate spec file when spec is false', async () => {
      const options: ApiDtosOptions = {
        name: 'users',
        flat: true,
        spec: false,
      };
      const tree: UnitTestTree = await runner
        .runSchematicAsync('api-dtos', options)
        .toPromise();
      const files: string[] = tree.files;

      expect(
        files.find((filename) => filename === '/dto/user.dto.spec.ts'),
      ).toBeUndefined();
    });

    it('should generate spec file with custom suffix', async () => {
      const options: ApiDtosOptions = {
        name: 'users',
        flat: true,
        spec: true,
        specFileSuffix: 'test',
      };
      const tree: UnitTestTree = await runner
        .runSchematicAsync('api-dtos', options)
        .toPromise();
      const files: string[] = tree.files;

      expect(
        files.find((filename) => filename === '/dto/user.dto.spec.ts'),
      ).toBeUndefined();
      expect(
        files.find((filename) => filename === '/dto/user.dto.test.ts'),
      ).toBeDefined();
    });
  });

  it('should normalize names to kebab-case', async () => {
    const options: ApiDtosOptions = {
      name: 'userProfiles',
      flat: true,
    };
    const tree: UnitTestTree = await runner
      .runSchematicAsync('api-dtos', options)
      .toPromise();
    const files: string[] = tree.files;

    expect(
      files.find((filename) => filename === '/dto/user-profile.dto.ts'),
    ).toBeDefined();
  });
});
