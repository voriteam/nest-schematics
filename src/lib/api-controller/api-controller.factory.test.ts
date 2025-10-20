import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { ApiControllerOptions } from './api-controller.schema';

describe('API Controller Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json'),
  );

  describe('with CRUD enabled', () => {
    it('should generate controller with CRUD endpoints', async () => {
      const options: ApiControllerOptions = {
        name: 'users',
        skipImport: true,
        flat: true,
        crud: true,
        isSwaggerInstalled: true,
      };
      const tree: UnitTestTree = await runner
        .runSchematicAsync('api-controller', options)
        .toPromise();
      const files: string[] = tree.files;

      expect(
        files.find((filename) => filename === '/users.controller.ts'),
      ).toBeDefined();

      const content = tree.readContent('/users.controller.ts');
      expect(content).toContain('public async create');
      expect(content).toContain('public async findAll');
      expect(content).toContain('public async findOne');
      expect(content).toContain('public async update');
      expect(content).toContain('public async remove');
      expect(content).toContain('@Post()');
      expect(content).toContain('@Get()');
      expect(content).toContain('@Get(\':id\')');
      expect(content).toContain('@Patch(\':id\')');
      expect(content).toContain('@Delete(\':id\')');
    });

    it('should include Swagger decorators when isSwaggerInstalled is true', async () => {
      const options: ApiControllerOptions = {
        name: 'users',
        skipImport: true,
        flat: true,
        crud: true,
        isSwaggerInstalled: true,
      };
      const tree: UnitTestTree = await runner
        .runSchematicAsync('api-controller', options)
        .toPromise();

      const content = tree.readContent('/users.controller.ts');
      expect(content).toContain('@ApiOperation');
      expect(content).toContain('@ApiCreatedResponse');
      expect(content).toContain('@ApiOkResponse');
      expect(content).toContain('@ApiNotFoundResponse');
      expect(content).toContain('from \'@nestjs/swagger\'');
    });

    it('should not include Swagger decorators when isSwaggerInstalled is false', async () => {
      const options: ApiControllerOptions = {
        name: 'users',
        skipImport: true,
        flat: true,
        crud: true,
        isSwaggerInstalled: false,
      };
      const tree: UnitTestTree = await runner
        .runSchematicAsync('api-controller', options)
        .toPromise();

      const content = tree.readContent('/users.controller.ts');
      expect(content).not.toContain('@ApiOperation');
      expect(content).not.toContain('from \'@nestjs/swagger\'');
    });
  });

  describe('with CRUD disabled', () => {
    it('should generate controller without CRUD endpoints', async () => {
      const options: ApiControllerOptions = {
        name: 'users',
        skipImport: true,
        flat: true,
        crud: false,
      };
      const tree: UnitTestTree = await runner
        .runSchematicAsync('api-controller', options)
        .toPromise();

      const content = tree.readContent('/users.controller.ts');
      expect(content).toContain('export class UsersController');
      expect(content).not.toContain('public async create');
      expect(content).not.toContain('public async findAll');
      expect(content).not.toContain('@Post()');
    });
  });

  describe('naming', () => {
    it('should handle plural names correctly', async () => {
      const options: ApiControllerOptions = {
        name: 'users',
        skipImport: true,
        flat: true,
        crud: true,
      };
      const tree: UnitTestTree = await runner
        .runSchematicAsync('api-controller', options)
        .toPromise();

      const content = tree.readContent('/users.controller.ts');
      expect(content).toContain('export class UsersController');
      expect(content).toContain('UserDto');
      expect(content).toContain('CreateUserDto');
      expect(content).toContain('UpdateUserDto');
    });

    it('should normalize names to kebab-case', async () => {
      const options: ApiControllerOptions = {
        name: 'userProfiles',
        skipImport: true,
        flat: true,
      };
      const tree: UnitTestTree = await runner
        .runSchematicAsync('api-controller', options)
        .toPromise();
      const files: string[] = tree.files;

      expect(
        files.find((filename) => filename === '/user-profiles.controller.ts'),
      ).toBeDefined();
    });
  });
});
