import { Component, OnInit } from '@angular/core';
import { faCoffee, faGift, faHospital, } from '@fortawesome/free-solid-svg-icons'




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  //font awesome icons
  faCoffee  = faCoffee
  faHospital = faHospital
  faGift = faGift

  
  

  ngOnInit() {}
  
}
