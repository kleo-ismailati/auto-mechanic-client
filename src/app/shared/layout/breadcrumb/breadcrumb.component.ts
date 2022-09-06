import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  constructor(protected router : Router) {
    this.firstLink = router.url;
  }

  @Input() parentsList!: Array<{link: string, label: string}>;
  @Input() currentPage!: string;
  firstLink: string = '';

  ngOnInit(): void {
  }

}
