import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MESSAGES } from '../common/constants/messages.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    @InjectQueue('email-queue') private emailQueue: Queue,
  ) {}

  async createUser(data: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      data.password = hashedPassword;

      const user = await this.userModel.create(data);

      await this.emailQueue.add('send-welcome-email', {
        email: user.email,
      });

      return {
        message: MESSAGES.USER_CREATED,
        data: user,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Server Error');
    }
  }

  async login(data: LoginUserDto) {
    try {
      const user = await this.userModel.findOne({ email: data.email });

      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await bcrypt.compare(data.password, user.password);

      if (!isMatch) {
        throw new Error('Invalid password');
      }

      const token = this.jwtService.sign({
        id: user._id,
        email: user.email,
        role: user.role,
      });

      return {
        message: MESSAGES.LOGIN_SUCCESS,
        token: token,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Server Error');
    }
  }

  async getUsersByRole(role: string) {
    return await this.userModel.find({ role: role });
  }
}
