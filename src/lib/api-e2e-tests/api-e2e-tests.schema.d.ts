import { Path } from '@angular-devkit/core';

export interface ApiE2eTestsOptions {
  /**
   * The name of the resource.
   */
  name: string;
  /**
   * The path to create the e2e tests.
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
   * Specifies the file suffix of spec files.
   * @default "spec"
   */
  specFileSuffix?: string;
  /**
   * Flag to indicate if a directory is created.
   */
  flat?: boolean;
}
