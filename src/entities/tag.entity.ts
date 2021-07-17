import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quote } from './quote.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Quote, (quote) => quote.tags)
  quotes: Quote[];
}
