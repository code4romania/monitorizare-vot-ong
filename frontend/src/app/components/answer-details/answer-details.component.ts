import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './answer-details.component.html',
  styleUrls: ['./answer-details.component.scss']
})
export class AnswerDetailsComponent implements OnInit {

  hasNotesParams = false;

  idObservator: number;
  idSectie: number;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(this.setParamsData.bind(this));
  }

  setParamsData(data){
    this.hasNotesParams = !!data['idObservator'] && !!data['idSectie'];

    this.idObservator = parseInt(data['idObservator']);
    this.idSectie = parseInt(data['idSectie']);

    this.hasNotesParams = this.hasNotesParams && !isNaN(this.idObservator) && !isNaN(this.idSectie);
  }

}
