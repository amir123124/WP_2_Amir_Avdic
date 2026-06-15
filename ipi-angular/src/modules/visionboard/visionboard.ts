import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface BoardItem {
  id: string;
  type: 'note' | 'quote' | 'image';
  content: string;
  rotation: string;
  date: string;
}

@Component({
  selector: 'app-visionboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visionboard.html',
  styleUrl: './visionboard.css',
  encapsulation: ViewEncapsulation.None,
})
export class VisionboardComponent implements OnInit {

  items: BoardItem[] = [];
  showImagePopup = false;
  showEmailPopup = false;
  imageUrl = '';
  targetEmail = '';

  private readonly STORAGE_KEY = 'ipiVisionBoardState';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadBoard();
  }

  addNote(): void { this.addItem('note', 'Kliknite ovdje da napišete bilješku...'); }
  addQuote(): void { this.addItem('quote', 'Upišite vaš omiljeni motivacioni citat ovdje...'); }

  private addItem(type: 'note' | 'quote' | 'image', content: string): void {
    const rotation = (Math.random() * 8 - 4).toFixed(1);
    const date = new Date().toLocaleDateString('bs');
    this.items.push({ id: 'item-' + Date.now(), type, content, rotation, date });
    this.saveBoard();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => { this.imageUrl = e.target?.result as string; };
      reader.readAsDataURL(input.files[0]);
    }
  }

  handleAddImage(): void {
    if (!this.imageUrl.trim()) { alert('Odaberite sliku sa računara ili unesite URL!'); return; }
    this.addItem('image', this.imageUrl.trim());
    this.imageUrl = '';
    this.showImagePopup = false;
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500';
  }

  deleteItem(id: string): void {
    this.items = this.items.filter(i => i.id !== id);
    this.saveBoard();
  }

  clearBoard(): void {
    if (confirm('Da li ste sigurni da želite ukloniti sve elemente sa Vision Board-a?')) {
      this.items = [];
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  onTextBlur(item: BoardItem, event: Event): void {
    item.content = (event.target as HTMLElement).innerText;
    this.saveBoard();
  }

  savePdf(): void {
    const board = document.getElementById('visionBoard');
    if (!board) return;
    const opt = {
      margin: 10, filename: 'vision-board.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, backgroundColor: '#060f1c' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    const run = () => (window as any)['html2pdf']().set(opt).from(board).save();
    if ((window as any)['html2pdf']) { run(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = run;
    document.head.appendChild(script);
  }

  sendEmail(): void {
    if (!this.targetEmail.trim()) { alert('Molimo unesite validnu e-mail adresu!'); return; }
    let mailBody = 'Moj Vision Board - pregled stavki:\n\n';
    this.items.forEach((item, i) => {
      if (item.type === 'image') { mailBody += `${i + 1}. [Slika]\n`; }
      else { mailBody += `${i + 1}. [${item.type === 'quote' ? 'Citat' : 'Bilješka'}] ${item.content}\n`; }
    });
    if (this.items.length === 0) mailBody += '(Ploča je prazna)';
    const subject = encodeURIComponent('Vision Board - Student Fun Zone');
    const body = encodeURIComponent(mailBody + '\n\nIPI Akademija Tuzla | Web programiranje 2025/2026');
    window.location.href = `mailto:${this.targetEmail}?subject=${subject}&body=${body}`;
    this.showEmailPopup = false;
  }

  closeImagePopup(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('overlay')) this.showImagePopup = false;
  }

  closeEmailPopup(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('overlay')) this.showEmailPopup = false;
  }

  private saveBoard(): void { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items)); }

  private loadBoard(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) { try { this.items = JSON.parse(data); } catch { this.items = []; } }
  }

  goBack(): void { this.router.navigateByUrl('/dashboard/funzone'); }
}
