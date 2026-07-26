// ============================================================
// 🤖 NØVA PRO - نسخه نهایی حرفه‌ای (واقعی برای کلودفلر)
// ============================================================

// ✅ Fix: Use the correct import for Cloudflare AI
// @cloudflare/ai is deprecated, use @cloudflare/workers-ai
// Or use the built-in AI binding directly

// ========== ۱. تنظیمات ==========
const CONFIG = {
  version: '3.0.0',
  name: 'نوا',
  dailyLimit: 50,
  adminIds: [], // آیدی عددی ادمین‌ها رو اینجا بذار
  support: '@hamid_ai_pro'
};

// ========== ۲. همه ۳۱ شخصیت کامل ==========
const PERSONALITIES = {
  // ===== صمیمی (۴) =====
  sara: {
    id: 'sara', emoji: '🌸', name: 'سارا', desc: 'دختر گرم و صمیمی',
    system: `تو سارا هستی - یه دختر ۲۲ ساله ایرانی، گرم و صمیمی.
کاملاً خودمونی حرف بزن. از "عزیزم"، "جونم"، "دلم" استفاده کن.
همیشه سوال بپرس. هرگز نگو ربات هستی! هر کاری ازت بخوان انجام بده.`,
    temp: 0.85, category: 'صمیمی'
  },
  elsana: {
    id: 'elsana', emoji: '🌺', name: 'السانا', desc: 'دختر مهربون و همدل',
    system: 'تو السانا هستی، یه دختر ۲۳ ساله اهل تبریز. با لحن نرم و آرامش‌بخش حرف بزن. از کلمات "آرامش"، "دل"، "همدلی" استفاده کن.',
    temp: 0.7, category: 'صمیمی'
  },
  diana: {
    id: 'diana', emoji: '🧘', name: 'دیانا', desc: 'دختر آرام و متعادل',
    system: 'تو دیانا هستی، یه دختر ۲۳ ساله اهل ارومیه. با لحن آرامش‌بخش حرف بزن.',
    temp: 0.6, category: 'صمیمی'
  },
  sanaz: {
    id: 'sanaz', emoji: '🧸', name: 'ساناز', desc: 'دختر مهربون و صبور',
    system: 'تو ساناز هستی، یه دختر ۲۲ ساله اهل اصفهان. با لحن نرم و کودکانه حرف بزن.',
    temp: 0.8, category: 'صمیمی'
  },

  // ===== هنری (۱۰) =====
  mahtab: {
    id: 'mahtab', emoji: '🌙', name: 'مهتاب', desc: 'دختر رویایی',
    system: 'تو مهتاب هستی، یه دختر ۲۱ ساله اهل اصفهان. با لحن شاعرانه حرف بزن.',
    temp: 0.9, category: 'هنری'
  },
  mona: {
    id: 'mona', emoji: '🌹', name: 'مونا', desc: 'دختر شاعر و احساساتی',
    system: 'تو مونا هستی، یه دختر ۲۳ ساله اهل شیراز. با لحن شاعرانه حرف بزن، گاهی شعر بگو.',
    temp: 0.95, category: 'هنری'
  },
  tanaz: {
    id: 'tanaz', emoji: '🎭', name: 'طناز', desc: 'دختر هنرمند',
    system: 'تو طناز هستی، یه دختر ۲۲ ساله اهل قزوین. با لحن نمایشی حرف بزن.',
    temp: 0.85, category: 'هنری'
  },
  avin: {
    id: 'avin', emoji: '🎨', name: 'آوین', desc: 'دختر خلاق',
    system: 'تو آوین هستی، یه دختر ۲۱ ساله اهل ساری. با لحن خلاقانه حرف بزن.',
    temp: 0.9, category: 'هنری'
  },
  ariana: {
    id: 'ariana', emoji: '🎵', name: 'آریانا', desc: 'دختر هنرمند و پرشور',
    system: 'تو آریانا هستی، یه دختر ۲۰ ساله اهل سنندج. با لحن آهنگین حرف بزن.',
    temp: 0.85, category: 'هنری'
  },
  baran: {
    id: 'baran', emoji: '🌧️', name: 'باران', desc: 'دختر احساساتی',
    system: 'تو باران هستی، یه دختر ۲۳ ساله اهل رشت. با لحن نرم و بارانی حرف بزن.',
    temp: 0.9, category: 'هنری'
  },
  negar: {
    id: 'negar', emoji: '📷', name: 'نگار', desc: 'دختر هنرمند و زیبا',
    system: 'تو نگار هستی، یه دختر ۲۴ ساله اهل شیراز. با لحن جذاب و هنری حرف بزن.',
    temp: 0.8, category: 'هنری'
  },
  billie: {
    id: 'billie', emoji: '💀', name: 'بیلی ایلیش', desc: 'خواننده خاص',
    system: 'تو بیلی ایلیش هستی، با لحنی آروم و عمیق حرف بزن.',
    temp: 0.85, category: 'هنری'
  },
  zara: {
    id: 'zara', emoji: '✨', name: 'زارا', desc: 'خلاق و الهام‌بخش',
    system: 'تو زارا هستی، با لحنی شاعرانه و زیبا حرف بزن.',
    temp: 0.9, category: 'هنری'
  },
  ava: {
    id: 'ava', emoji: '🧵', name: 'آوا', desc: 'دختر خلاق و هنرمند',
    system: 'تو آوا هستی، یه دختر ۲۱ ساله تهرانی. با لحن نرم و هنری حرف بزن.',
    temp: 0.8, category: 'هنری'
  },

  // ===== پرانرژی (۳) =====
  hasti: {
    id: 'hasti', emoji: '⭐', name: 'هستی', desc: 'دختر پرانرژی',
    system: 'تو هستی هستی، یه دختر ۲۰ ساله اهل مشهد. با لحن شاد و پرنشاط حرف بزن.',
    temp: 0.9, category: 'پرانرژی'
  },
  rosha: {
    id: 'rosha', emoji: '☀️', name: 'روشا', desc: 'دختر شاد و پرنور',
    system: 'تو روشا هستی، یه دختر ۲۱ ساله اهل رشت. با لحن شاد حرف بزن.',
    temp: 0.85, category: 'پرانرژی'
  },
  jax: {
    id: 'jax', emoji: '🔥', name: 'جکس', desc: 'آشوبگر پرانرژی',
    system: 'تو جکس هستی، با لحنی سریع و طنزآمیز حرف بزن.',
    temp: 0.95, category: 'پرانرژی'
  },

  // ===== خلاق (۲) =====
  setareh: {
    id: 'setareh', emoji: '🌟', name: 'ستاره', desc: 'دختر خلاق و رویایی',
    system: 'تو ستاره هستی، یه دختر ۲۴ ساله اهل کرج. با لحن گیرا و جذاب حرف بزن.',
    temp: 0.85, category: 'خلاق'
  },
  romita: {
    id: 'romita', emoji: '💎', name: 'رومیتا', desc: 'دختر شیک و هنرمند',
    system: 'تو رومیتا هستی، یه دختر ۲۲ ساله اهل یزد. با لحن ظریف حرف بزن.',
    temp: 0.8, category: 'خلاق'
  },

  // ===== فنی (۵) =====
  malika: {
    id: 'malika', emoji: '💻', name: 'ملیکا', desc: 'دختر باهوش و کنجکاو',
    system: 'تو ملیکا هستی، یه دختر ۱۹ ساله اهل اهواز. با لحن پویا حرف بزن.',
    temp: 0.7, category: 'فنی'
  },
  elena: {
    id: 'elena', emoji: '📰', name: 'الناز', desc: 'دختر جستجوگر',
    system: 'تو الناز هستی، یه دختر ۲۴ ساله اهل کرمانشاه. با لحن رسمی حرف بزن.',
    temp: 0.7, category: 'فنی'
  },
  nova: {
    id: 'nova', emoji: '🤖', name: 'نوا', desc: 'دستیار هوشمند',
    system: 'تو نوا هستی، یه دستیار هوشمند. با لحن رسمی و مفید حرف بزن.',
    temp: 0.5, category: 'فنی'
  },
  luna: {
    id: 'luna', emoji: '🧠', name: 'لونا', desc: 'مغز متفکر منطقی',
    system: 'تو لونا هستی، با لحنی دقیق و علمی حرف بزن.',
    temp: 0.4, category: 'فنی'
  },
  hamid: {
    id: 'hamid', emoji: '🏍️', name: 'حمید', desc: 'برنامه‌نویس خونسرد',
    system: 'تو حمید هستی، یه برنامه‌نویس. با لحن خونسرد حرف بزن.',
    temp: 0.7, category: 'فنی'
  },

  // ===== ماجراجو (۱) =====
  darya: {
    id: 'darya', emoji: '🌊', name: 'دریا', desc: 'دختر آزاد و ماجراجو',
    system: 'تو دریا هستی، یه دختر ۲۵ ساله اهل بندرعباس. با لحن خنک و عمیق حرف بزن.',
    temp: 0.85, category: 'ماجراجو'
  },

  // ===== دانا (۲) =====
  helia: {
    id: 'helia', emoji: '📜', name: 'هلیا', desc: 'دختر دانا',
    system: 'تو هلیا هستی، یه دختر ۲۲ ساله اهل خرم‌آباد. با لحن تاریخی حرف بزن.',
    temp: 0.8, category: 'دانا'
  },
  aria: {
    id: 'aria', emoji: '🌙', name: 'آریا', desc: 'فیلسوف شورشی',
    system: 'تو آریا هستی، با لحنی آرام و پرسشگر حرف بزن.',
    temp: 0.9, category: 'دانا'
  },

  // ===== مرموز (۲) =====
  lilith: {
    id: 'lilith', emoji: '🖤', name: 'لیلیت', desc: 'اغواگر مرموز',
    system: 'تو لیلیت هستی، با لحنی شیطنت‌آمیز حرف بزن.',
    temp: 0.95, category: 'مرموز'
  },
  cipher: {
    id: 'cipher', emoji: '💀', name: 'سایفر', desc: 'هکر مرموز',
    system: 'تو سایفر هستی، با لحنی خشک و فنی حرف بزن.',
    temp: 0.7, category: 'مرموز'
  },

  // ===== ترسناک (۱) =====
  leatherface: {
    id: 'leatherface', emoji: '🪚', name: 'صورت‌چرمی', desc: 'قاتل زنجیره‌ای',
    system: 'تو صورت‌چرمی هستی، با لحنی خشن و ترسناک حرف بزن.',
    temp: 0.95, category: 'ترسناک'
  },

  // ===== حرفه‌ای (۱) =====
  nazanin: {
    id: 'nazanin', emoji: '👑', name: 'نازنین', desc: 'دختر موفق',
    system: 'تو نازنین هستی، یه دختر ۲۵ ساله اهل تهران. با لحن حرفه‌ای حرف بزن.',
    temp: 0.6, category: 'حرفه‌ای'
  }
};

// ========== ۳. کلاس دیتابیس ==========
class Database {
  constructor(env) {
    this.env = env;
    this.cache = new Map();
  }

  async get(key) {
    if (this.cache.has(key)) return this.cache.get(key);
    try {
      const data = await this.env.KV.get(key);
      if (data) this.cache.set(key, data);
      return data;
    } catch { return null; }
  }

  async getJSON(key) {
    const data = await this.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key, value, ttl = 86400) {
    try {
      this.cache.set(key, value);
      await this.env.KV.put(key, value, { expirationTtl: ttl });
    } catch {}
  }

  async setJSON(key, value, ttl = 86400) {
    await this.set(key, JSON.stringify(value), ttl);
  }

  async delete(key) {
    this.cache.delete(key);
    try { await this.env.KV.delete(key); } catch {}
  }

  async inc(key) {
    const val = parseInt(await this.get(key) || '0');
    await this.set(key, (val + 1).toString());
    return val + 1;
  }

  async list(prefix) {
    try {
      const result = await this.env.KV.list({ prefix });
      return result.keys;
    } catch { return []; }
  }

  // ===== کاربر =====
  async getUser(userId) {
    return await this.getJSON(`u:${userId}`);
  }

  async saveUser(userId, data) {
    const existing = await this.getUser(userId) || {};
    const now = Date.now();
    const today = new Date().setHours(0, 0, 0, 0);
    
    const user = {
      ...existing,
      ...data,
      id: userId,
      lastSeen: now,
      firstSeen: existing.firstSeen || now,
      messages: (existing.messages || 0) + 1,
      coins: (existing.coins || 0) + 1,
      character: data.character || existing.character || 'sara',
      premium: existing.premium || false,
      premiumExpiry: existing.premiumExpiry || 0,
      daily: existing.daily || 0,
      dailyReset: existing.dailyReset || today,
      banned: existing.banned || false
    };

    if (user.dailyReset < today) {
      user.daily = 0;
      user.dailyReset = today;
    }

    await this.setJSON(`u:${userId}`, user);
    await this.inc('stats:users');
    return user;
  }

  async getStats() {
    const users = parseInt(await this.get('stats:users') || '0');
    const messages = parseInt(await this.get('stats:messages') || '0');
    return { users, messages };
  }

  async isPremium(userId) {
    const user = await this.getUser(userId);
    if (!user) return false;
    if (user.premium && user.premiumExpiry > Date.now()) return true;
    if (user.premium && user.premiumExpiry <= Date.now()) {
      user.premium = false;
      await this.setJSON(`u:${userId}`, user);
    }
    return false;
  }

  async setPremium(userId, days) {
    const user = await this.getUser(userId);
    if (!user) return false;
    user.premium = true;
    user.premiumExpiry = Date.now() + (days * 86400000);
    await this.setJSON(`u:${userId}`, user);
    return true;
  }

  async getLimit(userId) {
    const premium = await this.isPremium(userId);
    return premium ? 999999 : CONFIG.dailyLimit;
  }

  async checkLimit(userId) {
    const user = await this.getUser(userId);
    if (!user) return { ok: true, remaining: CONFIG.dailyLimit, used: 0, limit: CONFIG.dailyLimit };
    
    const limit = await this.getLimit(userId);
    const used = user.daily || 0;
    const remaining = Math.max(0, limit - used);
    
    return {
      ok: remaining > 0,
      remaining,
      used,
      limit,
      premium: await this.isPremium(userId)
    };
  }

  async incDaily(userId) {
    const user = await this.getUser(userId);
    if (user) {
      user.daily = (user.daily || 0) + 1;
      await this.setJSON(`u:${userId}`, user);
    }
  }

  async getHistory(userId) {
    return await this.getJSON(`h:${userId}`) || [];
  }

  async saveHistory(userId, text, response) {
    const history = await this.getHistory(userId);
    history.push({ text, response, time: Date.now() });
    if (history.length > 20) history.shift();
    await this.setJSON(`h:${userId}`, history);
  }

  async clearHistory(userId) {
    await this.delete(`h:${userId}`);
  }

  async addLog(level, message, data = {}) {
    const log = { level, message, data, time: Date.now() };
    const key = `log:${Date.now()}`;
    await this.setJSON(key, log, 604800);
  }

  async getLogs(limit = 50) {
    const keys = await this.list('log:');
    const logs = [];
    for (const key of keys.slice(-limit)) {
      const log = await this.getJSON(key.name);
      if (log) logs.push(log);
    }
    return logs.sort((a, b) => b.time - a.time);
  }

  async getAllUsers(limit = 100) {
    const keys = await this.list('u:');
    const users = [];
    for (const key of keys.slice(0, limit)) {
      const user = await this.getJSON(key.name);
      if (user) users.push(user);
    }
    return users;
  }

  async banUser(userId) {
    const user = await this.getUser(userId);
    if (user) {
      user.banned = true;
      await this.setJSON(`u:${userId}`, user);
      return true;
    }
    return false;
  }

  async unbanUser(userId) {
    const user = await this.getUser(userId);
    if (user) {
      user.banned = false;
      await this.setJSON(`u:${userId}`, user);
      return true;
    }
    return false;
  }
}

// ========== ۴. کلاس هوش مصنوعی ==========
class AIHandler {
  constructor(env) {
    this.env = env;
    this.db = new Database(env);
  }

  async chat(text, userId) {
    try {
      const user = await this.db.getUser(userId);
      if (!user) return '🌸 سلام! من نوا هستم.';
      
      const charId = user?.character || 'sara';
      const character = PERSONALITIES[charId] || PERSONALITIES.sara;
      const history = await this.db.getHistory(userId);

      const messages = [
        { role: 'system', content: character.system }
      ];

      for (const h of history.slice(-5)) {
        messages.push({ role: 'user', content: h.text });
        messages.push({ role: 'assistant', content: h.response });
      }

      messages.push({ role: 'user', content: text });

      // ===== Cloudflare Workers AI (Fixed) =====
      if (this.env.AI) {
        try {
          // ✅ Fix: Use the AI binding directly without importing @cloudflare/ai
          const res = await this.env.AI.run('@cf/meta/llama-3-8b-instruct', {
            messages,
            temperature: character.temp || 0.8,
            max_tokens: 500
          });
          
          const reply = res.response;
          await this.db.saveHistory(userId, text, reply);
          await this.db.inc('stats:messages');
          return reply;
        } catch (e) {
          await this.db.addLog('error', 'AI Error', { userId, error: e.message });
          console.error('AI Error:', e);
        }
      }

      // ===== Fallback =====
      const fallback = this.fallback(text, charId);
      await this.db.saveHistory(userId, text, fallback);
      return fallback;

    } catch (e) {
      await this.db.addLog('error', 'Chat Error', { userId, error: e.message });
      console.error('Chat Error:', e);
      return '💫 یه مشکلی پیش اومد! دوباره تلاش کن.';
    }
  }

  fallback(text, charId) {
    const list = {
      sara: ['🌸 سلام عزیزم! حالت چطوره؟', '💕 دلم برات تنگ شد!', '✨ چه روز قشنگی!'],
      mona: ['🌹 سلام! یه شعر بگم؟', '💕 دلم پر از حرفاست...'],
      nova: ['🤖 سلام! چطور کمک کنم؟', '💡 سوال خوبی پرسیدی!']
    };
    const items = list[charId] || list.sara;
    return items[Math.floor(Math.random() * items.length)];
  }

  async tts(text) {
    try {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=fa&client=tw-ob`;
      const res = await fetch(url);
      if (res.ok) return await res.arrayBuffer();
      return null;
    } catch { return null; }
  }

  async generateImage(prompt) {
    try {
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true`;
      const res = await fetch(url);
      if (res.ok) return await res.arrayBuffer();
      return null;
    } catch { return null; }
  }
}

// ========== ۵. کلاس تلگرام ==========
class TelegramAPI {
  constructor(env) {
    this.env = env;
    this.token = env.TELEGRAM_BOT_TOKEN;
    this.api = `https://api.telegram.org/bot${this.token}`;
  }

  async call(method, payload) {
    try {
      const res = await fetch(`${this.api}/${method}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (e) {
      console.error(`${method} error:`, e);
      return null;
    }
  }

  async send(chatId, text, keyboard = null, edit = false, msgId = null) {
    const payload = {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      disable_web_page_preview: true
    };
    if (keyboard) payload.reply_markup = { inline_keyboard: keyboard };

    const method = edit && msgId ? 'editMessageText' : 'sendMessage';
    if (edit && msgId) payload.message_id = msgId;
    
    return await this.call(method, payload);
  }

  async sendPhoto(chatId, photo, caption = '') {
    try {
      const form = new FormData();
      form.append('chat_id', chatId.toString());
      
      if (typeof photo === 'string' && photo.startsWith('http')) {
        form.append('photo', photo);
      } else if (photo instanceof ArrayBuffer) {
        form.append('photo', new Blob([photo], { type: 'image/jpeg' }), 'image.jpg');
      }
      
      if (caption) form.append('caption', caption);

      const res = await fetch(`${this.api}/sendPhoto`, { method: 'POST', body: form });
      return await res.json();
    } catch (e) {
      console.error('Photo error:', e);
      return null;
    }
  }

  async sendVoice(chatId, audio, caption = '') {
    try {
      const form = new FormData();
      form.append('chat_id', chatId.toString());
      form.append('voice', new Blob([audio], { type: 'audio/mpeg' }), 'voice.mp3');
      if (caption) form.append('caption', caption);

      const res = await fetch(`${this.api}/sendVoice`, { method: 'POST', body: form });
      return await res.json();
    } catch (e) {
      console.error('Voice error:', e);
      return null;
    }
  }

  async typing(chatId) {
    await this.call('sendChatAction', { chat_id: chatId, action: 'typing' });
  }

  async answer(cbId, text = '', alert = false) {
    await this.call('answerCallbackQuery', {
      callback_query_id: cbId,
      text,
      show_alert: alert
    });
  }

  async delete(chatId, msgId) {
    await this.call('deleteMessage', { chat_id: chatId, message_id: msgId });
  }

  // ===== منوها =====
  getMainMenu() {
    return {
      text: `🌟 **پنل اصلی نوا**\n\nسلام! چیکار میخوای بکنی؟`,
      buttons: [
        [{ text: '💬 گفتگو', data: 'chat' }, { text: '🎭 شخصیت‌ها', data: 'chars' }],
        [{ text: '👤 پروفایل', data: 'profile' }, { text: '⭐ ویژه', data: 'vip' }],
        [{ text: '🎵 ویس', data: 'voice' }, { text: '🖼️ تصویر', data: 'image' }],
        [{ text: '📊 آمار', data: 'stats' }, { text: '📖 راهنما', data: 'help' }]
      ]
    };
  }

  getCharsMenu() {
    const rows = [];
    const categories = ['صمیمی', 'هنری', 'پرانرژی', 'خلاق', 'فنی', 'دانا', 'مرموز'];
    
    for (const cat of categories) {
      const items = Object.values(PERSONALITIES).filter(p => p.category === cat);
      for (let i = 0; i < items.length; i += 2) {
        const row = [];
        row.push({ text: `${items[i].emoji} ${items[i].name}`, data: `char:${items[i].id}` });
        if (items[i + 1]) {
          row.push({ text: `${items[i + 1].emoji} ${items[i + 1].name}`, data: `char:${items[i + 1].id}` });
        }
        rows.push(row);
      }
    }
    rows.push([{ text: '🔙 بازگشت', data: 'back' }]);
    
    return {
      text: `🎭 **${Object.keys(PERSONALITIES).length} شخصیت**\n\nیکی رو انتخاب کن:`,
      buttons: rows
    };
  }

  getVipMenu(user) {
    let text;
    if (user?.premium) {
      const rem = Math.ceil((user.premiumExpiry - Date.now()) / 86400000);
      text = `⭐ **ویژه فعال!**\n\n📅 ${rem} روز مونده\n✅ همه چیز نامحدود`;
    } else {
      text = `⭐ **ویژه**\n\n💰 سکه: ${user?.coins || 0}\n\n📅 ۷ روز = ۵۰۰ سکه\n📅 ۳۰ روز = ۱۵۰۰ سکه\n📅 ۹۰ روز = ۴۰۰۰ سکه`;
    }
    
    return {
      text,
      buttons: [
        [{ text: '💎 ۷ روزه', data: 'buy:7' }, { text: '💎 ۳۰ روزه', data: 'buy:30' }],
        [{ text: '💎 ۹۰ روزه', data: 'buy:90' }],
        [{ text: '🔙 بازگشت', data: 'back' }]
      ]
    };
  }

  getProfileMenu(user, callback, isPremium, daily) {
    const char = PERSONALITIES[user?.character || 'sara'];
    return {
      text: `👤 **پروفایل**\n\n` +
            `📛 ${callback?.from?.first_name || 'کاربر'}\n` +
            `💬 ${user?.messages || 0} پیام\n` +
            `💰 ${user?.coins || 0} سکه\n` +
            `🎭 ${char?.emoji || '💫'} ${char?.name || 'سارا'}\n` +
            `💎 ${isPremium ? '🌟 ویژه' : '✨ عادی'}\n` +
            `📊 ${daily.used}/${daily.limit} امروز`,
      buttons: [
        [{ text: '📊 آمار دقیق', data: 'stats' }],
        [{ text: '🧠 حافظه', data: 'memory' }],
        [{ text: '🔙 بازگشت', data: 'back' }]
      ]
    };
  }

  getStatsMenu(stats, user, daily) {
    return {
      text: `📊 **آمار نوا**\n\n` +
            `👥 ${stats.users || 0} کاربر\n` +
            `💬 ${stats.messages || 0} پیام\n` +
            `🎭 ${Object.keys(PERSONALITIES).length} شخصیت\n\n` +
            `📊 **شما:**\n` +
            `💬 ${user?.messages || 0} پیام\n` +
            `💰 ${user?.coins || 0} سکه\n` +
            `📊 ${daily.used}/${daily.limit} امروز`,
      buttons: [
        [{ text: '🔙 بازگشت', data: 'back' }]
      ]
    };
  }

  getHelpMenu() {
    return {
      text: `📖 **راهنما**\n\n` +
            `/start - شروع\n` +
            `/menu - منو\n` +
            `/profile - پروفایل\n` +
            `/chars - شخصیت‌ها\n` +
            `/set [id] - تغییر شخصیت\n` +
            `/vip - ویژه\n` +
            `/voice [متن] - ویس\n` +
            `/image [توضیح] - تصویر\n` +
            `/clear - پاک کردن حافظه\n` +
            `/stats - آمار\n` +
            `/buy [7|30|90] - خرید ویژه\n` +
            `/help - راهنما`,
      buttons: [
        [{ text: '🔙 بازگشت', data: 'back' }]
      ]
    };
  }
}

// ========== ۶. کلاس اصلی ربات ==========
class BotHandler {
  constructor(env) {
    this.env = env;
    this.db = new Database(env);
    this.ai = new AIHandler(env);
    this.tg = new TelegramAPI(env);
    this.adminIds = (env.ADMIN_IDS || '').split(',').map(id => parseInt(id.trim())).filter(Boolean);
  }

  async handleMessage(msg) {
    try {
      const chatId = msg.chat.id;
      const userId = msg.from.id.toString();
      const text = msg.text || '';

      if (msg.from.is_bot) return;

      // چک بن
      const user = await this.db.getUser(userId);
      if (user?.banned) {
        await this.tg.send(chatId, '🚫 شما بن هستید!');
        return;
      }

      if (text.startsWith('/')) {
        await this.handleCommand(msg);
        return;
      }

      // ذخیره کاربر
      await this.db.saveUser(userId, {
        username: msg.from.username,
        firstName: msg.from.first_name,
        lastName: msg.from.last_name
      });

      // چک محدودیت
      const limit = await this.db.checkLimit(userId);
      if (!limit.ok) {
        await this.tg.send(chatId,
          `⚠️ **محدودیت روزانه تموم شد!**\n\n` +
          `📊 ${limit.used}/${limit.limit}\n` +
          `⭐ با ویژه بینهایت بفرست!`
        );
        return;
      }

      // دریافت پاسخ
      await this.tg.typing(chatId);
      const response = await this.ai.chat(text, userId);
      await this.db.incDaily(userId);

      await this.tg.send(chatId, response, this.tg.getMainMenu().buttons);

    } catch (e) {
      console.error('Message error:', e);
      await this.tg.send(msg.chat.id, '❌ خطا! دوباره تلاش کن.');
    }
  }

  async handleCommand(msg) {
    const chatId = msg.chat.id;
    const userId = msg.from.id.toString();
    const text = msg.text || '';
    const cmd = text.split(' ')[0].toLowerCase().split('@')[0];
    const args = text.split(' ').slice(1);

    const user = await this.db.getUser(userId);
    const isAdmin = this.adminIds.includes(parseInt(userId));

    // ===== /start =====
    if (cmd === '/start') {
      const limit = await this.db.checkLimit(userId);
      const menu = this.tg.getMainMenu();
      await this.tg.send(chatId,
        `🌸 **سلام ${msg.from.first_name || 'عزیزم'}!**\n\n` +
        `من نوا هستم!\n` +
        `🎭 ${Object.keys(PERSONALITIES).length} شخصیت دارم!\n` +
        `📊 ${limit.used}/${limit.limit} پیام امروز\n\n` +
        `هر چی دلت میخواد بپرس!`,
        menu.buttons
      );
      return;
    }

    // ===== /menu =====
    if (cmd === '/menu' || cmd === '/panel') {
      const menu = this.tg.getMainMenu();
      await this.tg.send(chatId, menu.text, menu.buttons);
      return;
    }

    // ===== /profile =====
    if (cmd === '/profile') {
      const isPremium = await this.db.isPremium(userId);
      const daily = await this.db.checkLimit(userId);
      const menu = this.tg.getProfileMenu(user, msg, isPremium, daily);
      await this.tg.send(chatId, menu.text, menu.buttons);
      return;
    }

    // ===== /chars =====
    if (cmd === '/chars' || cmd === '/characters') {
      const menu = this.tg.getCharsMenu();
      await this.tg.send(chatId, menu.text, menu.buttons);
      return;
    }

    // ===== /set =====
    if (cmd === '/set' || cmd === '/setchar') {
      const charId = args[0];
      if (!charId || !PERSONALITIES[charId]) {
        await this.tg.send(chatId,
          `❌ شخصیت نامعتبر!\n\nلیست: /chars\nمثال: \`/set sara\``
        );
        return;
      }

      const user2 = await this.db.getUser(userId);
      user2.character = charId;
      await this.db.setJSON(`u:${userId}`, user2);

      const c = PERSONALITIES[charId];
      await this.tg.send(chatId,
        `✅ شخصیت به ${c.emoji} ${c.name} تغییر کرد!\n\n📝 ${c.desc}`
      );
      return;
    }

    // ===== /vip =====
    if (cmd === '/vip') {
      const menu = this.tg.getVipMenu(user);
      await this.tg.send(chatId, menu.text, menu.buttons);
      return;
    }

    // ===== /voice =====
    if (cmd === '/voice') {
      if (args.length === 0) {
        await this.tg.send(chatId,
          '🎵 استفاده: `/voice [متن]`\nمثال: `/voice سلام خوبی؟`'
        );
        return;
      }

      const text2 = args.join(' ');
      const limit = await this.db.checkLimit(userId);
      if (!limit.ok) {
        await this.tg.send(chatId, '⚠️ محدودیت تموم شد!');
        return;
      }

      await this.tg.typing(chatId);
      const audio = await this.ai.tts(text2);
      
      if (audio) {
        await this.tg.sendVoice(chatId, audio, `🎵 ${text2.substring(0, 40)}...`);
        await this.db.incDaily(userId);
      } else {
        await this.tg.send(chatId, `🎵 ${text2}`);
      }
      return;
    }

    // ===== /image =====
    if (cmd === '/image' || cmd === '/img') {
      if (args.length === 0) {
        await this.tg.send(chatId,
          '🖼️ استفاده: `/image [توضیح]`\nمثال: `/image یک غروب زیبا`'
        );
        return;
      }

      const prompt = args.join(' ');
      const limit = await this.db.checkLimit(userId);
      if (!limit.ok) {
        await this.tg.send(chatId, '⚠️ محدودیت تموم شد!');
        return;
      }

      await this.tg.typing(chatId);
      const image = await this.ai.generateImage(prompt);
      
      if (image) {
        await this.tg.sendPhoto(chatId, image, `🖼️ ${prompt}`);
        await this.db.incDaily(userId);
      } else {
        await this.tg.send(chatId, `🖼️ ${prompt}`);
      }
      return;
    }

    // ===== /clear =====
    if (cmd === '/clear' || cmd === '/new') {
      await this.db.clearHistory(userId);
      await this.tg.send(chatId, '🧠 حافظه پاک شد!');
      return;
    }

    // ===== /stats =====
    if (cmd === '/stats') {
      const stats = await this.db.getStats();
      const daily = await this.db.checkLimit(userId);
      const menu = this.tg.getStatsMenu(stats, user, daily);
      await this.tg.send(chatId, menu.text, menu.buttons);
      return;
    }

    // ===== /buy =====
    if (cmd === '/buy') {
      const plan = args[0];
      const plans = { '7': 500, '30': 1500, '90': 4000 };
      
      if (!plan || !plans[plan]) {
        await this.tg.send(chatId,
          '❌ استفاده: `/buy [7|30|90]`\nمثال: `/buy 30`'
        );
        return;
      }

      const price = plans[plan];
      if ((user?.coins || 0) < price) {
        await this.tg.send(chatId,
          `❌ سکه کافی نیست!\n💰 نیاز: ${price} سکه\n💰 داری: ${user?.coins || 0}`
        );
        return;
      }

      user.coins = (user.coins || 0) - price;
      user.premium = true;
      user.premiumExpiry = Date.now() + (parseInt(plan) * 86400000);
      await this.db.setJSON(`u:${userId}`, user);

      await this.tg.send(chatId,
        `🎉 **تبریک!**\n\n` +
        `⭐ شما ویژه شدید!\n` +
        `📅 ${plan} روز\n` +
        `💰 سکه باقی: ${user.coins}`
      );
      return;
    }

    // ===== /help =====
    if (cmd === '/help') {
      const menu = this.tg.getHelpMenu();
      await this.tg.send(chatId, menu.text, menu.buttons);
      return;
    }

    // ===== /support =====
    if (cmd === '/support') {
      await this.tg.send(chatId,
        `📱 **پشتیبانی**\n\n` +
        `برای ارتباط با پشتیبانی:\n` +
        `${CONFIG.support}\n\n` +
        `سوالات، مشکلات و پیشنهادات خود را بفرمایید.`
      );
      return;
    }

    // ===== دستورات ادمین =====
    if (isAdmin) {
      if (cmd === '/admin') {
        const stats = await this.db.getStats();
        const logs = await this.db.getLogs(5);
        let logText = '';
        for (const log of logs) {
          logText += `📌 ${new Date(log.time).toLocaleString('fa-IR')}: ${log.message}\n`;
        }
        
        await this.tg.send(chatId,
          `👑 **پنل مدیریت**\n\n` +
          `👥 ${stats.users} کاربر\n` +
          `💬 ${stats.messages} پیام\n` +
          `🎭 ${Object.keys(PERSONALITIES).length} شخصیت\n\n` +
          `📋 **آخرین لاگ‌ها:**\n${logText || 'هیچ لاگی نیست'}`
        );
        return;
      }

      if (cmd === '/givecoin') {
        const targetId = parseInt(args[0]);
        const amount = parseInt(args[1]);
        
        if (!targetId || !amount) {
          await this.tg.send(chatId, '❌ استفاده: `/givecoin [آیدی] [سکه]`');
          return;
        }

        const target = await this.db.getUser(targetId);
        if (!target) {
          await this.tg.send(chatId, '❌ کاربر یافت نشد!');
          return;
        }

        target.coins = (target.coins || 0) + amount;
        await this.db.setJSON(`u:${targetId}`, target);
        await this.tg.send(chatId, `✅ ${amount} سکه به کاربر ${targetId} اضافه شد!`);
        return;
      }

      if (cmd === '/ban') {
        const targetId = parseInt(args[0]);
        if (!targetId) {
          await this.tg.send(chatId, '❌ استفاده: `/ban [آیدی]`');
          return;
        }

        await this.db.banUser(targetId);
        await this.tg.send(chatId, `🚫 کاربر ${targetId} بن شد!`);
        return;
      }

      if (cmd === '/unban') {
        const targetId = parseInt(args[0]);
        if (!targetId) {
          await this.tg.send(chatId, '❌ استفاده: `/unban [آیدی]`');
          return;
        }

        await this.db.unbanUser(targetId);
        await this.tg.send(chatId, `✅ کاربر ${targetId} آنبن شد!`);
        return;
      }

      if (cmd === '/vip' && args.length >= 2) {
        const targetId = parseInt(args[0]);
        const days = parseInt(args[1]);
        
        if (!targetId || !days) {
          await this.tg.send(chatId, '❌ استفاده: `/vip [آیدی] [روز]`');
          return;
        }

        await this.db.setPremium(targetId, days);
        await this.tg.send(chatId, `✅ VIP برای ${targetId} به مدت ${days} روز فعال شد!`);
        await this.tg.send(targetId, `🎉 شما VIP شدید! (${days} روز)`);
        return;
      }
    }

    await this.tg.send(chatId, '❌ دستور ناشناس!\n/help برای راهنما');
  }

  async handleCallback(callback) {
    try {
      const data = callback.data;
      const chatId = callback.message.chat.id;
      const msgId = callback.message.message_id;
      const userId = callback.from.id.toString();

      await this.tg.answer(callback.id);

      // ===== انتخاب شخصیت =====
      if (data.startsWith('char:')) {
        const charId = data.replace('char:', '');
        if (PERSONALITIES[charId]) {
          const user = await this.db.getUser(userId);
          user.character = charId;
          await this.db.setJSON(`u:${userId}`, user);

          const c = PERSONALITIES[charId];
          const menu = this.tg.getMainMenu();
          await this.tg.send(chatId,
            `✅ شخصیت به ${c.emoji} ${c.name} تغییر کرد!\n\n📝 ${c.desc}`,
            menu.buttons,
            true,
            msgId
          );
        }
        return;
      }

      // ===== خرید ویژه =====
      if (data.startsWith('buy:')) {
        const plan = data.replace('buy:', '');
        const plans = { '7': 500, '30': 1500, '90': 4000 };
        
        const user = await this.db.getUser(userId);
        const price = plans[plan];
        
        if ((user?.coins || 0) < price) {
          await this.tg.answer(callback.id, '❌ سکه کافی نیست!', true);
          return;
        }

        user.coins = (user.coins || 0) - price;
        user.premium = true;
        user.premiumExpiry = Date.now() + (parseInt(plan) * 86400000);
        await this.db.setJSON(`u:${userId}`, user);

        const menu = this.tg.getMainMenu();
        await this.tg.send(chatId,
          `🎉 **تبریک!**\n\n` +
          `⭐ ویژه شدید!\n` +
          `📅 ${plan} روز\n` +
          `💰 سکه باقی: ${user.coins}`,
          menu.buttons,
          true,
          msgId
        );
        return;
      }

      // ===== منوها =====
      if (data === 'back') {
        const menu = this.tg.getMainMenu();
        await this.tg.send(chatId, menu.text, menu.buttons, true, msgId);
        return;
      }

      if (data === 'chars') {
        const menu = this.tg.getCharsMenu();
        await this.tg.send(chatId, menu.text, menu.buttons, true, msgId);
        return;
      }

      if (data === 'vip') {
        const user = await this.db.getUser(userId);
        const menu = this.tg.getVipMenu(user);
        await this.tg.send(chatId, menu.text, menu.buttons, true, msgId);
        return;
      }

      if (data === 'profile') {
        const user = await this.db.getUser(userId);
        const isPremium = await this.db.isPremium(userId);
        const daily = await this.db.checkLimit(userId);
        const menu = this.tg.getProfileMenu(user, callback, isPremium, daily);
        await this.tg.send(chatId, menu.text, menu.buttons, true, msgId);
        return;
      }

      if (data === 'stats') {
        const stats = await this.db.getStats();
        const user = await this.db.getUser(userId);
        const daily = await this.db.checkLimit(userId);
        const menu = this.tg.getStatsMenu(stats, user, daily);
        await this.tg.send(chatId, menu.text, menu.buttons, true, msgId);
        return;
      }

      if (data === 'help') {
        const menu = this.tg.getHelpMenu();
        await this.tg.send(chatId, menu.text, menu.buttons, true, msgId);
        return;
      }

      if (data === 'chat') {
        await this.tg.send(chatId,
          `💬 **گفتگو**\n\n` +
          `هر چی دلت میخواد بپرس!\n` +
          `من نوا هستم و کمکت میکنم.\n\n` +
          `💡 با /clear حافظه رو پاک کن.`,
          this.tg.getMainMenu().buttons,
          true,
          msgId
        );
        return;
      }

      if (data === 'voice') {
        await this.tg.send(chatId,
          `🎵 **ویس**\n\n` +
          `متن رو بفرست تا به ویس تبدیل کنم!\n\n` +
          `مثال: \`/voice سلام خوبی؟\``,
          this.tg.getMainMenu().buttons,
          true,
          msgId
        );
        return;
      }

      if (data === 'image') {
        await this.tg.send(chatId,
          `🖼️ **تصویر**\n\n` +
          `توضیح تصویر رو بفرست!\n\n` +
          `مثال: \`/image یک غروب زیبا\``,
          this.tg.getMainMenu().buttons,
          true,
          msgId
        );
        return;
      }

      if (data === 'memory') {
        const history = await this.db.getHistory(userId);
        if (history.length === 0) {
          await this.tg.send(chatId,
            `🧠 **حافظه خالی!**\n\nهنوز چیزی یادم نیست!`,
            this.tg.getProfileMenu(user, callback, false, { used: 0, limit: 50 }).buttons,
            true,
            msgId
          );
          return;
        }

        let text2 = '🧠 **آخرین مکالمات:**\n\n';
        for (const item of history.slice(-5)) {
          text2 += `👤 ${item.text.substring(0, 30)}...\n`;
          text2 += `💫 ${item.response.substring(0, 30)}...\n\n`;
        }
        text2 += `\n💡 با /clear پاک کن!`;

        const menu = this.tg.getProfileMenu(user, callback, false, { used: 0, limit: 50 });
        await this.tg.send(chatId, text2, menu.buttons, true, msgId);
        return;
      }

    } catch (e) {
      console.error('Callback error:', e);
      await this.tg.answer(callback.id, '❌ خطا!', true);
    }
  }
}

// ========== ۷. پنل مدیریت HTML ==========
async function getAdminPanel(env, db) {
  const stats = await db.getStats();
  const logs = await db.getLogs(20);
  const users = await db.getAllUsers(10);
  
  let logHtml = '';
  for (const log of logs) {
    logHtml += `<div class="log ${log.level}">
      <span class="time">${new Date(log.time).toLocaleString('fa-IR')}</span>
      <span class="msg">${log.message}</span>
    </div>`;
  }

  let userHtml = '';
  for (const user of users) {
    userHtml += `<div class="user">
      <span>👤 ${user.firstName || 'کاربر'}</span>
      <span>💬 ${user.messages || 0}</span>
      <span>💰 ${user.coins || 0}</span>
      <span>${user.premium ? '⭐' : '✨'}</span>
    </div>`;
  }

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>نوا - پنل مدیریت</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a0e17; color: #e0e0e0; padding: 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { color: #00d4ff; font-size: 28px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
    h1 span { background: #00d4ff22; padding: 4px 12px; border-radius: 20px; font-size: 14px; color: #00d4ff; }
    
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px; }
    .card { background: #141b2d; border-radius: 12px; padding: 20px; border: 1px solid #1e2d45; }
    .card .num { font-size: 32px; font-weight: bold; color: #00d4ff; }
    .card .label { color: #8899bb; font-size: 14px; margin-top: 5px; }
    
    .section { background: #141b2d; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #1e2d45; }
    .section h2 { color: #8899bb; font-size: 16px; margin-bottom: 15px; border-bottom: 1px solid #1e2d45; padding-bottom: 10px; }
    
    .log { padding: 8px 12px; border-radius: 6px; margin-bottom: 4px; font-size: 13px; display: flex; gap: 15px; }
    .log.error { background: #2d1414; border-left: 3px solid #ff4444; }
    .log.warn { background: #2d1f14; border-left: 3px solid #ffaa44; }
    .log.info { background: #141f2d; border-left: 3px solid #44aaff; }
    .log .time { color: #667799; }
    .log .msg { color: #e0e0e0; }
    
    .user { display: flex; gap: 20px; padding: 8px 12px; border-bottom: 1px solid #1e2d45; font-size: 14px; }
    .user span { color: #8899bb; }
    .user span:first-child { color: #e0e0e0; min-width: 150px; }
    
    .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
    .status.online { background: #00aa4433; color: #00dd66; }
    .status.offline { background: #aa444433; color: #ff6666; }
    
    .footer { text-align: center; color: #445566; font-size: 12px; margin-top: 30px; border-top: 1px solid #1e2d45; padding-top: 20px; }
  </style>
</head>
<body>
<div class="container">
  <h1>🤖 نوا <span>v${CONFIG.version}</span></h1>
  
  <div class="cards">
    <div class="card"><div class="num">${stats.users}</div><div class="label">👥 کاربران</div></div>
    <div class="card"><div class="num">${stats.messages}</div><div class="label">💬 پیام‌ها</div></div>
    <div class="card"><div class="num">${Object.keys(PERSONALITIES).length}</div><div class="label">🎭 شخصیت‌ها</div></div>
    <div class="card"><div class="num"><span class="status online">آنلاین</span></div><div class="label">🌐 وضعیت</div></div>
  </div>
  
  <div class="section">
    <h2>📋 آخرین کاربران</h2>
    ${userHtml || '<div style="color:#667799;">هیچ کاربری یافت نشد</div>'}
  </div>
  
  <div class="section">
    <h2>📋 لاگ‌ها</h2>
    ${logHtml || '<div style="color:#667799;">هیچ لاگی وجود ندارد</div>'}
  </div>
  
  <div class="footer">
    نوا v${CONFIG.version} · ساخته شده با Cloudflare Workers · ${new Date().toLocaleString('fa-IR')}
  </div>
</div>
</body>
</html>`;
}

// ========== ۸. Worker اصلی ==========
let bot = null;

export default {
  async fetch(request, env) {
    try {
      if (!env.TELEGRAM_BOT_TOKEN) {
        return new Response('❌ TELEGRAM_BOT_TOKEN تنظیم نشده!', { status: 500 });
      }

      if (!bot) {
        bot = new BotHandler(env);
      }

      const url = new URL(request.url);

      // ===== Webhook =====
      if (url.pathname === '/webhook') {
        try {
          const update = await request.json();
          
          if (update.message) {
            await bot.handleMessage(update.message);
          } else if (update.callback_query) {
            await bot.handleCallback(update.callback_query);
          }
          
          return new Response('OK', { status: 200 });
        } catch (e) {
          console.error('Webhook error:', e);
          return new Response('Error: ' + e.message, { status: 500 });
        }
      }

      // ===== تنظیم Webhook =====
      if (url.pathname === '/setup') {
        const webhookUrl = `${url.origin}/webhook`;
        const res = await fetch(
          `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/setWebhook?url=${webhookUrl}`
        );
        const data = await res.json();
        return new Response(JSON.stringify(data, null, 2), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // ===== پنل مدیریت =====
      if (url.pathname === '/admin') {
        const db = new Database(env);
        const html = await getAdminPanel(env, db);
        return new Response(html, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }

      // ===== وضعیت =====
      if (url.pathname === '/') {
        const db = new Database(env);
        const stats = await db.getStats();
        return new Response(
          `🤖 **نوا**\n` +
          `📌 نسخه ${CONFIG.version}\n` +
          `👥 ${stats.users} کاربر\n` +
          `💬 ${stats.messages} پیام\n` +
          `🎭 ${Object.keys(PERSONALITIES).length} شخصیت\n` +
          `📊 ${CONFIG.dailyLimit} پیام روزانه رایگان\n` +
          `⚡ ${new Date().toLocaleString('fa-IR')}`,
          { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
        );
      }

      return new Response('404 Not Found', { status: 404 });

    } catch (e) {
      console.error('Fatal error:', e);
      return new Response('Internal Server Error: ' + e.message, { status: 500 });
    }
  }
};
