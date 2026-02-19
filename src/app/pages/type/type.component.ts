import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from "@angular/material/grid-list";

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css'],
  imports: [MatGridListModule]
})
export class TypeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
