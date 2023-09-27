import { User } from "src/users/users.entity"
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class Post{

    @PrimaryGeneratedColumn()
    id:number
    @Column()
    title:string
    @Column()
    content:string

    @Column()
    authorId: number;

    @ManyToOne(()=>User,user =>user.post)
    author: User;

     }