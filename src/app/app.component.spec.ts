import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let subject: AppComponent;

  beforeEach(() => {
    subject = new AppComponent();
  });

  describe('upon initialization', () => {
    const action = () => subject.ngOnInit();

    beforeEach(action);

    it('should set value to "World"', () =>
      expect(subject.value).toBe('World'));
  });
});
