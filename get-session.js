import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import input from 'input';

const apiId = 3516317;
const apiHash = '5bb2948db3031dda29858104ada18631';
const phoneNumber = '+989378038736';

console.log('📱 در حال اتصال به تلگرام...');

const client = new TelegramClient(new StringSession(''), apiId, apiHash, {
  connectionRetries: 5,
  useWSS: true,
});

await client.start({
  phoneNumber: async () => phoneNumber,
  password: async () => {
    const pass = await input.text('🔐 رمز 2FA (اگه داری، وگرنه Enter بزن): ');
    return pass || '';
  },
  phoneCode: async () => {
    console.log('📨 کد تایید به تلگرامت ارسال شد!');
    return await input.text('📱 کد تایید رو وارد کن: ');
  },
  onError: (err) => console.log('❌ خطا:', err),
});

console.log('\n✅ اتصال موفق!');
console.log('📋 SESSION_STRING:');
console.log(client.session.save());
console.log('\n⚠️ این رو توی Cloudflare Dashboard توی SESSION_STRING بذار!');
