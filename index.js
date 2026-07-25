// ============================================
// 📁 index.js - سارا HYPER FUL ULTIMATE (نسخه کامل توکنی)
// ============================================

// ============================================
// 🗄️ کلاس دیتابیس (Database) - با KV Storage
// ============================================

class Database {
  constructor(env) {
    this.env = env;
    this.cache = new Map();
    this.kv = env.KV_BINDING;
  }

  async get(key) {
    return await this.kv.get(key);
  }

  async set(key, value, options = {}) {
    return await this.kv.put(key, value, options);
  }

  async delete(key) {
    return await this.kv.delete(key);
  }

  async list(prefix) {
    return await this.kv.list({ prefix });
  }

  async getJSON(key) {
    const data = await this.kv.get(key);
    return data ? JSON.parse(data) : null;
  }

  async setJSON(key, value, options = {}) {
    return await this.kv.put(key, JSON.stringify(value), options);
  }

  async increment(key) {
    const current = parseInt(await this.kv.get(key) || '0');
    const newValue = current + 1;
    await this.kv.put(key, newValue.toString());
    return newValue;
  }

  async getUser(userId) {
    return await this.getJSON(`user_${userId}`);
  }

  async saveUser(userId, username) {
    const existing = await this.getUser(userId);
    if (!existing) {
      await this.setJSON(`user_${userId}`, {
        id: userId,
        username: username || 'کاربر',
        firstSeen: Date.now(),
        messages: 0,
        lastSeen: Date.now(),
        lang: 'fa',
        mood: 'neutral',
        intimacy: 0.3,
        trust: 0.5,
        conversations: 0
      });
      await this.increment('total_users');
    }
  }

  async updateStats(userId) {
    const user = await this.getUser(userId);
    if (user) {
      user.messages++;
      user.lastSeen = Date.now();
      await this.setJSON(`user_${userId}`, user);
    }
    await this.increment('total_messages');
  }

  async getStats() {
    const [users, messages, voices, photos] = await Promise.all([
      this.kv.get('total_users'),
      this.kv.get('total_messages'),
      this.kv.get('total_voices'),
      this.kv.get('total_photos')
    ]);
    return {
      users: parseInt(users || '0'),
      messages: parseInt(messages || '0'),
      voices: parseInt(voices || '0'),
      photos: parseInt(photos || '0')
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

  async saveIPHash(userId, ipHash) {
    await this.kv.put(`ip_${userId}`, ipHash);
  }

  async getIPHash(userId) {
    return await this.kv.get(`ip_${userId}`);
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
    await this.kv.delete(`ip_${userId}`);
  }

  async getSettings() {
    const settings = await this.kv.get('settings');
    return settings ? JSON.parse(settings) : {
      typing: true,
      self: true,
      bio: true,
      about: true,
      title: true,
      seen: true,
      comment: true,
      lock: true,
      media: true,
      welcome: true,
      mood: 'happy'
    };
  }

  async saveSettings(settings) {
    await this.kv.put('settings', JSON.stringify(settings));
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

  async saveMessage(userId, text, response) {
    const key = `history_${userId}`;
    const history = await this.getJSON(key) || [];
    history.push({ text, response, time: Date.now() });
    if (history.length > 100) history.shift();
    await this.setJSON(key, history);
  }

  async getHistory(userId, limit = 50) {
    const history = await this.getJSON(`history_${userId}`) || [];
    return history.slice(-limit);
  }

  async updateUserLang(userId, lang) {
    const user = await this.getUser(userId);
    if (user) {
      user.lang = lang;
      await this.setJSON(`user_${userId}`, user);
      return true;
    }
    return false;
  }

  async updateUserMood(userId, mood) {
    const user = await this.getUser(userId);
    if (user) {
      user.mood = mood;
      await this.setJSON(`user_${userId}`, user);
      return true;
    }
    return false;
  }

  async incrementVoices() {
    return await this.increment('total_voices');
  }

  async incrementPhotos() {
    return await this.increment('total_photos');
  }

  clearCache() {
    this.cache.clear();
  }
}

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

  translate(key, lang, ...args) {
    const targetLang = lang || this.defaultLang;
    let text = translations[targetLang]?.[key] || translations[this.defaultLang]?.[key] || key;
    
    for (let i = 0; i < args.length; i++) {
      text = text.replace(`{}`, args[i]);
    }
    return text;
  }

  t(userId, key, ...args) {
    const lang = this.getUserLang(userId);
    return this.translate(key, lang, ...args);
  }

  getAvailableLanguages() {
    return Object.keys(translations);
  }
}

// ============================================
// 🧠 حافظه بلندمدت سارا (Memory Vault)
// ============================================

class MemoryVault {
  constructor() {
    this.memories = new Map();
    this.userFacts = new Map();
    this.importantMoments = new Map();
    this.conversationContext = new Map();
    this.userPreferences = new Map();
    this.userMoods = new Map();
    this.userNames = new Map();
    this.userBirthdays = new Map();
    this.userInterests = new Map();
  }

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

  calculateImportance(text) {
    const importantWords = ['عشق', 'دوست', 'ازدواج', 'زندگی', 'بغض', 'اشک', 'دل', 'قلب', 'مرگ', 'مهم', 'حتماً', 'قول', 'تولد', 'عروسی', 'مراسم', 'خاطره'];
    let score = 0;
    importantWords.forEach(word => {
      if (text.includes(word)) score += 0.15;
    });
    if (text.length > 50) score += 0.1;
    if (text.includes('!') || text.includes('؟')) score += 0.05;
    return Math.min(score, 1);
  }

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

  updateContext(userId, text, response) {
    const context = this.conversationContext.get(userId) || [];
    context.push({ text, response, time: Date.now() });
    if (context.length > 30) context.shift();
    this.conversationContext.set(userId, context);
  }

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

  updateMood(userId, text) {
    const mood = this.detectMood(text);
    this.userMoods.set(userId, mood);
  }

  getRelevantMemories(userId, query, limit = 20) {
    const memories = this.memories.get(userId) || [];
    const scored = memories.map(m => ({
      ...m,
      score: this.similarity(m.text, query) + (m.importance || 0) * 0.5
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit);
  }

  getContext(userId) {
    return this.conversationContext.get(userId) || [];
  }

  getUserFacts(userId) {
    return this.userFacts.get(userId) || [];
  }

  getUserPreferences(userId) {
    return this.userPreferences.get(userId) || { topics: [], style: 'normal', favoriteWords: [], emojis: [] };
  }

  getUserMood(userId) {
    return this.userMoods.get(userId) || 'neutral';
  }

  getUserName(userId) {
    return this.userNames.get(userId) || null;
  }

  getUserBirthday(userId) {
    return this.userBirthdays.get(userId) || null;
  }

  getUserInterests(userId) {
    return this.userInterests.get(userId) || [];
  }

  similarity(str1, str2) {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    const common = words1.filter(w => words2.includes(w));
    return common.length / Math.max(words1.length, words2.length, 1);
  }

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
// 👩 شخصیت سارا (Sara Personality)
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
// 🎬 عکس‌ها و گیف‌های سارا
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

const SARA_VIDEOS = [
  'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
  'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4',
  'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_5mb.mp4',
  'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_10mb.mp4'
];

const SARA_ART = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400'
];

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
  'https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif'
];

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
// 🎬 توابع ارسال عکس، فیلم و گیف سارا
// ============================================

async function sendSaraPhoto(chatId, style = 'home', env, replyTo = null) {
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
    
    const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        photo: randomPhoto,
        caption: `📸 ${caption}`,
        reply_to_message_id: replyTo || undefined
      })
    });
    
    const result = await response.json();
    if (result.ok) {
      await db.incrementPhotos();
    }
    return result;
  } catch (error) {
    console.error('❌ خطا در ارسال عکس سارا:', error);
    return null;
  }
}

async function sendSaraVideo(chatId, env, replyTo = null) {
  try {
    const randomVideo = SARA_VIDEOS[Math.floor(Math.random() * SARA_VIDEOS.length)];
    const captions = [
      '🎬 سلام! اینم ویدیوی سارا! 😍',
      '🎬 نگاه کن! سارا تو حرکت! 💕',
      '🎬 اینم یه ویدیوی قشنگ از سارا!',
      '🎬 سارا اینجاست! خوشت میاد؟ 😏'
    ];
    
    const caption = captions[Math.floor(Math.random() * captions.length)];
    
    const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendVideo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        video: randomVideo,
        caption: `🎬 ${caption}`,
        reply_to_message_id: replyTo || undefined
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('❌ خطا در ارسال ویدیو سارا:', error);
    return null;
  }
}

async function sendSaraArt(chatId, env, replyTo = null) {
  try {
    const randomArt = SARA_ART[Math.floor(Math.random() * SARA_ART.length)];
    const captions = [
      '🎨 اینم یه عکس تصویری از سارا! 😍',
      '🎨 نگاه! سارا به سبک هنری! 💕',
      '🎨 اینم نقاشی سارا! چطوره؟',
      '🎨 هنر سارا! خوشگله؟ 😏'
    ];
    
    const caption = captions[Math.floor(Math.random() * captions.length)];
    
    const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        photo: randomArt,
        caption: `🎨 ${caption}`,
        reply_to_message_id: replyTo || undefined
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('❌ خطا در ارسال عکس هنری سارا:', error);
    return null;
  }
}

async function sendSexyGif(chatId, env, replyTo = null) {
  try {
    const randomGif = SARA_SEXY_GIFS[Math.floor(Math.random() * SARA_SEXY_GIFS.length)];
    
    const captions = [
      '💕 سارا: بیا که دوسِت دارم...',
      '😏 سارا: فقط مال تو هستم...',
      '🔥 سارا: بیا که ببینمت...',
      '💋 سارا: دلم برات تنگه...',
      '💖 سارا: تو مال منی...',
      '💕 سارا: بیا پیشم که دوسِت دارم...'
    ];
    
    const caption = captions[Math.floor(Math.random() * captions.length)];
    
    const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendAnimation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        animation: randomGif,
        caption: `🎬 ${caption}`,
        reply_to_message_id: replyTo || undefined
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('❌ خطا در ارسال گیف سکسی:', error);
    return null;
  }
}

async function sendSexySticker(chatId, env, replyTo = null) {
  try {
    const randomSticker = sexyStickers[Math.floor(Math.random() * sexyStickers.length)];
    
    const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendSticker`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        sticker: randomSticker,
        reply_to_message_id: replyTo || undefined
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('❌ خطا در ارسال استیکر:', error);
    return null;
  }
}

// ============================================
// 🎙️ سیستم صوتی سارا (TTS)
// ============================================

async function googleTTS(text) {
  try {
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

async function voiceRSSTTS(text) {
  try {
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

function generateSineWaveAudio(text, sampleRate = 24000) {
  try {
    console.log('🎙️ تولید صدای ساده با Sine Wave...');
    
    const duration = Math.max(1, text.length * 0.08);
    const samples = Math.floor(duration * sampleRate);
    const audioData = new Float32Array(samples);
    
    const baseFrequency = 180 + Math.sin(Date.now() * 0.001) * 20;
    const pitchVariation = 1.0 + Math.sin(Date.now() * 0.002) * 0.05;
    
    for (let i = 0; i < samples; i++) {
      const t = i / sampleRate;
      const freq = baseFrequency * (1 + 0.1 * Math.sin(t * 5));
      const amp = 0.3 * (1 + 0.2 * Math.sin(t * 2)) * pitchVariation;
      
      let signal = Math.sin(2 * Math.PI * freq * t);
      signal += 0.3 * Math.sin(2 * Math.PI * freq * 2 * t);
      signal += 0.15 * Math.sin(2 * Math.PI * freq * 3 * t);
      signal += 0.05 * (Math.random() * 2 - 1);
      
      audioData[i] = signal * amp;
    }
    
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

async function textToVoiceFree(text, env) {
  try {
    console.log('🎙️ شروع تولید صدا برای:', text.substring(0, 30) + '...');
    
    const services = [
      { name: 'Google', fn: () => googleTTS(text) },
      { name: 'TTSMonster', fn: () => ttsMonsterTTS(text) },
      { name: 'VoiceRSS', fn: () => voiceRSSTTS(text) },
      { name: 'Oddcast', fn: () => oddcastTTS(text) },
      { name: 'Zalo', fn: () => zaloTTS(text) },
      { name: 'Viettel', fn: () => viettelTTS(text) },
      { name: 'SineWave', fn: () => generateSineWaveAudio(text) }
    ];
    
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
    
    if (amplify !== 1) {
      for (let i = 0; i < floatArray.length; i++) {
        floatArray[i] = floatArray[i] * amplify;
      }
    }
    
    if (noiseReduction) {
      for (let i = 2; i < floatArray.length - 2; i++) {
        if (Math.abs(floatArray[i]) < 0.01) {
          floatArray[i] = (floatArray[i-1] + floatArray[i+1]) / 2;
        }
      }
    }
    
    if (equalizer) {
      const windowSize = 10;
      for (let i = windowSize; i < floatArray.length - windowSize; i++) {
        const avg = (floatArray[i-1] + floatArray[i] + floatArray[i+1]) / 3;
        floatArray[i] = floatArray[i] * 0.7 + avg * 0.3;
      }
    }
    
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

async function cacheVoice(text, audioBuffer, env) {
  try {
    if (!env || !env.KV_BINDING) return;
    
    const key = `voice_${hashText(text)}`;
    const base64Data = Buffer.from(audioBuffer).toString('base64');
    
    await env.KV_BINDING.put(key, base64Data, {
      expirationTtl: 86400
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

function hashText(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

async function sendSaraVoice(chatId, text, env, replyTo = null) {
  try {
    let audioBuffer = await getCachedVoice(text, env);
    
    if (!audioBuffer) {
      const audioData = await textToVoiceFree(text, env);
      if (audioData) {
        audioBuffer = Buffer.from(audioData);
        await cacheVoice(text, audioBuffer, env);
      }
    }
    
    if (audioBuffer) {
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
      
      const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendVoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          voice: enhancedAudio.toString('base64'),
          caption: caption,
          reply_to_message_id: replyTo || undefined,
          duration: Math.floor(audioBuffer.length / 24000 / 2)
        })
      });
      
      const result = await response.json();
      if (result.ok) {
        await db.incrementVoices();
        console.log('✅ صدای سارا با موفقیت ارسال شد');
      }
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
// 🧠 کلاس یادگیری (Learning Engine)
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
// 🏢 کلاس مدیریت گروه (GroupManager)
// ============================================

class GroupManager {
  constructor() {
    this.groupSettings = new Map();
    this.groupBlacklist = new Map();
    this.groupInfo = new Map();
    this.messageCount = new Map();
  }

  async handleGroupMessage(msg, env, db) {
    try {
      const chatId = msg.chat.id;
      const senderId = msg.from.id;
      const text = msg.text || '';
      
      if (senderId.toString() === (await getMe(env))?.id?.toString()) return;
      
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
      
      if (settings.antiSpam) {
        const isSpam = await this.checkSpam(senderId, chatId, settings);
        if (isSpam) {
          await this.handleSpam(chatId, senderId, env);
          return;
        }
      }
      
      const userId = senderId.toString();
      await db.saveUser(userId, msg.from?.username || 'کاربر');
      
      const me = await getMe(env);
      const mention = '@' + me.username;
      
      if (text.includes(mention)) {
        let cleanText = text.replace(new RegExp(mention, 'g'), '').trim();
        if (!cleanText) cleanText = 'سلام';
        
        let response = await getSaraResponse(cleanText, userId, db, env);
        if (response.length > 300) response = response.substring(0, 300) + '...';
        
        await sendTelegramMessage(chatId,
          `${msg.from?.first_name || 'کاربر'} جان، ${response}`,
          env,
          msg.message_id
        );
        return;
      }
      
      if (settings.mode === 'chatty' && !settings.onlyMention) {
        if (Math.random() < 0.3) {
          let response = await getSaraResponse(text, userId, db, env);
          if (response.length > 300) response = response.substring(0, 300) + '...';
          await sendTelegramMessage(chatId,
            `${msg.from?.first_name || 'کاربر'} جان، ${response}`,
            env,
            msg.message_id
          );
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

  async handleSpam(chatId, userId, env) {
    try {
      await sendTelegramMessage(chatId, '⚠️ لطفاً سرعت ارسال پیام رو کم کن!', env);
    } catch (error) {
      console.error('❌ خطا در handleSpam:', error);
    }
  }

  async sendWelcome(chatId, userId, env) {
    try {
      const settings = this.groupSettings.get(chatId) || {};
      if (!settings.welcome) return;
      
      const user = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/getChatMember`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          user_id: userId
        })
      });
      const userData = await user.json();
      const name = userData.result?.user?.first_name || 'کاربر';
      const welcomeMsg = settings.welcomeMessage || '🌸 به گروه خوش آمدید!';
      await sendTelegramMessage(chatId, `${name} جان، ${welcomeMsg}`, env);
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
// 🎛️ پنل مدیریت و دکمه‌ها
// ============================================

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

async function showGroupPanel(chatId, env) {
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
    
    await sendTelegramMessageWithButtons(chatId, message, GROUP_PANEL_BUTTONS.main, env);
  } catch (error) {
    console.error('❌ خطا در نمایش پنل گروه:', error);
  }
}

async function showAdminPanel(chatId, env, userId) {
  try {
    const stats = await db.getStats();
    const status = await env.KV_BINDING.get('bot_status') || 'stopped';
    const uptime = await getUptime(env);
    
    const message = langManager.t(userId, 'panel',
      stats.users,
      stats.messages,
      stats.photos || stats.voices || 0,
      '1',
      '✅ همه فعال'
    );
    
    await sendTelegramMessageWithButtons(chatId, message, ADMIN_PANEL_BUTTONS.main, env);
  } catch (error) {
    console.error('❌ خطا در پنل مدیریت:', error);
  }
}

async function showLanguageMenu(chatId, env, userId) {
  const keyboard = {
    inline_keyboard: [
      [{ text: "🇮🇷 فارسی", callback_data: "lang_fa" }],
      [{ text: "🇬🇧 English", callback_data: "lang_en" }],
      [{ text: "🔙 بازگشت", callback_data: "admin_back" }]
    ]
  };
  
  await sendTelegramMessageWithButtons(chatId, 
    langManager.t(userId, 'choose_lang') || '🌐 **انتخاب زبان / Choose Language**',
    keyboard,
    env
  );
}

async function sendTelegramMessageWithButtons(chatId, text, buttons, env, parseMode = 'Markdown') {
  try {
    const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: parseMode,
        reply_markup: buttons,
        disable_web_page_preview: true
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('❌ خطا در ارسال پیام با دکمه:', error);
    return null;
  }
}

// ============================================
// 🎯 هندلر کال‌بک
// ============================================

async function handleCallback(callbackQuery, env) {
  const data = callbackQuery.data;
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const userId = callbackQuery.from.id.toString();
  
  const adminIds = (env.ADMIN_IDS || '')
    .split(',')
    .map(id => parseInt(id.trim()))
    .filter(Boolean);
  const isAdmin = adminIds.includes(parseInt(userId));
  
  await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callback_query_id: callbackQuery.id
    })
  });
  
  // ===== زبان =====
  if (data === 'lang_fa') {
    langManager.setUserLang(userId, 'fa');
    await db.updateUserLang(userId, 'fa');
    await sendTelegramMessage(chatId, 
      langManager.t(userId, 'language_changed', 'فارسی'), 
      env
    );
    return;
  }
  
  if (data === 'lang_en') {
    langManager.setUserLang(userId, 'en');
    await db.updateUserLang(userId, 'en');
    await sendTelegramMessage(chatId, 
      langManager.t(userId, 'language_changed', 'English'), 
      env
    );
    return;
  }
  
  // ===== گروه =====
  if (data.startsWith('group_')) {
    if (!isAdmin) {
      await sendTelegramMessage(chatId, langManager.t(userId, 'no_access'), env);
      return;
    }
    await handleGroupCallback(data, chatId, env, userId);
    return;
  }
  
  // ===== ادمین =====
  if (data.startsWith('admin_')) {
    if (!isAdmin) {
      await sendTelegramMessage(chatId, langManager.t(userId, 'no_access'), env);
      return;
    }
    await handleAdminCallback(data, chatId, messageId, env, userId);
    return;
  }
}

async function handleGroupCallback(data, chatId, env, userId) {
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
      await sendTelegramMessage(chatId, 
        settings.active ? '✅ گروه فعال شد!' : '❌ گروه غیرفعال شد!', 
        env
      );
      await showGroupPanel(chatId, env);
      break;
      
    case 'group_mention':
      settings.onlyMention = !settings.onlyMention;
      groupManager.groupSettings.set(chatId, settings);
      await sendTelegramMessage(chatId, 
        settings.onlyMention ? '✅ منشن فعال شد!' : '❌ منشن غیرفعال شد!', 
        env
      );
      await showGroupPanel(chatId, env);
      break;
      
    case 'group_spam':
      settings.antiSpam = !settings.antiSpam;
      groupManager.groupSettings.set(chatId, settings);
      await sendTelegramMessage(chatId, 
        settings.antiSpam ? '✅ ضد اسپم فعال شد!' : '❌ ضد اسپم غیرفعال شد!', 
        env
      );
      await showGroupPanel(chatId, env);
      break;
      
    case 'group_welcome':
      settings.welcome = !settings.welcome;
      groupManager.groupSettings.set(chatId, settings);
      await sendTelegramMessage(chatId, 
        settings.welcome ? '✅ خوش‌آمدگویی فعال شد!' : '❌ خوش‌آمدگویی غیرفعال شد!', 
        env
      );
      await showGroupPanel(chatId, env);
      break;
      
    case 'group_mode':
      await sendTelegramMessageWithButtons(chatId, 
        '📝 **انتخاب حالت گروه:**',
        GROUP_PANEL_BUTTONS.modes,
        env
      );
      break;
      
    case 'group_mode_normal':
      settings.mode = 'normal';
      settings.onlyMention = true;
      groupManager.groupSettings.set(chatId, settings);
      await sendTelegramMessage(chatId, '🔵 حالت معمولی فعال شد!', env);
      await showGroupPanel(chatId, env);
      break;
      
    case 'group_mode_chatty':
      settings.mode = 'chatty';
      settings.onlyMention = false;
      groupManager.groupSettings.set(chatId, settings);
      await sendTelegramMessage(chatId, '💬 حالت چت‌خون فعال شد!', env);
      await showGroupPanel(chatId, env);
      break;
      
    case 'group_mode_mention':
      settings.mode = 'mention';
      settings.onlyMention = true;
      groupManager.groupSettings.set(chatId, settings);
      await sendTelegramMessage(chatId, '🔒 حالت فقط منشن فعال شد!', env);
      await showGroupPanel(chatId, env);
      break;
      
    case 'group_stats':
      const stats = groupManager.getGroupStats(chatId);
      await sendTelegramMessage(chatId, `
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
      `, env);
      break;
      
    case 'group_back':
      await showGroupPanel(chatId, env);
      break;
  }
}

async function handleAdminCallback(data, chatId, messageId, env, userId) {
  switch(data) {
    case 'admin_users':
      await showUsersList(chatId, env, userId);
      break;
      
    case 'admin_broadcast':
      await sendTelegramMessage(chatId, 
        langManager.t(userId, 'broadcast_start'), 
        env
      );
      await env.KV_BINDING.put(`broadcast:${chatId}`, 'waiting');
      break;
      
    case 'admin_ip':
      await showIPList(chatId, env, userId);
      break;
      
    case 'admin_stats':
      await showStats(chatId, env, userId);
      break;
      
    case 'admin_group':
      await showGroupPanel(chatId, env);
      break;
      
    case 'admin_settings':
      await showSettingsPanel(chatId, env, userId);
      break;
      
    case 'admin_logs':
      await showLogs(chatId, env, userId);
      break;
      
    case 'admin_restart':
      await sendTelegramMessage(chatId, langManager.t(userId, 'restarting'), env);
      await env.KV_BINDING.put('bot_status', 'running');
      await env.KV_BINDING.put('bot_start_time', Date.now().toString());
      await sendTelegramMessage(chatId, langManager.t(userId, 'restart_done'), env);
      break;
      
    case 'admin_clear':
      memoryVault.memories.clear();
      memoryVault.userFacts.clear();
      memoryVault.importantMoments.clear();
      learningEngine.patterns.clear();
      learningEngine.learnedPhrases.clear();
      db.clearCache();
      await sendTelegramMessage(chatId, langManager.t(userId, 'cache_cleared'), env);
      break;
      
    case 'admin_back':
      await showAdminPanel(chatId, env, userId);
      break;
      
    case 'admin_close':
      try {
        await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/deleteMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId
          })
        });
      } catch (e) {}
      break;
  }
}

// ============================================
// 📊 توابع نمایش آمار و لیست‌ها
// ============================================

async function showUsersList(chatId, env, userId) {
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
    
    await sendTelegramMessage(chatId, 
      langManager.t(userId, 'user_list', sorted.length, userList || 'هیچ کاربری یافت نشد'), 
      env
    );
  } catch (error) {
    console.error('❌ خطا در نمایش لیست کاربران:', error);
  }
}

async function showIPList(chatId, env, userId) {
  try {
    const ipHashes = await db.getAllIPHashes();
    let list = '';
    ipHashes.forEach((item, i) => {
      list += `${i+1}. 🆔 \`${item.userId}\` → \`${item.ipHash.substring(0, 20)}...\`\n`;
    });
    
    await sendTelegramMessage(chatId, 
      langManager.t(userId, 'ip_list', ipHashes.length, list || 'هیچ IP Hash ای وجود ندارد'), 
      env
    );
  } catch (error) {
    console.error('❌ خطا در نمایش IP ها:', error);
  }
}

async function showStats(chatId, env, userId) {
  try {
    const stats = await db.getStats();
    const status = await env.KV_BINDING.get('bot_status') || 'stopped';
    const uptime = await getUptime(env);
    const memoryStats = memoryVault ? memoryVault.getAllMemories() : {};
    const learningStats = learningEngine ? learningEngine.getStats() : {};
    
    await sendTelegramMessage(chatId, `
📊 **آمار کامل سارا**

👥 کاربران: ${stats.users}
💬 پیام‌ها: ${stats.messages}
🎙️ ویس‌ها: ${stats.voices || 0}
📸 عکس‌ها: ${stats.photos || 0}
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
    `, env);
  } catch (error) {
    console.error('❌ خطا در نمایش آمار:', error);
  }
}

async function showSettingsPanel(chatId, env, userId) {
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
    
    await sendTelegramMessageWithButtons(chatId, 
      '⚙️ **تنظیمات سارا**\n\nبرای تغییر روی دکمه‌ها کلیک کن.',
      keyboard,
      env
    );
  } catch (error) {
    console.error('❌ خطا در نمایش تنظیمات:', error);
  }
}

async function showLogs(chatId, env, userId) {
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
    
    await sendTelegramMessage(chatId, logText, env);
  } catch (error) {
    console.error('❌ خطا در نمایش لاگ‌ها:', error);
  }
}

// ============================================
// 📨 توابع اصلی ارسال و مدیریت
// ============================================

async function sendTelegramMessage(chatId, text, env, replyTo = null, parseMode = 'Markdown') {
  try {
    const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: parseMode,
        reply_to_message_id: replyTo || undefined,
        disable_web_page_preview: true
      })
    });
    
    const data = await response.json();
    if (!data.ok) {
      console.error('❌ خطا در ارسال:', data.description);
    }
    return data;
  } catch (error) {
    console.error('❌ خطا در sendMessage:', error);
    return null;
  }
}

async function showTyping(chatId, env) {
  try {
    await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendChatAction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        action: 'typing'
      })
    });
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
  if (lower.includes('عصبانی') || lower.includes('خشم')) return 'angry';
  if (lower.includes('خواب') || lower.includes('خسته')) return 'sleepy';
  if (lower.includes('بازی') || lower.includes('بیا') || lower.includes('تفریح')) return 'playful';
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

async function getMe(env) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/getMe`);
    const data = await response.json();
    return data.ok ? data.result : null;
  } catch (error) {
    console.error('❌ خطا در getMe:', error);
    return null;
  }
}

// ============================================
// 🧠 دریافت پاسخ سارا
// ============================================

async function getSaraResponse(text, userId, db, env) {
  try {
    // 1. اگر API Key داریم از DeepSeek استفاده کن
    if (env.DEEPSEEK_API_KEY) {
      try {
        const user = await db.getUser(userId);
        const name = user?.username || 'عزیزم';
        const history = await db.getHistory(userId, 5);
        const histText = history.map(h => `کاربر: ${h.text}\nسارا: ${h.response}`).join('\n');
        
        const hour = new Date().getHours();
        let greet = hour < 12 ? 'صبح بخیر' : hour < 18 ? 'ظهر بخیر' : 'عصر بخیر';
        
        const prompt = `${SARA_PROMPT}

**اطلاعات:** کاربر: ${name} | ${greet} عزیزم!
**مکالمات قبل:** ${histText || 'نداشتیم'}
**پیام:** ${text}

جواب بده مثل یه دختر واقعی، با یه سوال، با ایموجی.`;

        const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.DEEPSEEK_API_KEY}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: prompt },
              { role: 'user', content: text }
            ],
            temperature: 0.9,
            max_tokens: 300
          })
        });

        const data = await res.json();
        if (res.ok && data.choices?.[0]) {
          let reply = data.choices[0].message.content;
          reply = reply.replace(/^[Ss]ara[:]?\s*/i, '').trim();
          if (reply.length > 2) {
            await db.saveMessage(userId, text, reply);
            return reply;
          }
        }
      } catch (e) {
        console.log('⚠️ AI error:', e.message);
      }
    }
    
    // 2. Fallback به پاسخ طبیعی
    const response = getNaturalResponse(text);
    await db.saveMessage(userId, text, response);
    return response;
    
  } catch (e) {
    console.error('❌ Error:', e);
    return '🌸 یه چیزی پیش اومد! دوباره بگو عزیزم 😊';
  }
}

// ============================================
// 💬 پاسخ‌های طبیعی سارا
// ============================================

function getNaturalResponse(text) {
  const t = text.toLowerCase();
  
  if (t.includes('سلام') || t.includes('hello')) {
    return ['🌸 سلام عزیزم! حالت چطوره؟', '😏 سلام جونی! بیا پیشم!', '💋 سلام! چطوری؟'][Math.floor(Math.random() * 3)];
  }
  if (t.includes('چطوری') || t.includes('خوبی')) {
    return ['😍 خوبم عزیزم! تو چطوری؟', '💕 عالی! مخصوصاً وقتی تو هستی!', '🌸 خوبم! تو چطوری؟'][Math.floor(Math.random() * 3)];
  }
  if (t.includes('دوستت دارم') || t.includes('عاشق')) {
    return ['💋 منم عاشقتم!', '😏 میدونم! منم دوسِت دارم!', '💕 عاشقتم! بیا که ببینمت!'][Math.floor(Math.random() * 3)];
  }
  if (t.includes('ناراحت') || t.includes('غمگین')) {
    return ['🤗 چرا ناراحتی عزیزم؟', '💕 ناراحت نباش! من اینجام!', '🌸 بیا بغلم! حلش میکنیم!'][Math.floor(Math.random() * 3)];
  }
  if (t.includes('خداحافظ') || t.includes('bye')) {
    return ['💕 خداحافظ عزیزم!', '🌸 خداحافظ! دلم برات تنگ میشه!', '💋 خداحافظ! بیا که بغلم کنی!'][Math.floor(Math.random() * 3)];
  }
  
  return ['🌸 راستی چه خبر از خودت؟', '💕 چه حس قشنگی! دلت برام تنگ نشده؟', '😏 بیا بیشتر حرف بزنیم!'][Math.floor(Math.random() * 3)];
}

// ============================================
// 📨 هندلر پیام خصوصی
// ============================================

async function handlePrivateMessage(msg, env) {
  const chatId = msg.chat.id;
  const text = msg.text || '';
  const userId = msg.from.id.toString();
  const messageId = msg.message_id;
  
  try {
    await showTyping(chatId, env);
    await naturalDelay(500, 1500);
    
    let response = await getSaraResponse(text, userId, db, env);
    
    await sendTelegramMessage(chatId, `🌸 ${response}`, env, messageId);
    
    await db.updateStats(userId);
    
    const userMood = analyzeUserMood(text);
    if (userMood === 'flirty' || userMood === 'romantic') {
      await sendSexyGif(chatId, env, messageId);
    }
    
    if (Math.random() < 0.2) {
      const styles = ['home', 'sexy', 'romantic'];
      const style = styles[Math.floor(Math.random() * styles.length)];
      await sendSaraPhoto(chatId, style, env, messageId);
    }
    
    try {
      await sendSaraVoice(chatId, response, env, messageId);
    } catch (voiceError) {
      console.error('❌ خطا در ارسال ویس:', voiceError);
    }
    
  } catch (error) {
    console.error('❌ خطا در handlePrivateMessage:', error);
    await sendTelegramMessage(chatId, '🌸 یه مشکلی پیش اومد! دوباره بگو عزیزم', env);
  }
}

// ============================================
// 📨 هندلر پیام‌ها
// ============================================

async function handleTelegramMessage(msg, env) {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const text = msg.text || '';
    const userId = msg.from.id.toString();
    const isGroup = msg.chat.type !== 'private';
    const isBot = msg.from?.is_bot || false;
    
    if (isBot) return;
    
    console.log(`📩 پیام از ${chatId}: ${text.substring(0, 50)}`);
    
    await db.saveUser(userId, msg.from?.username || 'کاربر');
    
    const userData = await db.getUser(userId);
    if (userData && userData.lang) {
      langManager.setUserLang(userId, userData.lang);
    }
    
    if (text.startsWith('/')) {
      await handleCommand(msg, env);
      return;
    }
    
    if (!isGroup) {
      await handlePrivateMessage(msg, env);
      return;
    }
    
    if (isGroup) {
      await groupManager.handleGroupMessage(msg, env, db);
      return;
    }
    
  } catch (error) {
    console.error('❌ خطا در handleTelegramMessage:', error);
  }
}

// ============================================
// 📨 هندلر دستورات
// ============================================

async function handleCommand(msg, env) {
  const chatId = msg.chat.id;
  const text = msg.text || '';
  const userId = msg.from.id.toString();
  
  const adminIds = (env.ADMIN_IDS || '')
    .split(',')
    .map(id => parseInt(id.trim()))
    .filter(Boolean);
  const isAdmin = adminIds.includes(parseInt(userId));
  
  if (text === '/start') {
    await sendTelegramMessage(chatId, 
      langManager.t(userId, 'start', msg.from?.first_name || 'عزیزم'), 
      env
    );
    return;
  }
  
  if (text === '/help') {
    await sendTelegramMessage(chatId, 
      langManager.t(userId, 'help'), 
      env
    );
    return;
  }
  
  if (text === '/lang') {
    await showLanguageMenu(chatId, env, userId);
    return;
  }
  
  if (text === '/status') {
    const stats = await db.getStats();
    const status = await env.KV_BINDING.get('bot_status') || 'stopped';
    const uptime = await getUptime(env);
    
    await sendTelegramMessage(chatId,
      langManager.t(userId, 'status',
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
        stats.voices || 0,
        '🔑 فعال',
        sara.getCurrentMood()
      ),
      env
    );
    return;
  }
  
  if (text === '/panel') {
    if (!isAdmin) {
      await sendTelegramMessage(chatId, langManager.t(userId, 'no_access'), env);
      return;
    }
    await showAdminPanel(chatId, env, userId);
    return;
  }
  
  if (text === '/profile') {
    const me = await getMe(env);
    await sendTelegramMessage(chatId,
      langManager.t(userId, 'profile',
        me?.first_name || 'سارا',
        '🌸 سارا | زندگی با عشق 💕',
        '🌸 سارا | زندگی با عشق 💕',
        me?.first_name || 'سارا'
      ),
      env
    );
    return;
  }
  
  if (text === '/ip') {
    const ipHash = await db.getIPHash(userId);
    await sendTelegramMessage(chatId,
      langManager.t(userId, 'ip_hash', ipHash || 'تنظیم نشده'),
      env
    );
    return;
  }
  
  if (isAdmin) {
    if (text === '/stop') {
      await env.KV_BINDING.put('bot_status', 'stopped');
      await sendTelegramMessage(chatId, langManager.t(userId, 'bot_stopped'), env);
      return;
    }
    
    if (text === '/restart') {
      await sendTelegramMessage(chatId, langManager.t(userId, 'restarting'), env);
      await env.KV_BINDING.put('bot_status', 'running');
      await env.KV_BINDING.put('bot_start_time', Date.now().toString());
      await sendTelegramMessage(chatId, langManager.t(userId, 'restart_done'), env);
      return;
    }
    
    if (text === '/clear_cache') {
      memoryVault.memories.clear();
      memoryVault.userFacts.clear();
      learningEngine.patterns.clear();
      db.clearCache();
      await sendTelegramMessage(chatId, langManager.t(userId, 'cache_cleared'), env);
      return;
    }
    
    if (text === '/users') {
      await showUsersList(chatId, env, userId);
      return;
    }
    
    if (text === '/stats') {
      await showStats(chatId, env, userId);
      return;
    }
    
    if (text.startsWith('/broadcast ')) {
      const broadcastText = text.replace('/broadcast ', '').trim();
      if (broadcastText) {
        const users = await db.getAllUsers();
        let count = 0;
        for (const user of users) {
          try {
            await sendTelegramMessage(user.id, `📢 ${broadcastText}`, env);
            count++;
            await new Promise(r => setTimeout(r, 50));
          } catch (e) {}
        }
        await sendTelegramMessage(chatId, 
          langManager.t(userId, 'broadcast_sent', count),
          env
        );
      }
      return;
    }
  }
}

// ============================================
// 🌐 هندلر اصلی Cloudflare Worker
// ============================================

let db = null;
let sara = null;
let memoryVault = null;
let learningEngine = null;
let groupManager = null;
let langManager = null;

function initialize(env) {
  if (!db) db = new Database(env);
  if (!sara) sara = new SaraPersonality();
  if (!memoryVault) memoryVault = new MemoryVault();
  if (!learningEngine) learningEngine = new LearningEngine();
  if (!groupManager) groupManager = new GroupManager();
  if (!langManager) langManager = new LanguageManager();
}

export default {
  async fetch(request, env) {
    if (!env.BOT_TOKEN) {
      return new Response('❌ BOT_TOKEN تنظیم نشده!', { status: 500 });
    }
    
    initialize(env);

    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/webhook') {
      try {
        const update = await request.json();
        
        if (update.message) {
          await handleTelegramMessage(update.message, env);
          return new Response('OK');
        }
        
        if (update.callback_query) {
          await handleCallback(update.callback_query, env);
          return new Response('OK');
        }
        
        return new Response('OK');
        
      } catch (error) {
        console.error('❌ خطا در webhook:', error);
        return new Response('Error: ' + error.message, { status: 500 });
      }
    }

    if (path === '/') {
      const me = await getMe(env);
      return new Response(
        `🌸 **سارا ربات آنلاین!**\n\n` +
        `🕐 ${new Date().toLocaleString('fa-IR')}\n` +
        `📡 Webhook: /webhook\n` +
        `👤 @${me?.username || 'نامشخص'}\n` +
        `📊 وضعیت: ${await env.KV_BINDING.get('bot_status') || 'stopped'}`,
        { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      );
    }

    return new Response('404 Not Found', { status: 404 });
  }
};
