import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationService } from '../../core/translation.service';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  standalone: true,
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyComponent {

  constructor(private translation: TranslationService) { }

  t(key: string): string {
    return this.translation.t(key);
  }
}
