import { getUser } from '../models/index';

export class DataProvider {
    getUser(email){
        return getUser(email);
    }
}
