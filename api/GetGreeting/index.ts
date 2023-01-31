import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger function processed a request.');
  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? 'Hello, ' + name + '!'
    : 'Hello you! Provide a name for a personalized response.';

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: JSON.stringify(responseMessage),
  };
};

export default httpTrigger;
