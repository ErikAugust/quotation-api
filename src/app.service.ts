import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';
import { Tag } from './entities/tag.entity';
import { v4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createQuoteDto: CreateQuoteDto) {
    const tags = await Promise.all(
      createQuoteDto.tags.map((name) => this.preloadTagByName(name)),
    );
    const quote = this.quoteRepository.create({
      ...createQuoteDto,
      uuid: v4(),
      tags,
    });
    return this.quoteRepository.save(quote);
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new NotFoundException();
    }
    const quote = await this.quoteRepository.findOne(id, {
      relations: ['tags'],
    });
    if (!quote) {
      throw new NotFoundException('Quote not found');
    }
    return quote;
  }

  async getRandomQuote() {
    const count = await this.quoteRepository.count();
    const id = Math.floor(Math.random() * count) + 1;
    const quote = await this.quoteRepository.findOne(id, {
      relations: ['tags'],
    });
    return quote;
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const existingTag = await this.tagRepository.findOne({ name });
    if (existingTag) {
      return existingTag;
    }
    return this.tagRepository.create({ name });
  }
}
