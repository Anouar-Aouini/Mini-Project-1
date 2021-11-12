import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  path: any;
  constructor(private route:ActivatedRoute) { }
  ngOnInit(): void {
        this.route.params.subscribe(
      (params: Params) => {
        this.path= params;
          })
  }
}
