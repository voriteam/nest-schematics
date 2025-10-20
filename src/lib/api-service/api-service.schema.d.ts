import { Path } from '@angular-devkit/core';

export interface ApiServiceOptions {
  /**
   * The name of the service.
   */
  name: string;
  /**
   * The path to create the service.
   */
  path?: string | Path;
  /**
   * The source root path
   */
  sourceRoot?: string;
  /**
   * Application language.
   */
  language?: string;
  /**
   * Specifies if spec files are generated.
   */
  spec?: boolean;
  /**
   * Specifies the file suffix of spec files.
   * @default "spec"
   */
  specFileSuffix?: string;
  /**
   * The path to insert the module declaration.
   */
  module?: Path;
  /**
   * Directive to insert declaration in module.
   */
  skipImport?: boolean;
  /**
   * Metadata name affected by declaration insertion.
   */
  metadata?: string;
  /**
   * When true, CRUD entry points are generated.
   */
  crud?: boolean;
  /**
   * Flag to indicate if a directory is created.
   */
  flat?: boolean;
}
