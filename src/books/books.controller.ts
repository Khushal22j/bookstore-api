import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BooksService } from './books.service';

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() body: any) {
    return this.booksService.create(body);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.booksService.findAll(query); // ✅ pass query to service
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.booksService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.delete(id);
  }
}
