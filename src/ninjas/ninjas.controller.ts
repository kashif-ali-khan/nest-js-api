import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { NinjasService } from './ninjas.service';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
  constructor(readonly ninjasService: NinjasService) {}
  @Get()
  @UseGuards(BeltGuard)
  getNinjas(@Query('skill') skill: string) {
    console.log(skill, 'skill');
    return this.ninjasService.getNinJasBySkill(skill);
  }

  @Get(':id')
  getNinja(@Param('id', ParseIntPipe) id: number, @Query('type') type: string) {
    try {
      console.log(type, 'type');

      return this.ninjasService.getNinjaById(id);
    } catch (error) {
      return new NotFoundException(error);
    }
  }

  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    console.log(createNinjaDto, 'createNinjaDto');
    return this.ninjasService.create(createNinjaDto);
  }

  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.update(+id, updateNinjaDto);
  }

  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return this.ninjasService.remove(+id);
  }
}
