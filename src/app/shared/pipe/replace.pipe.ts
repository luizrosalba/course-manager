import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'replace' /// esse nome tem que ser o mesmo do pipe
    /// utilizado 
})
export class ReplacePipe implements PipeTransform {
    
    transform(value: string, char: string, valueToReplace: string) { 
        return value.replace(char, valueToReplace);
    }

}