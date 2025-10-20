<% if (crud) { %>import { Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';<% if (isSwaggerInstalled) { %>
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';<% } %>
import { RequestWithBannerUser } from '@vori/nest/libs/auth/types';
import { ApiEndpoint } from '@vori/nest/libs/decorators';
import { FindOneParams } from '@vori/nest/params/FindOneParams';<% } else { %>import { Controller } from '@nestjs/common';<% } %>
import { <%= classify(name) %>Service } from './<%= name %>.service';<% if (crud) { %>
import { <%= singular(classify(name)) %>Dto, Create<%= singular(classify(name)) %>Dto, Update<%= singular(classify(name)) %>Dto } from './dto/<%= singular(name) %>.dto';<% } %>

// TODO Add tags to group endpoints in Swagger UI
@ApiEndpoint({ prefix: '<%= dasherize(name) %>', tags: [] })
export class <%= classify(name) %>Controller {
  constructor(private readonly <%= lowercased(name) %>Service: <%= classify(name) %>Service) {}<% if (crud) { %>
<% if (isSwaggerInstalled) { %>
  @ApiOperation({ operationId: 'create<%= singular(classify(name)) %>' })
  @ApiCreatedResponse({ type: <%= singular(classify(name)) %>Dto })
  @ApiBadRequestResponse()<% } %>
  @Post()
  public async create(
    @Req() request: RequestWithBannerUser,
    @Body() create<%= singular(classify(name)) %>Dto: Create<%= singular(classify(name)) %>Dto
  ): Promise<<%= singular(classify(name)) %>Dto> {
    const <%= singular(camelize(name)) %> = await this.<%= lowercased(name) %>Service.create({bannerID: request.user.bannerID, dto: create<%= singular(classify(name)) %>Dto});
    return new <%= singular(classify(name)) %>Dto(<%= singular(camelize(name)) %>);
  }
<% if (isSwaggerInstalled) { %>
  @ApiOperation({ operationId: 'list<%= singular(classify(name)) %>' })
  @ApiOkResponse({ type: <%= singular(classify(name)) %>Dto, isArray: true })<% } %>
  @Get()
  public async findAll(@Req() request: RequestWithBannerUser): Promise<<%= singular(classify(name)) %>Dto[]> {
    const <%= camelize(name) %> = await this.<%= lowercased(name) %>Service.findAll({bannerID: request.user.bannerID});
    return <%= camelize(name) %>.map(<%= singular(camelize(name)) %> => new <%= singular(classify(name)) %>Dto(<%= singular(camelize(name)) %>));
  }
<% if (isSwaggerInstalled) { %>
  @ApiOperation({ operationId: 'get<%= singular(classify(name)) %>' })
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: <%= singular(classify(name)) %>Dto })<% } %>
  @Get(':id')
  public async findOne(@Req() request: RequestWithBannerUser, @Param() params: FindOneParams) {
    const <%= singular(camelize(name)) %> = await this.<%= lowercased(name) %>Service.findOne({bannerID: request.user.bannerID, id: params.id});
    return new <%= singular(classify(name)) %>Dto(<%= singular(camelize(name)) %>);
  }
<% if (isSwaggerInstalled) { %>
  @ApiOperation({ operationId: 'update<%= singular(classify(name)) %>' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: <%= singular(classify(name)) %>Dto })<% } %>
  @Patch(':id')
  public async update(@Req() request: RequestWithBannerUser, @Param() params: FindOneParams, @Body() update<%= singular(classify(name)) %>Dto: Update<%= singular(classify(name)) %>Dto) {
    const <%= singular(camelize(name)) %> = await this.<%= lowercased(name) %>Service.update({bannerID: request.user.bannerID, id: params.id, dto: update<%= singular(classify(name)) %>Dto});
    return new <%= singular(classify(name)) %>Dto(<%= singular(camelize(name)) %>);
  }
<% if (isSwaggerInstalled) { %>
  @ApiOperation({ operationId: 'delete<%= singular(classify(name)) %>' })
  @ApiNotFoundResponse()
  @ApiNoContentResponse()<% } %>
  @Delete(':id')
  public async remove(@Req() request: RequestWithBannerUser, @Param() params: FindOneParams): Promise<void> {
    await this.<%= lowercased(name) %>Service.remove({bannerID: request.user.bannerID, id: params.id});
  }<% } %>
}
