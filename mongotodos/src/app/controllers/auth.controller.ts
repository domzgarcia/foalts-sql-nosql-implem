// 3p
import {
  Context, 
  // dependency, 
  HttpResponseRedirect, 
  Post, 
  // removeSessionCookie,
  // Session, 
  // setSessionCookie, 
  // TokenRequired, 
  ValidateBody, 
  verifyPassword,
  Config,
  HttpResponseOK,
  dependency, 
  // Config
} from '@foal/core';
import { sign } from 'jsonwebtoken';
import { JWTRequired } from '@foal/jwt';
import { User } from '../models/index';
import { CsrfTokenRequired, setCsrfCookie, getCsrfToken } from '@foal/csrf';
import { response } from 'express';
import { DataProvider, Sahog } from '../services/index'; 

// using custom function
const getUserById = async (id: string) => {
  console.log('[id]', id);
  const user = await User.findOne({_id: id});
  return user;
}

export class AuthController {
  @dependency dataProvider: DataProvider;
  @dependency sahog: Sahog;

  @Post('/login')
  @ValidateBody({
    additionalProperties: false,
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
    },
    required: ['email', 'password'],
    type: 'object',
  })

  async login(ctx: Context) {
    const x = this.sahog.consoleme()
    console.log('[service]', x);

    const user = await this.dataProvider.getUser(ctx.request.body.email);
    if (!user) {
      return new HttpResponseRedirect('/signin?bad_credentials=true');
    }
    if (!await verifyPassword(ctx.request.body.password, user.password)) {
      return new HttpResponseRedirect('/signin?bad_credentials=true');
    }
    const secret= Config.get<string>('settings.jwt.secretOrPublicKey')
    const signedToken = sign({ 
      email: user.email,
      sub: user.id,
      id: user.id,
     }, 
      secret, { expiresIn: '1h' });
    
    const csrfToken = await getCsrfToken()
    console.log('[any]', csrfToken);
    const response = new HttpResponseOK({
      token: signedToken, 
      csrf: csrfToken,
    });
    setCsrfCookie(response, csrfToken);
    return response;
  }

  // @JWTRequired()
  @JWTRequired({
    cookie: false,
    user: <any>getUserById,
  })
  @CsrfTokenRequired({ doubleSubmitCookie: true })
  @Post('/checker')
  async checker(ctx: Context){
    console.log('[checker]', ctx.user);
    return new HttpResponseOK();
  }
}

  /*
  @Post('/logout')
  @TokenRequired({
    cookie: true,
    extendLifeTimeOrUpdate: false,
    redirectTo: '/signin',
    store: TypeORMStore,
  })
  async logout(ctx: Context<User, Session>) {
    await this.store.destroy(ctx.session.sessionID);
    const response = new HttpResponseRedirect('/signin');
    removeSessionCookie(response);
    return response;
  }
}*/