import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({ selector: 'app-community-section', templateUrl: './community-section.component.html', styleUrls: ['./community-section.component.scss'] })
export class CommunitySectionComponent {
  form = this.fb.group({ email: ['', [Validators.required, Validators.email]] });
  constructor(private fb: FormBuilder, private toastr: ToastrService) {}
  submit(){ if(this.form.invalid) return this.form.markAllAsTouched(); this.toastr.success('Thanks for joining the Artify community!'); this.form.reset(); }
}
