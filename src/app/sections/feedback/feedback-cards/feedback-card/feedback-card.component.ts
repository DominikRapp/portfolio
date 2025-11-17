import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback-card.component.html',
  styleUrl: './feedback-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackCardComponent {
  @Input() text: string = 'Testcard Nummer 1';
  @Input() author: string = 'Max Mustermann';
  @Input() role: string = 'Role';
  @Input() showQuote: boolean = false;
  
  get authorLine(): string {
    return `${this.author} - ${this.role}`;
  }
}
