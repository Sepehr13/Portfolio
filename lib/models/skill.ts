export class Skill {
  id: number;
  title: string;
  description: string;
  image: string;

  constructor(data: Skill) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.image = data.image;
  }
}