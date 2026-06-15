import { Component, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whiteboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './whiteboard.html',
  styleUrl: './whiteboard.css',
  encapsulation: ViewEncapsulation.None,
})
export class WhiteboardComponent implements AfterViewInit {

  @ViewChild('boardCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  showEmailPopup = false;
  targetEmail = '';
  currentColor = '#000000';
  brushSize = 3;
  isErasing = false;

  private ctx!: CanvasRenderingContext2D;
  private drawing = false;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
  }

  onColorChange(event: Event): void {
    this.currentColor = (event.target as HTMLInputElement).value;
    this.isErasing = false;
  }

  onBrushSizeChange(event: Event): void {
    this.brushSize = +(event.target as HTMLInputElement).value;
  }

  toggleEraser(): void { this.isErasing = !this.isErasing; }

  private getCoordinates(e: MouseEvent | TouchEvent): { x: number; y: number } {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX: number, clientY: number;
    if (e instanceof TouchEvent && e.touches.length > 0) {
      clientX = e.touches[0].clientX; clientY = e.touches[0].clientY;
    } else {
      clientX = (e as MouseEvent).clientX; clientY = (e as MouseEvent).clientY;
    }
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  }

  startDraw(e: MouseEvent | TouchEvent): void {
    this.drawing = true;
    const c = this.getCoordinates(e);
    this.ctx.beginPath();
    this.ctx.moveTo(c.x, c.y);
    this.draw(e);
  }

  endDraw(): void { this.drawing = false; this.ctx.beginPath(); }

  draw(e: MouseEvent | TouchEvent): void {
    if (!this.drawing) return;
    const c = this.getCoordinates(e);
    this.ctx.lineWidth = this.brushSize;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = this.isErasing ? '#FFFFFF' : this.currentColor;
    this.ctx.lineTo(c.x, c.y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(c.x, c.y);
  }

  clearBoard(): void {
    const canvas = this.canvasRef.nativeElement;
    if (confirm('Da li želite obrisati cijelu ploču?'))
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  savePng(): void {
    const link = document.createElement('a');
    link.href = this.canvasRef.nativeElement.toDataURL('image/png');
    link.download = 'moj_crtez.png';
    link.click();
  }

  savePdf(): void {
    const dataUrl = this.canvasRef.nativeElement.toDataURL('image/png');
    const img = document.createElement('img');
    img.src = dataUrl; img.style.width = '100%';
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'padding:10px;background:#fff';
    wrapper.appendChild(img);
    const opt = { margin: 10, filename: 'whiteboard-crtez.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' } };
    const run = () => (window as any)['html2pdf']().set(opt).from(wrapper).save();
    if ((window as any)['html2pdf']) { run(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = run;
    document.head.appendChild(script);
  }

  sendEmail(): void {
    if (!this.targetEmail.trim()) { alert('Molimo unesite validnu e-mail adresu!'); return; }
    const subject = encodeURIComponent('Interaktivni Whiteboard - crtež');
    const body = encodeURIComponent('U prilogu se nalazi crtež sa Interaktivnog Whiteboarda.\n\nStranica: Student Fun Zone | IPI Akademija Tuzla\nWeb programiranje 2025/2026');
    window.location.href = `mailto:${this.targetEmail}?subject=${subject}&body=${body}`;
    this.showEmailPopup = false;
  }

  closeEmailPopup(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('overlay')) this.showEmailPopup = false;
  }

  goBack(): void { this.router.navigateByUrl('/dashboard/funzone'); }
}
