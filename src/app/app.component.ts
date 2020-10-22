import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // cria uma diretiva que vira uma tag  que pode ser usada  onde eu quiser 
  templateUrl: './app.component.html', ///html que será usado para representar o visual do componente 
  styleUrls: ['./app.component.css'] /// app component pega seu design deste arquivo
})
export class AppComponent {
  title = 'course-manager'; 
  /// atributo do component 


  name: string = 'John';
  /// é bom tipar 
}
