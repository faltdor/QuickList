import { Component } from '@angular/core';
import { NavController,AlertController,Platform } from 'ionic-angular';
import { ChecklistPage } from '../checklist/checklist';
import { ChecklistModel } from '../../models/checklist-model';
import { Data } from '../../providers/data';
import { Keyboard } from 'ionic-native';
import { IntroPage } from '../intro/intro';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	checklist : ChecklistModel[] = [];

  constructor(public navCtrl: NavController, 
  			  public dataService:Data, 
  			  public alertCtrl: AlertController,
  			  public storage : Storage ,
  			  public platform: Platform) {
    
  }

  ionViewDidLoad(){
  	this.platform.ready().then(() =>{

  		this.storage.get('introShown').then((result) =>{
  			if(!result){
  				this.storage.set('introShown',true);
  				this.navCtrl.setRoot(IntroPage);
  			}
  		});


  		this.dataService.getData().then((checklist) => {
  			let saveChecklist: any = false;
  			if(typeof(checklist) != 'undefined'){
  				saveChecklist = JSON.parse(checklist);
  			}

  			if(saveChecklist){
  				saveChecklist.forEach((saveChecklist) => {
  					let loadChecklist = new ChecklistModel(saveChecklist.title,saveChecklist.items);
  					this.checklist.push(loadChecklist);

  					loadChecklist.checklist.subscribe(update =>{
  						this.save();
  					});
  				});
  			}
  		});
  	});

  }

  addChecklist(): void{
  	let prompt = this.alertCtrl.create({
  		title:'New Checklist',
  		message: 'Enter the name of your new checklist below:',
  		inputs: [{
  			name: 'name'
  		}],
  		buttons:[
	  		{
	  			text:'Cancel'
	  		},
	  		{
	  			text: 'Save',
	  			handler: data =>{
	  				let newChecklist = new ChecklistModel(data.name,[]);
	  				this.checklist.push(newChecklist);
	  				newChecklist.checklist.subscribe(update=>{
	  					this.save();
	  				});
	  			this.save();	
	  			}
	  		}
  		]
  	});

  	prompt.present();
  }

  renameChecklist(checklist):void{
  	let prompt = this.alertCtrl.create({
  		title:'Rename Checklist',
  		message:'Enter the new name of this checklist below:',
  		inputs: [{name:'name'}],
  		buttons:[
  			{
  				text:'Cancel'
  			},
  			{
  				text:'Save',
  				handler: data => {
  					let index = this.checklist.indexOf(checklist);
  					if(index > -1){
  						this.checklist[index].setTitle(data.name);
  						this.save();
  					}
  				}
  			}
  		]
  	});
  	prompt.present();
  }

  viewChecklist(checklist):void{
  		this.navCtrl.push(ChecklistPage,{checklist:checklist});
  }

  removeChecklist(checklist): void{
  	let  index = this.checklist.indexOf(checklist);

  	if(index > -1){
  		this.checklist.splice(index,1);
  		this.save();
  	}
  }

  save():void{
  	Keyboard.close();
  	this.dataService.save(this.checklist);
  }


}
