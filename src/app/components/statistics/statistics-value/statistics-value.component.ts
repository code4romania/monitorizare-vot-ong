import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-statistics-value',
    styleUrls: ['./statistics-value.component.scss'],
    templateUrl: './statistics-value.component.html'
})
export class StatisticsValueComponent implements OnInit {

    @Input()
    label: string;

    @Input()
    value: string;

    @Input()
    index: number;


    constructor() { }

    ngOnInit() { }
}
