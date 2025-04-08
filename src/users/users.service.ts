
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(email: string, password: string): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const hashedPassword = await bcrypt.hash(password, 10);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newUser = new this.userModel({ email, password: hashedPassword });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
