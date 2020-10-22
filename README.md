# Introdução ao Angular 8 

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
