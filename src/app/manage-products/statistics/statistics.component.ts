import { Component, OnInit } from '@angular/core';
import { ManageProductsService } from 'src/app/Services/manage-products.service';
import { Statistics } from 'src/app/models/statistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  
  private statistics:Statistics;

  //hide and show spinner
  spinnerShown:boolean = true;

  constructor(private manageProductsService:ManageProductsService) { }

  ngOnInit() {
    this.getStatistics();
  }

  getStatistics()
  {
    this.manageProductsService.getStatistics()
    .subscribe(
      result=>{
        this.spinnerShown = false;
        this.statistics = result;
        // console.log(this.statistics);
      },
      error=>{
        this.spinnerShown = false;
        console.log("An error occurred while getting statistics in StatisticsComponent: ", error);
      }
    );
  }

}
