import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../services/datos.service';
import { DetallesLibroComponent } from '../detalles-libro/detalles-libro.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [DetallesLibroComponent, FormsModule],
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.css',
})
export class BibliotecaComponent implements OnInit {
  constructor(private Data: DatosService) {}

  selectedBook: any = null; // Para almacenar el libro seleccionado
  IsOpenModal = false;

  ngOnInit(): void {
    // Un iniciador
    this.getData();

    this.Data.modalState$.subscribe((state) => {
      this.IsOpenModal = state;
    });
  }

  allData: any[] = [];
  filteredData: any[] = []; // Lista filtrada
  searchTerm: string = ''; // Término de búsqueda

  getData() {
    this.Data.GetData('Biblioteca').subscribe((data) => {
      this.allData = data.biblioteca; // Claro Se trae toda la info que esta en el objecto
      console.log(data);
      this.filterBooks();
    });
  }

  onSelect(book: any): void {
    this.selectedBook = book; // Aquí se guarda la info de los elementos al darle click
    this.OpenModal();
  }

  OpenModal() {
    this.Data.toggleModal(); // Cambia el estado del modal
  }

  filterBooks() {
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      this.filteredData = this.allData.filter(
        (book) =>
          book.titulo.toLowerCase().includes(term) ||
          book.autor.toLowerCase().includes(term) ||
          book.genero.toLowerCase().includes(term)
      );
    } else {
      // Si no hay término de búsqueda, muestra todos los datos
      this.filteredData = this.allData;
    }
  }
}
