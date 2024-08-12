import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  constructor(private http: HttpClient) {}

  APIurl = 'http://localhost:3002';

  private modalState = new BehaviorSubject<boolean>(false); // El modal está cerrado por defecto
  // Observable para que los componentes se suscriban
  modalState$ = this.modalState.asObservable();

  GetData(endpoint: string): Observable<any> {
    return this.http.get(`${this.APIurl}/${endpoint}`);
  }

  toggleModal() {
    const currentState = this.modalState.getValue();
    this.modalState.next(!currentState); // Cambia el estado
  }

  // Método para establecer un estado específico (opcional)
  setModalState(isOpen: boolean) {
    this.modalState.next(isOpen);
  }
}
