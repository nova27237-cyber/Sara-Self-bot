import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import input from 'input';

const apiId = 3516317;
const apiHash = '5bb2948db3031dda29858104ada18631';
const phoneNumber = '+989378038736';

const client = new TelegramClient(new StringSession(''), apiId, apiHash, {
  connectionRetries: 5,
});

await client.start({
  phoneNumber: async () => phoneNumber,
  password: async () => await input.text('رمز 2FA (اگه داری): '),
  phoneCode: async () => await input.text('کد تایید: '),
  onError: (err) => console.log(err),
});

console.log('✅ SESSION_STRING:', client.session.save());
