// SQLite3: https://www.youtube.com/watch?v=QjICgmk31js
// NODEJS: http://www.sqlitetutorial.net/sqlite-nodejs/connect/

import { Get, 
  Delete, 
  Post, 
  HttpResponseOK, 
  Context, 
  HttpResponseCreated, 
  HttpResponseNotFound,
  HttpResponseNoContent,
  // Sanitation
  ValidateBody, ValidateParams

} from '@foal/core';
import { getRepository } from 'typeorm';
import { Todo } from '../entities';

export class ApiController {

  @Get('/')
  index(ctx) {
    return new HttpResponseOK('Hello world!');
  }

  @Get('/todos')
  async getTodos() {
    const todos = await getRepository(Todo).find();
    return new HttpResponseOK(todos);
  }

  @Post('/todos')
  @ValidateBody({
    additionalProperties: false,
    properties: {
      text: { type: 'string' }
    },
    required: [ 'text' ],
    type: 'object',
  })
  async postTodo(ctx: Context) {
    const todo = new Todo();
    todo.text = ctx.request.body.text;
    await getRepository(Todo).save(todo);
    return new HttpResponseCreated(todo);
  }

  @Delete('/todos/:id')
  @ValidateParams({
    properties: {
      id: { type: 'number' }
    },
    type: 'object',
  })
  async deleteTodo(ctx: Context) {
    const todo = await getRepository(Todo).findOne({ id: ctx.request.params.id });
    if (!todo) {
      return new HttpResponseNotFound();
    }
    await getRepository(Todo).remove(todo);
    return new HttpResponseNoContent();
  }

}
