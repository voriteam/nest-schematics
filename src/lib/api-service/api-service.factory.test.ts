import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { ApiServiceOptions } from './api-service.schema';

describe('API Service Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json'),
  );

  describe('with CRUD enabled', () => {
    it('should generate service with CRUD methods', async () => {
      const options: ApiServiceOptions = {
        name: 'users',
        skipImport: true,
        flat: true,
        crud: true,
      };
      const tree: UnitTestTree = await runner
        .runSchematicAsync('api-service', options)
        .toPromise();
      const files: string[] = tree.files;

      expect(
        files.find((filename) => filename === '/users.service.ts'),
      ).toBeDefined();

      const content = tree.readContent('/users.service.ts');
      expect(content).toContain('public async create');
      expect(content).toContain('public async findAll');
      expect(content).toContain('public async findOne');
      expect(content).toContain('public async update');
      expect(content).toContain('public async remove');
      expect(content).toContain('private dtoToModel');
    });

    it('should generate spec file with CRUD enabled', async () => {
      const options: ApiServiceOptions = {
        name: 'users',
        skipImport: true,
        flat: true,
        crud: true,
        spec: true,
      };
      const tree: UnitTestTree = await runner
        .runSchematicAsync('api-service', options)
        .toPromise();
      const files: string[] = tree.files;

      expect(
        files.find((filename) => filename === '/users.service.spec.ts'),
      ).toBeDefined();
    });
  });

  describe('with CRUD disabled', () => {
    it('should generate service without CRUD methods', async () => {
      const options: ApiServiceOptions = {
        name: 'users',
        skipImport: true,
        flat: true,
        crud: false,
      };
      const tree: UnitTestTree = await runner
        .runSchematicAsync('api-service', options)
        .toPromise();

      const content = tree.readContent('/users.service.ts');
      expect(content).not.toContain('public async create');
      expect(content).not.toContain('public async findAll');
      expect(content).not.toContain('private dtoToModel');
    });
  });

  describe('spec file generation', () => {
    it('should not generate spec file when spec is false', async () => {
      const options: ApiServiceOptions = {
        name: 'users',
        skipImport: true,
        flat: true,
        spec: false,
      };
      const tree: UnitTestTree = await runner
        .runSchematicAsync('api-service', options)
        .toPromise();
      const files: string[] = tree.files;

      expect(
        files.find((filename) => filename === '/users.service.spec.ts'),
      ).toBeUndefined();
    });

    it('should generate spec file with custom suffix', async () => {
      const options: ApiServiceOptions = {
        name: 'users',
        skipImport: true,
        flat: true,
        spec: true,
        specFileSuffix: 'test',
      };
      const tree: UnitTestTree = await runner
        .runSchematicAsync('api-service', options)
        .toPromise();
      const files: string[] = tree.files;

      expect(
        files.find((filename) => filename === '/users.service.spec.ts'),
      ).toBeUndefined();
      expect(
        files.find((filename) => filename === '/users.service.test.ts'),
      ).toBeDefined();
    });
  });

  describe('naming', () => {
    it('should handle plural names correctly', async () => {
      const options: ApiServiceOptions = {
        name: 'users',
        skipImport: true,
        flat: true,
        crud: true,
      };
      const tree: UnitTestTree = await runner
        .runSchematicAsync('api-service', options)
        .toPromise();

      const content = tree.readContent('/users.service.ts');
      expect(content).toContain('export class UsersService');
      expect(content).toContain('import { User } from');
      expect(content).toContain('CreateUserDto');
      expect(content).toContain('UpdateUserDto');
    });

    it('should normalize names to kebab-case', async () => {
      const options: ApiServiceOptions = {
        name: 'userProfiles',
        skipImport: true,
        flat: true,
      };
      const tree: UnitTestTree = await runner
        .runSchematicAsync('api-service', options)
        .toPromise();
      const files: string[] = tree.files;

      expect(
        files.find((filename) => filename === '/user-profiles.service.ts'),
      ).toBeDefined();
    });
  });
});
