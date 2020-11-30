import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ObserversService } from 'src/app/services/observers.service';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';

@Component({
  selector: 'observer-import',
  templateUrl: './observer-import.component.html',
  styleUrls: ['./observer-import.component.scss']
})
export class ObserverImportComponent implements OnInit {

  formGroup: FormGroup

  constructor (
    private fb: FormBuilder,
    private toastr: ToastrService,
    private observerService: ObserversService,
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      ngoId: ['', Validators.required],
      file: ['', Validators.required],
    });
  }

  onSubmit () {
    const formData = new FormData();
    formData.append('file', this.formGroup.get('file').value);
    formData.append('ongId', this.formGroup.get('ngoId').value);

    this.observerService.uploadCsv(formData).subscribe(
      (res) => {
        this.toastr.success(
          `${res} observers have been added successfully`,
          'Success'
        );
      },
      (err) => {
        this.toastr.error('Encountered error while uploading csv', 'Error');
      }
    );
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.get('file').setValue(file);
    }
  }
}
