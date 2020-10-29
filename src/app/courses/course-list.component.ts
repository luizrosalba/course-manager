import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
    templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit { 

    filteredCourses: Course[] = [];

    _courses: Course[] = []; 
    /// o _ indica para o programador que está lendo o codigo
    /// que a variável ficara somente dentro dessa classe 
    
    _filterBy: string;

    constructor(private courseService: CourseService) { }
    /// o angular vai pegar o objeto elegível a injeção 
    /// e vai instanciar esse objeto 

    ngOnInit(): void { 
        this.retrieveAll();
    }

    retrieveAll(): void { 
        this.courseService.retrieveAll().subscribe({
            next: courses => {
                this._courses = courses;
                this.filteredCourses = this._courses; 
                /// colocamos entro para ter certeza que já foi 
                /// deu o retorno 
            },
            error: err => console.log('Error', err) /// callback recebe o retorno e exibe 
        })
    }

    deleteById(courseId: number): void { 
        this.courseService.deleteById(courseId).subscribe({
            next: () => { 
                console.log('Deleted with success');
                this.retrieveAll();
            },
            error: err => console.log('Error', err)
        })
    }

    /// filtrando os cursos 
    set filter(value: string) { 
        this._filterBy = value;

        this.filteredCourses = this._courses.filter((course: Course) => course.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
    }

    get filter() { 
        return this._filterBy;
    }

}