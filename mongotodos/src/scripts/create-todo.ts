// 3p
import { Config } from '@foal/core';
import { connect, disconnect } from 'mongoose';

// App
import { Todo } from '../app/models';

export const schema = {
  properties: {
    text: { type: 'string' }
  },
  required: [ 'text' ],
  type: 'object',
};

export async function main(args) {
  const uri = Config.get<string>('mongodb.uri');
  connect(uri, { useNewUrlParser: true, useCreateIndex: true });
  const todo = new Todo();
  todo.text = args.text;

  try {
    console.log(
      await todo.save()
    );
  } catch (error) {
    console.log(error.message);
  } finally {
    disconnect();
  }
}