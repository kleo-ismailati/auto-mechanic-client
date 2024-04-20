import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-stat-card',
    templateUrl: './stat-card.component.html',
    styleUrls: ['./stat-card.component.css'],
})
export class StatCardComponent {
    @Input() statTitle: string = '';
    @Input() statIconClass: string = '';
    @Input() statValue: string = '';
    @Input() routeUrl: string = '';
    @Input() routeText: string = '';
}
