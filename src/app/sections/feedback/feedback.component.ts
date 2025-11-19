import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackCardComponent } from './feedback-cards/feedback-card/feedback-card.component';
import { TranslationService } from '../../core/translation.service';

type FeedbackItem = {
  textKey: string;
  authorKey: string;
  roleKey: string;
};

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FeedbackCardComponent],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent {
  readonly items: FeedbackItem[] = [
    {
      textKey: 'feedback.item.1.text',
      authorKey: 'feedback.item.1.author',
      roleKey: 'feedback.item.1.role',
    },
    {
      textKey: 'feedback.item.2.text',
      authorKey: 'feedback.item.2.author',
      roleKey: 'feedback.item.2.role',
    },
    {
      textKey: 'feedback.item.3.text',
      authorKey: 'feedback.item.3.author',
      roleKey: 'feedback.item.3.role',
    },
  ];

  activeIndex = 0;

  constructor(private translation: TranslationService) { }

  t(key: string): string {
    return this.translation.t(key);
  }

  get prevIndex(): number {
    return (this.activeIndex - 1 + this.items.length) % this.items.length;
  }

  get nextIndex(): number {
    return (this.activeIndex + 1) % this.items.length;
  }

  next(): void {
    this.activeIndex = this.nextIndex;
  }

  prev(): void {
    this.activeIndex = this.prevIndex;
  }

  trackByIndex(i: number): number {
    return i;
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.prev();
    } else if (event.key === 'ArrowRight') {
      this.next();
    }
  }
}
