import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Headers,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from './entities/quote.entity';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('random')
  async getRandomQuote(
    @Headers() headers,
    @Res() res: Response,
  ): Promise<Quote | string> {
    const quote = await this.appService.getRandomQuote();
    const contentType = headers['content-type'];
    if (contentType === 'application/json') {
      return quote;
    } else {
      res.render('index', quote);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.appService.findOne(id);
  }

  @Get()
  async getQuote(
    @Headers() headers,
    @Res() res: Response,
  ): Promise<Quote | string> {
    const quote = await this.appService.getRandomQuote();
    const contentType = headers['content-type'];
    if (contentType === 'application/json') {
      return quote;
    } else {
      res.render('index', quote);
    }
  }

  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.appService.create(createQuoteDto);
  }
}
