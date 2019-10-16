import {Component, OnInit} from '@angular/core';
import {ObserverProfileForm} from './observer-profile.form';
import {ObserversService} from 'app/services/observers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PageState} from 'app/models/page-state.model';
import {Observer} from '../../../models/observer.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-observer-profile',
  templateUrl: './observer-profile.component.html',
  styleUrls: ['./observer-profile.component.scss']
})
export class ObserverProfileComponent implements OnInit {

  observerProfileForm: ObserverProfileForm;
  observer: Observer;
  pageState: PageState;

  constructor(
    private observerService: ObserversService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
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
      this.getObserver(params);
    });
  }

  saveObserver() {
    if (this.pageState === PageState.NEW) {
      this.addNewObserver();
    } else {
      this.saveChanges();
    }
  }

  deleteObserver() {
    if (confirm('Are you sure you want to remove this observer?')) {
      this.observerService.deleteObserver(this.observer.id)
        .subscribe((data) => {
          this.toastr.warning('Success', 'Observer has been removed');
          this.router.navigateByUrl('/observatori');
        });
    }
  }

  private saveChanges() {
    this.observerService.saveChanges(this.observerProfileForm.value, this.observer)
      .subscribe((data) => {
        this.toastr.success('Success', 'Changes have been saved');
      });
  }

  private addNewObserver() {
    this.observerService.addNewObserver(this.observerProfileForm.value)
      .subscribe((value) => {
        this.toastr.success('Success', 'Observer has been added');
        this.router.navigateByUrl('/observatori');
      });
  }

  private handleFormState() {
    if (this.pageState === PageState.VIEW) {
      this.observerProfileForm.disable();
    } else {
      this.observerProfileForm.enable();
    }
  }

  private getObserver(params) {
    if (this.pageState !== PageState.NEW) {
      this.observerService.getObserver(params['id'])
        .subscribe((observers: Array<Observer>) => {
          if (observers) {
            this.observer = observers[0];
            this.observerProfileForm.patchValue(observers[0]);
          }
        });
    }
  }
}
