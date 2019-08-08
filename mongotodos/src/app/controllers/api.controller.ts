import {
  Context, Delete, Get, HttpResponseCreated, HttpResponseNoContent,
  HttpResponseNotFound, HttpResponseOK, Post,
  //validation
  ValidateBody, ValidateParams
} from '@foal/core';

import { Todo } from '../models';

export class ApiController {

  @Get('/todos')
  async getTodos() {
    const todos = await Todo.find();
    return new HttpResponseOK(todos);
  }

  @ValidateBody({
    additionalProperties: false,
    properties: {
      text: { type: 'string' }},
      required: [ 'text' ],
      type: 'object',
  })
  @Post('/todos')
  async postTodo(ctx: Context) {
    const todo = new Todo();
    todo.text = ctx.request.body.text;
    await todo.save();
    return new HttpResponseCreated(todo);
  }

  @Delete('/todos/:id')
  @ValidateParams({
    properties: {
      id: { type: 'string' }
    },
    type: 'object',
  })
  async deleteTodo(ctx: Context) {
    const todo = await Todo.findById(ctx.request.params.id);
    if (!todo) {
      return new HttpResponseNotFound();
    }
    await Todo.findByIdAndRemove(ctx.request.params.id);
    return new HttpResponseNoContent();
  }
}
