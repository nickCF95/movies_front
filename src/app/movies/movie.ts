import { Category } from '../categories/category';
export class Movie {
    id!: string;
    name!: string;
    director!: string;
    category!: Category;
}
