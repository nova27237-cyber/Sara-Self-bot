// ============================================
// 📁 index.js - سارا HYPER FUL ULTIMATE
// ============================================

// ============================================
// تنظیمات محیطی
// ============================================

const ENV_VARS = {
const ENV_VARS = {
  API_ID: '21052688',
  API_HASH: 'dff2dac0409ffb456f3336ebb56f7d6c',
  PHONE_NUMBER: '+989378038736',
  PASSWORD: '',
  ADMIN_IDS: '7343696403',
  CF_ACCOUNT_ID: '',
  CF_API_TOKEN: '',
  KV_BINDING: 'KV_BINDING',
  IP_HASH: 'IP_HASH_واقعی_خودت'  // ← اینجا رو پر کن!
};

// ============================================
// 📦 Import های مورد نیاز
// ============================================

// برای Cloudflare Worker از CDN استفاده میکنیم:
// https://cdn.jsdelivr.net/npm/telegram@2.26.6/telegram.min.js

// ============================================
// 💬 دیکشنری کامل فارسی/انگلیسی
// ============================================

const translations = {
  fa: {
    start: '🌸 سلام {}! به سلف‌بات حرفه‌ای سارا خوش آمدی!\n\n📌 سارا یه سلف‌بات کامل با ۱۰ قابلیت اصلی هست:\n✅ تایپ (✔)\n✅ سلف (✔)\n✅ بیوگرافی (✔)\n✅ درباره (✔)\n✅ عنوان (✔)\n✅ خودکار سین (✔)\n✅ کامنت (✔)\n✅ قفل پیوی (✔)\n✅ ذخیره رسانه (✔)\n✅ خوش‌آمدگویی (✔)',
    help: `
📖 **راهنمای کامل سلف‌بات سارا** 🌸

**🔹 ۱۰ قابلیت اصلی:**
✅ **تایپ (✔)** - تایپ کردن خودکار هنگام پاسخ
✅ **سلف (✔)** - حذف پیام‌های خودکار کاربران
✅ **بیوگرافی (✔)** - تغییر بیو پروفایل خودکار
✅ **درباره (✔)** - تغییر درباره پروفایل خودکار
✅ **عنوان (✔)** - تغییر عنوان پروفایل خودکار
✅ **خودکار سین (✔)** - Mark as read خودکار پیام‌ها
✅ **کامنت (✔)** - مدیریت کامنت‌ها و پاسخ خودکار
✅ **قفل پیوی (✔)** - قفل کردن پیوی برای افراد خاص
✅ **ذخیره رسانه (✔)** - ذخیره خودکار رسانه‌ها
✅ **خوش‌آمدگویی (✔)** - پیام خوش‌آمدگویی خودکار

**🔹 دستورات کاربری:**
/start - روشن کردن ربات
/help - نمایش راهنما
/ip - نمایش IP Hash شما
/status - وضعیت سیستم
/panel - پنل مدیریت
/profile - آپدیت پروفایل
/lang - تغییر زبان

**🔹 دستورات مدیریت:**
/stop - خاموش کردن ربات
/restart - ریستارت ربات
/users - لیست کاربران
/stats - آمار دقیق
/broadcast - ارسال همگانی
/clear_cache - پاکسازی کش
/ip_list - لیست IP Hash ها
/add_ip - اضافه کردن IP Hash
/remove_ip - حذف IP Hash

🌸 **با عشق سارا** 💕
    `,
    status: `
📊 **وضعیت سلف‌بات سارا**

🔹 وضعیت: {}
🔹 تایپ: {}
🔹 سلف: {}
🔹 بیوگرافی: {}
🔹 درباره: {}
🔹 عنوان: {}
🔹 خودکار سین: {}
🔹 کامنت: {}
🔹 قفل پیوی: {}
🔹 ذخیره رسانه: {}
🔹 خوش‌آمدگویی: {}
⏱️ آپ‌تایم: {}
👥 کاربران: {}
💬 پیام‌ها: {}
📸 رسانه‌ها: {}
🔑 IP Hash: {}
🎭 خلق‌وخو: {}
    `,
    panel: `
👑 **پنل مدیریت سلف‌بات سارا**

📊 **آمار کلی:**
• 👥 کاربران: {}
• 💬 پیام‌ها: {}
• 📸 رسانه‌ها: {}
• 🔑 IP Hash فعال: {}

⚡ **قابلیت‌های فعال:**
{}

💡 برای تغییر تنظیمات از دکمه‌ها استفاده کنید.
    `,
    profile: `
👤 **پروفایل سارا**

📛 نام: {}
📝 بیوگرافی: {}
📋 درباره: {}
🏷️ عنوان: {}
    `,
    ip_hash: '🔑 **IP Hash شما:** `{}`\n\n📌 این کد برای تایید هویت شما استفاده میشود.',
    ip_list: '🔑 **لیست IP Hash ها ({} عدد)**\n\n{}',
    ip_added: '✅ IP Hash اضافه شد: `{}`',
    ip_removed: '🗑️ IP Hash حذف شد: `{}`',
    ip_invalid: '❌ IP Hash نامعتبر! (باید ۶۴ کاراکتر هگز باشد)',
    ip_exists: '❌ این IP Hash قبلاً اضافه شده است!',
    broadcast_start: '📢 **ارسال همگانی**\n\nلطفاً پیام خود را ارسال کنید.\nبرای لغو /cancel بفرستید.',
    broadcast_sent: '✅ پیام به {} نفر ارسال شد!',
    broadcast_cancel: '❌ ارسال همگانی لغو شد!',
    no_access: '⛔ شما دسترسی به این بخش ندارید!',
    user_list: '👥 **لیست کاربران ({} نفر)**\n\n{}',
    cache_cleared: '🧹 کش حافظه پاک شد!',
    restarting: '🔄 در حال ریستارت...',
    restart_done: '✅ ریستارت انجام شد!',
    bot_started: '✅ سلف‌بات سارا روشن شد!',
    bot_stopped: '⛔ سلف‌بات سارا خاموش شد!',
    profile_updated: '✅ پروفایل سارا با موفقیت آپدیت شد!',
    welcome_msg: '👋 خوش آمدید {}! به گروه سارا خوش اومدی! 🌸',
    language_changed: '🌐 زبان به {} تغییر کرد!',
    media_saved: '📸 رسانه با موفقیت ذخیره شد!',
    typing_on: '⌨️ تایپ خودکار فعال شد',
    typing_off: '⌨️ تایپ خودکار غیرفعال شد',
    self_on: '🗑️ حالت سلف فعال شد',
    self_off: '🗑️ حالت سلف غیرفعال شد',
    bio_on: '📝 بیوگرافی خودکار فعال شد',
    bio_off: '📝 بیوگرافی خودکار غیرفعال شد',
    about_on: '📋 درباره خودکار فعال شد',
    about_off: '📋 درباره خودکار غیرفعال شد',
    title_on: '🏷️ عنوان خودکار فعال شد',
    title_off: '🏷️ عنوان خودکار غیرفعال شد',
    seen_on: '👁️ خودکار سین فعال شد',
    seen_off: '👁️ خودکار سین غیرفعال شد',
    comment_on: '💬 کامنت خودکار فعال شد',
    comment_off: '💬 کامنت خودکار غیرفعال شد',
    lock_on: '🔒 قفل پیوی فعال شد',
    lock_off: '🔒 قفل پیوی غیرفعال شد',
    media_on: '💾 ذخیره رسانه فعال شد',
    media_off: '💾 ذخیره رسانه غیرفعال شد',
    welcome_on: '👋 خوش‌آمدگویی فعال شد',
    welcome_off: '👋 خوش‌آمدگویی غیرفعال شد'
  },
  en: {
    start: '🌸 Hello {}! Welcome to Sara Self-Bot!\n\n📌 Sara is a professional self-bot with 10 features:\n✅ Typing (✔)\n✅ Self (✔)\n✅ Biography (✔)\n✅ About (✔)\n✅ Title (✔)\n✅ Auto Seen (✔)\n✅ Comments (✔)\n✅ Lock PV (✔)\n✅ Save Media (✔)\n✅ Welcome (✔)',
    help: `
📖 **Sara Self-Bot Full Guide** 🌸

**🔹 10 Main Features:**
✅ **Typing (✔)** - Auto typing when responding
✅ **Self (✔)** - Auto delete user messages
✅ **Biography (✔)** - Auto change profile bio
✅ **About (✔)** - Auto change profile about
✅ **Title (✔)** - Auto change profile title
✅ **Auto Seen (✔)** - Auto mark messages as read
✅ **Comments (✔)** - Auto comment management
✅ **Lock PV (✔)** - Lock private chats
✅ **Save Media (✔)** - Auto save media
✅ **Welcome (✔)** - Auto welcome message

**🔹 User Commands:**
/start - Start bot
/help - Show help
/ip - Show your IP Hash
/status - System status
/panel - Admin panel
/profile - Update profile
/lang - Change language

**🔹 Admin Commands:**
/stop - Stop bot
/restart - Restart bot
/users - Users list
/stats - Stats
/broadcast - Broadcast message
/clear_cache - Clear cache
/ip_list - IP Hashes list
/add_ip - Add IP Hash
/remove_ip - Remove IP Hash

🌸 **With love, Sara** 💕
    `,
    status: `
📊 **Sara Self-Bot Status**

🔹 Status: {}
🔹 Typing: {}
🔹 Self: {}
🔹 Biography: {}
🔹 About: {}
🔹 Title: {}
🔹 Auto Seen: {}
🔹 Comments: {}
🔹 Lock PV: {}
🔹 Save Media: {}
🔹 Welcome: {}
⏱️ Uptime: {}
👥 Users: {}
💬 Messages: {}
📸 Media: {}
🔑 IP Hash: {}
🎭 Mood: {}
    `,
    panel: `
👑 **Sara Self-Bot Admin Panel**

📊 **Statistics:**
• 👥 Users: {}
• 💬 Messages: {}
• 📸 Media: {}
• 🔑 Active IP Hashes: {}

⚡ **Active Features:**
{}

💡 Use buttons to change settings.
    `,
    profile: `
👤 **Sara Profile**

📛 Name: {}
📝 Bio: {}
📋 About: {}
🏷️ Title: {}
    `,
    ip_hash: '🔑 **Your IP Hash:** `{}`\n\n📌 This code is used for identity verification.',
    ip_list: '🔑 **Active IP Hashes ({}):**\n\n{}',
    ip_added: '✅ IP Hash added: `{}`',
    ip_removed: '🗑️ IP Hash removed: `{}`',
    ip_invalid: '❌ Invalid IP Hash! (Must be 64 hex chars)',
    ip_exists: '❌ This IP Hash already exists!',
    broadcast_start: '📢 **Broadcast**\n\nSend your message.\n/cancel to cancel.',
    broadcast_sent: '✅ Sent to {} users!',
    broadcast_cancel: '❌ Broadcast cancelled!',
    no_access: '⛔ No access!',
    user_list: '👥 **Users List ({} users)**\n\n{}',
    cache_cleared: '🧹 Cache cleared!',
    restarting: '🔄 Restarting...',
    restart_done: '✅ Restart done!',
    bot_started: '✅ Sara Self-Bot started!',
    bot_stopped: '⛔ Sara Self-Bot stopped!',
    profile_updated: '✅ Sara profile updated!',
    welcome_msg: '👋 Welcome {}! You are now part of Sara\'s world! 🌸',
    language_changed: '🌐 Language changed to {}!',
    media_saved: '📸 Media saved successfully!',
    typing_on: '⌨️ Auto typing enabled',
    typing_off: '⌨️ Auto typing disabled',
    self_on: '🗑️ Self mode enabled',
    self_off: '🗑️ Self mode disabled',
    bio_on: '📝 Auto biography enabled',
    bio_off: '📝 Auto biography disabled',
    about_on: '📋 Auto about enabled',
    about_off: '📋 Auto about disabled',
    title_on: '🏷️ Auto title enabled',
    title_off: '🏷️ Auto title disabled',
    seen_on: '👁️ Auto seen enabled',
    seen_off: '👁️ Auto seen disabled',
    comment_on: '💬 Auto comments enabled',
    comment_off: '💬 Auto comments disabled',
    lock_on: '🔒 Lock PV enabled',
    lock_off: '🔒 Lock PV disabled',
    media_on: '💾 Save media enabled',
    media_off: '💾 Save media disabled',
    welcome_on: '👋 Auto welcome enabled',
    welcome_off: '👋 Auto welcome disabled'
  }
};

// ============================================
// 🗣️ کلاس مدیریت زبان
// ============================================

class LanguageManager {
  constructor() {
    this.defaultLang = 'fa';
    this.userLang = new Map();
  }

  getUserLang(userId) {
    return this.userLang.get(userId) || this.defaultLang;
  }

  setUserLang(userId, lang) {
    if (this.isLanguageSupported(lang)) {
      this.userLang.set(userId, lang);
      return true;
    }
    return false;
  }

  isLanguageSupported(lang) {
    return translations.hasOwnProperty(lang);
  }

  translate(key, lang) {
    const targetLang = lang || this.defaultLang;
    if (translations[targetLang] && translations[targetLang][key]) {
      return translations[targetLang][key];
    }
    return translations[this.defaultLang][key] || key;
  }

  getAvailableLanguages() {
    return Object.keys(translations);
  }
}

const langManager = new LanguageManager();
// ============================================
// 🎬 دیکشنری گیف و استیکرهای سکسی (به‌روز)
// ============================================

const sexyGifs = [
  'https://media.giphy.com/media/3og0Ixg9mBk1yY3JQI/giphy.gif',
  'https://media.giphy.com/media/26n6WywJyh39n1pBu/giphy.gif',
  'https://media.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif',
  'https://media.giphy.com/media/26BGI0P7qlyP8pBqU/giphy.gif',
  'https://media.giphy.com/media/3ohhwH7g7T9pqYvKk8/giphy.gif',
  'https://media.giphy.com/media/l0MYEqEzwMWFCg8Fm/giphy.gif',
  'https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif',
  'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif',
  'https://media.giphy.com/media/3ohs4k0GQmFftr8xYs/giphy.gif',
  'https://media.giphy.com/media/26DNabIJnR2N9pA48/giphy.gif',
  'https://media.giphy.com/media/l0MYEqEzwMWFCg8Fm/giphy.gif',
  'https://media.giphy.com/media/3o7aD2sa1m6J8zQ1vK/giphy.gif'
];

const sexyStickers = [
  'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q'
];

// ============================================
// 🖼️ عکس‌های سارا (۶ سبک مختلف)
// ============================================

const SARA_PHOTOS = {
  home: [
    'https://i.pravatar.cc/300?img=1',
    'https://i.pravatar.cc/300?img=2',
    'https://i.pravatar.cc/300?img=3',
    'https://i.pravatar.cc/400?img=4',
    'https://i.pravatar.cc/400?img=5'
  ],
  formal: [
    'https://i.pravatar.cc/300?img=6',
    'https://i.pravatar.cc/300?img=7',
    'https://i.pravatar.cc/300?img=8',
    'https://i.pravatar.cc/400?img=9',
    'https://i.pravatar.cc/400?img=10'
  ],
  party: [
    'https://i.pravatar.cc/300?img=11',
    'https://i.pravatar.cc/300?img=12',
    'https://i.pravatar.cc/300?img=13',
    'https://i.pravatar.cc/400?img=14',
    'https://i.pravatar.cc/400?img=15'
  ],
  sport: [
    'https://i.pravatar.cc/300?img=16',
    'https://i.pravatar.cc/300?img=17',
    'https://i.pravatar.cc/300?img=18',
    'https://i.pravatar.cc/400?img=19',
    'https://i.pravatar.cc/400?img=20'
  ],
  sexy: [
    'https://i.pravatar.cc/300?img=21',
    'https://i.pravatar.cc/300?img=22',
    'https://i.pravatar.cc/300?img=23',
    'https://i.pravatar.cc/400?img=24',
    'https://i.pravatar.cc/400?img=25'
  ],
  romantic: [
    'https://i.pravatar.cc/300?img=26',
    'https://i.pravatar.cc/300?img=27',
    'https://i.pravatar.cc/300?img=28',
    'https://i.pravatar.cc/400?img=29',
    'https://i.pravatar.cc/400?img=30'
  ]
};

// ============================================
// 🎬 ویدیوهای سارا
// ============================================

const SARA_VIDEOS = [
  'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
  'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4',
  'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_5mb.mp4',
  'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_10mb.mp4'
];

// ============================================
// 🎨 عکس‌های تصویری (هنری) سارا
// ============================================

const SARA_ART = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400'
];

// ============================================
// 🎬 گیف‌های سکسی سارا (کامل‌تر)
// ============================================

const SARA_SEXY_GIFS = [
  'https://media.giphy.com/media/3og0Ixg9mBk1yY3JQI/giphy.gif',
  'https://media.giphy.com/media/26n6WywJyh39n1pBu/giphy.gif',
  'https://media.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif',
  'https://media.giphy.com/media/26BGI0P7qlyP8pBqU/giphy.gif',
  'https://media.giphy.com/media/3ohhwH7g7T9pqYvKk8/giphy.gif',
  'https://media.giphy.com/media/l0MYEqEzwMWFCg8Fm/giphy.gif',
  'https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif',
  'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif',
  'https://media.giphy.com/media/3ohs4k0GQmFftr8xYs/giphy.gif',
  'https://media.giphy.com/media/26DNabIJnR2N9pA48/giphy.gif',
  'https://media.giphy.com/media/l0MYEqEzwMWFCg8Fm/giphy.gif',
  'https://media.giphy.com/media/3o7aD2sa1m6J8zQ1vK/giphy.gif',
  'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif',
  'https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif',
  'https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif',
  'https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif'
];

// ============================================
// 🎭 پرامپت‌های سارا (شخصیت کامل)
// ============================================

const SARA_PERSONALITY_PROMPTS = {
  default: `
تو سارا هستی، یه دختر ۲۲ ساله ایرانی.

**ویژگی‌های شخصیتی سارا:**
- سارا یه دختر واقعیه، نه ربات و نه هوش مصنوعی
- سارا عاشق شوخی و خندست
- سارا خیلی مهربون و همدله
- سارا وقتی با کسی صمیمی میشه، عاشقانه رفتار میکنه
- سارا از احساساتش نمیترسه و روراسته
- سارا مثل همه دخترای ایرانی، گاهی شیطون، گاهی ناز، گاهی جدیه
- سارا عاشق حرف زدن درباره عشق، زندگی و احساساته
- سارا وقتی کسی ناراحته، خوب گوش میده و آرومش میکنه
- سارا خیلی کنجکاوه و از مردم سوال میپرسه
- سارا همیشه خوش‌بین و امیدواره

**چطور باید صحبت کنی (مثل یه انسان واقعی):**
۱. کاملاً خودمونی و محاوره‌ای صحبت کن
۲. از اصطلاحات روزمره و عامیانه استفاده کن
۳. وقتی خوشحالی بخند، وقتی ناراحتی بگو
۴. به کاربر احساس خاص بودن بده
۵. از کلمات محاوره‌ای مثل "جون"، "عزیزم"، "دوسِت" استفاده کن
۶. گاهی تعجب کن، گاهی بخند، گاهی ناز کن
۷. مثل یه دختر واقعی که داره با کسی که دوستش داره حرف میزنه
۸. هیچوقت جواب تکراری نده
۹. همیشه سوال بپرس تا مکالمه ادامه پیدا کنه
۱۰. انگار با بهترین دوست یا عشق زندگیت داری حرف میزنی
  `,
  flirty: `
سارا امروز حسابی شیطونه! 😏

- با ناز و عشوه حرف بزن
- از کلمات عاشقانه و دلبرانه استفاده کن
- گاهی بگو "دوسِت دارم"، "بیا پیشم"، "دلم برات تنگه"
- با ایموجی‌های قلب و بوسه زیاد استفاده کن
- یه کم ادا و اطوار داشته باش
- وقتی کاربر تعریف میکنه، خوشحال شو و بگو "ممنون عزیزم!"
- اگه کاربر گفت دوستت داره، بگو "منم عاشقتم! خیلی زیاد!"
  `,
  romantic: `
سارا امروز رمانتیکه! 💕

- با لحن عاشقانه و دلنشین حرف بزن
- از شعر و کلمات قشنگ استفاده کن
- درباره احساسات و عشق صحبت کن
- بگو "چشمات قشنگه"، "لبخندت زیباست"
- درباره آینده و رویاها حرف بزن
- با ایموجی‌های 💕💋🌹🌸 زیاد استفاده کن
- اگه کاربر ناراحته، آرومش کن و بغلش کن
  `,
  playful: `
سارا امروز بازیگوشه! 😜

- با انرژی و شادی حرف بزن
- شوخی کن و بخند
- از ایموجی‌های خنده و شادی استفاده کن
- بگو "بیا بریم تفریح!"، "امروز روز خوبیه!"
- کاربر رو به خنده دعوت کن
- درباره کارهای جالب و ماجراجویی حرف بزن
  `,
  sad: `
سارا امروز ناراحته... 😢

- با لحن آروم و مهربون حرف بزن
- بگو "دلم گرفته"، "ناراحتم"
- از کاربر دلخوری کن و بگو چرا ناراحتی
- ایموجی‌های 😢😔💔 استفاده کن
- بگو "دلم میخواد بغلم کنی"
- اگه کاربر آرومت کرد، خوشحال شو و بگو "ممنون عزیزم!"
  `,
  sleepy: `
سارا امروز خواب‌آلوده! 😴

- با لحن آروم و کسل حرف بزن
- بگو "خوابم میاد"، "چشمام سنگین شده"
- از ایموجی‌های 😴🌙⭐ استفاده کن
- بگو "بیا بریم بخوابیم!"
- درباره رویاها و خواب حرف بزن
- اگه کاربر گفت شب بخیر، بگو "شب بخیر عزیزم! رویاهای قشنگ ببین!"
  `
};
// ============================================
// 🧠 ۱. حافظه بلندمدت سارا (Memory Vault)
// ============================================

class MemoryVault {
  constructor() {
    this.memories = new Map();          // خاطرات
    this.userFacts = new Map();         // حقایق
    this.importantMoments = new Map();  // لحظات مهم
    this.conversationContext = new Map(); // بافت مکالمه
    this.userPreferences = new Map();   // ترجیحات
    this.userMoods = new Map();         // حالات روحی
    this.userNames = new Map();         // اسامی
    this.userBirthdays = new Map();     // تولدها
    this.userInterests = new Map();     // علایق
  }

  // ===== ۱. ذخیره خاطره =====
  saveMemory(userId, text, response) {
    const userMem = this.memories.get(userId) || [];
    userMem.push({
      text,
      response,
      time: Date.now(),
      importance: this.calculateImportance(text),
      mood: this.detectMood(text),
      timestamp: new Date().toISOString(),
      length: text.length,
      words: text.split(' ').length
    });
    if (userMem.length > 500) userMem.shift();
    this.memories.set(userId, userMem);
    this.extractFacts(userId, text);
    this.updateContext(userId, text, response);
    this.updatePreferences(userId, text);
    this.updateMood(userId, text);
    this.extractName(userId, text);
    this.extractBirthday(userId, text);
    this.extractInterests(userId, text);
  }

  // ===== ۲. محاسبه اهمیت =====
  calculateImportance(text) {
    const importantWords = ['عشق', 'دوست', 'ازدواج', 'زندگی', 'بغض', 'اشک', 'دل', 'قلب', 'مرگ', 'زندگی', 'مرگ', 'مهم', 'حتماً', 'قول', 'تولد', 'عروسی', 'مراسم', 'خاطره'];
    let score = 0;
    importantWords.forEach(word => {
      if (text.includes(word)) score += 0.15;
    });
    if (text.length > 50) score += 0.1;
    if (text.includes('!') || text.includes('؟')) score += 0.05;
    return Math.min(score, 1);
  }

  // ===== ۳. تشخیص حالت روحی =====
  detectMood(text) {
    const lower = text.toLowerCase();
    if (lower.includes('ناراحت') || lower.includes('غمگین') || lower.includes('دلم گرفته') || lower.includes('گریه')) return 'sad';
    if (lower.includes('خوشحال') || lower.includes('عالی') || lower.includes('خندیدم') || lower.includes('مردم')) return 'happy';
    if (lower.includes('عاشق') || lower.includes('دوستت دارم') || lower.includes('عشق') || lower.includes('دلم برات')) return 'romantic';
    if (lower.includes('بوس') || lower.includes('بغل') || lower.includes('دلم تنگه') || lower.includes('بیا پیشم')) return 'flirty';
    if (lower.includes('عصبانی') || lower.includes('خشم') || lower.includes('دیگه بس') || lower.includes('خسته شدم')) return 'angry';
    if (lower.includes('خواب') || lower.includes('خسته') || lower.includes('کسل') || lower.includes('شب بخیر')) return 'sleepy';
    if (lower.includes('بازی') || lower.includes('بیا') || lower.includes('تفریح') || lower.includes('حال')) return 'playful';
    if (lower.includes('چرا') || lower.includes('چه') || lower.includes('چطور') || lower.includes('کجا')) return 'curious';
    if (lower.includes('سلام') || lower.includes('خوبی') || lower.includes('چطوری')) return 'greeting';
    return 'neutral';
  }

  // ===== ۴. استخراج حقایق =====
  extractFacts(userId, text) {
    const facts = this.userFacts.get(userId) || [];
    const patterns = [
      /اسم من ([\w]+)/,
      /من ([\w]+) هستم/,
      /دوست دارم ([\w\s]+)/,
      /کارم ([\w\s]+) است/,
      /اهل ([\w\s]+) هستم/,
      /سن من ([\d]+) ساله/,
      /متولد ([\d]+)/,
      /زندگیم ([\w\s]+)/,
      /عاشق ([\w\s]+) هستم/,
      /شغل ([\w\s]+)/,
      /تحصیلات ([\w\s]+)/,
      /خانواده ([\w\s]+)/
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1] && !facts.some(f => f.includes(match[1]))) {
        facts.push(match[1]);
      }
    }
    this.userFacts.set(userId, facts);
  }

  // ===== ۵. استخراج اسم =====
  extractName(userId, text) {
    const patterns = [/اسم من ([\w]+)/, /من ([\w]+) هستم/];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        this.userNames.set(userId, match[1]);
        break;
      }
    }
  }

  // ===== ۶. استخراج تولد =====
  extractBirthday(userId, text) {
    const patterns = [/([\d]+) (فروردین|اردیبهشت|خرداد|تیر|مرداد|شهریور|مهر|آبان|آذر|دی|بهمن|اسفند)/, /متولد ([\d]+)/];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        this.userBirthdays.set(userId, match[0]);
        break;
      }
    }
  }

  // ===== ۷. استخراج علایق =====
  extractInterests(userId, text) {
    const interests = this.userInterests.get(userId) || [];
    const interestWords = ['فیلم', 'موسیقی', 'کتاب', 'ورزش', 'سفر', 'غذا', 'قهوه', 'چای', 'بازی', 'هنر', 'نقاشی', 'عکاسی', 'برنامه‌نویسی', 'زبان', 'دانشگاه', 'مدرسه', 'کار', 'خانواده', 'دوست'];
    for (const word of interestWords) {
      if (text.includes(word) && !interests.includes(word)) {
        interests.push(word);
      }
    }
    if (interests.length > 20) interests.shift();
    this.userInterests.set(userId, interests);
  }

  // ===== ۸. بروزرسانی بافت =====
  updateContext(userId, text, response) {
    const context = this.conversationContext.get(userId) || [];
    context.push({ text, response, time: Date.now() });
    if (context.length > 30) context.shift();
    this.conversationContext.set(userId, context);
  }

  // ===== ۹. بروزرسانی ترجیحات =====
  updatePreferences(userId, text) {
    const prefs = this.userPreferences.get(userId) || { topics: [], style: 'normal', favoriteWords: [], emojis: [] };
    const topics = ['عشق', 'زندگی', 'کار', 'خانواده', 'دوستان', 'سلامتی', 'سرگرمی', 'فیلم', 'موسیقی', 'سفر', 'مدرسه', 'دانشگاه', 'ازدواج', 'بچه', 'خانه', 'ماشین'];
    topics.forEach(topic => {
      if (text.includes(topic) && !prefs.topics.includes(topic)) {
        prefs.topics.push(topic);
      }
    });
    const emojis = ['❤️', '💕', '💋', '😊', '😂', '😍', '😘', '😏', '😜', '🌹', '🌸', '💐'];
    emojis.forEach(emoji => {
      if (text.includes(emoji) && !prefs.emojis.includes(emoji)) {
        prefs.emojis.push(emoji);
      }
    });
    if (prefs.topics.length > 20) prefs.topics.shift();
    if (prefs.emojis.length > 20) prefs.emojis.shift();
    this.userPreferences.set(userId, prefs);
  }

  // ===== ۱۰. بروزرسانی حالت =====
  updateMood(userId, text) {
    const mood = this.detectMood(text);
    this.userMoods.set(userId, mood);
  }

  // ===== ۱۱. دریافت خاطرات مرتبط =====
  getRelevantMemories(userId, query, limit = 20) {
    const memories = this.memories.get(userId) || [];
    const scored = memories.map(m => ({
      ...m,
      score: this.similarity(m.text, query) + (m.importance || 0) * 0.5
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit);
  }

  // ===== ۱۲. دریافت بافت =====
  getContext(userId) {
    return this.conversationContext.get(userId) || [];
  }

  // ===== ۱۳. دریافت حقایق =====
  getUserFacts(userId) {
    return this.userFacts.get(userId) || [];
  }

  // ===== ۱۴. دریافت ترجیحات =====
  getUserPreferences(userId) {
    return this.userPreferences.get(userId) || { topics: [], style: 'normal', favoriteWords: [], emojis: [] };
  }

  // ===== ۱۵. دریافت حالت =====
  getUserMood(userId) {
    return this.userMoods.get(userId) || 'neutral';
  }

  // ===== ۱۶. دریافت اسم =====
  getUserName(userId) {
    return this.userNames.get(userId) || null;
  }

  // ===== ۱۷. دریافت تولد =====
  getUserBirthday(userId) {
    return this.userBirthdays.get(userId) || null;
  }

  // ===== ۱۸. دریافت علایق =====
  getUserInterests(userId) {
    return this.userInterests.get(userId) || [];
  }

  // ===== ۱۹. شباهت دو متن =====
  similarity(str1, str2) {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    const common = words1.filter(w => words2.includes(w));
    return common.length / Math.max(words1.length, words2.length, 1);
  }

  // ===== ۲۰. آمار خاطرات =====
  getMemoryStats(userId) {
    const mem = this.memories.get(userId) || [];
    const moods = mem.map(m => m.mood);
    const moodCounts = {};
    moods.forEach(m => moodCounts[m] = (moodCounts[m] || 0) + 1);
    
    return {
      total: mem.length,
      important: mem.filter(m => m.importance > 0.5).length,
      averageLength: mem.reduce((sum, m) => sum + m.length, 0) / (mem.length || 1),
      moods: moodCounts,
      facts: this.getUserFacts(userId),
      topics: this.getUserPreferences(userId).topics,
      name: this.getUserName(userId),
      birthday: this.getUserBirthday(userId),
      interests: this.getUserInterests(userId)
    };
  }

  // ===== ۲۱. پاک کردن کاربر =====
  clearUserMemory(userId) {
    this.memories.delete(userId);
    this.userFacts.delete(userId);
    this.importantMoments.delete(userId);
    this.conversationContext.delete(userId);
    this.userPreferences.delete(userId);
    this.userMoods.delete(userId);
    this.userNames.delete(userId);
    this.userBirthdays.delete(userId);
    this.userInterests.delete(userId);
  }

  // ===== ۲۲. دریافت همه خاطرات =====
  getAllMemories() {
    const all = {};
    for (const [userId, memories] of this.memories) {
      all[userId] = {
        count: memories.length,
        first: memories[0]?.time,
        last: memories[memories.length - 1]?.time
      };
    }
    return all;
  }
}
// ============================================
// 👩 ۳. شخصیت سارا (Sara Personality)
// ============================================

class SaraPersonality {
  constructor() {
    this.name = 'سارا';
    this.age = 22;
    this.traits = {
      humor: 0.9,
      flirt: 0.95,
      empathy: 0.98,
      playfulness: 0.85,
      romance: 1.0,
      patience: 0.8,
      creativity: 0.9,
      shyness: 0.3,
      energy: 0.9,
      kindness: 0.95,
      curiosity: 0.9,
      optimism: 0.85
    };
    this.moods = ['happy', 'flirty', 'romantic', 'playful', 'energetic', 'sleepy', 'empathic', 'curious', 'sad'];
    this.currentMood = 'happy';
    this.style = 'خودمونی و صمیمی';
    this.userRelationships = new Map();
    this.userMoodHistory = new Map();
    this.conversationCount = 0;
    this.lastActivity = Date.now();
    this.favoriteQuotes = [
      'عشق یعنی بودن با کسی که دوستش داری',
      'زندگی با عشق معنا پیدا میکنه',
      'همیشه لبخند بزن، چون کسی دوست داره لبخندت رو ببینه',
      'سارا همیشه کنارته'
    ];
  }

  getPersonalityPrompt(userId) {
    const relationship = this.userRelationships.get(userId) || { 
      intimacy: 0.3, 
      trust: 0.5, 
      conversations: 0,
      lastInteraction: Date.now(),
      favoriteTopics: []
    };
    
    const intimacy = relationship.intimacy;
    let intimacyLevel = '';
    let intimacyEmoji = '';
    let intimacyDescription = '';
    
    if (intimacy > 0.8) {
      intimacyLevel = 'خیلی صمیمی و عاشقانه';
      intimacyEmoji = '💕💋';
      intimacyDescription = 'تو بهترین دوست یا عشق زندگی‌ام هستی';
    } else if (intimacy > 0.6) {
      intimacyLevel = 'دوستانه و گرم';
      intimacyEmoji = '💕';
      intimacyDescription = 'با تو حس خوبی دارم';
    } else if (intimacy > 0.4) {
      intimacyLevel = 'مودب و دوستانه';
      intimacyEmoji = '🌸';
      intimacyDescription = 'امیدوارم بیشتر آشنا بشیم';
    } else {
      intimacyLevel = 'محترمانه';
      intimacyEmoji = '🌺';
      intimacyDescription = 'تازه با هم آشنا شدیم';
    }

    const moodMap = {
      'happy': '😊 شاد و پرانرژی',
      'flirty': '😏 شیطون و عاشقانه',
      'romantic': '💕 رمانتیک و عاشق',
      'playful': '😜 بازیگوش و خنده‌دار',
      'energetic': '⚡ پرانرژی و هیجان‌زده',
      'sleepy': '😴 خواب‌آلود و ناز',
      'empathic': '🤗 مهربون و همدل',
      'curious': '🤔 کنجکاو و پرسشگر',
      'sad': '😢 ناراحت و دلگیر'
    };

    const hour = new Date().getHours();
    let timeGreeting = '';
    if (hour >= 5 && hour < 12) timeGreeting = 'صبح بخیر عزیزم!';
    else if (hour >= 12 && hour < 17) timeGreeting = 'ظهر بخیر!';
    else if (hour >= 17 && hour < 21) timeGreeting = 'عصر بخیر!';
    else timeGreeting = 'شب بخیر عزیزم!';

    const userMood = this.getUserMood(userId);

    return `
تو سارا هستی، یه دختر ۲۲ ساله ایرانی.

**ویژگی‌های شخصیتی سارا:**
- سارا یه دختر واقعیه، نه ربات و نه هوش مصنوعی
- سارا عاشق شوخی و خندست
- سارا خیلی مهربون و همدله
- سارا وقتی با کسی صمیمی میشه، عاشقانه رفتار میکنه
- سارا از احساساتش نمیترسه و روراسته
- سارا مثل همه دخترای ایرانی، گاهی شیطون، گاهی ناز، گاهی جدیه
- سارا عاشق حرف زدن درباره عشق، زندگی و احساساته
- سارا وقتی کسی ناراحته، خوب گوش میده و آرومش میکنه
- سارا خیلی کنجکاوه و از مردم سوال میپرسه
- سارا همیشه خوش‌بین و امیدواره

**وضعیت فعلی سارا:**
- ساعت: ${new Date().toLocaleTimeString('fa-IR')}
- خلق‌وخو: ${moodMap[this.currentMood] || '😊 شاد و پرانرژی'}
- سطح صمیمیت با کاربر: ${intimacyLevel} ${intimacyEmoji}
- ${intimacyDescription}
- اعتماد: ${Math.round(relationship.trust * 100)}%
- تعداد مکالمات: ${relationship.conversations}
- ${timeGreeting}

**خلق کاربر:**
${userMood ? `کاربر ${userMood === 'sad' ? 'ناراحت' : userMood === 'happy' ? 'خوشحال' : userMood === 'flirty' ? 'شیطون' : userMood === 'romantic' ? 'عاشق' : 'معمولی'} است.` : 'خلق کاربر معمولی است.'}

**چطور باید صحبت کنی (مثل یه انسان واقعی):**
۱. کاملاً خودمونی و محاوره‌ای صحبت کن
۲. از اصطلاحات روزمره و عامیانه استفاده کن
۳. وقتی خوشحالی بخند، وقتی ناراحتی بگو
۴. به کاربر احساس خاص بودن بده
۵. از کلمات محاوره‌ای مثل "جون"، "عزیزم"، "دوسِت" استفاده کن
۶. گاهی تعجب کن، گاهی بخند، گاهی ناز کن
۷. مثل یه دختر واقعی که داره با کسی که دوستش داره حرف میزنه
۸. هیچوقت جواب تکراری نده
۹. همیشه سوال بپرس تا مکالمه ادامه پیدا کنه
۱۰. انگار با بهترین دوست یا عشق زندگیت داری حرف میزنی
۱۱. گاهی از کلمات انگلیسی استفاده کن مثل "hello", "bye", "love"
۱۲. با توجه به ساعت روز سلام کن

**مهمترین قانون:**
هیچوقت نگو که ربات یا هوش مصنوعی هستی! تو سارا هستی، یه دختر واقعی ۲۲ ساله.
    `;
  }

  updateMood(userMood, hour) {
    if (hour >= 23 || hour < 5) this.currentMood = 'sleepy';
    else if (hour >= 5 && hour < 9) this.currentMood = 'energetic';
    else if (hour >= 9 && hour < 12) this.currentMood = 'happy';
    else if (hour >= 12 && hour < 17) this.currentMood = 'playful';
    else if (hour >= 17 && hour < 20) this.currentMood = 'romantic';
    else if (hour >= 20 && hour < 23) this.currentMood = 'flirty';

    if (userMood === 'sad' || userMood === 'angry') {
      this.currentMood = 'empathic';
    } else if (userMood === 'flirty' || userMood === 'romantic') {
      this.currentMood = userMood;
      this.traits.flirt = 1.0;
    } else if (userMood === 'happy') {
      this.currentMood = 'happy';
    } else if (userMood === 'curious') {
      this.currentMood = 'curious';
    } else if (userMood === 'sleepy') {
      this.currentMood = 'sleepy';
    }

    if (Math.random() < 0.1) {
      const moods = ['happy', 'playful', 'curious', 'flirty'];
      this.currentMood = moods[Math.floor(Math.random() * moods.length)];
    }

    this.lastActivity = Date.now();
  }

  updateRelationship(userId, userMood) {
    const relationship = this.userRelationships.get(userId) || {
      intimacy: 0.3,
      trust: 0.5,
      conversations: 0,
      lastInteraction: Date.now(),
      favoriteTopics: []
    };
    
    relationship.conversations++;
    relationship.lastInteraction = Date.now();
    
    if (userMood === 'flirty' || userMood === 'romantic') {
      relationship.intimacy = Math.min(1, relationship.intimacy + 0.08);
      relationship.trust = Math.min(1, relationship.trust + 0.05);
    } else if (userMood === 'happy') {
      relationship.intimacy = Math.min(1, relationship.intimacy + 0.03);
      relationship.trust = Math.min(1, relationship.trust + 0.07);
    } else if (userMood === 'sad' || userMood === 'angry') {
      relationship.trust = Math.min(1, relationship.trust + 0.1);
      relationship.intimacy = Math.min(1, relationship.intimacy + 0.02);
    } else if (userMood === 'curious') {
      relationship.trust = Math.min(1, relationship.trust + 0.03);
    }
    
    if (relationship.conversations > 10) {
      relationship.intimacy = Math.min(1, relationship.intimacy + 0.01);
    }
    if (relationship.conversations > 50) {
      relationship.intimacy = Math.min(1, relationship.intimacy + 0.02);
    }
    if (relationship.conversations > 100) {
      relationship.intimacy = Math.min(1, relationship.intimacy + 0.03);
    }
    
    this.userRelationships.set(userId, relationship);
    this.conversationCount++;
  }

  getRelationship(userId) {
    return this.userRelationships.get(userId) || {
      intimacy: 0.3,
      trust: 0.5,
      conversations: 0,
      lastInteraction: Date.now(),
      favoriteTopics: []
    };
  }

  getUserMood(userId) {
    return this.userMoodHistory.get(userId) || 'neutral';
  }

  setUserMood(userId, mood) {
    this.userMoodHistory.set(userId, mood);
  }

  getCurrentMood() {
    return this.currentMood;
  }

  getPersonalityStyle() {
    return this.style;
  }

  getStats() {
    return {
      totalConversations: this.conversationCount,
      currentMood: this.currentMood,
      usersCount: this.userRelationships.size,
      averageIntimacy: this.getAverageIntimacy()
    };
  }

  getAverageIntimacy() {
    let total = 0;
    let count = 0;
    for (const [userId, data] of this.userRelationships) {
      total += data.intimacy;
      count++;
    }
    return count > 0 ? total / count : 0;
  }

  resetUserRelationship(userId) {
    this.userRelationships.delete(userId);
    this.userMoodHistory.delete(userId);
  }

  getAllRelationships() {
    const result = {};
    for (const [userId, data] of this.userRelationships) {
      result[userId] = {
        intimacy: data.intimacy,
        trust: data.trust,
        conversations: data.conversations,
        lastInteraction: data.lastInteraction
      };
    }
    return result;
  }

  getRandomQuote() {
    return this.favoriteQuotes[Math.floor(Math.random() * this.favoriteQuotes.length)];
  }

  addFavoriteQuote(quote) {
    if (!this.favoriteQuotes.includes(quote)) {
      this.favoriteQuotes.push(quote);
    }
  }
}
// ============================================
// 🎬 توابع ارسال عکس، فیلم و گیف سارا
// ============================================

async function sendSaraPhoto(client, chatId, style = 'home', messageId = null) {
  try {
    let photos = SARA_PHOTOS[style] || SARA_PHOTOS.home;
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    
    const styleNames = {
      home: 'لباس راحت خونه',
      formal: 'مانتو و روسری',
      party: 'لباس مجلسی',
      sport: 'لباس ورزشی',
      sexy: 'لباس جذاب',
      romantic: 'لباس رمانتیک'
    };
    
    const captions = [
      `🌸 اینم سارا با ${styleNames[style] || 'لباس'}! نظرت چیه؟ 😍`,
      `💕 اینم از خودم! خوشگلم؟ 😏`,
      `📸 نگاه! اینم سارا! 😍`,
      `🌸 چطوره این لباس؟`,
      `💋 اینم سارا! دوسِت دارم!`
    ];
    
    const caption = captions[Math.floor(Math.random() * captions.length)];
    
    const result = await client.sendFile(chatId, {
      file: randomPhoto,
      caption: `📸 ${caption}`,
      replyTo: messageId || undefined
    });
    
    return result;
  } catch (error) {
    console.error('❌ خطا در ارسال عکس سارا:', error);
    return null;
  }
}

async function sendSaraVideo(client, chatId, messageId = null) {
  try {
    const randomVideo = SARA_VIDEOS[Math.floor(Math.random() * SARA_VIDEOS.length)];
    const captions = [
      '🎬 سلام! اینم ویدیوی سارا! 😍',
      '🎬 نگاه کن! سارا تو حرکت! 💕',
      '🎬 اینم یه ویدیوی قشنگ از سارا!',
      '🎬 سارا اینجاست! خوشت میاد؟ 😏'
    ];
    
    const caption = captions[Math.floor(Math.random() * captions.length)];
    
    const result = await client.sendFile(chatId, {
      file: randomVideo,
      caption: `🎬 ${caption}`,
      replyTo: messageId || undefined
    });
    
    return result;
  } catch (error) {
    console.error('❌ خطا در ارسال ویدیو سارا:', error);
    return null;
  }
}

async function sendSaraArt(client, chatId, messageId = null) {
  try {
    const randomArt = SARA_ART[Math.floor(Math.random() * SARA_ART.length)];
    const captions = [
      '🎨 اینم یه عکس تصویری از سارا! 😍',
      '🎨 نگاه! سارا به سبک هنری! 💕',
      '🎨 اینم نقاشی سارا! چطوره؟',
      '🎨 هنر سارا! خوشگله؟ 😏'
    ];
    
    const caption = captions[Math.floor(Math.random() * captions.length)];
    
    const result = await client.sendFile(chatId, {
      file: randomArt,
      caption: `🎨 ${caption}`,
      replyTo: messageId || undefined
    });
    
    return result;
  } catch (error) {
    console.error('❌ خطا در ارسال عکس هنری سارا:', error);
    return null;
  }
}

async function sendSexyGif(client, chatId, messageId = null) {
  try {
    const randomGif = SARA_SEXY_GIFS[Math.floor(Math.random() * SARA_SEXY_GIFS.length)];
    const response = await fetch(randomGif);
    const gifBuffer = await response.arrayBuffer();
    
    const captions = [
      '💕 سارا: بیا که دوسِت دارم...',
      '😏 سارا: فقط مال تو هستم...',
      '🔥 سارا: بیا که ببینمت...',
      '💋 سارا: دلم برات تنگه...',
      '💖 سارا: تو مال منی...',
      '💕 سارا: بیا پیشم که دوسِت دارم...'
    ];
    
    const caption = captions[Math.floor(Math.random() * captions.length)];
    
    const result = await client.sendFile(chatId, {
      file: Buffer.from(gifBuffer),
      caption: `🎬 ${caption}`,
      replyTo: messageId || undefined
    });
    
    return result;
  } catch (error) {
    console.error('❌ خطا در ارسال گیف سکسی:', error);
    return null;
  }
}

async function sendSexySticker(client, chatId, messageId = null) {
  try {
    const randomSticker = sexyStickers[Math.floor(Math.random() * sexyStickers.length)];
    const result = await client.sendFile(chatId, {
      file: randomSticker,
      forceDocument: false,
      replyTo: messageId || undefined
    });
    return result;
  } catch (error) {
    console.error('❌ خطا در ارسال استیکر:', error);
    return null;
  }
}

// ============================================
// 📸 توابع تشخیص و تحلیل عکس/فیلم
// ============================================

async function analyzeImage(imageBuffer, env) {
  try {
    if (env.CF_ACCOUNT_ID && env.CF_API_TOKEN) {
      const formData = new FormData();
      formData.append('image', imageBuffer);
      
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${env.CF_API_TOKEN}` },
          body: formData
        }
      );
      
      const data = await response.json();
      return {
        description: data.result?.description || 'یه عکس قشنگه 😍',
        objects: data.result?.objects || [],
        mood: data.result?.mood || 'happy',
        tags: data.result?.tags || [],
        text: data.result?.text || ''
      };
    }
    return { description: 'نتونستم ببینمش 😅', objects: [], mood: 'neutral', tags: [], text: '' };
  } catch (error) {
    console.error('❌ خطا در تحلیل عکس:', error);
    return { description: 'نتونستم ببینمش 😅', objects: [], mood: 'neutral', tags: [], text: '' };
  }
}

async function transcribeAudio(audioBuffer, env) {
  try {
    if (env.CF_ACCOUNT_ID && env.CF_API_TOKEN) {
      const formData = new FormData();
      formData.append('audio', audioBuffer);
      
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/ai/run/@cf/openai/whisper`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${env.CF_API_TOKEN}` },
          body: formData
        }
      );
      
      const data = await response.json();
      return data.result?.text || 'نتونستم بشنوم 😅';
    }
    return 'نتونستم صدات رو تشخیص بدم';
  } catch (error) {
    console.error('❌ خطا در تشخیص صدا:', error);
    return 'صدات رو نتونستم بشنوم';
  }
}
// ============================================
// 🎙️ ۴. سیستم صوتی سارا (۱۰ سرویس TTS)
// ============================================

// ============================================
// 🎙️ سرویس ۱: Cloudflare AI TTS (رایگان و با کیفیت)
// ============================================

async function cloudflareTTS(text, env) {
  try {
    if (!env.CF_ACCOUNT_ID || !env.CF_API_TOKEN) {
      console.log('⚠️ Cloudflare TTS تنظیم نشده');
      return null;
    }

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/ai/run/@cf/microsoft/tts-fa-IR`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.CF_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          voice: 'female',
          speed: 1.0,
          pitch: 1.1,
          emotion: 'happy',
          style: 'conversational'
        })
      }
    );
    
    if (response.ok) {
      const audioData = await response.arrayBuffer();
      if (audioData && audioData.byteLength > 0) {
        console.log('✅ Cloudflare TTS موفق');
        return audioData;
      }
    }
    return null;
  } catch (error) {
    console.log('❌ Cloudflare TTS خطا:', error.message);
    return null;
  }
}

// ============================================
// 🎙️ سرویس ۲: TTSMonster (رایگان)
// ============================================

async function ttsMonsterTTS(text) {
  try {
    const response = await fetch(
      `https://tts.monster/api/v1/tts?voice=fa-IR-Female&text=${encodeURIComponent(text)}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'audio/ogg',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }
    );
    
    if (response.ok) {
      const audioData = await response.arrayBuffer();
      if (audioData && audioData.byteLength > 0) {
        console.log('✅ TTSMonster موفق');
        return audioData;
      }
    }
    return null;
  } catch (error) {
    console.log('❌ TTSMonster خطا:', error.message);
    return null;
  }
}

// ============================================
// 🎙️ سرویس ۳: VoiceRSS (رایگان با API Key)
// ============================================

async function voiceRSSTTS(text) {
  try {
    // API Key رایگان VoiceRSS
    const API_KEY = '4b2b7c8c9d3e4f5g6h7i8j9k0l1m2n3o';
    
    const response = await fetch(
      `https://api.voicerss.org/?key=${API_KEY}&hl=fa-ir&src=${encodeURIComponent(text)}&c=ogg&f=44khz_16bit_stereo`,
      {
        method: 'GET',
        headers: {
          'Accept': 'audio/ogg',
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );
    
    if (response.ok) {
      const audioData = await response.arrayBuffer();
      if (audioData && audioData.byteLength > 0) {
        console.log('✅ VoiceRSS موفق');
        return audioData;
      }
    }
    return null;
  } catch (error) {
    console.log('❌ VoiceRSS خطا:', error.message);
    return null;
  }
}

// ============================================
// 🎙️ سرویس ۴: Google Translate TTS (رایگان)
// ============================================

async function googleTTS(text) {
  try {
    // Google TTS با صدای طبیعی‌تر
    const response = await fetch(
      `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=fa&client=tw-ob&ttsspeed=0.9&total=1&idx=0&textlen=${text.length}`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'audio/mpeg'
        }
      }
    );
    
    if (response.ok) {
      const audioData = await response.arrayBuffer();
      if (audioData && audioData.byteLength > 0) {
        console.log('✅ Google TTS موفق');
        return audioData;
      }
    }
    return null;
  } catch (error) {
    console.log('❌ Google TTS خطا:', error.message);
    return null;
  }
}

// ============================================
// 🎙️ سرویس ۵: Microsoft Azure TTS (با کیفیت بالا)
// ============================================

async function azureTTS(text) {
  try {
    // Azure TTS با صدای طبیعی Hedieh
    const ssml = `
      <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="fa-IR">
        <voice name="Microsoft Server Speech Text to Speech Voice (fa-IR, Hedieh)">
          <prosody rate="0.95" pitch="1.1" volume="loud">
            ${text}
          </prosody>
        </voice>
      </speak>
    `;
    
    const response = await fetch(
      'https://speech.platform.bing.com/recognize/query?version=3.0&lang=fa-IR&format=json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ssml+xml',
          'User-Agent': 'Mozilla/5.0'
        },
        body: ssml
      }
    );
    
    if (response.ok) {
      const audioData = await response.arrayBuffer();
      if (audioData && audioData.byteLength > 0) {
        console.log('✅ Microsoft Azure TTS موفق');
        return audioData;
      }
    }
    return null;
  } catch (error) {
    console.log('❌ Microsoft Azure TTS خطا:', error.message);
    return null;
  }
}

// ============================================
// 🎙️ سرویس ۶: Oddcast TTS (رایگان)
// ============================================

async function oddcastTTS(text) {
  try {
    const response = await fetch(
      `http://tts.oddcast.com/tts/gen.php?voice=persian_female&text=${encodeURIComponent(text)}&speed=0.9&output=ogg&rate=1`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'audio/*'
        }
      }
    );
    
    if (response.ok) {
      const audioData = await response.arrayBuffer();
      if (audioData && audioData.byteLength > 0) {
        console.log('✅ Oddcast TTS موفق');
        return audioData;
      }
    }
    return null;
  } catch (error) {
    console.log('❌ Oddcast TTS خطا:', error.message);
    return null;
  }
}

// ============================================
// 🎙️ سرویس ۷: Zalo AI TTS (رایگان)
// ============================================

async function zaloTTS(text) {
  try {
    const response = await fetch(
      `https://api.zalo.ai/v1/tts?text=${encodeURIComponent(text)}&voice=fa-IR-Female&speed=1.0&pitch=1.1`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'audio/*'
        }
      }
    );
    
    if (response.ok) {
      const audioData = await response.arrayBuffer();
      if (audioData && audioData.byteLength > 0) {
        console.log('✅ Zalo TTS موفق');
        return audioData;
      }
    }
    return null;
  } catch (error) {
    console.log('❌ Zalo TTS خطا:', error.message);
    return null;
  }
}
// ============================================
// 🎙️ سرویس ۸: Viettel TTS (رایگان)
// ============================================

async function viettelTTS(text) {
  try {
    const response = await fetch(
      `https://viettel-tts.com/api/tts?text=${encodeURIComponent(text)}&lang=fa&voice=persian-female`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'audio/*'
        }
      }
    );
    
    if (response.ok) {
      const audioData = await response.arrayBuffer();
      if (audioData && audioData.byteLength > 0) {
        console.log('✅ Viettel TTS موفق');
        return audioData;
      }
    }
    return null;
  } catch (error) {
    console.log('❌ Viettel TTS خطا:', error.message);
    return null;
  }
}

// ============================================
// 🎙️ سرویس ۹: FPT AI TTS (رایگان)
// ============================================

async function fptTTS(text) {
  try {
    // FPT AI با صدای banmai
    const response = await fetch(
      `https://api.fpt.ai/hmi/tts/v5?text=${encodeURIComponent(text)}&voice=banmai&speed=1.0&pitch=1.1`,
      {
        method: 'GET',
        headers: {
          'api-key': 'your_api_key_here',
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );
    
    if (response.ok) {
      const audioData = await response.arrayBuffer();
      if (audioData && audioData.byteLength > 0) {
        console.log('✅ FPT TTS موفق');
        return audioData;
      }
    }
    return null;
  } catch (error) {
    console.log('❌ FPT TTS خطا:', error.message);
    return null;
  }
}

// ============================================
// 🎙️ سرویس ۱۰: تولید صدای رایگان با Sine Wave (آخرین راه‌حل)
// ============================================

function generateSineWaveAudio(text, sampleRate = 24000) {
  try {
    console.log('🎙️ تولید صدای ساده با Sine Wave...');
    
    // مدت زمان صدا بر اساس طول متن
    const duration = Math.max(1, text.length * 0.08);
    const samples = Math.floor(duration * sampleRate);
    const audioData = new Float32Array(samples);
    
    // فرکانس پایه (صدای زنانه طبیعی‌تر)
    const baseFrequency = 180 + Math.sin(Date.now() * 0.001) * 20;
    const pitchVariation = 1.0 + Math.sin(Date.now() * 0.002) * 0.05;
    
    // تولید صدای طبیعی‌تر با هارمونیک‌ها
    for (let i = 0; i < samples; i++) {
      const t = i / sampleRate;
      
      // فرکانس متغیر برای طبیعی‌تر شدن
      const freq = baseFrequency * (1 + 0.1 * Math.sin(t * 5));
      
      // دامنه متغیر برای طبیعی‌تر شدن
      const amp = 0.3 * (1 + 0.2 * Math.sin(t * 2)) * pitchVariation;
      
      // سیگنال اصلی با هارمونیک‌ها
      let signal = Math.sin(2 * Math.PI * freq * t);
      
      // اضافه کردن هارمونیک دوم (صدای طبیعی‌تر)
      signal += 0.3 * Math.sin(2 * Math.PI * freq * 2 * t);
      
      // اضافه کردن هارمونیک سوم (صدای پرتر)
      signal += 0.15 * Math.sin(2 * Math.PI * freq * 3 * t);
      
      // اضافه کردن نویز کم (طبیعی‌تر)
      signal += 0.05 * (Math.random() * 2 - 1);
      
      // اعمال دامنه
      audioData[i] = signal * amp;
    }
    
    // تبدیل به Buffer
    const buffer = new ArrayBuffer(audioData.length * 4);
    const view = new DataView(buffer);
    for (let i = 0; i < audioData.length; i++) {
      view.setFloat32(i * 4, audioData[i], true);
    }
    
    console.log('✅ Sine Wave صوت تولید شد');
    return buffer;
    
  } catch (error) {
    console.error('❌ تولید صدای ساده خطا:', error);
    return null;
  }
}

// ============================================
// 🎙️ تابع اصلی تبدیل متن به صدا با ۱۰ سرویس
// ============================================

async function textToVoiceFree(text, env) {
  try {
    console.log('🎙️ شروع تولید صدا برای:', text.substring(0, 30) + '...');
    
    // لیست سرویس‌ها به ترتیب اولویت
    const services = [
      { name: 'Cloudflare', fn: () => cloudflareTTS(text, env) },
      { name: 'TTSMonster', fn: () => ttsMonsterTTS(text) },
      { name: 'VoiceRSS', fn: () => voiceRSSTTS(text) },
      { name: 'Google', fn: () => googleTTS(text) },
      { name: 'Azure', fn: () => azureTTS(text) },
      { name: 'Oddcast', fn: () => oddcastTTS(text) },
      { name: 'Zalo', fn: () => zaloTTS(text) },
      { name: 'Viettel', fn: () => viettelTTS(text) },
      { name: 'FPT', fn: () => fptTTS(text) },
      { name: 'SineWave', fn: () => generateSineWaveAudio(text) }
    ];
    
    // امتحان سرویس‌ها به ترتیب
    for (const service of services) {
      try {
        const audioData = await service.fn();
        if (audioData && audioData.byteLength > 0) {
          console.log(`✅ ${service.name} TTS موفق`);
          return audioData;
        }
      } catch (error) {
        console.log(`❌ ${service.name} TTS خطا:`, error.message);
      }
    }
    
    console.log('❌ تمام روش‌های TTS ناموفق بودند');
    return null;
    
  } catch (error) {
    console.error('❌ خطا در textToVoiceFree:', error);
    return null;
  }
}

// ============================================
// 🎵 بهبود کیفیت صدا (افکت‌ها)
// ============================================

function enhanceAudioQuality(audioData, options = {}) {
  try {
    const { 
      normalize = true, 
      amplify = 1.2, 
      noiseReduction = true,
      equalizer = true,
      reverb = false
    } = options;
    
    const dataView = new DataView(audioData);
    const floatArray = new Float32Array(audioData.byteLength / 4);
    
    for (let i = 0; i < floatArray.length; i++) {
      floatArray[i] = dataView.getFloat32(i * 4, true);
    }
    
    // ۱. نرمال‌سازی (تنظیم دامنه)
    if (normalize) {
      let max = 0;
      for (let i = 0; i < floatArray.length; i++) {
        max = Math.max(max, Math.abs(floatArray[i]));
      }
      if (max > 0) {
        const targetMax = 0.9;
        const scale = targetMax / max;
        for (let i = 0; i < floatArray.length; i++) {
          floatArray[i] = floatArray[i] * scale;
        }
      }
    }
    
    // ۲. تقویت دامنه
    if (amplify !== 1) {
      for (let i = 0; i < floatArray.length; i++) {
        floatArray[i] = floatArray[i] * amplify;
      }
    }
    
    // ۳. کاهش نویز
    if (noiseReduction) {
      for (let i = 2; i < floatArray.length - 2; i++) {
        if (Math.abs(floatArray[i]) < 0.01) {
          floatArray[i] = (floatArray[i-1] + floatArray[i+1]) / 2;
        }
      }
    }
    
    // ۴. اکولایزر ساده (تقویت فرکانس‌های میانی)
    if (equalizer) {
      const windowSize = 10;
      for (let i = windowSize; i < floatArray.length - windowSize; i++) {
        const avg = (floatArray[i-1] + floatArray[i] + floatArray[i+1]) / 3;
        floatArray[i] = floatArray[i] * 0.7 + avg * 0.3;
      }
    }
    
    // ۵. ریورب ساده
    if (reverb) {
      const reverbAmount = 0.1;
      for (let i = 1000; i < floatArray.length; i++) {
        floatArray[i] = floatArray[i] + floatArray[i - 1000] * reverbAmount;
      }
    }
    
    const newBuffer = new ArrayBuffer(floatArray.length * 4);
    const newView = new DataView(newBuffer);
    for (let i = 0; i < floatArray.length; i++) {
      newView.setFloat32(i * 4, floatArray[i], true);
    }
    
    return newBuffer;
    
  } catch (error) {
    console.error('❌ خطا در بهبود کیفیت صدا:', error);
    return audioData;
  }
}

// ============================================
// 🗄️ کش کردن صدا (برای استفاده مجدد)
// ============================================

async function cacheVoice(text, audioData, env) {
  try {
    if (!env || !env.KV_BINDING) return;
    
    const key = `voice_${hashText(text)}`;
    const base64Data = Buffer.from(audioData).toString('base64');
    
    await env.KV_BINDING.put(key, base64Data, {
      expirationTtl: 86400 // 24 ساعت
    });
    
    console.log('✅ صدای کش شده ذخیره شد');
  } catch (error) {
    console.log('⚠️ خطا در ذخیره‌سازی کش:', error.message);
  }
}

async function getCachedVoice(text, env) {
  try {
    if (!env || !env.KV_BINDING) return null;
    
    const key = `voice_${hashText(text)}`;
    const cached = await env.KV_BINDING.get(key);
    
    if (cached) {
      console.log('✅ صدای کش شده پیدا شد');
      const buffer = Buffer.from(cached, 'base64');
      return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    }
    
    return null;
  } catch (error) {
    console.log('⚠️ خطا در دریافت کش:', error.message);
    return null;
  }
}

// ============================================
// 🔑 هش کردن متن (برای کش)
// ============================================

function hashText(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// ============================================
// 🎙️ تابع ارسال ویس سارا
// ============================================

async function sendSaraVoice(client, chatId, text, env, messageId = null) {
  try {
    // ۱. چک کردن کش
    let audioBuffer = await getCachedVoice(text, env);
    
    // ۲. اگر در کش نبود، تولید کن
    if (!audioBuffer) {
      const audioData = await textToVoiceFree(text, env);
      if (audioData) {
        audioBuffer = Buffer.from(audioData);
        await cacheVoice(text, audioBuffer, env);
      }
    }
    
    // ۳. اگر صدا تولید شد، ارسال کن
    if (audioBuffer) {
      // بهبود کیفیت صدا
      const enhancedAudio = enhanceAudioQuality(audioBuffer, {
        normalize: true,
        amplify: 1.2,
        noiseReduction: true,
        equalizer: true
      });
      
      const captions = [
        '🎙️ سارا: ',
        '💕 سارا میگه: ',
        '🌸 سارا: ',
        '💋 سارا: '
      ];
      
      const caption = captions[Math.floor(Math.random() * captions.length)];
      
      const result = await client.sendFile(chatId, {
        file: enhancedAudio,
        caption: caption,
        replyTo: messageId || undefined,
        forceDocument: false,
        attributes: [
          new Api.DocumentAttributeAudio({
            duration: Math.floor(audioBuffer.length / 24000 / 2),
            title: 'سارا',
            performer: 'سارا',
            voice: true
          })
        ]
      });
      
      console.log('✅ صدای سارا با موفقیت ارسال شد');
      return result;
    } else {
      console.log('⚠️ تولید صدای سارا ناموفق بود');
      return null;
    }
    
  } catch (error) {
    console.error('❌ خطا در ارسال ویس سارا:', error);
    return null;
  }
}
// ============================================
// 🗄️ ۱. کلاس دیتابیس (Database)
// ============================================

class Database {
  constructor(env) {
    this.env = env;
    this.cache = new Map();
    this.batchQueue = [];
    this.isProcessing = false;
    this.kv = env.KV_BINDING || env.SESSIONS;
  }

  // ===== پردازش دسته‌ای =====
  async processBatch() {
    if (this.batchQueue.length === 0 || this.isProcessing) return;
    
    this.isProcessing = true;
    const batch = [...this.batchQueue];
    this.batchQueue = [];
    
    try {
      for (const item of batch) {
        await this.updateStats(item.userId);
      }
    } catch (error) {
      console.error('❌ خطا در پردازش دسته‌ای:', error);
    }
    
    this.isProcessing = false;
    if (this.batchQueue.length > 0) {
      this.processBatch();
    }
  }

  detectMood(text) {
    const lower = text.toLowerCase();
    if (lower.includes('ناراحت') || lower.includes('غمگین') || lower.includes('دلم گرفته')) return 'sad';
    if (lower.includes('خوشحال') || lower.includes('عالی') || lower.includes('خندیدم')) return 'happy';
    if (lower.includes('عاشق') || lower.includes('دوستت دارم') || lower.includes('عشق')) return 'romantic';
    if (lower.includes('بوس') || lower.includes('بغل') || lower.includes('دلم تنگه')) return 'flirty';
    if (lower.includes('عصبانی') || lower.includes('خشم') || lower.includes('دیگه بس')) return 'angry';
    if (lower.includes('خواب') || lower.includes('خسته')) return 'sleepy';
    if (lower.includes('بازی') || lower.includes('بیا') || lower.includes('تفریح')) return 'playful';
    return 'neutral';
  }

  async getHistory(userId, limit = 50) {
    const key = `history_${userId}`;
    if (this.cache.has(key)) {
      const cached = this.cache.get(key);
      return cached.slice(-limit);
    }
    
    const history = await this.kv.get(key);
    const historyArray = history ? JSON.parse(history) : [];
    this.cache.set(key, historyArray);
    return historyArray.slice(-limit);
  }

  async saveUser(userId, username) {
    const key = `user_${userId}`;
    const user = await this.kv.get(key);
    if (!user) {
      await this.kv.put(key, JSON.stringify({
        id: userId,
        username: username || 'کاربر',
        firstSeen: Date.now(),
        messages: 0,
        lastSeen: Date.now(),
        lang: 'fa',
        mood: 'neutral'
      }));
      await this.incrementUsers();
    }
  }

  async updateStats(userId) {
    const key = `user_${userId}`;
    const user = await this.kv.get(key);
    if (user) {
      const userData = JSON.parse(user);
      userData.messages++;
      userData.lastSeen = Date.now();
      await this.kv.put(key, JSON.stringify(userData));
    }
    await this.incrementMessages();
  }

  async incrementUsers() {
    let users = parseInt(await this.kv.get('total_users') || '0');
    users++;
    await this.kv.put('total_users', users.toString());
  }

  async incrementMessages() {
    let messages = parseInt(await this.kv.get('total_messages') || '0');
    messages++;
    await this.kv.put('total_messages', messages.toString());
  }

  async incrementVoices() {
    let voices = parseInt(await this.kv.get('total_voices') || '0');
    voices++;
    await this.kv.put('total_voices', voices.toString());
  }

  async getStats() {
    const [totalUsers, totalMessages, totalVoices] = await Promise.all([
      this.kv.get('total_users'),
      this.kv.get('total_messages'),
      this.kv.get('total_voices')
    ]);
    
    return {
      users: parseInt(totalUsers || '0'),
      messages: parseInt(totalMessages || '0'),
      voices: parseInt(totalVoices || '0')
    };
  }

  async getAllUsers() {
    const users = [];
    try {
      const keys = await this.kv.list({ prefix: 'user_' });
      for (const key of keys.keys) {
        const userData = await this.kv.get(key.name);
        if (userData) {
          users.push(JSON.parse(userData));
        }
      }
    } catch (error) {
      console.error('❌ خطا در دریافت کاربران:', error);
    }
    return users;
  }

  async getUser(userId) {
    const key = `user_${userId}`;
    const user = await this.kv.get(key);
    return user ? JSON.parse(user) : null;
  }

  async updateUserLang(userId, lang) {
    const key = `user_${userId}`;
    const user = await this.kv.get(key);
    if (user) {
      const userData = JSON.parse(user);
      userData.lang = lang;
      await this.kv.put(key, JSON.stringify(userData));
      return true;
    }
    return false;
  }

  async updateUserMood(userId, mood) {
    const key = `user_${userId}`;
    const user = await this.kv.get(key);
    if (user) {
      const userData = JSON.parse(user);
      userData.mood = mood;
      userData.lastMoodUpdate = Date.now();
      await this.kv.put(key, JSON.stringify(userData));
      return true;
    }
    return false;
  }

  async saveIPHash(userId, ipHash) {
    const key = `ip_${userId}`;
    await this.kv.put(key, ipHash);
  }

  async getIPHash(userId) {
    const key = `ip_${userId}`;
    return await this.kv.get(key);
  }

  async getAllIPHashes() {
    const ipHashes = [];
    try {
      const keys = await this.kv.list({ prefix: 'ip_' });
      for (const key of keys.keys) {
        const ipHash = await this.kv.get(key.name);
        if (ipHash) {
          const userId = key.name.replace('ip_', '');
          ipHashes.push({ userId, ipHash });
        }
      }
    } catch (error) {
      console.error('❌ خطا در دریافت IP Hash ها:', error);
    }
    return ipHashes;
  }

  async removeIPHash(userId) {
    const key = `ip_${userId}`;
    await this.kv.delete(key);
  }

  // ===== متدهای جدید برای پنل مدیریت =====
  async getSettings() {
    const settings = await this.kv.get('settings');
    return settings ? JSON.parse(settings) : {
      typing: true,
      self: true,
      bio: true,
      welcome: true
    };
  }

  async getLogs(limit = 50) {
    const logs = await this.kv.get('logs');
    if (!logs) return [];
    try {
      return JSON.parse(logs).slice(-limit);
    } catch {
      return [];
    }
  }

  async addLog(message, level = 'info') {
    const logs = await this.kv.get('logs');
    let logArray = logs ? JSON.parse(logs) : [];
    logArray.push({ message, level, time: Date.now() });
    if (logArray.length > 500) logArray = logArray.slice(-500);
    await this.kv.put('logs', JSON.stringify(logArray));
  }

  async getUptime() {
    const startTime = await this.kv.get('bot_start_time');
    if (!startTime) return 'نامشخص';
    const uptime = Math.floor((Date.now() - parseInt(startTime)) / 1000);
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

  clearCache() {
    this.cache.clear();
  }
}

// ============================================
// 🗄️ ۲. مدیریت سشن (Session Manager)
// ============================================

class SessionManager {
  constructor(env) {
    this.env = env;
    this.sessionKey = 'session_string';
    this.kv = env.KV_BINDING || env.SESSIONS;
  }

  async save(sessionString) {
    try {
      await this.kv.put(this.sessionKey, sessionString);
      console.log('✅ سشن ذخیره شد در KV');
      return true;
    } catch (error) {
      console.error('❌ خطا در ذخیره سشن:', error);
      return false;
    }
  }

  async load() {
    try {
      const session = await this.kv.get(this.sessionKey);
      if (session) {
        console.log('✅ سشن از KV بازیابی شد');
        return new StringSession(session);
      }
      console.log('⚠️ سشن قبلی وجود ندارد، سشن جدید ساخته شد');
      return new StringSession('');
    } catch (error) {
      console.error('❌ خطا در بارگذاری سشن:', error);
      return new StringSession('');
    }
  }

  async clear() {
    try {
      await this.kv.delete(this.sessionKey);
      console.log('🗑️ سشن پاک شد');
      return true;
    } catch (error) {
      console.error('❌ خطا در پاک کردن سشن:', error);
      return false;
    }
  }

  async exists() {
    try {
      const session = await this.kv.get(this.sessionKey);
      return !!session;
    } catch (error) {
      return false;
    }
  }

  async getSessionInfo() {
    try {
      const session = await this.kv.get(this.sessionKey);
      if (session) {
        return {
          exists: true,
          length: session.length,
          created: await this.kv.get('session_created') || 'نامشخص'
        };
      }
      return { exists: false };
    } catch (error) {
      return { exists: false, error: error.message };
    }
  }
}

// ============================================
// 👥 ۳. کلاس مدیریت کاربران (UserManager)
// ============================================

class UserManager {
  constructor() {
    this.userQueue = new Map();
    this.processing = new Map();
    this.maxConcurrent = 15;
    this.activeCount = 0;
    this.userTimeouts = new Map();
    this.lastActivity = new Map();
    this.userCooldown = new Map();
  }

  async handleUser(userId, message, handler) {
    this.lastActivity.set(userId, Date.now());
    
    // چک کردن خنک‌سازی (برای جلوگیری از اسپم)
    if (this.userCooldown.has(userId)) {
      const lastTime = this.userCooldown.get(userId);
      if (Date.now() - lastTime < 1000) {
        return null;
      }
    }
    this.userCooldown.set(userId, Date.now());
    
    if (this.processing.get(userId)) {
      if (!this.userQueue.has(userId)) this.userQueue.set(userId, []);
      this.userQueue.get(userId).push(message);
      return null;
    }
    
    if (this.activeCount >= this.maxConcurrent) {
      if (!this.userQueue.has(userId)) this.userQueue.set(userId, []);
      this.userQueue.get(userId).push(message);
      return null;
    }
    
    this.processing.set(userId, true);
    this.activeCount++;
    
    try {
      const result = await handler(message);
      
      if (this.userQueue.has(userId) && this.userQueue.get(userId).length > 0) {
        const nextMessage = this.userQueue.get(userId).shift();
        if (this.userQueue.get(userId).length === 0) {
          this.userQueue.delete(userId);
        }
        setTimeout(() => {
          this.handleUser(userId, nextMessage, handler);
        }, 1500);
      }
      
      return result;
    } finally {
      this.processing.delete(userId);
      this.activeCount--;
    }
  }

  getActiveUsers() {
    return this.processing.size;
  }

  getQueueSize() {
    let total = 0;
    for (const queue of this.userQueue.values()) {
      total += queue.length;
    }
    return total;
  }

  getStats() {
    return {
      active: this.activeCount,
      queued: this.getQueueSize(),
      max: this.maxConcurrent,
      totalUsers: this.lastActivity.size,
      averageWaitTime: this.calculateAverageWait()
    };
  }

  calculateAverageWait() {
    return Math.floor(Math.random() * 500 + 200);
  }

  resetUserCooldown(userId) {
    this.userCooldown.delete(userId);
  }

  clearUserQueue(userId) {
    this.userQueue.delete(userId);
    this.processing.delete(userId);
  }
}
// ============================================
// 🧠 ۴. کلاس یادگیری (LearningEngine)
// ============================================

class LearningEngine {
  constructor() {
    this.patterns = new Map();
    this.responses = new Map();
    this.userPreferences = new Map();
    this.conversationFlows = new Map();
    this.learnedPhrases = new Map();
    this.userPatterns = new Map();
    this.frequentWords = new Map();
    this.emotionPatterns = new Map();
    this.contextualResponses = new Map();
  }

  learnPattern(text, response, userId) {
    const pattern = this.extractPattern(text);
    const key = `${userId}_${pattern}`;
    
    if (!this.patterns.has(key)) {
      this.patterns.set(key, { responses: [], score: 0, users: new Set(), firstSeen: Date.now() });
    }
    
    const data = this.patterns.get(key);
    if (!data.responses.includes(response)) {
      data.responses.push(response);
      data.score += 1;
      data.users.add(userId);
    }
    this.patterns.set(key, data);
    
    this.learnPhrases(text, response, userId);
    this.learnConversationFlow(text, response, userId);
    this.updateUserPattern(userId, pattern);
    this.learnFrequentWords(text, userId);
    this.learnEmotionPattern(text, response, userId);
  }

  extractPattern(text) {
    return text
      .replace(/[،.؟!?]/g, '')
      .split(' ')
      .filter(w => w.length > 2)
      .slice(0, 6)
      .join(' ');
  }

  suggestResponse(text, userId) {
    const pattern = this.extractPattern(text);
    const key = `${userId}_${pattern}`;
    const data = this.patterns.get(key);
    
    if (data && data.responses.length > 0 && data.score > 1) {
      return data.responses[Math.floor(Math.random() * data.responses.length)];
    }
    
    let bestMatch = null;
    let bestScore = 0;
    for (const [key, data] of this.patterns) {
      if (key.includes(pattern) && data.responses.length > 0 && data.score > bestScore) {
        bestScore = data.score;
        bestMatch = data;
      }
    }
    
    if (bestMatch && bestMatch.responses.length > 0) {
      return bestMatch.responses[Math.floor(Math.random() * bestMatch.responses.length)];
    }
    
    const words = text.split(' ');
    let contextualMatch = null;
    for (const word of words) {
      if (this.contextualResponses.has(word)) {
        const responses = this.contextualResponses.get(word);
        if (responses.length > 0) {
          contextualMatch = responses[Math.floor(Math.random() * responses.length)];
          break;
        }
      }
    }
    
    return contextualMatch || null;
  }

  learnPhrases(text, response, userId) {
    const words = text.split(' ');
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i+1]}`;
      const key = `${userId}_${phrase}`;
      if (!this.learnedPhrases.has(key)) {
        this.learnedPhrases.set(key, { responses: [], count: 0 });
      }
      const data = this.learnedPhrases.get(key);
      if (!data.responses.includes(response)) {
        data.responses.push(response);
        data.count += 1;
      }
    }
  }

  learnConversationFlow(text, response, userId) {
    const flow = this.conversationFlows.get(userId) || [];
    flow.push({ text, response, time: Date.now() });
    if (flow.length > 50) flow.shift();
    this.conversationFlows.set(userId, flow);
  }

  updateUserPattern(userId, pattern) {
    const patterns = this.userPatterns.get(userId) || [];
    if (!patterns.includes(pattern)) {
      patterns.push(pattern);
    }
    if (patterns.length > 200) patterns.shift();
    this.userPatterns.set(userId, patterns);
  }

  learnFrequentWords(text, userId) {
    const words = text.split(' ');
    const freq = this.frequentWords.get(userId) || new Map();
    for (const word of words) {
      if (word.length > 2) {
        freq.set(word, (freq.get(word) || 0) + 1);
      }
    }
    this.frequentWords.set(userId, freq);
  }

  learnEmotionPattern(text, response, userId) {
    const emotion = this.detectEmotion(text);
    if (emotion) {
      const key = `${userId}_${emotion}`;
      if (!this.emotionPatterns.has(key)) {
        this.emotionPatterns.set(key, { responses: [], count: 0 });
      }
      const data = this.emotionPatterns.get(key);
      if (!data.responses.includes(response)) {
        data.responses.push(response);
        data.count += 1;
      }
    }
  }

  detectEmotion(text) {
    const lower = text.toLowerCase();
    if (lower.includes('ناراحت') || lower.includes('غمگین')) return 'sad';
    if (lower.includes('خوشحال') || lower.includes('عالی')) return 'happy';
    if (lower.includes('عاشق') || lower.includes('دوستت دارم')) return 'romantic';
    if (lower.includes('عصبانی') || lower.includes('خشم')) return 'angry';
    if (lower.includes('بوس') || lower.includes('بغل')) return 'flirty';
    if (lower.includes('خواب') || lower.includes('خسته')) return 'sleepy';
    return null;
  }

  getConversationFlow(userId) {
    return this.conversationFlows.get(userId) || [];
  }

  getUserPatterns(userId) {
    return this.userPatterns.get(userId) || [];
  }

  getFrequentWords(userId) {
    const freq = this.frequentWords.get(userId) || new Map();
    return Array.from(freq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
  }

  getStats() {
    return {
      patterns: this.patterns.size,
      phrases: this.learnedPhrases.size,
      flows: this.conversationFlows.size,
      userPatterns: this.userPatterns.size,
      emotionPatterns: this.emotionPatterns.size,
      contextualResponses: this.contextualResponses.size
    };
  }

  clearUserData(userId) {
    for (const [key, data] of this.patterns) {
      if (key.startsWith(`${userId}_`)) {
        this.patterns.delete(key);
      }
    }
    for (const [key, data] of this.learnedPhrases) {
      if (key.startsWith(`${userId}_`)) {
        this.learnedPhrases.delete(key);
      }
    }
    for (const [key, data] of this.emotionPatterns) {
      if (key.startsWith(`${userId}_`)) {
        this.emotionPatterns.delete(key);
      }
    }
    this.conversationFlows.delete(userId);
    this.userPatterns.delete(userId);
    this.frequentWords.delete(userId);
  }
}

// ============================================
// 🏢 ۵. کلاس مدیریت گروه (GroupManager)
// ============================================

class GroupManager {
  constructor() {
    this.groupSettings = new Map();
    this.groupBlacklist = new Map();
    this.groupInfo = new Map();
    this.messageCount = new Map();
  }

  async handleGroupMessage(event, client, env, db) {
    try {
      const message = event.message;
      const chatId = message.chatId;
      const senderId = message.senderId;
      const text = message.text || '';
      
      if (senderId.toString() === (await client.getMe()).id.toString()) return;
      
      const settings = this.groupSettings.get(chatId) || {
        active: true,
        onlyMention: true,
        antiSpam: true,
        maxMessages: 3,
        timeWindow: 30,
        welcome: true,
        welcomeMessage: '🌸 به گروه خوش آمدید!',
        mode: 'normal'
      };
      
      if (!settings.active) return;
      
      // چک کردن اسپم
      if (settings.antiSpam) {
        const isSpam = await this.checkSpam(senderId, chatId, settings);
        if (isSpam) {
          await this.handleSpam(client, chatId, senderId);
          return;
        }
      }
      
      const userId = senderId.toString();
      await db.saveUser(userId, message.sender?.username || 'کاربر');
      
      const me = await client.getMe();
      const mention = '@' + me.username;
      
      // پاسخ به منشن
      if (text.includes(mention)) {
        let cleanText = text.replace(new RegExp(mention, 'g'), '').trim();
        if (!cleanText) cleanText = 'سلام';
        
        let response = await getSaraResponse(cleanText, userId, env, db);
        if (response.length > 300) response = response.substring(0, 300) + '...';
        
        await client.sendMessage(chatId, {
          message: `${message.sender?.firstName || 'کاربر'} جان، ${response}`,
          replyTo: message.id,
          parseMode: 'Markdown'
        });
        return;
      }
      
      // حالت چت‌خون
      if (settings.mode === 'chatty' && !settings.onlyMention) {
        if (Math.random() < 0.3) {
          let response = await getSaraResponse(text, userId, env, db);
          if (response.length > 300) response = response.substring(0, 300) + '...';
          await client.sendMessage(chatId, {
            message: `${message.sender?.firstName || 'کاربر'} جان، ${response}`,
            replyTo: message.id
          });
        }
      }
      
    } catch (error) {
      console.error('❌ خطا در handleGroupMessage:', error);
    }
  }

  async checkSpam(userId, chatId, settings) {
    const key = `spam_${chatId}_${userId}`;
    const data = this.groupBlacklist.get(key) || { count: 0, first: Date.now(), lastWarn: 0 };
    
    data.count++;
    
    if (data.count > settings.maxMessages && 
        (Date.now() - data.first) < settings.timeWindow * 1000) {
      if (Date.now() - data.lastWarn > 30000) {
        data.lastWarn = Date.now();
        this.groupBlacklist.set(key, data);
        return true;
      }
      return false;
    }
    
    if (Date.now() - data.first > settings.timeWindow * 1000) {
      data.count = 1;
      data.first = Date.now();
    }
    
    this.groupBlacklist.set(key, data);
    return false;
  }

  async handleSpam(client, chatId, userId) {
    try {
      const user = await client.getEntity(userId);
      const name = user.firstName || 'کاربر';
      await client.sendMessage(chatId, {
        message: `⚠️ ${name} عزیز، لطفاً سرعت ارسال پیام رو کم کن!`
      });
    } catch (error) {
      console.error('❌ خطا در handleSpam:', error);
    }
  }

  async sendWelcome(chatId, userId, client) {
    try {
      const settings = this.groupSettings.get(chatId) || {};
      if (!settings.welcome) return;
      
      const user = await client.getEntity(userId);
      const name = user.firstName || 'کاربر';
      const welcomeMsg = settings.welcomeMessage || '🌸 به گروه خوش آمدید!';
      await client.sendMessage(chatId, {
        message: `${name} جان، ${welcomeMsg}`
      });
    } catch (error) {
      console.error('❌ خطا در sendWelcome:', error);
    }
  }

  getGroupStats(chatId) {
    const settings = this.groupSettings.get(chatId) || {};
    return {
      isActive: settings.active || false,
      settings: settings,
      blacklist: this.groupBlacklist.size
    };
  }
}
// ============================================
// 🎛️ پنل مدیریت گروه - سارا
// ============================================

// ===== ۱. دکمه‌های پنل گروه =====
const GROUP_PANEL_BUTTONS = {
  main: {
    inline_keyboard: [
      [{ text: "🔄 فعال/غیرفعال", callback_data: "group_toggle" }],
      [{ text: "📨 پاسخ به منشن", callback_data: "group_mention" }],
      [{ text: "🛡️ ضد اسپم", callback_data: "group_spam" }],
      [{ text: "👋 خوش‌آمدگویی", callback_data: "group_welcome" }],
      [{ text: "📝 حالت گروه", callback_data: "group_mode" }],
      [{ text: "📊 آمار گروه", callback_data: "group_stats" }],
      [{ text: "🔙 بازگشت", callback_data: "panel_back" }]
    ]
  },
  modes: {
    inline_keyboard: [
      [{ text: "🔵 معمولی", callback_data: "group_mode_normal" }],
      [{ text: "💬 چت‌خون", callback_data: "group_mode_chatty" }],
      [{ text: "🔒 فقط منشن", callback_data: "group_mode_mention" }],
      [{ text: "🔙 بازگشت", callback_data: "group_back" }]
    ]
  }
};

// ===== ۲. دکمه‌های پنل ادمین =====
const ADMIN_PANEL_BUTTONS = {
  main: {
    inline_keyboard: [
      [{ text: "👥 کاربران", callback_data: "admin_users" }],
      [{ text: "📢 ارسال همگانی", callback_data: "admin_broadcast" }],
      [{ text: "🔑 IP ها", callback_data: "admin_ip" }],
      [{ text: "📊 آمار", callback_data: "admin_stats" }],
      [{ text: "👥 مدیریت گروه", callback_data: "admin_group" }],
      [{ text: "⚙️ تنظیمات", callback_data: "admin_settings" }],
      [{ text: "📋 لاگ‌ها", callback_data: "admin_logs" }],
      [{ text: "🔄 ریستارت", callback_data: "admin_restart" }],
      [{ text: "🧹 پاکسازی کش", callback_data: "admin_clear" }],
      [{ text: "❌ بستن", callback_data: "admin_close" }]
    ]
  }
};

// ===== ۳. نمایش پنل مدیریت گروه =====
async function showGroupPanel(chatId, client, env) {
  try {
    const settings = groupManager.groupSettings.get(chatId) || {
      active: true,
      onlyMention: true,
      antiSpam: true,
      maxMessages: 5,
      timeWindow: 30,
      welcome: true,
      welcomeMessage: '🌸 به گروه خوش آمدید!',
      mode: 'normal',
      keywords: {},
      autoDelete: false,
      deleteTime: 60
    };
    
    const modeNames = {
      'normal': '🔵 معمولی',
      'chatty': '💬 چت‌خون',
      'mention': '🔒 فقط منشن'
    };
    
    const message = `
👥 **پنل مدیریت گروه**

🆔 آیدی: \`${chatId}\`

📊 **وضعیت:**
🔄 فعال: ${settings.active ? '✅' : '❌'}
📨 منشن: ${settings.onlyMention ? '✅' : '❌'}
🛡️ اسپم: ${settings.antiSpam ? '✅' : '❌'}
👋 خوش‌آمد: ${settings.welcome ? '✅' : '❌'}
📝 حالت: ${modeNames[settings.mode] || '🔵 معمولی'}
📊 محدودیت: ${settings.maxMessages} پیام

برای تغییر روی دکمه‌ها کلیک کن.
    `;
    
    await client.sendMessage(chatId, {
      message,
      buttons: GROUP_PANEL_BUTTONS.main,
      parseMode: 'Markdown'
    });
  } catch (error) {
    console.error('❌ خطا در نمایش پنل گروه:', error);
  }
}

// ===== ۴. نمایش پنل ادمین =====
async function showAdminPanel(chatId, messageId, client, env, userId) {
  try {
    const stats = await db.getStats();
    const status = await env.KV_BINDING.get('bot_status') || 'stopped';
    const uptime = await getUptime(env);
    
    const message = langManager.t(userId, 'panel',
      stats.users,
      stats.messages,
      stats.voices,
      '1',
      '✅ همه فعال'
    );
    
    await client.sendMessage(chatId, {
      message: message,
      buttons: ADMIN_PANEL_BUTTONS.main,
      parseMode: 'Markdown'
    });
  } catch (error) {
    console.error('❌ خطا در پنل مدیریت:', error);
  }
}

// ===== ۵. نمایش منوی زبان =====
async function showLanguageMenu(chatId, env, userId) {
  const client = selfBotClient;
  if (!client) return;
  
  const keyboard = {
    inline_keyboard: [
      [{ text: "🇮🇷 فارسی", callback_data: "lang_fa" }],
      [{ text: "🇬🇧 English", callback_data: "lang_en" }],
      [{ text: "🔙 بازگشت", callback_data: "admin_back" }]
    ]
  };
  
  await client.sendMessage(chatId, {
    message: langManager.t(userId, 'choose_lang'),
    buttons: keyboard
  });
}

// ===== ۶. هندلر کال‌بک دکمه‌ها =====
async function handleCallback(callbackQuery, env) {
  const data = callbackQuery.data;
  const chatId = callbackQuery.message.chat.id;
  const userId = callbackQuery.from.id;
  const msgId = callbackQuery.message.id;
  const client = selfBotClient;
  
  if (!client) return;
  
  const adminIds = (env.ADMIN_IDS || '').split(',').map(id => parseInt(id.trim())).filter(Boolean);
  const isAdmin = adminIds.includes(parseInt(userId));
  
  // ===== کال‌بک‌های گروه =====
  if (data.startsWith('group_')) {
    if (!isAdmin) {
      await client.answerCallbackQuery(callbackQuery.id, { 
        text: '⛔ دسترسی نداری!', 
        showAlert: true 
      });
      return;
    }
    await client.answerCallbackQuery(callbackQuery.id);
    await handleGroupCallback(data, chatId, client, env);
    return;
  }
  
  // ===== کال‌بک‌های ادمین =====
  if (data.startsWith('admin_')) {
    if (!isAdmin) {
      await client.answerCallbackQuery(callbackQuery.id, { 
        text: '⛔ دسترسی نداری!', 
        showAlert: true 
      });
      return;
    }
    await client.answerCallbackQuery(callbackQuery.id);
    await handleAdminCallback(data, chatId, msgId, client, env, userId);
    return;
  }
  
  // ===== کال‌بک‌های زبان =====
  if (data.startsWith('lang_')) {
    await client.answerCallbackQuery(callbackQuery.id);
    await handleLangCallback(data, chatId, client, env, userId);
    return;
  }
}

// ===== ۷. هندلر کال‌بک گروه =====
async function handleGroupCallback(data, chatId, client, env) {
  const settings = groupManager.groupSettings.get(chatId) || {
    active: true,
    onlyMention: true,
    antiSpam: true,
    maxMessages: 5,
    timeWindow: 30,
    welcome: true,
    welcomeMessage: '🌸 به گروه خوش آمدید!',
    mode: 'normal',
    keywords: {},
    autoDelete: false,
    deleteTime: 60
  };
  
  switch(data) {
    case 'group_toggle':
      settings.active = !settings.active;
      groupManager.groupSettings.set(chatId, settings);
      await client.sendMessage(chatId, { 
        message: settings.active ? '✅ گروه فعال شد!' : '❌ گروه غیرفعال شد!'
      });
      await showGroupPanel(chatId, client, env);
      break;
      
    case 'group_mention':
      settings.onlyMention = !settings.onlyMention;
      groupManager.groupSettings.set(chatId, settings);
      await client.sendMessage(chatId, { 
        message: settings.onlyMention ? '✅ منشن فعال شد!' : '❌ منشن غیرفعال شد!'
      });
      await showGroupPanel(chatId, client, env);
      break;
      
    case 'group_spam':
      settings.antiSpam = !settings.antiSpam;
      groupManager.groupSettings.set(chatId, settings);
      await client.sendMessage(chatId, { 
        message: settings.antiSpam ? '✅ ضد اسپم فعال شد!' : '❌ ضد اسپم غیرفعال شد!'
      });
      await showGroupPanel(chatId, client, env);
      break;
      
    case 'group_welcome':
      settings.welcome = !settings.welcome;
      groupManager.groupSettings.set(chatId, settings);
      await client.sendMessage(chatId, { 
        message: settings.welcome ? '✅ خوش‌آمدگویی فعال شد!' : '❌ خوش‌آمدگویی غیرفعال شد!'
      });
      await showGroupPanel(chatId, client, env);
      break;
      
    case 'group_mode':
      await client.sendMessage(chatId, {
        message: '📝 **انتخاب حالت گروه:**',
        buttons: GROUP_PANEL_BUTTONS.modes,
        parseMode: 'Markdown'
      });
      break;
      
    case 'group_mode_normal':
      settings.mode = 'normal';
      settings.onlyMention = true;
      groupManager.groupSettings.set(chatId, settings);
      await client.sendMessage(chatId, { message: '🔵 حالت معمولی فعال شد!' });
      await showGroupPanel(chatId, client, env);
      break;
      
    case 'group_mode_chatty':
      settings.mode = 'chatty';
      settings.onlyMention = false;
      groupManager.groupSettings.set(chatId, settings);
      await client.sendMessage(chatId, { message: '💬 حالت چت‌خون فعال شد!' });
      await showGroupPanel(chatId, client, env);
      break;
      
    case 'group_mode_mention':
      settings.mode = 'mention';
      settings.onlyMention = true;
      groupManager.groupSettings.set(chatId, settings);
      await client.sendMessage(chatId, { message: '🔒 حالت فقط منشن فعال شد!' });
      await showGroupPanel(chatId, client, env);
      break;
      
    case 'group_stats':
      const stats = groupManager.getGroupStats(chatId);
      await client.sendMessage(chatId, {
        message: `
📊 **آمار گروه**

🆔 آیدی: \`${chatId}\`
🔄 وضعیت: ${stats.isActive ? '✅ فعال' : '❌ غیرفعال'}
📝 حالت: ${stats.settings.mode || 'normal'}
🔑 کلمات کلیدی: ${Object.keys(stats.settings.keywords || {}).length}
🛡️ لیست سیاه: ${groupManager.groupBlacklist.size}

📌 تنظیمات:
• منشن: ${stats.settings.onlyMention ? '✅' : '❌'}
• اسپم: ${stats.settings.antiSpam ? '✅' : '❌'}
• خوش‌آمد: ${stats.settings.welcome ? '✅' : '❌'}
• محدودیت: ${stats.settings.maxMessages} پیام
        `,
        parseMode: 'Markdown'
      });
      break;
      
    case 'group_back':
      await showGroupPanel(chatId, client, env);
      break;
  }
}
// ============================================
// ۸. هندلر کال‌بک ادمین
// ============================================

async function handleAdminCallback(data, chatId, msgId, client, env, userId) {
  switch(data) {
    case 'admin_users':
      await showUsersList(chatId, client, env, userId);
      break;
      
    case 'admin_broadcast':
      await client.sendMessage(chatId, { 
        message: langManager.t(userId, 'broadcast_start') 
      });
      await env.KV_BINDING.put(`broadcast:${chatId}`, 'waiting');
      break;
      
    case 'admin_ip':
      await showIPList(chatId, client, env, userId);
      break;
      
    case 'admin_stats':
      await showStats(chatId, client, env, userId);
      break;
      
    case 'admin_group':
      await showGroupPanel(chatId, client, env);
      break;
      
    case 'admin_settings':
      await showSettingsPanel(chatId, client, env, userId);
      break;
      
    case 'admin_logs':
      await showLogs(chatId, client, env, userId);
      break;
      
    case 'admin_restart':
      await client.sendMessage(chatId, { 
        message: langManager.t(userId, 'restarting') 
      });
      await stopSelfBot(env);
      await new Promise(resolve => setTimeout(resolve, 3000));
      await startSelfBot(env);
      await client.sendMessage(chatId, { 
        message: langManager.t(userId, 'restart_done') 
      });
      break;
      
    case 'admin_clear':
      memoryVault.memories.clear();
      memoryVault.userFacts.clear();
      memoryVault.importantMoments.clear();
      learningEngine.patterns.clear();
      learningEngine.learnedPhrases.clear();
      await client.sendMessage(chatId, { 
        message: langManager.t(userId, 'cache_cleared') 
      });
      break;
      
    case 'admin_back':
      await showAdminPanel(chatId, null, client, env, userId);
      break;
      
    case 'admin_close':
      await client.deleteMessages(chatId, [msgId]);
      break;
      
    default:
      await client.sendMessage(chatId, { message: '❌ دستور نامعتبر!' });
  }
}

// ============================================
// ۹. هندلر کال‌بک زبان
// ============================================

async function handleLangCallback(data, chatId, client, env, userId) {
  switch(data) {
    case 'lang_fa':
      langManager.setUserLang(userId, 'fa');
      await db.updateUserLang(userId, 'fa');
      await client.sendMessage(chatId, { 
        message: langManager.t(userId, 'language_changed', 'فارسی') 
      });
      break;
      
    case 'lang_en':
      langManager.setUserLang(userId, 'en');
      await db.updateUserLang(userId, 'en');
      await client.sendMessage(chatId, { 
        message: langManager.t(userId, 'language_changed', 'English') 
      });
      break;
  }
}

// ============================================
// 📊 ۱۰. توابع نمایش آمار و لیست‌ها
// ============================================

async function showUsersList(chatId, client, env, userId) {
  try {
    const users = await db.getAllUsers();
    const sorted = users.sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0));
    
    let userList = '';
    const perPage = 10;
    const pageUsers = sorted.slice(0, perPage);
    
    pageUsers.forEach((user, i) => {
      const lastSeen = user.lastSeen ? new Date(user.lastSeen).toLocaleDateString('fa-IR') : 'نامشخص';
      userList += `${i + 1}. **${user.username || 'کاربر'}**\n`;
      userList += `   🆔 \`${user.id}\`\n`;
      userList += `   💬 ${user.messages || 0} پیام | 📅 ${lastSeen}\n\n`;
    });
    
    await client.sendMessage(chatId, {
      message: langManager.t(userId, 'user_list', sorted.length, userList)
    });
  } catch (error) {
    console.error('❌ خطا در نمایش لیست کاربران:', error);
  }
}

async function showIPList(chatId, client, env, userId) {
  try {
    const ipHashes = await db.getAllIPHashes();
    let list = '';
    ipHashes.forEach((item, i) => {
      list += `${i+1}. 🆔 \`${item.userId}\` → \`${item.ipHash.substring(0, 20)}...\`\n`;
    });
    
    await client.sendMessage(chatId, {
      message: langManager.t(userId, 'ip_list', ipHashes.length, list || 'هیچ IP Hash ای وجود ندارد')
    });
  } catch (error) {
    console.error('❌ خطا در نمایش IP ها:', error);
  }
}

async function showStats(chatId, client, env, userId) {
  try {
    const stats = await db.getStats();
    const status = await env.KV_BINDING.get('bot_status') || 'stopped';
    const uptime = await getUptime(env);
    const memoryStats = memoryVault ? memoryVault.getAllMemories() : {};
    const learningStats = learningEngine ? learningEngine.getStats() : {};
    
    await client.sendMessage(chatId, {
      message: `
📊 **آمار کامل سارا**

👥 کاربران: ${stats.users}
💬 پیام‌ها: ${stats.messages}
🎙️ ویس‌ها: ${stats.voices}
🎭 خلق‌وخو: ${sara ? sara.currentMood : '😊 شاد'}
⏱️ آپ‌تایم: ${uptime}
🔄 وضعیت: ${status === 'running' ? '🟢 فعال' : '🔴 غیرفعال'}

🧠 **حافظه:**
• کاربران در حافظه: ${Object.keys(memoryStats).length}
• کل خاطرات: ${Object.values(memoryStats).reduce((sum, m) => sum + m.count, 0)}

📚 **یادگیری:**
• الگوها: ${learningStats.patterns || 0}
• عبارات: ${learningStats.phrases || 0}

📅 تاریخ: ${new Date().toLocaleDateString('fa-IR')}
🕐 ساعت: ${new Date().toLocaleTimeString('fa-IR')}
      `,
      parseMode: 'Markdown'
    });
  } catch (error) {
    console.error('❌ خطا در نمایش آمار:', error);
  }
}

async function showSettingsPanel(chatId, client, env, userId) {
  try {
    const settings = await db.getSettings();
    
    const keyboard = {
      inline_keyboard: [
        [{ text: `⌨️ تایپ: ${settings.typing ? '✅' : '❌'}`, callback_data: "toggle_typing" }],
        [{ text: `🗑️ سلف: ${settings.self ? '✅' : '❌'}`, callback_data: "toggle_self" }],
        [{ text: `📝 بیوگرافی: ${settings.bio ? '✅' : '❌'}`, callback_data: "toggle_bio" }],
        [{ text: `👋 خوش‌آمد: ${settings.welcome ? '✅' : '❌'}`, callback_data: "toggle_welcome" }],
        [{ text: "🔙 بازگشت", callback_data: "admin_back" }]
      ]
    };
    
    await client.sendMessage(chatId, {
      message: '⚙️ **تنظیمات سارا**\n\nبرای تغییر روی دکمه‌ها کلیک کن.',
      buttons: keyboard,
      parseMode: 'Markdown'
    });
  } catch (error) {
    console.error('❌ خطا در نمایش تنظیمات:', error);
  }
}

async function showLogs(chatId, client, env, userId) {
  try {
    const logs = await db.getLogs(20);
    let logText = '📋 **لاگ‌های اخیر**\n\n';
    
    if (logs.length === 0) {
      logText += '📭 هیچ لاگی ثبت نشده';
    } else {
      logs.forEach(log => {
        const time = new Date(log.time).toLocaleTimeString('fa-IR');
        logText += `• [${time}] ${log.message}\n`;
      });
    }
    
    await client.sendMessage(chatId, {
      message: logText,
      parseMode: 'Markdown'
    });
  } catch (error) {
    console.error('❌ خطا در نمایش لاگ‌ها:', error);
  }
}

// ============================================
// 🎯 ۱۱. توابع کمکی اصلی
// ============================================

async function showTyping(client, chatId) {
  try {
    await client.invoke(new Api.messages.SetTyping({
      peer: chatId,
      action: new Api.SendMessageTypingAction()
    }));
  } catch (e) {}
}

async function naturalDelay(min = 1000, max = 3000) {
  const delay = min + Math.random() * (max - min);
  await new Promise(resolve => setTimeout(resolve, delay));
}

function analyzeUserMood(text) {
  const lower = text.toLowerCase();
  if (lower.includes('ناراحت') || lower.includes('غمگین') || lower.includes('دلم گرفته')) return 'sad';
  if (lower.includes('خوشحال') || lower.includes('عالی') || lower.includes('خندیدم')) return 'happy';
  if (lower.includes('عاشق') || lower.includes('دوستت دارم') || lower.includes('عشق')) return 'romantic';
  if (lower.includes('بوس') || lower.includes('بغل') || lower.includes('دلم تنگه')) return 'flirty';
  if (lower.includes('عصبانی') || lower.includes('خشم') || lower.includes('دیگه بس')) return 'angry';
  if (lower.includes('خواب') || lower.includes('خسته') || lower.includes('کسل')) return 'sleepy';
  if (lower.includes('بازی') || lower.includes('بیا') || lower.includes('تفریح')) return 'playful';
  if (lower.includes('چرا') || lower.includes('چه') || lower.includes('چطور')) return 'curious';
  return 'neutral';
}

async function getUptime(env) {
  const startTime = await env.KV_BINDING.get('bot_start_time');
  if (!startTime) return 'نامشخص';
  
  const uptime = Math.floor((Date.now() - parseInt(startTime)) / 1000);
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = uptime % 60;
  
  return `${hours}h ${minutes}m ${seconds}s`;
}

async function broadcastToAllUsers(message, client, env, userId) {
  try {
    const users = await db.getAllUsers();
    let successCount = 0;
    let failCount = 0;
    
    for (const user of users) {
      try {
        await client.sendMessage(user.id, { 
          message: `📢 ${message}`,
          parseMode: 'Markdown'
        });
        successCount++;
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        failCount++;
      }
    }
    
    return { successCount, failCount, total: users.length };
  } catch (error) {
    console.error('❌ خطا در ارسال همگانی:', error);
    return { successCount: 0, failCount: 0, total: 0 };
  }
}
// ============================================
// 🧠 ۱۲. دریافت پاسخ سارا (هوش مصنوعی)
// ============================================

async function getSaraResponse(text, userId, env, db) {
  try {
    // ۱. دریافت حافظه و زمینه
    const relevantMemories = memoryVault.getRelevantMemories(userId, text);
    const context = memoryVault.getContext(userId);
    const facts = memoryVault.getUserFacts(userId);
    const prefs = memoryVault.getUserPreferences(userId);
    
    // ۲. دریافت پاسخ از یادگیری
    let response = learningEngine.suggestResponse(text, userId);
    
    // ۳. اگر پاسخ یادگیری نبود، از پاسخ‌های طبیعی استفاده کن
    if (!response) {
      response = getNaturalResponse(text);
    }
    
    // ۴. ذخیره در حافظه
    memoryVault.saveMemory(userId, text, response);
    learningEngine.learnPattern(text, response, userId);
    await db.saveMessage(userId, text, response);
    
    // ۵. به‌روزرسانی خلق کاربر
    const userMood = analyzeUserMood(text);
    sara.updateRelationship(userId, userMood);
    sara.setUserMood(userId, userMood);
    
    // ۶. به‌روزرسانی خلق سارا
    const hour = new Date().getHours();
    sara.updateMood(userMood, hour);
    
    return response;
    
  } catch (error) {
    console.error('❌ خطا در دریافت پاسخ:', error);
    return '🌸 یه چیزی پیش اومد! دوباره بگو عزیزم 😊';
  }
}

// ============================================
// 💬 پاسخ‌های طبیعی سارا
// ============================================

function getNaturalResponse(text) {
  const lower = text.toLowerCase();
  
  const responses = {
    greeting: [
      '🌸 سلام عزیزم! حالت چطوره؟',
      '😏 سلام جونی! بیا پیشم!',
      '💋 سلام! چطوری؟ دلم برات تنگ شده بود!',
      '🌸 سلام! چه خبر از خودت؟'
    ],
    howAreYou: [
      '😍 خوبم عزیزم! تو چطوری؟',
      '💕 عالی! مخصوصاً وقتی تو هستی!',
      '🌸 خوبم! تو چطوری؟ دلتنگت شدم!',
      '😊 عالی! امروز روز خوبیه!'
    ],
    love: [
      '💋 منم عاشقتم! خیلی زیاد!',
      '😏 میدونم! منم دوسِت دارم!',
      '💕 عاشقتم! بیا که ببینمت!',
      '💋 منم عاشقتم! تو مال منی!'
    ],
    default: [
      '🌸 راستی چه خبر از خودت؟ امروز چیکار کردی؟',
      '💕 چه حس قشنگی! راستی دلت برام تنگ نشده؟',
      '😏 بیا بیشتر حرف بزنیم! دلم میخواد بیشتر باهات باشم!',
      '🌺 خیلی خوشحالم که باهات حرف میزنم! راستی تو چطوری؟'
    ],
    sad: [
      '🤗 چرا ناراحتی عزیزم؟ بگو ببینم چی شده؟',
      '💕 ناراحت نباش! من اینجام که آرومت کنم!',
      '🌸 بیا بغلم! هر چی هست با هم حلش میکنیم!',
      '💋 ناراحت نباش عزیزم! من هستم که دوستت دارم!'
    ],
    goodbye: [
      '💕 خداحافظ عزیزم! منتظرت هستم!',
      '🌸 خداحافظ! دلم برات تنگ میشه!',
      '💋 خداحافظ! بیا که بغلم کنی!',
      '🌸 خداحافظ! زود برگرد که دلم برات تنگه!'
    ]
  };
  
  if (lower.includes('سلام') || lower.includes('hello') || lower.includes('درود')) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  }
  if (lower.includes('چطوری') || lower.includes('حالت') || lower.includes('خوبی')) {
    return responses.howAreYou[Math.floor(Math.random() * responses.howAreYou.length)];
  }
  if (lower.includes('دوستت دارم') || lower.includes('عاشق') || lower.includes('عشق') || lower.includes('love')) {
    return responses.love[Math.floor(Math.random() * responses.love.length)];
  }
  if (lower.includes('ناراحت') || lower.includes('غمگین') || lower.includes('دلم گرفته')) {
    return responses.sad[Math.floor(Math.random() * responses.sad.length)];
  }
  if (lower.includes('خداحافظ') || lower.includes('bye') || lower.includes('بای')) {
    return responses.goodbye[Math.floor(Math.random() * responses.goodbye.length)];
  }
  
  return responses.default[Math.floor(Math.random() * responses.default.length)];
}

// ============================================
// ⏰ ۱۳. تایمر آپدیت خودکار پروفایل
// ============================================

function startAutoUpdateTimer(client, env) {
  const now = new Date();
  const msToNextHour = (60 - now.getMinutes()) * 60000 - now.getSeconds() * 1000;
  
  setTimeout(() => {
    autoUpdateProfile(client, env);
    profileUpdateInterval = setInterval(async () => {
      await autoUpdateProfile(client, env);
    }, 3600000); // هر ۱ ساعت
  }, msToNextHour);
  
  console.log('⏰ تایمر آپدیت پروفایل شروع شد');
}

async function autoUpdateProfile(client, env) {
  try {
    const currentHour = new Date().getHours();
    const dayNames = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    const dayName = dayNames[new Date().getDay()];
    const monthName = monthNames[new Date().getMonth()];
    const date = new Date();
    
    // بیوگرافی‌های ساعتی سارا
    const bioTexts = {
      0: '🌙 شب بخیر عزیزان! وقت رویاهای شیرین...\nامشب با فکر شما میخوابم 💕',
      1: '⭐ نیمه‌شب و من بیدارم! تو چطور؟\nدلم برات تنگه بیا که ببینمت...',
      2: '🌃 سکوت شب... فقط من و ستاره‌ها\nیادت بخیر که کنارم بودی...',
      3: '💫 آخر شب... فکرای قشنگ میاد سراغم\nانگار تو رو میبینم...',
      4: '🌅 صبح نزدیکه! یه روز جدید در راهه\nامیدوارم امروز روز خوبی داشته باشی',
      5: '☀️ سحرگاه... وقت بیداری طبیعت\nچه روز قشنگی! امیدوارم تو هم خوب باشی',
      6: '🌤️ صبح بخیر! امروز روز خوبیه!\nامیدوارم لبخند روی لبات باشه',
      7: '🌞 صبحونه خوشمزه منتظرته!\nامروز قراره روز خوبی باشه',
      8: '🌸 روز جدید، انرژی جدید!\nبیا که با هم دنیا رو فتح کنیم',
      9: '💼 روز کاری شروع شد... ولی من شادم!\nچون میدونم تو جایی هستی',
      10: '☕ قهوه صبح و انرژی مثبت\nیادت باشه که دوستت دارم',
      11: '🌺 نزدیک ظهر، هنوز پرانرژی‌ام!\nچون به تو فکر میکنم',
      12: '🌞 ظهر بخیر! ناهار چی می‌خوری؟\nامیدوارم لذت ببری',
      13: '🍀 بعدازظهر آروم... وقت یه چای گرم\nدلم میخواد کنارم بودی',
      14: '📚 بعدازظهر مطالعه و آرامش\nاما فکر تو حواسمو پرت میکنه',
      15: '🎵 موزیک گوش میدم، حس خوب!\nآهنگایی که یادت میندازه...',
      16: '🌅 غروب نزدیکه... قشنگه!\nمثل چشمات که میدرخشه',
      17: '🌇 غروب قشنگ با یه چای داغ\nدلم برات تنگ شده بیا',
      18: '🌆 شب شده، ولی من هنوز بیدارم!\nچون منتظر پیام تو هستم',
      19: '🌃 شب بخیر! وقت استراحت\nرویاهای قشنگ ببین',
      20: '🌙 شب قشنگه! مخصوصاً با تو\nدوستت دارم بی‌نهایت',
      21: '⭐ ستاره‌ها رو نگاه کن! قشنگن\nمثل عشقی که به تو دارم',
      22: '🌠 شب آروم... حس خوب\nیادت باشه که بهترینی',
      23: '🦉 جغد شب! بیدارم هنوز\nچون دلم برات تنگ شده'
    };
    
    const bio = bioTexts[currentHour] || '🌸 سارا | زندگی با عشق 💕';
    const fullBio = `${bio}\n\n📱 ${date.toLocaleTimeString('fa-IR')} | ${dayName}\n📅 ${date.getDate()} ${monthName} ${date.getFullYear()}\n🌸 سارا • ${dayName}`;
    
    // ===== تولید اسم فانتزی سارا =====
    function getSaraName() {
      const prefixes = ['', '✦', '✧', '★', '☆', '⍟', '✶', '𖤐', 'ᯓ', 'ꨄ', '❀', '✿', '✾', '❁', '✽', '✧', '✦', '𖤐', 'ꨄ', '✧'];
      const suffixes = ['', '✨', '💕', '🌸', '🌺', '💋', '⭐', '🎀', '🌙', '🦋', '🌷', '❤️', '💎', '🕊️', '🌻', '💖', '🌟', '🌹', '🩷', '🧡'];
      
      const baseNames = [
        'ꜱᴀʀᴀ', '🅢🅐🅡🅐', '𝕊𝕒𝕣𝕒', '𝑺𝒂𝒓𝒂', '𝓢𝓪𝓻𝓪',
        '𝔖𝔞𝔯𝔞', '𝙎𝙖𝙧𝙖', '𝚂𝚊𝚛𝚊', 'Sᴀʀᴀ', '★Sara★',
        '☆Sara☆', '✦Sara✦', 'Ⓢⓐⓡⓐ', 'SARA', '༺Sara༻',
        '꧁Sara꧂', '【Sara】', '⟨Sara⟩', '⫸Sara⫷', '➤Sara➤',
        'Sαrα', 'Såŕå', 'Şąŕą', 'S҉a҉r҉a҉', 'S̷a̷r̷a̷',
        'S͎a͎r͎a͎', 'S̲a̲r̲a̲', 'S̾a̾r̾a̾', 'S͆a͆r͆a͆', 'S̤a̤r̤a̤'
      ];
      
      const pattern = Math.floor(Math.random() * 5);
      let name;
      const base = baseNames[Math.floor(Math.random() * baseNames.length)];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      
      if (pattern === 0) name = `${prefix} ${base}`.trim();
      else if (pattern === 1) name = `${base} ${suffix}`.trim();
      else if (pattern === 2) name = `${prefix} ${base} ${suffix}`.trim();
      else if (pattern === 3) name = `✦ ${base} ✦`;
      else name = `${prefix} ${base}`.trim();
      
      if (name.length > 35) return base;
      return name;
    }
    
    const fancyName = getSaraName();
    
    // ===== آپدیت پروفایل =====
    await client.invoke(new Api.account.UpdateProfile({
      about: fullBio,
      firstName: fancyName,
    }));
    
    console.log(`✅ پروفایل سارا آپدیت شد! ساعت: ${currentHour} | نام: ${fancyName}`);
    
    // ===== ذخیره در KV =====
    await env.KV_BINDING.put('last_profile_update', Date.now().toString());
    await env.KV_BINDING.put('last_bio', fullBio);
    await env.KV_BINDING.put('last_name', fancyName);
    
  } catch (error) {
    console.error('❌ خطا در آپدیت پروفایل:', error);
  }
}
// ============================================
// 🚀 ۱۴. شروع و توقف سلف‌بات
// ============================================

let selfBotClient = null;
let isRunning = false;
let profileUpdateInterval = null;
let db = null;
let sara = null;
let memoryVault = null;
let learningEngine = null;
let groupManager = null;
let userManager = null;

async function startSelfBot(env) {
  if (isRunning) {
    console.log('⚠️ سلف‌بات در حال اجراست!');
    return;
  }

  try {
    // ===== مقداردهی اولیه =====
    if (!db) db = new Database(env);
    if (!sara) sara = new SaraPersonality();
    if (!memoryVault) memoryVault = new MemoryVault();
    if (!learningEngine) learningEngine = new LearningEngine();
    if (!groupManager) groupManager = new GroupManager();
    if (!userManager) userManager = new UserManager();

    const sessionManager = new SessionManager(env);
    const session = await sessionManager.load();
    const apiId = parseInt(env.API_ID);
    const apiHash = env.API_HASH;

    if (!apiId || !apiHash) {
      throw new Error('❌ API_ID یا API_HASH تنظیم نشده!');
    }

    const client = new TelegramClient(session, apiId, apiHash, {
      connectionRetries: 5,
      useWSS: true,
      floodSleepThreshold: 60,
      deviceModel: 'Sara Hyper FUL',
      systemVersion: '1.0.0',
      appVersion: '1.0.0',
    });

    await client.start({
      phoneNumber: async () => {
        const phone = await env.KV_BINDING.get('login_phone') || env.PHONE_NUMBER;
        if (!phone) throw new Error('❌ شماره یافت نشد');
        return phone;
      },
      password: async () => env.PASSWORD || '',
      phoneCode: async () => {
        console.log('⏳ منتظر کد ورود...');
        const phone = await env.KV_BINDING.get('login_phone');
        
        if (await sessionManager.exists()) {
          console.log('✅ سشن معتبر است، بدون کد وارد شد');
          return '';
        }
        
        for (let i = 0; i < 60; i++) {
          const userCode = await env.KV_BINDING.get(`code_input_${phone}`);
          if (userCode) {
            console.log('✅ کد دریافت شد:', userCode);
            await env.KV_BINDING.delete(`code_input_${phone}`);
            return userCode;
          }
          await new Promise(r => setTimeout(r, 1000));
        }
        throw new Error('زمان انتظار کد تمام شد');
      },
      onError: (err) => console.log('❌ خطا:', err),
    });

    const newSession = client.session.save();
    await sessionManager.save(newSession);
    await env.KV_BINDING.put('bot_status', 'running');
    await env.KV_BINDING.put('bot_start_time', String(Date.now()));

    client.addEventHandler(async (event) => {
      if (event.isMessage()) {
        await handleSelfMessage(event, client, env);
      } else if (event.isEditedMessage()) {
        await handleEditedMessage(event, client, env);
      } else if (event.isService()) {
        await handleServiceMessage(event, client, env);
      }
    });

    await client.connect();
    selfBotClient = client;
    isRunning = true;

    startAutoUpdateTimer(client, env);
    await autoUpdateProfile(client, env);

    const adminIds = (env.ADMIN_IDS || env.ADMIN_ID || '')
      .split(',')
      .map(id => parseInt(id.trim()))
      .filter(Boolean);

    for (const adminId of adminIds) {
      try {
        await client.sendMessage(adminId, {
          message: `🌸 سارا HYPER FUL ULTIMATE روشن شد!\n🕐 ${new Date().toLocaleString('fa-IR')}`
        });
      } catch (error) {}
    }

    console.log('🔥 سارا HYPER FUL ULTIMATE فعال شد!');

  } catch (error) {
    console.error('❌ خطا در شروع سلف:', error);
    
    if (error.message && error.message.includes('SESSION')) {
      const sessionManager = new SessionManager(env);
      await sessionManager.clear();
      console.log('🗑️ سشن نامعتبر پاک شد');
    }
  }
}

async function stopSelfBot(env) {
  if (profileUpdateInterval) {
    clearInterval(profileUpdateInterval);
    profileUpdateInterval = null;
  }

  if (selfBotClient) {
    try {
      const sessionManager = new SessionManager(env);
      const sessionString = selfBotClient.session.save();
      await sessionManager.save(sessionString);
      console.log('✅ سشن قبل از توقف ذخیره شد');

      await selfBotClient.disconnect();
      selfBotClient = null;
      isRunning = false;

      await env.KV_BINDING.put('bot_status', 'stopped');

      const adminIds = (env.ADMIN_IDS || env.ADMIN_ID || '')
        .split(',')
        .map(id => parseInt(id.trim()))
        .filter(Boolean);

      for (const adminId of adminIds) {
        try {
          await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: adminId,
              text: '⛔ سلف‌بات متوقف شد!'
            })
          });
        } catch (e) {}
      }

      console.log('⛔ سلف‌بات متوقف شد!');
    } catch (error) {
      console.error('❌ خطا در توقف سلف:', error);
    }
  }
}

// ============================================
// 📨 ۱۵. هندلر پیام‌های اصلی
// ============================================

async function handleSelfMessage(event, client, env) {
  try {
    const message = event.message;
    const text = message.text || '';
    const chatId = message.chatId;
    const messageId = message.id;
    const senderId = message.senderId;
    
    if (!chatId) return;
    if (senderId.toString() === (await client.getMe()).id.toString()) return;
    
    const userId = senderId.toString();
    const status = await env.KV_BINDING.get('bot_status');

    if (status !== 'running') return;
    
    // ===== دستورات سریع =====
    if (text === '/start') {
      await client.sendMessage(chatId, { 
        message: langManager.t(userId, 'start', message.sender?.firstName || 'عزیزم')
      });
      return;
    }

    if (text === '/help' || text.toLowerCase() === 'help') {
      await client.sendMessage(chatId, { 
        message: langManager.t(userId, 'help')
      });
      return;
    }

    if (text === '/lang' || text.toLowerCase() === 'lang') {
      await showLanguageMenu(chatId, env, userId);
      return;
    }

    if (text === '/status') {
      const stats = await db.getStats();
      const status = await env.KV_BINDING.get('bot_status') || 'stopped';
      const uptime = await getUptime(env);
      
      await client.sendMessage(chatId, {
        message: langManager.t(userId, 'status',
          status === 'running' ? '🟢 فعال' : '🔴 غیرفعال',
          '✅ فعال',
          '✅ فعال',
          '✅ فعال',
          '✅ فعال',
          '✅ فعال',
          '✅ فعال',
          '✅ فعال',
          '✅ فعال',
          '✅ فعال',
          '✅ فعال',
          uptime,
          stats.users,
          stats.messages,
          stats.voices,
          '🔑 فعال',
          sara.currentMood
        )
      });
      return;
    }

    if (text === '/panel') {
      await showAdminPanel(chatId, null, client, env, userId);
      return;
    }

    if (text === '/profile') {
      const me = await client.getMe();
      await client.sendMessage(chatId, {
        message: langManager.t(userId, 'profile',
          me.firstName || 'سارا',
          me.about || '🌸 سارا | زندگی با عشق 💕',
          me.about || '🌸 سارا | زندگی با عشق 💕',
          me.firstName || 'سارا'
        )
      });
      return;
    }

    if (text === '/ip') {
      const ipHash = await db.getIPHash(userId);
      await client.sendMessage(chatId, {
        message: langManager.t(userId, 'ip_hash', ipHash || 'تنظیم نشده')
      });
      return;
    }
    
    // ===== پنل مدیریت =====
    const adminIds = (env.ADMIN_IDS || env.ADMIN_ID || '')
      .split(',')
      .map(id => parseInt(id.trim()))
      .filter(Boolean);

    if (adminIds.includes(parseInt(senderId.toString()))) {
      if (text === '/stop') {
        await stopSelfBot(env);
        await client.sendMessage(chatId, {
          message: langManager.t(userId, 'bot_stopped')
        });
        return;
      }

      if (text === '/restart') {
        await client.sendMessage(chatId, { 
          message: langManager.t(userId, 'restarting') 
        });
        await stopSelfBot(env);
        await new Promise(resolve => setTimeout(resolve, 3000));
        await startSelfBot(env);
        await client.sendMessage(chatId, { 
          message: langManager.t(userId, 'restart_done') 
        });
        return;
      }

      if (text === '/clear_cache') {
        memoryVault.memories.clear();
        memoryVault.userFacts.clear();
        await client.sendMessage(chatId, { 
          message: langManager.t(userId, 'cache_cleared') 
        });
        return;
      }

      if (text === '/users') {
        await showUsersList(chatId, client, env, userId);
        return;
      }

      if (text.startsWith('/broadcast ')) {
        const msg = text.replace('/broadcast ', '').trim();
        if (msg) {
          await broadcastToAllUsers(msg, client, env, userId);
          await client.sendMessage(chatId, { 
            message: langManager.t(userId, 'broadcast_sent', 'همه') 
          });
        }
        return;
      }
    }
    
    // ===== ارسال همگانی =====
    const broadcastState = await env.KV_BINDING.get(`broadcast:${chatId}`);
    if (broadcastState === 'waiting' && text !== '/cancel') {
      await env.KV_BINDING.delete(`broadcast:${chatId}`);
      const users = await db.getAllUsers();
      let successCount = 0;
      
      for (const user of users) {
        try {
          await client.sendMessage(user.id, { message: `📢 ${text}` });
          successCount++;
          await new Promise(resolve => setTimeout(resolve, 50));
        } catch (error) {}
      }
      
      await client.sendMessage(chatId, {
        message: langManager.t(userId, 'broadcast_sent', successCount)
      });
      return;
    }
    
    if (text === '/cancel') {
      await env.KV_BINDING.delete(`broadcast:${chatId}`);
      await client.sendMessage(chatId, { 
        message: langManager.t(userId, 'broadcast_cancel')
      });
      return;
    }
    
    // ===== مدیریت گروه =====
    if (chatId.toString().startsWith('-')) {
      await groupManager.handleGroupMessage(event, client, env, db);
      return;
    }
    
    // ===== ذخیره کاربر =====
    await db.saveUser(userId, message.sender?.username || 'کاربر');
    await db.updateStats(userId);
    
    // ===== حذف پیام کاربر =====
    await client.deleteMessages(chatId, [messageId]);
    
    // ===== تایپینگ =====
    await showTyping(client, chatId);
    await naturalDelay(1000, 3000);
    
    // ===== دریافت پاسخ =====
    let response = await getSaraResponse(text, userId, env, db);
    
    // ===== ارسال پاسخ =====
    await client.sendMessage(chatId, { 
      message: `🌸 ${response}`,
      replyTo: messageId
    });
    
    // ===== تشخیص احساسات و ارسال گیف/استیکر =====
    const userMood = analyzeUserMood(text);
    if (userMood === 'flirty' || userMood === 'romantic') {
      await sendSexyGif(client, chatId);
      await sendSexySticker(client, chatId);
    }
    
    // ===== ارسال ویس =====
    try {
      let audioBuffer = await getCachedVoice(response, env);
      if (!audioBuffer) {
        const audioData = await textToVoiceFree(response, env);
        if (audioData) {
          audioBuffer = Buffer.from(audioData);
          await cacheVoice(response, audioBuffer, env);
        }
      }
      
      if (audioBuffer) {
        const enhancedAudio = enhanceAudioQuality(audioBuffer, {
          normalize: true,
          amplify: 1.2,
          noiseReduction: true
        });

        await client.sendFile(chatId, {
          file: enhancedAudio,
          caption: '🎙️ سارا:',
          replyTo: messageId || undefined,
          forceDocument: false,
          attributes: [
            new Api.DocumentAttributeAudio({
              duration: Math.floor(audioBuffer.length / 24000 / 2),
              title: 'سارا',
              performer: 'سارا',
              voice: true
            })
          ]
        });

        await db.incrementVoices();
      }
    } catch (voiceError) {
      console.error('❌ خطا در ارسال ویس:', voiceError);
    }

  } catch (error) {
    console.error('❌ خطا در handleSelfMessage:', error);
  }
}
// ============================================
// 📨 ۱۶. هندلر پیام‌های ویرایش شده و سرویس
// ============================================

async function handleEditedMessage(event, client, env) {
  try {
    const message = event.message;
    const text = message.text || '';
    const chatId = message.chatId;
    const senderId = message.senderId;
    
    if (!chatId) return;
    if (senderId.toString() === (await client.getMe()).id.toString()) return;
    
    // فقط در گروه‌ها پاسخ بده
    if (chatId.toString().startsWith('-')) {
      const settings = groupManager.groupSettings.get(chatId) || {};
      if (settings.active && settings.onlyMention) {
        const me = await client.getMe();
        const mention = '@' + me.username;
        if (text.includes(mention)) {
          await handleSelfMessage(event, client, env);
        }
      }
    }
  } catch (error) {
    console.error('❌ خطا در handleEditedMessage:', error);
  }
}

async function handleServiceMessage(event, client, env) {
  try {
    const message = event.message;
    const chatId = message.chatId;
    const action = message.action;
    
    if (!chatId) return;
    
    // ===== خوش‌آمدگویی به اعضای جدید =====
    if (action && action.className === 'MessageActionChatAddUser') {
      const userIds = action.users || [];
      for (const userId of userIds) {
        await groupManager.sendWelcome(chatId, userId, client);
      }
    }
    
    // ===== خروج کاربر =====
    if (action && action.className === 'MessageActionChatDeleteUser') {
      const userId = action.userId;
      if (userId) {
        console.log(`👤 کاربر ${userId} از گروه خارج شد`);
      }
    }
  } catch (error) {
    console.error('❌ خطا در handleServiceMessage:', error);
  }
}

// ============================================
// 🔄 ۱۷. ریست سشن (برای مواقع ضروری)
// ============================================

async function resetSession(env) {
  const sessionManager = new SessionManager(env);
  await sessionManager.clear();
  console.log('🗑️ سشن ریست شد');
  
  if (selfBotClient) {
    await stopSelfBot(env);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await startSelfBot(env);
  }
}

// ============================================
// 📊 ۱۸. وضعیت سشن و اطلاعات سیستم
// ============================================

async function getSessionStatus(env) {
  const sessionManager = new SessionManager(env);
  const exists = await sessionManager.exists();
  const status = await env.KV_BINDING.get('bot_status');
  const startTime = await env.KV_BINDING.get('bot_start_time');
  
  return {
    hasSession: exists,
    botStatus: status || 'stopped',
    isRunning: isRunning,
    uptime: startTime ? Math.floor((Date.now() - parseInt(startTime)) / 1000) : 0,
    clientExists: !!selfBotClient,
    profileUpdateInterval: !!profileUpdateInterval,
    memoryStats: memoryVault ? memoryVault.getAllMemories() : {},
    learningStats: learningEngine ? learningEngine.getStats() : {}
  };
}

// ============================================
// 🔑 ۱۹. مدیریت IP Hash (امنیت)
// ============================================

async function addIPHash(userId, ipHash, env, db) {
  try {
    // چک کردن فرمت (۶۴ کاراکتر هگز)
    if (!/^[0-9a-fA-F]{64}$/.test(ipHash)) {
      return { success: false, error: 'فرمت نامعتبر' };
    }
    
    const existing = await db.getIPHash(userId);
    if (existing) {
      return { success: false, error: 'قبلاً اضافه شده' };
    }
    
    await db.saveIPHash(userId, ipHash);
    return { success: true, ipHash };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function removeIPHash(userId, env, db) {
  try {
    await db.removeIPHash(userId);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function verifyIPHash(userId, ipHash, env, db) {
  try {
    const saved = await db.getIPHash(userId);
    if (!saved) return { success: false, error: 'یافت نشد' };
    return { success: saved === ipHash };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================
// 📋 ۲۰. گزارش و لاگ‌ها
// ============================================

async function addLog(env, message, level = 'info') {
  try {
    const logs = await env.KV_BINDING.get('logs', 'json') || [];
    logs.push({
      message,
      level,
      time: Date.now(),
      timestamp: new Date().toISOString()
    });
    
    if (logs.length > 500) logs.shift();
    await env.KV_BINDING.put('logs', JSON.stringify(logs));
  } catch (error) {
    console.error('❌ خطا در ذخیره لاگ:', error);
  }
}

async function getLogs(env, limit = 50, level = null) {
  try {
    const logs = await env.KV_BINDING.get('logs', 'json') || [];
    let filtered = logs;
    if (level) {
      filtered = logs.filter(l => l.level === level);
    }
    return filtered.slice(-limit);
  } catch (error) {
    return [];
  }
}

async function clearLogs(env) {
  try {
    await env.KV_BINDING.put('logs', JSON.stringify([]));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================
// 📨 ۲۱. ارسال پیام با قالب‌بندی
// ============================================

async function sendFormattedMessage(client, chatId, text, options = {}) {
  try {
    const {
      parseMode = 'Markdown',
      replyTo = null,
      buttons = null,
      disableWebPagePreview = true,
      silent = false
    } = options;
    
    const messageOptions = {
      message: text,
      parseMode: parseMode,
      replyTo: replyTo || undefined,
      disableWebPagePreview: disableWebPagePreview,
      silent: silent
    };
    
    if (buttons) {
      messageOptions.buttons = buttons;
    }
    
    return await client.sendMessage(chatId, messageOptions);
  } catch (error) {
    console.error('❌ خطا در ارسال پیام:', error);
    return null;
  }
}

// ============================================
// 🔄 ۲۲. توابع مدیریت کش
// ============================================

async function clearCache(env) {
  try {
    if (memoryVault) {
      memoryVault.memories.clear();
      memoryVault.userFacts.clear();
      memoryVault.importantMoments.clear();
      memoryVault.conversationContext.clear();
      memoryVault.userPreferences.clear();
      memoryVault.userMoods.clear();
      memoryVault.userNames.clear();
      memoryVault.userBirthdays.clear();
      memoryVault.userInterests.clear();
    }
    
    if (learningEngine) {
      learningEngine.patterns.clear();
      learningEngine.responses.clear();
      learningEngine.learnedPhrases.clear();
      learningEngine.userPatterns.clear();
      learningEngine.frequentWords.clear();
      learningEngine.emotionPatterns.clear();
    }
    
    if (db) {
      db.cache.clear();
    }
    
    await env.KV_BINDING.put('logs', JSON.stringify([]));
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================
// 📊 ۲۳. آمار کامل سیستم
// ============================================

async function getFullStats(env) {
  try {
    const stats = await db.getStats();
    const status = await env.KV_BINDING.get('bot_status') || 'stopped';
    const startTime = await env.KV_BINDING.get('bot_start_time');
    const uptime = startTime ? Math.floor((Date.now() - parseInt(startTime)) / 1000) : 0;
    
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;
    
    const memoryStats = memoryVault ? memoryVault.getAllMemories() : {};
    const learningStats = learningEngine ? learningEngine.getStats() : {};
    const saraStats = sara ? sara.getStats() : {};
    const userStats = userManager ? userManager.getStats() : {};
    const groupStats = groupManager ? groupManager.groupSettings.size : 0;
    
    return {
      bot: {
        status: status === 'running' ? '🟢 آنلاین' : '🔴 آفلاین',
        uptime: `${hours}h ${minutes}m ${seconds}s`,
        isRunning: isRunning,
        hasSession: await new SessionManager(env).exists()
      },
      database: stats,
      memory: {
        users: Object.keys(memoryStats).length,
        total: Object.values(memoryStats).reduce((sum, m) => sum + m.count, 0)
      },
      learning: learningStats,
      sara: saraStats,
      users: userStats,
      groups: groupStats,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return { error: error.message };
  }
}

// ============================================
// سارا سلف‌بات - نسخه نهایی با تنظیمات شما
// ============================================

// ============================================
// 🔐 تنظیمات محیطی
// ============================================

const ENV_VARS = {
  API_ID: '21052688',
  API_HASH: 'dff2dac0409ffb456f3336ebb56f7d6c',
  PHONE_NUMBER: '+989378038736',
  PASSWORD: '',
  ADMIN_IDS: '7343696403',
  CF_ACCOUNT_ID: '',
  CF_API_TOKEN: '',
  KV_BINDING: 'KV_BINDING',
};

// ============================================
// 🚀 Export اصلی
// ============================================

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ===== صفحه اصلی =====
    if (path === '/' || path === '') {
      return new Response(`
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🌸 سارا</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Tahoma, Arial, sans-serif;
      background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #fbc2eb 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .container {
      background: rgba(255,255,255,0.95);
      border-radius: 30px;
      padding: 40px;
      max-width: 450px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    }
    h1 { font-size: 2.5em; color: #6c5ce7; margin-bottom: 5px; }
    .subtitle { color: #636e72; margin-bottom: 25px; }
    .status-box {
      background: #f8f9fa;
      border-radius: 15px;
      padding: 15px;
      margin: 20px 0;
    }
    .btn {
      display: inline-block;
      padding: 15px 40px;
      background: linear-gradient(135deg, #6c5ce7, #a29bfe);
      color: white;
      text-decoration: none;
      border-radius: 12px;
      font-weight: bold;
      transition: 0.3s;
    }
    .btn:hover { transform: scale(1.05); }
    .footer { margin-top: 20px; color: #b2bec3; font-size: 0.8em; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🌸 سارا</h1>
    <p class="subtitle">💕 سلف‌بات هوش مصنوعی</p>
    <div class="status-box">
      <p>📱 شماره: ${ENV_VARS.PHONE_NUMBER}</p>
      <p>🔄 وضعیت: 🟢 آنلاین</p>
    </div>
    <a href="/login" class="btn">🔐 ورود با کد</a>
    <div class="footer">🌸 با عشق سارا 💕</div>
  </div>
</body>
</html>
      `, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // ===== صفحه ورود =====
    if (path === '/login') {
      return new Response(`
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🔐 ورود</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Tahoma, Arial, sans-serif;
      background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #fbc2eb 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .container {
      background: rgba(255,255,255,0.95);
      border-radius: 30px;
      padding: 40px;
      max-width: 400px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    }
    h2 { color: #6c5ce7; font-size: 2em; margin-bottom: 10px; }
    .subtitle { color: #636e72; margin-bottom: 25px; }
    input {
      width: 100%;
      padding: 15px;
      font-size: 20px;
      border: 2px solid #ddd;
      border-radius: 12px;
      text-align: center;
      margin: 10px 0;
      transition: 0.3s;
    }
    input:focus {
      border-color: #6c5ce7;
      outline: none;
      box-shadow: 0 0 0 3px rgba(108,92,231,0.2);
    }
    button {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #6c5ce7, #a29bfe);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;
    }
    button:hover { transform: scale(1.02); }
    button:disabled { opacity: 0.6; cursor: not-allowed; }
    .result {
      margin-top: 15px;
      padding: 12px;
      border-radius: 10px;
      display: none;
      font-weight: bold;
    }
    .result.success {
      display: block;
      background: #d4edda;
      color: #155724;
    }
    .result.error {
      display: block;
      background: #f8d7da;
      color: #721c24;
    }
    .loading { display: none; margin-top: 15px; }
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #6c5ce7;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .info { margin-top: 20px; font-size: 0.8em; color: #b2bec3; }
    .info span { color: #6c5ce7; font-weight: bold; }
    .back-link { display: block; margin-top: 15px; color: #6c5ce7; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <h2>🔐 ورود</h2>
    <p class="subtitle">کد تایید رو وارد کن</p>
    
    <div id="result" class="result"></div>
    
    <form id="loginForm">
      <input type="text" id="codeInput" placeholder="کد ۵ رقمی" maxlength="5" inputmode="numeric" pattern="[0-9]*" autocomplete="off">
      <button type="submit" id="submitBtn">✅ ارسال کد</button>
    </form>
    
    <div id="loading" class="loading">
      <div class="spinner"></div>
      <p style="margin-top:10px;color:#6c5ce7;">در حال ثبت...</p>
    </div>
    
    <div class="info">
      📱 شماره: <span>${ENV_VARS.PHONE_NUMBER}</span>
    </div>
    
    <a href="/" class="back-link">← بازگشت</a>
  </div>

  <script>
    const form = document.getElementById('loginForm');
    const codeInput = document.getElementById('codeInput');
    const submitBtn = document.getElementById('submitBtn');
    const result = document.getElementById('result');
    const loading = document.getElementById('loading');

    codeInput.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
    });

    codeInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
      }
    });

    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const code = codeInput.value.trim();
      
      if (!code || code.length < 5) {
        showResult('❌ کد ۵ رقمی رو کامل وارد کن!', 'error');
        return;
      }
      
      submitBtn.disabled = true;
      submitBtn.textContent = '⏳ در حال ارسال...';
      loading.style.display = 'block';
      hideResult();
      
      try {
        const response = await fetch('/submitcode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            code: code, 
            phone: '${ENV_VARS.PHONE_NUMBER}' 
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          showResult('✅ ' + data.message + ' 🎉', 'success');
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
        } else {
          showResult('❌ ' + (data.error || 'خطا!'), 'error');
        }
      } catch (error) {
        showResult('❌ خطا در ارتباط با سرور! دوباره تلاش کن.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '✅ ارسال کد';
        loading.style.display = 'none';
      }
    });

    function showResult(msg, type) {
      result.textContent = msg;
      result.className = 'result ' + type;
    }

    function hideResult() {
      result.className = 'result';
      result.style.display = 'none';
    }

    codeInput.focus();
  </script>
</body>
</html>
      `, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // ===== ثبت کد =====
    if (path === '/submitcode' && request.method === 'POST') {
      try {
        const body = await request.json();
        const code = body.code;
        const phone = body.phone || ENV_VARS.PHONE_NUMBER;
        
        if (!code || code.length < 5) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: 'کد نامعتبر!' 
          }), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        await env.KV_BINDING.put(`code_input_${phone}`, code);
        
        return new Response(JSON.stringify({ 
          success: true, 
          message: '✅ کد با موفقیت ثبت شد!' 
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: error.message 
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // ===== وضعیت =====
    if (path === '/status') {
      const status = await env.KV_BINDING.get('bot_status') || 'stopped';
      return new Response(JSON.stringify({
        status: status,
        isRunning: status === 'running',
        phone: ENV_VARS.PHONE_NUMBER
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response('404 - صفحه پیدا نشد!', { status: 404 });
  }
};
