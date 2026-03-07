import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UseGuards,Get, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService){}

  @Post('register')
  @HttpCode(201)
  async register(@Body() body: CreateUserDto){

    return this.usersService.createUser(body);

  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginUserDto){

    return this.usersService.login(body);

  }

  @Get("profile")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req){
    return req.user;
  }



}