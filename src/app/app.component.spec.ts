import { AppComponent } from './app.component';
import { GreetingService } from './greeting.service/greeting.service';
import { Kinda } from 'kinda-type';

describe('AppComponent', () => {
  let subject: AppComponent;

  let greetingService: GreetingService;

  beforeEach(() => {
    greetingService = {
      getGreeting: jest.fn(),
    } as Kinda<GreetingService> as GreetingService;
    subject = new AppComponent(greetingService);
  });

  describe('upon initialization', () => {
    const action = () => subject.ngOnInit();

    beforeEach(action);

    it('should call the service to get the default greeting', () =>
      expect(greetingService.getGreeting).toHaveBeenCalled());
  });

  describe('when greet is called', () => {
    const action = () => subject.greet(name);

    let name: string;

    describe('while waiting for a response', () => {
      let promise: Promise<void>;
      let resolvePromise: Function;
      beforeEach(() => {
        promise = new Promise((resolve) => {
          resolvePromise = resolve;
        });
        greetingService.getGreeting = jest.fn().mockReturnValue(promise);
        action();
      });
      afterEach(() => resolvePromise());
      it('should not display an greeting', () =>
        expect(subject.greeting).toBeFalsy());
      it('should not display an error', () =>
        expect(subject.error).toBeFalsy());
    });
    describe('if greetingService returns successfully', () => {
      beforeEach(async () => {
        greetingService.getGreeting = jest.fn().mockResolvedValue('success');
        await action();
      });
      it('should display the greeting', () =>
        expect(subject.greeting).toBeTruthy());
      it('should not display an error', () =>
        expect(subject.error).toBeFalsy());
    });
    describe('if greetingService throws an Error', () => {
      beforeEach(async () => {
        greetingService.getGreeting = jest
          .fn()
          .mockRejectedValue({ message: 'bork' });
        await action();
      });
      it('should not display a greeting', () =>
        expect(subject.greeting).toBeFalsy());
      it('should display an error', () => expect(subject.error).toBeTruthy());
    });
    describe('if greetingService throws a string', () => {
      beforeEach(async () => {
        greetingService.getGreeting = jest
          .fn()
          .mockRejectedValue('bork');
        await action();
      });
      it('should not display a greeting', () =>
        expect(subject.greeting).toBeFalsy());
      it('should display an error', () => expect(subject.error).toBeTruthy());
    });
    describe('if greetingService throws null', () => {
      beforeEach(async () => {
        greetingService.getGreeting = jest
          .fn()
          .mockRejectedValue(null);
        await action();
      });
      it('should not display a greeting', () =>
        expect(subject.greeting).toBeFalsy());
      it('should display an error', () => expect(subject.error).toBeTruthy());
    });
  });
});
