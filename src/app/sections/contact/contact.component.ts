import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { TranslationService } from '../../core/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss','./contact-mobile.component.scss',],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  privacyConsent = false;
  mailTest = true;

  isNameFocused = false;
  isEmailFocused = false;
  isMessageFocused = false;

  constructor(private translation: TranslationService) { }

  t(key: string): string {
    return this.translation.t(key);
  }

  getNamePlaceholder(nameControl: NgModel, form: NgForm): string {
    const hasError =
      form.submitted &&
      nameControl.invalid &&
      !this.isNameFocused &&
      !this.contactData.name;
    if (hasError) {
      return this.t('contact.placeholder.nameError');
    }
    return this.t('contact.placeholder.name');
  }

  getEmailPlaceholder(emailControl: NgModel, form: NgForm): string {
    const hasError =
      form.submitted &&
      emailControl.invalid &&
      !this.isEmailFocused &&
      !this.contactData.email;
    if (hasError) {
      return this.t('contact.placeholder.emailError');
    }
    return this.t('contact.placeholder.email');
  }

  getMessagePlaceholder(messageControl: NgModel, form: NgForm): string {
    const hasError =
      form.submitted &&
      messageControl.invalid &&
      !this.isMessageFocused &&
      !this.contactData.message;
    if (hasError) {
      return this.t('contact.placeholder.messageError');
    }
    return this.t('contact.placeholder.message');
  }

  onSubmit(ngForm: NgForm): void {
    const isValid = ngForm.submitted && ngForm.form.valid;
    if (!isValid) {
      return;
    }
    if (this.mailTest) {
      ngForm.resetForm();
      return;
    }
    this.http
      .post(this.post.endPoint, this.post.body(this.contactData))
      .subscribe({
        next: () => ngForm.resetForm(),
        error: (error) => console.error(error),
      });
  }

  post = {
    endPoint: 'https://deineDomain.de/sendMail.php',
    body: (payload: unknown) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };
}
