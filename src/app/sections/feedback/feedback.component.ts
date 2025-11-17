import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackCardComponent } from './feedback-cards/feedback-card/feedback-card.component';

type FeedbackItem = { text: string; author: string; role: string };

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
    { text: 'text 1', author: 'H. Janisch', role: 'Team Partner' },
    { text: 'text 2', author: 'T. Schulz', role: 'Frontend Developer' },
    { text: 'text 3', author: 'A. Example', role: 'Project Manager' },
  ];

  activeIndex = 0;

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
    if (event.key === 'ArrowLeft') this.prev();
    else if (event.key === 'ArrowRight') this.next();
  }
}
