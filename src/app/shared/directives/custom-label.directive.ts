import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;

  private _color: string = "red";

  private _errors?: ValidationErrors | null | undefined;

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }
  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorsMessage();
  }


  constructor(private el: ElementRef<HTMLElement>) {
    console.log(el);
    this.htmlElement = el;

    this.htmlElement.nativeElement.innerHTML = "Uwu Migo"
  }
  ngOnInit(): void {
    console.log('Directiva Init');
  }

  setStyle(): void {
    if (!this.htmlElement) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorsMessage(): void {
    if(!this.htmlElement) return;
    if(!this._errors){
      this.htmlElement.nativeElement.innerText="No hay errores owo";
      return;
    }
    const errors = Object.keys(this._errors);
    console.log(errors);
    if(errors.includes('required')){
      this.htmlElement.nativeElement.innerText = "Es requerido";
      return;
    }
     if(errors.includes('minlength')){
      const min=this._errors!['minlength']['requiredLength'];
      const currentLength = this._errors!['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerText = `Es demasiado corto tienes: ${currentLength} de ${min}`;
      return;
    }
     if(errors.includes('email')){
      this.htmlElement.nativeElement.innerText = "Tiene que tener formato email";
      return;
    }
  }
}
