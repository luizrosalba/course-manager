# Introdução ao Angular 8 
Vamos gerar um aplicação angular que consulta um bd em express

começando : 
npm i exprees
npm i cors
cd G:\DIO\introangular8\course-manager\src\assets\server
node./serve.js

## Primeira app em Angular 
- Angular usa TS 
- npm install -g @angular/cli
- ng version 
- angular cli é usado par agerenciar , criar projetos , é um gerenciador para o angular 
- angular.json contem as informações globais da aplicação 

"assets": [
              "src/favicon.ico",
              "src/assets"
            ],

- parte estáticas : imagens e qquer outro arquivo estático 

 "styles": [
              "src/styles.css"
            ],

- estilos globais para todos os componentes 

 "scripts": []
          },
- scripts para todos os componentes 

            "index": "src/index.html",
            "main": "src/main.ts",

- angular é SPA , toda aplicação está envelopada na mesma página, index define essa página base 

- main faz o bootstrap da aplicação , ou seja , inicializar a aplicação , é uma hook para chamar alguma 
propriedade de inicialização da aplicação 

- node modules : todas as deps da aplicação 

- src  : pasta raiz 
- index , main , styles.css  chamados no angular.json 
- assets (arquivos estáticos da app )

- dentro da pasta app temos o app.module.ts
- ele é lido pelo arquivo main.ts e a partir dele faz a leitura do componente pai (componente responsável por envelopar todos os componentes criados )
- o componente pai é lido e carregado dentro do index.html (único html raiz) 
- os html serão adicionados a partir da pasta app-root (no index.html)
<body>
  <app-root></app-root>
</body>

-ng serve (carrega todos os ocmponentes)


## Módulos e componentes
- angular é modular , o modulo raiz sempre engloba todos componentes
- módulo é uma bolsa , um limitador de contexto, onde todos os componentes estão nesse mesmo contexto 
- modulo compra , login , etc... 
- {{}} -> Interpolação , é usada para exibir uma propriedade do componente no componente 
- angular tem HTML mais algumas adições ex interpolacao trabalho c om forms ... 
- React dá mais recursos ao JS e o Angular dá mais recursos ao HTML 

### One Way e Two Way data bind 

- Dentro d oapp.component.html 

{{title}}
<br/>
{{name}}

<input [ngModel]="name" name="name">  
<br/>

- Erro , vc não importou o modulo form ! 

- acerto : ir no appmodule.ts e importar 

import {FormsModule} from '@angular/forms'

 imports: [
    FormsModule,
(será importado para todos os componentes)
- One way databind Só exibe nao altera o atributo 

<input [ngModel]="name" name="name">   

- Two Way , le e altera o valor so altera o colchete ao redor de ngmodel 
<input [(ngModel)]="name" name="name">   


## Criando módulos 
- criamos a pasta courses 
- arquivo course-list.component.ts
- export class = publica para outras poderem acessar 
- CourseListComponent camelCase
- vamos adicionar um decorator que diz que a  classe é elegivel para ser um componente 


@Component({
    selector:'app-course-list',
    template: '<h2> Course List </h2>'
})

- adicionamos o componente lista no appcomponenthtml
<app-course-list></app-course-list>

compiler.js:2175 Uncaught Error: Template parse errors:

- precisamos avisar ao modulo raiz que ele deve incorporar o componente criado 

- appmodule.ts 

import { CourseListComponent } from './course-list.component';


declarations: [
        CourseListComponent,


dica :  é melhor criar o  arquivo de template  em um arquivo separado : 
- criamos o course-listcomponente.html com todo codigo lá dentro e atualizamos o course list componente ts para 

dentro do course list component ts 

@Component({
    selector:'app-course-list',
    templateUrl: './course-list.component.html'
})

- instalando o bootstrap : 

- npm install bootstrap

- definindo que todas as classes usarao o bootstrap 

dentro do styles.css 

/* You can add global styles to this file, and also import other style files */

@import '~bootstrap/dist/css/bootstrap.min.css';

@import '~font-awesome/css/font-awesome.min.css';

- criamos o course.ts com os atributos tipados da classe 

export class Course { 
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    code: string;
    duration: number;
    rating: number;
    releaseDate: string;
    description: string;
}

- no course list componentes vamos criar um array de cursos 


 _courses: Course[] = [];


  ngOnInit(): void { 
        this.retrieveAll();
    }

    sera chamado assim que o componente  for criado igual no react 
- sintaxe que o angular disponibiliza para iterar 
  <tr *ngFor="let course of filteredCourses">

### criando componentes com atributos interdependentes 

para pegar uma informação temos que colocar o atributo entre colchetes 
  <td><img [src]="course.imageUrl" width="40" height="40" ></td>

- criamos a pasta component\star 

- criamos course-manager\src\app\shared\component\star\star.component.ts

@Component({
    selector: 'app-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})


- vamos usar onchange pois não sabemos se no momento da inicialização a informação estará disponível ( assíncrona )

export class StarComponent implements OnChanges 

ngOnChanges(): void { 
        this.starWidth = this.rating * 74 / 5;
    }

- Recebendo informação de um componente externo : 

@Input()
rating: number = 0;


com essa notação a variável rating pode receber uma informação extenra 

- vamos instalar o font awsome 

npm install font-awesome

- importanto pra toda aplicação : no styles. css 
@import '~font-awesome/css/font-awesome.min.css';


  <span class="fa fa-star"></span>

fa = fonte awesome

/// vamos escondendo as estrelas conforme o valor 

- precisamos declara-lo no app modeule 

import { StarModule } from '../shared/component/star/star.module';


- criamos uma css pro componente start 

.crop { 
    overflow: hidden;
}

- escontemos parte da div 

## Lidando com vários componentes 

### Injeção de dependência 

- vamos criar a classe de serviço course.service.ts para fazer requisições http

- Tornando elegível para ser uma injeção de dependência carregado na root da aplicação (podemos atrelar ao módulo do serviço tb )


import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

- criamos uma classe com métodos  

export class CourseService { 

- nos métodos é interessante usar variáveis cujos valores não serão alterados 

- estamos criando os filtros course-manager\src\app\courses\course-list.component.ts

  set filter(value: string) { 
        this._filterBy = value;

        this.filteredCourses = this._courses.filter((course: Course) => course.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
    }

    get filter() { 
        return this._filterBy;
    }

### transformando datas com pipes 

Nos pipes alteramos a formatação como o componente é mostrado no nosso template: 

course-manager\src\app\courses\course-list.component.html
          /// lowercase é um pipe nativo do angular 
           <td>{{ course.code | lowercase | replace: '-': ' ' }}</td>
           <td>{{ course.releaseDate | date: 'dd/MM/yyyy' }}</td>

- criamos course-manager\src\app\shared\pipe\replace.pipe.ts
- criamos o decorator para torna-lo elegivel como pipe 

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'replace'
})
export class ReplacePipe implements PipeTransform {
    
    transform(value: string, char: string, valueToReplace: string) { 
        return value.replace(char, valueToReplace);
    }

}

- no course module   course-manager\src\app\courses\course.module.ts
imports: [
     AppPipeModule,

- agora podemos usar o pipe lá em cima no courselist

### Protegendo rotas com o guard 

criamos o nav bar 

course-manager\src\app\core\component\nav-bar\nav-bar.component.ts

import { Component } from '@angular/core';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html'
})
export class NavBarComponent { 

}

- declacarmos no app component html 


 <app-nav-bar></app-nav-bar>
<div class="container"> 
     <router-outlet></router-outlet>
</div>

- declamramos no app module 

import { NgModule } from '@angular/core';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        NavBarComponent
    ],
    imports: [
        RouterModule
    ],
    exports: [
        NavBarComponent
    ]
})
export class CoreModule { 

}


- as rotas são carregadas na root  course-manager\src\app\app.module.ts

RouterModule.forRoot([
      {
        path: '', redirectTo: 'courses', pathMatch: 'full'
      }, {
        path: '**', component: Error404Compoennt
      }
    ]),
    CourseModule,
    CoreModule
  ],


-
  {
        path: 'courses', component: CourseListComponent
      },


- criando um switch (troca de componentes)
(agora deixamos de trabalhar com selectors e trabalhamos com rotas, lembrando que selector é para ser utilizado em outro component, o course nao está sendo usado ele é a rota agora )

<app-nav-bar></app-nav-bar>
<div class="container mt-4">
    <router-outlet></router-outlet>
</div> 

- acertando quando nao encontrar a rota 

{
        path: '**', component: Error404Compoennt
      }

- criamos o error404

course-manager\src\app\core\component\error-404\error-404.component.ts

- nao esqueca de definir o appmodue 
import { Error404Compoennt } from './core/component/error-404/error-404.component';

declarations: [
//    CourseListComponent,
    AppComponent,
    Error404Compoennt
  ],


- lembrando ! se estamos trabalhando com rotas nao faz sentido ter selector no compoennte ! 

- precisando colocar o router na pagina principal ! 

## Ativando rotas para acessar componentes 

- inserindo um link na tabela 

            <td>
                <a [routerLink]="['/courses/info', course.id]" class="btn btn-primary mr-2">Edit</a>
                <button (click)="deleteById(course.id)" class="btn btn-danger">Delete</button>
            </td>
- entra na rota courses/info e um atributo de url 

- criamos o course-manager\src\app\courses\course-info.component.ts

- será exibido via rota ! não precisa de selector 

@Component({
    templateUrl: './course-info.component.html'
})
inserimos mais uma rota que recebe um parametro id 

      {
        path: 'courses/info/:id', component:CourseInfoComponent
      },
    
mudamos o app.module.ts 

```Js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
//import { CourseListComponent } from './courses/course-list.component';

import { AppComponent } from './app.component';
import { CourseModule } from './courses/course.module';
import { CoreModule } from './core/core.module';
import { Error404Compoennt } from './core/component/error-404/error-404.component';
import { CourseListComponent } from './courses/course-list.component';
import { CourseInfoComponent } from './courses/course-info.component';

@NgModule({
  declarations: [
//    CourseListComponent,
    AppComponent,
    Error404Compoennt
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'courses', component: CourseListComponent
      },
      {
        path: 'courses/info/:id', component: CourseInfoComponent
      },
      {
        path: '', redirectTo:'courses' , pathMatch:'full'
      },
       {
        path: '**', component: Error404Compoennt
      }
    ]),
    CourseModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

pegando as informações da rota e fazendo um get 
course-manager\src\app\courses\course-info.component.ts

```
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
    templateUrl: './course-info.component.html'
})
export class CourseInfoComponent implements OnInit {

    course: Course;

    constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService) { }
    
    ngOnInit(): void { 
        this.courseService.retrieveById(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe({
            next: course => this.course = course,
            error: err => console.log('Error', err)
        });
    }

    save(): void {
        this.courseService.save(this.course).subscribe({
            next: course => console.log('Saved with success', course),
            error: err => console.log('Error', err)
        });
    }

}
```
pega as informaçoes da rota ativa 

 constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService) { }

    
























# Course Manager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.18.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
