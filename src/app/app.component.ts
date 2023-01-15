import {Component, HostListener} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  orderForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    text: ['', Validators.required],
  })

  carsData = [
    {
      image: '1.png',
      name: 'Lamborghini Huracan Spyder',
      transmission: 'Автомат',
      engine: '5.2 л.с.',
      year: '2019'
    },
    {
      image: '2.png',
      name: 'Chevrolet Corvette',
      transmission: 'Автомат',
      engine: '.2 л.с.',
      year: '2017'
    },
    {
      image: '3.png',
      name: 'Ferrari California',
      transmission: 'Автомат',
      engine: '3.9 л.с.',
      year: '2010'
    },
    {
      image: '4.png',
      name: 'Lamborghini Urus',
      transmission: 'Автомат',
      engine: '4 л.с.',
      year: '2019'
    },
    {
      image: '5.png',
      name: 'Audi R8',
      transmission: 'Автомат',
      engine: '5.2 л.с.',
      year: '2019'
    },
    {
      image: '6.png',
      name: 'Maserati Quattroporte',
      transmission: 'Автомат',
      engine: '3.0 л.с.',
      year: '2018'
    },
  ]
  constructor(private fb: FormBuilder) {
  }
  scrollPage(target: HTMLElement, car?: any) {
    target.scrollIntoView({behavior: 'smooth'})
    if (car) {
      this.orderForm.patchValue({text: car.name})
    }
  }

  trans: any;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = {transform: 'translate3d(' + ((e.clientX * 0.3) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)'};
  }

  bgPos: any;
  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = {backgroundPositionX: '0' + (0.3 * window.scrollY) + 'px'};
  }
  onSubmit() {
    if (this.orderForm.valid) {
      alert('Спасибо за заявку, мы свяжемся с вами в ближайшее время')
    }
    this.orderForm.reset()
  }
}
