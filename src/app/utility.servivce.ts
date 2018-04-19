import {Injectable} from '@angular/core';

@Injectable()
export class UtilityService
{
    isLogged(): Promise<boolean>{
        if(typeof (Storage) !== 'undefined'){
            if(sessionStorage.getItem('SessionId'))
            {
                return Promise.resolve(true);
            }
        }
        return Promise.resolve(false);
    }
}