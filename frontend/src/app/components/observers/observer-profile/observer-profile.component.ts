import { Component, OnInit } from '@angular/core';
import { ObserverProfileForm } from './observer-profile.form';
import { ObserversService } from 'app/services/observers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageState } from 'app/models/page-state.model';

@Component({
  selector: 'app-observer-profile',
  templateUrl: './observer-profile.component.html',
  styleUrls: ['./observer-profile.component.scss']
})
export class ObserverProfileComponent implements OnInit {

  observerProfileForm: ObserverProfileForm;
  pageState: PageState;

  constructor(
    private observerService: ObserversService,
    private route: ActivatedRoute,
    private router: Router) {
    this.observerProfileForm = new ObserverProfileForm();
  }

  ngOnInit() {
    this.initRouteListener();
  }

  private initRouteListener() {
    this.route.params.subscribe((params) => {
      this.pageState = params['state'];
      this.handleFormState();
      this.getObserverOnViewPageState(params);
    });
  }

  saveObserver() {
    if (this.pageState === PageState.NEW) this.addNewObserver();
    else this.saveChanges();
  }

  private saveChanges() {
    this.observerService.saveChanges(this.observerProfileForm.value)
      .subscribe(() => this.router.navigateByUrl('/observatori/profil/view/123'));
  }

  private addNewObserver() {
    this.observerService.addNewObserver(this.observerProfileForm.value)
      .subscribe(() => this.router.navigateByUrl('/observatori/profil/view/123'));
  }
  
  private handleFormState() {
    if (this.pageState === PageState.VIEW)
      this.observerProfileForm.disable();
    else
      this.observerProfileForm.enable();
  }

  private getObserverOnViewPageState(params) {
    if (this.pageState === PageState.VIEW) {
      this.observerService.getObserver(params['id'])
        .subscribe((observer: Observer) => {
          if (observer) this.observerProfileForm.patchValue(observer)
        });
    }
  }
}
