import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationService } from '../../core/translation.service';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalNoticeComponent {

  constructor(private translation: TranslationService) { }

  t(key: string): string {
    return this.translation.t(key);
  }
}
