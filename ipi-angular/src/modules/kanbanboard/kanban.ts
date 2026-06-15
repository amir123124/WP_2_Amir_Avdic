import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

declare var html2canvas: any;
declare var html2pdf: any;

interface KanbanTask {
  id: string;
  text: string;
  date: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  colorClass: string;
  tasks: KanbanTask[];
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kanban.html',
  styleUrl: './kanban.css',
  encapsulation: ViewEncapsulation.None,
})
export class KanbanComponent implements OnInit {

  @ViewChild('kanbanBoard') kanbanBoard!: ElementRef<HTMLElement>;

  columns: KanbanColumn[] = [
    { id: 'todo',       title: 'To Do',       colorClass: 'color-todo',     tasks: [] },
    { id: 'inprogress', title: 'In Progress', colorClass: 'color-progress', tasks: [] },
    { id: 'done',       title: 'Done',        colorClass: 'color-done',     tasks: [] },
  ];

  showEmailPopup = false;
  targetEmail = '';

  private draggedTask: { col: KanbanColumn; task: KanbanTask } | null = null;
  private readonly storageKey = 'ipiKanbanState';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadBoard();
  }

  // ── Dodavanje zadatka ──
  addTask(): void {
    this.columns[0].tasks.push({
      id: 'task-' + Date.now(),
      text: 'Klikni ovdje da izmijeniš tekst zadatka...',
      date: new Date().toLocaleDateString('bs'),
    });
    this.saveBoard();
  }

  // ── Drag & Drop ──
  onDragStart(ev: DragEvent, col: KanbanColumn, task: KanbanTask): void {
    this.draggedTask = { col, task };
    ev.dataTransfer?.setData('text/plain', task.id);
  }

  onDragOver(ev: DragEvent): void {
    ev.preventDefault();
  }

  onDrop(ev: DragEvent, targetCol: KanbanColumn): void {
    ev.preventDefault();
    if (!this.draggedTask) return;

    const { col: sourceCol, task } = this.draggedTask;
    this.draggedTask = null;

    if (sourceCol === targetCol) return;

    sourceCol.tasks = sourceCol.tasks.filter(t => t.id !== task.id);
    targetCol.tasks.push(task);
    this.saveBoard();
  }

  // ── Editovanje teksta zadatka ──
  onTaskBlur(ev: FocusEvent, task: KanbanTask): void {
    const text = (ev.target as HTMLElement).innerText.trim();
    task.text = text;
    this.saveBoard();
  }

  // ── Brisanje zadatka ──
  deleteTask(col: KanbanColumn, task: KanbanTask): void {
    col.tasks = col.tasks.filter(t => t.id !== task.id);
    this.saveBoard();
  }

  // ── Čišćenje cijele ploče ──
  clearBoard(): void {
    if (!confirm('Da li ste sigurni da želite obrisati sve zadatke sa ploče?')) return;
    this.columns.forEach(col => col.tasks = []);
    localStorage.removeItem(this.storageKey);
  }

  // ── Izvoz kao PNG ──
  saveAsPng(): void {
    const board = this.kanbanBoard?.nativeElement;
    if (!board) return;
    html2canvas(board, { backgroundColor: '#0f172a' }).then((canvas: HTMLCanvasElement) => {
      const link = document.createElement('a');
      link.download = 'kanban-izvjestaj.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  // ── Izvoz kao PDF ──
  saveAsPdf(): void {
    const board = this.kanbanBoard?.nativeElement;
    if (!board) return;
    const opt = {
      margin: 10,
      filename: 'kanban-izvjestaj.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, backgroundColor: '#0f172a' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };
    html2pdf().set(opt).from(board).save();
  }

  // ── Email popup ──
  toggleEmailPopup(): void {
    this.showEmailPopup = !this.showEmailPopup;
  }

  sendEmail(): void {
    if (!this.targetEmail.trim()) {
      alert('Molimo unesite validnu e-mail adresu!');
      return;
    }

    let mailBody = 'Moj trenutni Kanban Izvještaj:\n\n';
    this.columns.forEach(col => {
      mailBody += `--- ${col.title} ---\n`;
      if (col.tasks.length === 0) {
        mailBody += '(Nema zadataka)\n';
      } else {
        col.tasks.forEach((t, i) => {
          mailBody += `${i + 1}. ${t.text}\n`;
        });
      }
      mailBody += '\n';
    });

    const subject = encodeURIComponent('IPI Kanban Ploča - Izvještaj zadataka');
    const body = encodeURIComponent(mailBody);
    window.location.href = `mailto:${this.targetEmail}?subject=${subject}&body=${body}`;
    this.toggleEmailPopup();
  }

  // ── Local storage ──
  private saveBoard(): void {
    const state = this.columns.map(col => ({
      columnId: col.id,
      tasks: col.tasks.map(t => ({ id: t.id, text: t.text })),
    }));
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  private loadBoard(): void {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return;

    try {
      const state = JSON.parse(data);
      state.forEach((colState: { columnId: string; tasks: { id: string; text: string }[] }) => {
        const col = this.columns.find(c => c.id === colState.columnId);
        if (col) {
          col.tasks = colState.tasks.map(t => ({
            id: t.id,
            text: t.text,
            date: new Date().toLocaleDateString('bs'),
          }));
        }
      });
    } catch {
      /* ignore corrupted data */
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/dashboard/funzone');
  }
}
