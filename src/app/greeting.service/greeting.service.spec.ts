import { HttpClient } from '@angular/common/http';
import { GreetingService } from './greeting.service';
import { Kinda } from 'kinda-type';
import { of } from 'rxjs';

describe('the Greeting Service', () => {
  let subject: GreetingService;

  let http: HttpClient;

  beforeEach(() => {
    http = {
      get: jest.fn().mockReturnValue(of({})),
    } as Kinda<HttpClient> as HttpClient;
    subject = new GreetingService(http);
  });

  describe('getGreeting', () => {
    const action = () => subject.getGreeting(name);

    let name: string;

    describe('when passed a name', () => {
      beforeEach(() => {
        name = 'testName';
        action();
      });
      it('should include the name query parameter', () =>
        expect(http.get).toHaveBeenCalledWith(
          expect.stringContaining('name=testName')
        ));
    });
    describe('when not passed a name', () => {
      beforeEach(() => {
        name = undefined;
        action();
      });
      it('should call the api', () => expect(http.get).toHaveBeenCalled());
      it('should not include the name query parameter', () =>
        expect(http.get).not.toHaveBeenCalledWith(
          expect.stringContaining('name=')
        ));
    });
  });
});
