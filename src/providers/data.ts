import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {

  constructor(public storage: Storage) {
    console.log('Hello Data Provider');
  }

  getData():Promise<any>{
  	return this.storage.get('checklist');
  }

  save(data):void{
  	let saveData = [];

  	//Remove Observables
  	data.forEach((checklist) =>{
  		saveData.push({
  			title: checklist.title,
  			items: checklist.items

  		});
  	});

  	let newData = JSON.stringify(saveData);
  	this.storage.set('checklist',newData);
  }

}
