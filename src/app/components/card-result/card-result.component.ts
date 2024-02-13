import { Component, Input, OnInit } from '@angular/core';
import { ResultSimulator } from 'src/app/interfaces/result-simulator';

@Component({
  selector: 'app-card-result',
  templateUrl: './card-result.component.html',
  styleUrls: ['./card-result.component.css']
})
export class CardResultComponent implements OnInit {

  @Input() data: ResultSimulator;

  constructor() {
  }

  ngOnInit(): void {
  }

}
