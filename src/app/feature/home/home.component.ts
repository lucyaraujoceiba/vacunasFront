import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor() { }

 

  ngOnInit() {
    this.obtener();
  }

  obtener(){
  /*  const trmcol = require('trmcol');
    trmcol.query('2018-03-30')
  .then(trm => console.log(trm))
  .catch(err => console.log(err))*/
  }
}
