import {Component, HostListener} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  orderForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required],
  })

  carsData: any
  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getData().subscribe(carData => {
      this.carsData = carData
    })
  }
  scrollPage(target: HTMLElement, car?: any) {
    target.scrollIntoView({behavior: 'smooth'})
    if (car) {
      this.orderForm.patchValue({car: car.name})
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
      this.appService.sendQuery(this.orderForm.value)
        .subscribe(
          {
            next: (resp: any) => {
              alert(resp.message);
              this.orderForm.reset()
            },
            error: (resp: any) => {
              alert(resp.error.message)
            }
          }
        )
    }
  }
}
