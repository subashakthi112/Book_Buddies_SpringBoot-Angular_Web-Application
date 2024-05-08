import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { SubscriptionPlan } from '../../models/subscription-plan';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent {
  
  subscriptionPlan:SubscriptionPlan[]=[];

subscriptionPlans:SubscriptionPlan[]=[
    new SubscriptionPlan(1,"DAILY",1,20.0,),
    new SubscriptionPlan(2,"WEEKLY",7,100.0),
    new SubscriptionPlan(3,"MONTHLY",30,500.0)
    
];
@Output() planSelected=new EventEmitter<SubscriptionPlan>();
constructor(private dialogRef:MatDialogRef<SubscribeComponent>){
}
ngOnInit():void{}
selectPlan(plan:SubscriptionPlan):void{
  this.planSelected.emit(plan);
  this.dialogRef.close();
  
}

}
  


