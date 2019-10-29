import { Product } from './product';
import { User } from './user';
import { Timestamp } from 'rxjs';

export interface Purchase {
    id:number
    product:Product
    amount_paid:number
    date_paid:Date
    user:User
    status:String
}
