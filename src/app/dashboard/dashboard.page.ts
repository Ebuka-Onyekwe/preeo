import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
 answers = [];
 targetables = []
 average = 0;

  constructor(public storage : Storage) { }

  ngOnInit() {
    this.getUserDetails().then((details)=>{
      if (details){
        this.answers = JSON.parse(details)
        console.log(this.answers)
        this.showGraph()
      }
    })
  }
  ionViewDidEnter() {
   
  
  }
  async getUserDetails() {
    let details = await this.storage.get('result');
    return details;
  }
 showGraph(){
  let underage = 0;
  let unlicenced = 0
  let firstTimers = 0
  let target = 0
  let drifting = 0
  let idkfwd = 0
  for (let index = 0; index < this.answers.length; index++) {
    if(this.answers[index].age < 18)
    underage++;
  }
  for (let index = 0; index < this.answers.length; index++) {
    console.log(this.answers[index].licenced)
    if(this.answers[index].licenced == 'false')
    unlicenced++;
  }

  for (let index = 0; index < this.answers.length; index++) {
    if(this.answers[index].firstCar == 'true')
    firstTimers++;
  }
  for (let index = 0; index < this.answers.length; index++) {
    if(this.answers[index].drifting !== ''){
      target++;
      this.targetables.push(this.answers[index])
    }
  }
  for (let index = 0; index < this.answers.length; index++) {
    if(this.answers[index].drifting == 'true')
    drifting++;
  }
  for (let index = 0; index < this.answers.length; index++) {
    if(this.answers[index].driveTrain == 'FWD' || this.answers[index].driveTrain == 'idk' )
    idkfwd++;
  }
 
  console.log(unlicenced)
  console.log(firstTimers)
   
  let data = {
    datasets: [{
        data: [underage, this.answers.length],
        backgroundColor: ['rgb(38, 194, 129)', 'rgb(8, 94, 29)'],
         // array should have same number of elements as number of dataset
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        `UnderAged: ${(Math.round((underage/this.answers.length)*100) * 100)/100}%`,
        'Total Applicants'
    ],
   
};
let unlicenceddata = {
  datasets: [{
      data: [unlicenced, this.answers.length],
      backgroundColor: ['rgb(38, 194, 129)', 'rgb(8, 94, 29)'],
       // array should have same number of elements as number of dataset
  }],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [
    `UnLicenced: ${(Math.round((unlicenced/this.answers.length)*100) * 100)/100}%`,
      'Total Applicants'
  ],
 
};
let firstCardata = {
datasets: [{
    data: [firstTimers, this.answers.length],
    backgroundColor: ['rgb(38, 194, 129)', 'rgb(8, 94, 29)'],
     // array should have same number of elements as number of dataset
}],

// These labels appear in the legend and in the tooltips when hovering different arcs
labels: [
  `FirstTimers: ${(Math.round((firstTimers/this.answers.length)*100) * 100)/100}%`,
    'Total Applicants'
],

};

let targetdata = {
datasets: [{
    data: [target, this.answers.length],
    backgroundColor: ['rgb(38, 194, 129)', 'rgb(8, 94, 29)'],
     // array should have same number of elements as number of dataset
}],

// These labels appear in the legend and in the tooltips when hovering different arcs
labels: [
  `Target: ${(Math.round((target/this.answers.length)*100) * 100)/100}%`,
    'Total Applicants'
],

};

let driftdata = {
datasets: [{
    data: [drifting, this.answers.length],
    backgroundColor: ['rgb(38, 194, 129)', 'rgb(8, 94, 29)'],
     // array should have same number of elements as number of dataset
}],

// These labels appear in the legend and in the tooltips when hovering different arcs
labels: [
  `Care for drifting: ${(Math.round((drifting/this.answers.length)*100) * 100)/100}%`,
    'Total Applicants'
],

};
let drivedata = {
datasets: [{
    data: [idkfwd, this.answers.length],
    backgroundColor: ['rgb(38, 194, 129)', 'rgb(8, 94, 29)'],
     // array should have same number of elements as number of dataset
}],

// These labels appear in the legend and in the tooltips when hovering different arcs
labels: [
  `Drivetrain Preference: ${(Math.round((idkfwd/this.answers.length)*100) * 100)/100}%`,
    'Total Applicants'
],

};
var ctx = document.getElementById('myChart');
  var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    // options: options
});
var cty = document.getElementById('unlicencedChart');
  var myDoughnutChart = new Chart(cty, {
    type: 'doughnut',
    data: unlicenceddata,
    // options: options
});
var ctz = document.getElementById('firstTimeChart');
  var myDoughnutChart = new Chart(ctz, {
    type: 'doughnut',
    data: firstCardata,
    // options: options
});
var ctr = document.getElementById('targetChart');
  var myDoughnutChart = new Chart(ctr, {
    type: 'doughnut',
    data: targetdata,
    // options: options
});
var ctf= document.getElementById('driftingChart');
  var myDoughnutChart = new Chart(ctf, {
    type: 'doughnut',
    data: driftdata,
    // options: options
});
var cto = document.getElementById('driveTrainChart');
  var myDoughnutChart = new Chart(cto, {
    type: 'doughnut',
    data: drivedata,
    // options: options
});
let amount= 0
for (let index = 0; index < this.targetables.length; index++) {
  if(this.targetables[index].amount !== 0){
    amount+= this.targetables[index].amount;
  }
}
this.average = (Math.round((amount/this.targetables.length)*100))/100
 }
}
