import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

export const swagger_config = new DocumentBuilder()
  .addBearerAuth(
    {
      type: 'http',
      name: 'Bearer auth',
      in: 'Moderator avtoriszatsiya',
      description: 'Bearer token',
    },
    'admin_auth',
  )
  .addOAuth2(
    {
      type: 'oauth2',
      name: 'Google OAuth',
      in: 'Google avtoriszatsiya',
      description: 'oauth2 token',
      flows: {
        authorizationCode: {
          authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
          scopes: {
            admin: 'Admin Scope',
          },
          refreshUrl: 'http://localhost:3000/google/redirect',
          tokenUrl: 'https://www.googleapis.com/oauth2/v4/token',
        },
      },
      // "x-tokenName": 'id_token',
    },
    'oauth2_auth',
  )
  .setTitle('API doc for Invan application')
  .setDescription("Qo'ldan kelgancha qilindi)")
  .setVersion('1.0.0')
  .build();

export const swagger_options: SwaggerCustomOptions = {
  customSiteTitle: 'Invan Communicator',
  // customfavIcon: 'https://pos.in1.uz/api/static/invan.jpg',
  customfavIcon: 'https://pos.in1.uz/api/static/invan.png',
  customCss: `
          .topbar {
              background-color: #315881 !important;
              padding: 20px !important;
          }
          .topbar-wrapper img {
            content:url(https://pos.in1.uz/api/static/invan_swagger_logo.png);
            width:auto;
            height:auto;
          }
          .swagger-ui .topbar { 
            border-bottom: 5px solid #5dc6d1;
          }`,
};

export function setSwaggerPaths(document: OpenAPIObject): OpenAPIObject {
  for (const path of Object.keys(document.paths)) {
    let is_open = false;
    const params: [
      { name: string; in: 'query' | 'header' | 'path' | 'cookie' },
    ] = [{ name: 'any', in: 'cookie' }];
    let param = '';
    params.shift();
    for (let i = 0; i < path.length; i++) {
      if (path[i] === '{') is_open = true;
      if (is_open && path[i] !== '}' && path[i] !== '{') param += path[i];

      if (is_open && param.length && path[i + 1] === '}') {
        params.push({ name: param, in: 'path' });
      }
      if (path[i + 1] === '}') {
        is_open = false;
        param = '';
      }
    }
    if (path.includes('{')) {
      for (const method of Object.keys(document.paths[path])) {
        document.paths[path][method].parameters?.unshift(...params);
      }
    }
  }
  return document;
}
