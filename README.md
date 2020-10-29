# Introdução ao Angular 8 
Vamos gerar um aplicação angular que consulta um bd em express

começando : 
npm i exprees
npm i cors
cd G:\DIO\introangular8\course-manager\src\assets\server
node./serve.js
Obs : 

é muito melhor trabalhar com um objeto assim bonito dai podemos usar-lo como 
classe !! 

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


## Primeira app em Angular 
- angular dá bastante erro de cache, é so restartar a aplicação e ele para 
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

Nos pipes alteramos a formatação como o componente é mostrado no nosso template: por exemplo 
formatar a data ou trocar uma pontuacao 

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
OBS: ele moveu depois para pasta core o navbar e o erro 404 

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


```JS
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


- criando um switch (troca de componentes)
(agora deixamos de trabalhar com selectors e trabalhamos com rotas, lembrando que selector é para ser utilizado em outro component, o course nao está sendo usado ele é a rota agora )

course-manager\src\app\app.component.html

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

- nao esqueca de definir o appmodule 
import { Error404Compoennt } from './core/component/error-404/error-404.component';

declarations: [
//    CourseListComponent,
    AppComponent,
    Error404Compoennt
  ],


- lembrando ! se estamos trabalhando com rotas nao faz sentido ter selector no compoennte ! 

- precisando colocar o router na pagina principal ! 

## Ativando rotas para acessar componentes 

- inserindo um botao editar na tabela 

            <td>
                <a [routerLink]="['/courses/info', course.id]" class="btn btn-primary mr-2">Edit</a>
                <button (click)="deleteById(course.id)" class="btn btn-danger">Delete</button>
            </td>

- entra na rota courses/info e um atributo de url 

- criamos o course-manager\src\app\courses\course-info.component.ts

- será exibido via rota ! não precisa de selector em componente que está roteado

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

```Js
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

atenção 
activatedRoute pega as informações neste momento da rota ativa! 
params pega o parametro que eu defini na minha rota 

 this.courseService.retrieveById(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe({
            next: course => this.course = course,
            error: err => console.log('Error', err)
        });

atenção para coloar uma classe no link deixando o menu mais dinamico 

 <a [routerLink]="['/courses']" routerLinkActive="active" class="nav-link">Courses</a>

### Formulários e templates 

vamos criar um metodo no course service para filtrar o curso e trazer ele para que possamos usalo no formulario 

 retrieveById(id: number): Observable<Course> { 
        return this.httpClient.get<Course>(`${this.coursesUrl}/${id}`);
    }


agora atualizamos nosso courseinfo component para receber a informação da rota atual ao carregar 

```Js

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
    /// não faz sentido ter selector se este
    /// componente está sendo roteado ! 
    templateUrl: './course-info.component.html'
})
export class CourseInfoComponent implements OnInit {

    course: Course;

    constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService) { }
    
    ngOnInit(): void { 
        this.courseService.retrieveById
        (+this.activatedRoute.snapshot.paramMap.get('id'))
        .subscribe({
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


Atenção ! 
# cria uma variável de template  criamos o courseForm 


<form #courseForm="ngForm" *ngIf="course">

Atenção ! 

aqui estamos fazendo TWDB no nome do curso declarado lá no courseinfocomponent. Vamos passar os atributos do ngmodel para variavel courseName. Podemos fazer verificações na courseName com por exemplo verificar se é valida . required , name passa a ser obrigatório e se nada ofr escrito a variavel courseName se torna inválida 

ngClass passa uma classe dinâmica para esta propriedade 
adicionamos a classe is-invalid 
e uma condição após os : 
Quando a condição for verdadeira adicionara esta classe . quando apagarmos todo o input o bootstrap fará o input ficar vermelho mostrando que é campo requerido 

   <input [(ngModel)]="course.name" required name="name" #courseName="ngModel" [ngClass]="{'is-invalid': courseName.invalid}" class="form-control">
            
          
          <div class="invalid-feedback">
                <span>Course name is required</span>
            </div>



atenção 
so habilite se o formulario for valido 
Existem outras propriedades interessantes de template, preciso estudar sobre isso 
<button [disabled]="courseForm.invalid" (click)="save()" class="btn btn-primary mr-2">Save</button>
    <button [routerLink]="['/courses']" class="btn btn-secondary">Back</button>


### Segregando responsabilidades 

O retorno de um http é por padrão um Observable !! 
um observable eh um contrato. PRecisamos dar um subscibe para que ele possa ser executado 


Obs : 
As informações vem por requisição HTTP que são por natureza assíncronas. O ngif do formulario serve para somente executar o formulario quando as informações estiverem disponíveis. 
Isto poderia ser feito também se instanciassemos a variaável couse da classe com um new 



<form #courseForm="ngForm" *ngIf="course">


### Trabalhando com delete 

Ok ! já conhecia tudo 


  deleteById(courseId: number): void { 
        this.courseService.deleteById(courseId).subscribe({
            next: () => { 
                console.log('Deleted with success');
                this.retrieveAll();
            },
            error: err => console.log('Error', err)
        })
    }


deleteById(id: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.coursesUrl}/${id}`);
    }

### Segregando em modulos 

Ao criar um module.ts em cada componente, segregamos as responsabilidades 
a aplciação é como se fosse uma casa separada em modulos 
modulo é uma limitação de contexto 

course module.ts 

o angular não permite que o mesmo componente seja declarado duas vezes em módulos diferentes então precisamos tirar a declaracao      CourseListComponent,    CourseInfoComponent do app principal 

        
Agora estamos resolvendo imports e declarations em dois lugares diferentes 
o component precisa conehcer os modulos basicos do angular 
 CommonModule, recursos basicos do angular deve ser importado no modulo fique de olho no erro para saber se está faltando importar ele 
 o ngmodel, o starmodule o app pipe ... 

```js 
import { NgModule } from '@angular/core';
import { CourseListComponent } from './course-list.component';
import { CourseInfoComponent } from './course-info.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StarModule } from '../shared/component/star/star.module';
import { AppPipeModule } from '../shared/pipe/app-pipe.module';


@NgModule({
    declarations: [
      /// modulos que o seu modulo precisa para existir 
        CourseListComponent,
        CourseInfoComponent
    ], 
    imports: [
      /// rotas que seu modulto tem 
      /// vamos trazaer do appmodulo para cá ! 
        CommonModule,
        FormsModule, /// para usar o ngmodel
        StarModule,
        AppPipeModule,
        RouterModule.forChild([
            {
                path: 'courses', component: CourseListComponent
            },
            {
                path: 'courses/info/:id', component: CourseInfoComponent
            }
        ])
    ]
})
export class CourseModule { 

}
```


### shared ( shared modules )

Na pasta shared , temos componentes, pipes , validações pequenas que podem ser importados conforme necessidade 

vamos criar um modulo para cada componente pois se criassemos um so modulo para todos ficaria muito pesado importa-lo quando fossemos usa-lo 

export serve para dizer que podemos exportar para ser usado em outro modulo 


Modulo do component star 
```Js
import { NgModule } from '@angular/core';
import { StarComponent } from './star.component';

@NgModule({
    declarations: [
        StarComponent
    ],
    exports: [
        StarComponent
    ]
})
export class StarModule {

}
```

fizemos o mesmo para o pipe 
é interessante ter um modulo para todos os pipes, se a aplicação ficar com muito é bom 
separar um modulo para cada contexto 
ex: 
pipe financas 
pipe educação 
pipe formatação ... 

## conhecendo a  pasta  core 

a pasta core contem componentes que não são tão genéricos quanto  os da pasta shared, por exemplo nosso header e nosso componente de erro , elas tem alguma relação com outros ocmponentens da nossa aplicação 

### Erros 

como o componente erro vai aparecer em toda aplicação , faz sentido coloca-lo na pasta core 
nao precisamos declarar o modulo de erro pois já está sendo decladrado no modulo pai 










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
