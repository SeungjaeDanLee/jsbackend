import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from './multer.options';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Operation when calling http://localhost:3000/file-upload
  // using the POST method
  // @Post('file-upload')
  // @UseInterceptors(FileInterceptor('file'))
  // // Receive the file given by the interceptor
  // fileUpload(@UploadedFile() file: Express.Multer.File) {
  //   // Print text file contents
  //   console.log(file.buffer.toString('utf-8'));
  //   return 'File Upload';
  // }

  @Post('file-upload')
  @UseInterceptors(FileInterceptor('file', multerOption))
  fileUpload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    // Return uploaded filename and path
    return `${file.originalname} File Upload check http://localhost:3000/uploads/${file.filename}`;
  }
}
