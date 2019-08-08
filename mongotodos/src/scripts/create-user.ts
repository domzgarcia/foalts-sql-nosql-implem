import 'module-alias/register';

// 3p
import { Config } from '@foal/core';
import { connect, disconnect } from 'mongoose';

// App
import { createUser } from '../app/models';

export const schema = {
  properties: {
    email: { type: 'string' },
    password: { type: 'string' }
  },
  required: [ 'email', 'password'],
  type: 'object',
};

export async function main(args) {
  const uri = Config.get<string>('mongodb.uri');
  connect(uri, { useNewUrlParser: true, useCreateIndex: true });
  try {
    console.log(
      await createUser(args.email, args.password)
    );
  } catch (error) {
    console.log(error.message);
  } finally {
    disconnect();
  }
}