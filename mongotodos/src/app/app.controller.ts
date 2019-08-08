import { controller, Get, render, Context } from '@foal/core';

import { ApiController, AuthController } from './controllers';
import { JWTOptional } from '@foal/jwt';


export class AppController {
  subControllers = [
    controller('/api', ApiController),
    controller('/auth', AuthController)
  ];
  
  @JWTOptional()
  @Get('/')
  index(ctx: Context) {
    return render('templates/index.html');
  }

  @Get('/signin')
  signin() {
    return render('templates/signin.html');
  }

  @Get('/signup')
  signup() {
    return render('templates/signup.html');
  }
}
