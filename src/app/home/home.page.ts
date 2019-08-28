import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

isValid : boolean = false;

show = true;
results = {
  gender:"",
  age:0,
  firstCar: "",
  under18: '',
  licenced: "",
  range: "",
  targetable: "",
  drifting : "",
  driveTrain : "",
  amount : 0,
  models : []
};
answers = []
  input: any[];
  constructor(public alert: AlertController, public storage: Storage) {
    this.getUserDetails().then((details)=>{
      if (details){
        this.answers = JSON.parse(details)
      }
    })
  }

checkAge(){
  if(this.results.age < 18){
  this.sendAlert('Thank you for your interest in helping BMW').then(()=>{
    this.answers.push(this.results)
    this.storage.set("result", JSON.stringify(this.answers)).then(()=>{
      this.show = false
    })
  })
  }else if((this.results.age >  18) && (this.results.age < 25))
this.isValid = true
else
this.isValid = false
}

radioGroupLicence($results){
this.results.licenced =$results.detail.value
if (!($results.detail.value == "true")){
this.sendAlert('Thank you for your interest in helping BMW').then(()=>{
  this.answers.push(this.results)
  this.storage.set("result", JSON.stringify(this.answers)).then(()=>{
    this.show = false
  })
})

}}
async sendAlert(x){
  const alertC = await this.alert.create({
    header: 'Alert',
    subHeader: 'Thank you for your time!',
    message: x,
    buttons: ['OK']
  });
await alertC.present();
}
radioGroupFirstCar($results){
  this.results.firstCar= $results.detail.value
  if (($results.detail.value == "true"))
  this.sendAlert('We are targeting more experienced clients, thank you for your interest').then(()=>{
    this.answers.push(this.results)
    this.storage.set("result", JSON.stringify(this.answers)).then(()=>{
      this.show = false
    })
  })
}
radioGroupDriveTrain($results){
  this.results.driveTrain = $results.detail.value;
}

radioGroupDrifting($results){
  this.results.drifting = $results.detail.value
  //($results.detail.value == "true")
}

populateModels(){
  this.results.models = []
for (let index = 0; index < this.results.amount; index++) {
  this.results.models.push({model:"", validated : false})
  
}
}
checkValid(ind){
  
    if ((/^(?:\D*\d){3}\D*$/gm.test(this.results.models[ind].model)) || (/^(x|X|z|Z)\d{1}$/gm.test(this.results.models[ind].model))) {
      this.results.models[ind].validated = true
  }else{
    this.results.models[ind].validated = false
  }
}
empty(str:string[]){
  let k =0;
  let lngth = str.length;
  for (let index = 0; index < lngth; index++) {
    if (typeof str[index] == 'undefined' || !str[index] || str[index].length === 0 || str[index] === "" || !/[^\s]/.test(str[index]) || /^\s*$/.test(str[index]) || str[index].replace(/\s/g,"") === "")
    {
       k++;
    }
    
  }
  if(k != 0)
 
return k == 0;
}
submit(){
  let valid = true
  if (this.results.amount > 0) {
    for (let index = 0; index < this.results.models.length; index++) {
      if (!this.results.models[index]) {
        valid = false
      }
      
    }   
  }if(valid){
    this.answers.push(this.results);
   this.storage.set("result", JSON.stringify(this.answers)).then(()=>{
     this.show = false
   })
 console.log(this.answers) 
   
  }
     
}
async getUserDetails() {
  let details = await this.storage.get('result');
  return details;
}

}
