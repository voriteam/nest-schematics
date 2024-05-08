<% if (isSwaggerInstalled) { %>import { PartialType } from '@nestjs/swagger';<% } else { %>import { PartialType } from '@nestjs/mapped-types';<% } %>
import { BaseEntityDto } from '@vori/nest/libs/dto/base-entity.dto';
import { <%= classify(singular(name)) %> } from '../entities/<%= singular(name) %>.entity';

export class <%= singular(classify(name)) %>Dto extends BaseEntityDto {
  public constructor(<%= singular(camelize(name)) %>: <%= singular(classify(name)) %>) {
    super(<%= singular(camelize(name)) %>);
  }
}

export class Create<%= singular(classify(name)) %>Dto {
  public constructor(data?: Partial<Create<%= singular(classify(name)) %>Dto>) {
    Object.assign(this, data);
  }
}

export class Update<%= singular(classify(name)) %>Dto extends PartialType(Create<%= singular(classify(name)) %>Dto) {}
