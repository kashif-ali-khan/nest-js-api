import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  ninjas = [
    { id: 1, name: 'kashif', age: 25, skill: 'nodejs' },
    { id: 2, name: 'karthik', age: 45, skill: 'nestjs' },
    // { name: 'Rohit', age: 21, skill: 'reactjs' },
    // { name: 'Rahul', age: 31, skill: 'nextjs' },
    // { name: 'Akash', age: 38, skill: 'angular' },
    // { name: 'Nikhil', age: 10, skill: 'nestjs' },
  ];

  getNinJasBySkill(skill: string) {
    if (!skill) {
      return this.ninjas;
    }
    return this.ninjas.filter((ninja) => ninja.skill.includes(skill));
  }

  getNinjaById(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    if (!ninja) {
      throw new Error('Ninja not found');
    }
    return ninja;
  }
  create(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      ...createNinjaDto,
      id:
        this.ninjas.reduce((maxId, ninja) => Math.max(maxId, ninja.id), 0) + 1,
    };
    return this.ninjas.push(newNinja);
  }

  update(id: number, updateNinjaDto: UpdateNinjaDto) {
    const index = this.ninjas.findIndex((ninja) => ninja.id === id);
    if (index === -1) {
      return null;
    }
    this.ninjas[index] = { ...this.ninjas[index], ...updateNinjaDto };
    return this.ninjas[index];
  }

  remove(id: number) {
    const index = this.ninjas.findIndex((ninja) => ninja.id === id);
    console.log(index, 'index');
    if (index === -1) {
      return null;
    }
    this.ninjas.splice(index, 1);
    return this.ninjas;
  }
}
