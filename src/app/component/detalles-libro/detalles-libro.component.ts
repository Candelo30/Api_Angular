import { Component, Input } from '@angular/core';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-detalles-libro',
  standalone: true,
  imports: [],
  templateUrl: './detalles-libro.component.html',
  styleUrl: './detalles-libro.component.css',
})
export class DetallesLibroComponent {
  @Input() libro: any;

  constructor(private Data: DatosService) {}

  CloseModal() {
    this.Data.setModalState(false); // Cierra el modal directamente
  }
}
