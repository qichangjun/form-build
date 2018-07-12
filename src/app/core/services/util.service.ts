import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
    constructor() { }
    isArrRepeat(arr) {
        let len = arr.length
        let out = []
        let counts = {}
        let i = 0
        while (i < len) {
            var item = arr[i]
            counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1
            if (counts[item] == 2) {
                out.push(item)
            }                
            i++
        }            
        return out.length == 0
    }

    hasEmpty(arr){
        console.log(arr)
        for (let i=0;i < arr.length;i++){
            if (!arr[i]){
                console.log(true)
                return true 
            }
        }
        return false 
    }


    sortArrBy(name) {
        return function(o, p) {
            var a, b;
            a = void 0;
            b = void 0;
            if (typeof o === 'object' && typeof p === 'object' && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                if (a < b) {
                return -1;
                } else {
                return 1;
                }
            }
            if (typeof a < typeof b) {
                return -1;
            } else {
                return 1;
            }
            } else {
            throw 'error';
            }
        };
    };

}
