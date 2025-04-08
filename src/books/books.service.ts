import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  create(book: any): Promise<Book> {
    const newBook = new this.bookModel(book);
    return newBook.save();
  }

  async findAll(query: any): Promise<Book[]> {
    const {
      author,
      category,
      rating,
      title,
      page = 1,
      limit = 10,
      sortBy = 'title',
      order = 'asc',
    } = query;

    const filter: any = {};

    if (author) filter.author = author;
    if (category) filter.category = category;
    if (rating) filter.rating = Number(rating);
    if (title) filter.title = { $regex: title, $options: 'i' };

    const skip = (page - 1) * limit;
    const sortOrder = order === 'desc' ? -1 : 1;

    return this.bookModel
      .find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(Number(skip))
      .limit(Number(limit))
      .exec();
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: string, updateData: any): Promise<Book> {
    const book = await this.bookModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async delete(id: string): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Book not found');
  }
}
