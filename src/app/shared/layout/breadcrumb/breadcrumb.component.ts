import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Breadcrumb } from '../../models/breadcrumb.model';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
    constructor(protected router: Router) {
        this.firstLink = router.url;
    }

    @Input() parentsList!: Breadcrumb[];
    @Input() currentPage!: string;
    firstLink: string = '';

    ngOnInit(): void {}
}
