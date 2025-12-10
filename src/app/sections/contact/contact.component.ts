import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { TranslationService } from '../../core/translation.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', './contact-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnDestroy {
  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
  };
  privacyConsent = false;
  mailTest = false;
  isNameFocused = false;
  isEmailFocused = false;
  isMessageFocused = false;
  successVisible = false;
  isSubmitting = false;
  cooldownRemaining = 0;

  private cooldownEndTime = 0;
  private cooldownTimerId: number | null = null;
  private readonly SUCCESS_TOAST_DURATION = 3000;
  private readonly COOLDOWN_MS = 60000;

  constructor(
    private translation: TranslationService,
    private cdr: ChangeDetectorRef
  ) { }

  t(key: string): string {
    return this.translation.t(key);
  }

  getNamePlaceholder(nameControl: NgModel, form: NgForm): string {
    const hasError =
      form.submitted && nameControl.invalid && !this.isNameFocused;
    if (hasError) {
      return this.t('contact.placeholder.nameError');
    }
    return this.t('contact.placeholder.name');
  }

  getEmailPlaceholder(_: NgModel, __: NgForm): string {
    return this.t('contact.placeholder.email');
  }

  getMessagePlaceholder(messageControl: NgModel, form: NgForm): string {
    const hasError =
      form.submitted && messageControl.invalid && !this.isMessageFocused;
    if (hasError) {
      return this.t('contact.placeholder.messageError');
    }
    return this.t('contact.placeholder.message');
  }

  shouldShowFieldError(control: NgModel, form: NgForm): boolean {
    if (this.cooldownRemaining > 0) {
      return false;
    }
    if (!control) {
      return false;
    }

    const invalid = !!control.invalid;
    const interacted = !!(control.dirty || control.touched);

    return invalid && (interacted || form.submitted);
  }

  shouldShowNameError(control: NgModel, form: NgForm): boolean {
    if (this.cooldownRemaining > 0 || !control) {
      return false;
    }

    const value = String(control.value ?? '');
    const invalid = !!control.invalid;
    const interacted = !!(control.dirty || control.touched || form.submitted);

    if (!invalid || !interacted) {
      return false;
    }

    const threeSpacesInRow = value.includes('   ');
    const doubleHyphen = value.includes('--');
    const endsWithSoft = value.endsWith(' ') || value.endsWith('-');

    if (endsWithSoft && !threeSpacesInRow && !doubleHyphen) {
      return false;
    }

    return true;
  }

  shouldShowEmailError(control: NgModel, form: NgForm): boolean {
    if (this.cooldownRemaining > 0 || !control) {
      return false;
    }

    const invalid = !!control.invalid;
    const blurred = !!control.touched;
    const submitted = form.submitted;

    return invalid && (blurred || submitted);
  }

  getNameErrorText(control: NgModel, form: NgForm): string {
    if (!this.shouldShowNameError(control, form)) {
      return '';
    }

    if (control.errors?.['required']) {
      return this.t('contact.placeholder.nameMissing');
    }

    if (control.errors?.['pattern']) {
      return this.t('contact.placeholder.nameError');
    }

    return this.t('contact.placeholder.nameError');
  }

  getEmailErrorText(control: NgModel, form: NgForm): string {
    if (!this.shouldShowEmailError(control, form)) {
      return '';
    }

    if (control.errors?.['required']) {
      return this.t('contact.placeholder.emailMissing');
    }

    if (control.errors?.['email'] || control.errors?.['pattern']) {
      return this.t('contact.placeholder.emailError');
    }

    return this.t('contact.placeholder.emailError');
  }

  getMessageErrorText(control: NgModel, form: NgForm): string {
    if (!this.shouldShowFieldError(control, form)) {
      return '';
    }
    if (control.errors?.['required']) {
      return this.t('contact.placeholder.messageMissing');
    }
    if (control.errors?.['pattern']) {
      return this.t('contact.placeholder.messageError');
    }
    return this.t('contact.placeholder.messageError');
  }

  shouldShowPrivacyError(
    nameControl: NgModel,
    emailControl: NgModel,
    messageControl: NgModel,
    privacyControl: NgModel,
    form: NgForm
  ): boolean {
    if (this.cooldownRemaining > 0) {
      return false;
    }
    if (!form.submitted) {
      return false;
    }
    if (!nameControl?.valid) {
      return false;
    }
    if (!emailControl?.valid) {
      return false;
    }
    if (!messageControl?.valid) {
      return false;
    }
    return !!privacyControl?.invalid;
  }


  onSubmit(form: NgForm): void {
    if (!this.canSubmit(form)) {
      return;
    }
    if (this.mailTest) {
      this.handleSuccess(form);
      return;
    }
    this.sendMail(form);
  }

  canSubmit(form: NgForm): boolean {
    if (this.isSubmitting) {
      return false;
    }
    if (!form.form.valid) {
      return false;
    }
    if (this.isInCooldown()) {
      this.updateCooldown();
      return false;
    }
    return true;
  }

  isInCooldown(): boolean {
    if (!this.cooldownEndTime) {
      return false;
    }
    const now = Date.now();
    return now < this.cooldownEndTime;
  }

  sendMail(form: NgForm): void {
    this.isSubmitting = true;
    this.cdr.markForCheck();
    this.http
      .post(
        this.post.endPoint,
        this.post.body(this.contactData),
        this.post.options
      )
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.handleSuccess(form);
        },
        error: (error) => {
          console.error(error);
          this.isSubmitting = false;
          this.cdr.markForCheck();
        },
      });
  }

  handleSuccess(form: NgForm): void {
    form.resetForm();
    this.privacyConsent = false;
    this.showSuccessToast();
    this.startCooldown();
  }

  post = {
    endPoint: 'https://dominik-rapp.at/sendMail.php',
    body: (payload: unknown) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
      },
      responseType: 'text' as const,
    },
  };

  showSuccessToast(): void {
    this.successVisible = true;
    this.cdr.markForCheck();
    window.setTimeout(() => {
      this.successVisible = false;
      this.cdr.markForCheck();
    }, this.SUCCESS_TOAST_DURATION);
  }

  startCooldown(): void {
    this.cooldownEndTime = Date.now() + this.COOLDOWN_MS;
    this.updateCooldown();
    if (this.cooldownTimerId !== null) {
      clearInterval(this.cooldownTimerId);
    }
    this.cooldownTimerId = window.setInterval(() => {
      this.updateCooldown();
    }, 1000);
  }

  updateCooldown(): void {
    const now = Date.now();
    const remainingMs = this.cooldownEndTime - now;
    if (remainingMs <= 0) {
      this.cooldownRemaining = 0;
      this.clearCooldownTimer();
    } else {
      this.cooldownRemaining = Math.ceil(remainingMs / 1000);
    }
    this.cdr.markForCheck();
  }

  clearCooldownTimer(): void {
    if (this.cooldownTimerId !== null) {
      clearInterval(this.cooldownTimerId);
      this.cooldownTimerId = null;
    }
  }

  ngOnDestroy(): void {
    this.clearCooldownTimer();
  }
}
