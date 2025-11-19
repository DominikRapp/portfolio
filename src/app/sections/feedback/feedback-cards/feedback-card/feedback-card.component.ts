import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../../core/translation.service';

@Component({
  selector: 'app-feedback-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback-card.component.html',
  styleUrl: './feedback-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackCardComponent {
  @Input() text: string = '';
  @Input() author: string = '';
  @Input() role: string = '';
  @Input() showQuote: boolean = false;

  constructor(private translation: TranslationService) {}

  t(key: string): string {
    return this.translation.t(key);
  }

  get authorLine(): string {
    return `${this.author} – ${this.role}`;
  }
}
