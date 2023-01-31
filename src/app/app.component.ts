import { Component, OnInit } from '@angular/core';
import { GreetingService } from './greeting.service/greeting.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  greeting?: string;
  error?: string;

  constructor(private greetingService: GreetingService) {}

  ngOnInit() {
    this.greet();
  }

  async greet(name?: string) {
    this.greeting = '';
    this.error = '';
    try {
      this.greeting = await this.greetingService.getGreeting(name);
    } catch (error) {
      const errorString = error?.message ?? error?.toString();
      this.error = `Oops! Something happened while trying to get your greeting: ${errorString}`;
    }
  }
}
