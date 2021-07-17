import { Body, Controller, Get, Param, Post, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from './entities/quote.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('random')
  async getRandomQuote(@Headers() headers): Promise<Quote | string> {
    const quote = await this.appService.getRandomQuote();
    const contentType = headers['content-type'];
    if (contentType === 'application/json') {
      return this.appService.getRandomQuote();
    } else {
      return `"${quote.quote}" - ${quote.attributed}`;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.appService.findOne(id);
  }

  @Get()
  async getQuote(@Headers() headers): Promise<Quote | string> {
    const quote = await this.appService.getRandomQuote();
    const contentType = headers['content-type'];
    if (contentType === 'application/json') {
      return this.appService.getRandomQuote();
    } else {
      return `"${quote.quote}" - ${quote.attributed}`;
    }
  }

  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.appService.create(createQuoteDto);
  }
}
