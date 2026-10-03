export class Work {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];

  constructor(data: Omit<Work, 'tags'> & { tags: string }) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.image = data.image;
    this.link = data.link;
    this.tags = data.tags.split(',').map(tag => tag.trim());
  }
}