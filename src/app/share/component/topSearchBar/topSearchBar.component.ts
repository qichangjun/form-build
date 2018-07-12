import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'top-search-bar',
  templateUrl: './topSearchBar.component.html',
  styleUrls: ['./topSearchBar.component.scss'],
})
export class TopSearchBarComponent implements OnInit {
  constructor(
    private router : Router,
  ) { }

  ngOnInit() {
  }

}
