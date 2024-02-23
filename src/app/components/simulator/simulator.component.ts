import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResultSimulator } from 'src/app/interfaces/result-simulator';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {

  myFormulario: FormGroup;
  isCalculated: boolean;

  dataUno: ResultSimulator;
  dataDos: ResultSimulator;
  dataTres: ResultSimulator;

  constructor(private builder: FormBuilder) {
    this.isCalculated = false;
    this.createForm();
    this.dataUno = this.createEmptyResult();
    this.dataDos = this.createEmptyResult();
    this.dataTres = this.createEmptyResult();
  }

  ngOnInit(): void {

  }

  get notValidPercentage() {
    return this.myFormulario.get('loanPercentage')?.invalid &&
      this.myFormulario.get('loanPercentage')?.touched;
  }

  get notLoanVehicleAllowed() {
    const totalLoan = this.myFormulario.get('valueVehicle')?.value;
    const wantedLoan = this.myFormulario.get('vehicleLoad')?.value;
    console.log({totalLoan, wantedLoan });
    return +wantedLoan > +totalLoan;
  }

  createForm() {
    this.myFormulario = this.builder.group({
      propertyValue: ['250000000'],
      loanPercentage: ['70', Validators.pattern("[0-9]+")],
      loanYearsDuration: ['20'],
      valueVehicle: [''],
      vehicleLoad: [''],
    });
  }

  createEmptyResult() {
    return {
      title: "",
      quoteValue: 0,
      loanTotal: 0,
      initial: 0
    };
  }

  calcular() {
    console.log('calculo');
    this.calculoUno();
    this.calculoDos();
    this.calculoTres();

    this.isCalculated = true;
  }

  private calculoUno() {
    const totalValor = this.myFormulario.get('propertyValue')?.value;
    const porcentage = this.myFormulario.get('loanPercentage')?.value;
    const resta = 100 - porcentage;
    const duration = this.myFormulario.get('loanYearsDuration')?.value;
    const loan = (totalValor * porcentage) / 100;

    let result: ResultSimulator = {
      title: "Simulacion 1",
      quoteValue: ((loan / duration) / 12) * 0.3,
      loanTotal: loan,
      initial: (totalValor * resta) / 100
    };
    this.dataUno = result;
  }
  private calculoDos() {
    const totalValor = this.myFormulario.get('propertyValue')?.value;
    const porcentage = this.myFormulario.get('loanPercentage')?.value;
    const resta = 100 - porcentage;
    const duration = this.myFormulario.get('loanYearsDuration')?.value;
    const loan = (totalValor * porcentage) / 100;

    let result: ResultSimulator = {
      title: "Simulacion xxx",
      quoteValue: ((loan / duration) / 12) * 1.3,
      loanTotal: loan,
      initial: (totalValor * resta) / 100
    };
    this.dataDos = result;
  }
  private calculoTres() {
    const totalValor = this.myFormulario.get('propertyValue')?.value;
    const porcentage = this.myFormulario.get('loanPercentage')?.value;
    const resta = 100 - porcentage;
    const duration = this.myFormulario.get('loanYearsDuration')?.value;
    const loan = (totalValor * porcentage) / 100;

    let result: ResultSimulator = {
      title: "Simulacion Pa' pobres",
      quoteValue: ((loan / duration) / 12) * 0.8,
      loanTotal: loan,
      initial: (totalValor * resta) / 100
    };
    this.dataTres = result;
  }

}
