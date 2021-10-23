import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import appConfig from './config/app.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(morgan('common'));

    // swagger
    const options = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    // run
    await app.listen(appConfig.port, appConfig.host, () =>
        console.log(`Backend is running on port ${appConfig.port} and host ${appConfig.host}`),
    );
}

bootstrap().catch(() => console.log('error while initializing app'));
