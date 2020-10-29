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
        .subscribe({ /// executa o observable
            next: course => this.course = course, 
            /// recebe o curso e 
            // iguala o curso da nossa classe ao retorno da requisição http 
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