import { AzureFunction, Context, HttpRequest, Logger } from '@azure/functions';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import exp = require('constants');
import { Kinda } from 'kinda-type';
import subject from './index';

describe('GetGreeting Azure Function', () => {
  const action = () => subject(context, request);

  let context: Context;
  let request: HttpRequest;

  beforeEach(() => {
    context = {
      log: jest.fn(),
    } as Kinda<Context> as Context;
    request = {
      query: {
        name: 'testQueryName',
      },
      body: {
        name: 'testBodyName',
      },
    } as Kinda<HttpRequest> as HttpRequest;
  });

  describe('when not provided a name', () => {
    beforeEach(() => {
      delete request.query.name;
      delete request.body;
    });

    it('should not throw an error', () => expect(action).not.toThrow());
    it('should still return a message', () => {
      action();
      expect(context.res?.body).toEqual(expect.stringMatching(/^.+$/));
    });
  });

  describe('when provided a name in the query', () => {
    beforeEach(() => {
      delete request.body;
      action();
    });

    it('should include the name in the response body', () =>
      expect(context.res!.body).toContain('testQueryName'));
  });

  describe('when provided a name in the body', () => {
    beforeEach(() => {
      delete request.query.name;
      action();
    });

    it('should include the name in the response body', () =>
      expect(context.res!.body).toContain('testBodyName'));
  });

  describe('when provided a name in both the query and the body', () => {
    beforeEach(action);

    it('should include the query name in the response body', () =>
      expect(context.res!.body).toContain('testQueryName'));
  });
});
