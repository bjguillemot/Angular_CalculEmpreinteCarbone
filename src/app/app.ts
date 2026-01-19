import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { CarbonFootprint } from "./carbon-footprint/carbon-footprint";

@Component({
  selector: 'app-root',
  imports: [Header, Footer, CarbonFootprint],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('calcul-empreinte-carbone');
}
