import { controller, Get, HttpResponseOK } from '@foal/core';
import { ApiController } from './controllers';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { readFile } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import FrontEndApp from '../@frontend/App';

export class AppController {
  subControllers = [
    controller('/api', ApiController)
  ];
  
  @Get('/react')
  async index() {
    
    const content = ReactDOMServer.renderToString(<FrontEndApp />);
    const response = new HttpResponseOK(`
      <style>.hidden{ display: none;}</style>
      <div id="root"></div>
      <div class="hidden" id="seo">
      ${content}
      </div>
      <script src="dist/bundle.js"></script>
    `);
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    return response;
  }

  /* 
  ** # If echo to html
  const spa = await this.getSPA();
  private async getSPA(): Promise<string> {
    const spa = await promisify(readFile)(join(__dirname, '../../','dist/bundle.js'), 'utf8');
    return spa;
  }*/
}
