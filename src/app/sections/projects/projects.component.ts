import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectOverlayComponent, ProjectData, ProjectPayload } from './projects-overlays/project-overlay/project-overlay.component';

type PreviewPos = 'top' | 'middle' | 'bottom';
type ProjectKey = 'join' | 'epl' | 'daba';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  previewSrc: string | null = null;
  previewVisible = false;
  previewPos: PreviewPos = 'top';

  private readonly order: ProjectKey[] = ['join', 'epl', 'daba'];

  private readonly projectsMap: Record<ProjectKey, ProjectData> = {
    join: {
      id: '01',
      title: 'Join',
      description:
        'Task manager inspired by the Kanban System. Create and organize tasks using drag-and-drop, assign users and categories.',
      image: 'assets/img/join-overlay.jpg',
      techs: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
      links: { github: '#', live: '#' },
    },
    epl: {
      id: '02',
      title: 'El Pollo Loco',
      description:
        'Jump, run and throw items based on an object-oriented approach. Help Pepe collect coins and Tabasco bottles.',
      image: 'assets/img/epl-overlay.jpg',
      techs: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
      links: { github: '#', live: '#' },
    },
    daba: {
      id: '03',
      title: 'DABubble',
      description:
        'A Slack-like app for real-time team communication with channels, mentions, and clean UI.',
      image: 'assets/img/daba-overlay.jpg',
      techs: ['HTML', 'CSS', 'Angular', 'TypeScript', 'Firebase'],
      links: { github: '#', live: '#' },
    },
  };

  constructor(private dialog: MatDialog) { }

  showPreview(src: string, pos: PreviewPos): void {
    this.previewSrc = src;
    this.previewPos = pos;
    this.previewVisible = true;
  }

  hidePreview(): void {
    this.previewVisible = false;
  }

  openProject(key: ProjectKey): void {
    const projects: ProjectData[] = this.order.map(k => this.projectsMap[k]);
    const startIndex = this.order.indexOf(key);
    const payload: ProjectPayload = { projects, startIndex };

    const ref = this.dialog.open(ProjectOverlayComponent, {
      data: payload,
      ariaLabel: `${this.projectsMap[key].title} details`,
      autoFocus: true,
      restoreFocus: false,
      maxWidth: '1760px',
      maxHeight: '900px',
      panelClass: 'project-dialog-panel',
    });

    ref.afterClosed().subscribe(() => this.hidePreview());
  }
}
