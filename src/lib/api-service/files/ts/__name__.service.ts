import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';<% if (crud) { %>
import { Create<%= singular(classify(name)) %>Dto, Update<%= singular(classify(name)) %>Dto } from './dto/<%= singular(name) %>.dto';<% } %>
import { <%= classify(singular(name)) %> } from './entities/<%= singular(name) %>.entity';

@Injectable()
export class <%= classify(name) %>Service {
  private readonly logger = new Logger(<%= classify(name) %>Service.name);

  constructor(
    @InjectRepository(<%= classify(singular(name)) %>)
    private readonly <%= camelize(name) %>Repository: Repository<<%= classify(singular(name)) %>>
  ) {}
<% if (crud) { %>
  public async create({bannerID, dto}: {bannerID: string, dto: Create<%= singular(classify(name)) %>Dto}): Promise<<%= classify(singular(name)) %>> {
    const <%= singular(camelize(name)) %> = this.dtoToModel(dto);

    // TODO Adjust if the data is not associated with a banner
    // NOTE: Set this only on creation. Banner IDs are not allowed to change.
      <%= singular(camelize(name)) %>.bannerID = bannerID;

    return this.<%= camelize(name) %>Repository.save(<%= singular(camelize(name)) %>);
  }

  public async findAll({bannerID}: {bannerID: string}): Promise<<%= classify(singular(name)) %>[]> {
    // TODO Adjust the query if the data is not associated with a banner
    return this.<%= camelize(name) %>Repository.find({
      comment: `controller='<%= classify(name) %>Service',action='findAll'`,
      where: { bannerID },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  public async findOne({bannerID, id}: {bannerID: string; id: string}): Promise<<%= classify(singular(name)) %>> {
    // TODO Adjust the query if the data is not associated with a banner
    return this.<%= camelize(name) %>Repository.findOneOrFail({
      comment: `controller='<%= classify(name) %>Service',action='findOne'`,
      where: { id: id.toString(), bannerID },
    });
  }

  public async update({bannerID, id, dto}: {bannerID: string; id: string; dto: Update<%= singular(classify(name)) %>Dto}): Promise<<%= classify(singular(name)) %>> {
    const <%= singular(camelize(name)) %> = await this.findOne({bannerID, id});
    const updates = this.dtoToModel(dto);
    return this.<%= camelize(name) %>Repository.save(
      this.<%= camelize(name) %>Repository.merge(<%= singular(camelize(name)) %>, updates)
    );
  }

  public async remove({bannerID, id}: {bannerID: string; id: string}): Promise<void> {
    const <%= singular(camelize(name)) %> = await this.findOne({bannerID, id});
    await this.<%= camelize(name) %>Repository.remove(<%= singular(camelize(name)) %>);
  }

  private dtoToModel(
      dto: Create<%= singular(classify(name)) %>Dto | Update<%= singular(classify(name)) %>Dto
  ): <%= classify(singular(name)) %> {
    // TODO Adjust fields as needed
    return this.<%= camelize(name) %>Repository.create({
      ...dto,
    });
  }
<% } %>}
