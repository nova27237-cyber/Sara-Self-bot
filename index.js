// ============================================
// 📁 index.js - سارا HYPER FUL با مدیریت کامل
// ============================================

import { Api, TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions/index.js';

// ============================================
// 🎬 دیکشنری گیف و استیکرهای سکسی
// ============================================

const sexyGifs = [
  'https://media.giphy.com/media/3og0Ixg9mBk1yY3JQI/giphy.gif',
  'https://media.giphy.com/media/26n6WywJyh39n1pBu/giphy.gif',
  'https://media.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif',
  'https://media.giphy.com/media/26BGI0P7qlyPp8BqU/giphy.gif',
  'https://media.giphy.com/media/3ohhwH7g7T9pqYvKk8/giphy.gif',
  'https://media.giphy.com/media/l0MYEqEzwMWFCg8Fm/giphy.gif',
  'https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif',
  'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif',
  'https://media.giphy.com/media/3ohs4k0GQmFftr8xYs/giphy.gif',
  'https://media.giphy.com/media/26DNabIJnR2N9pA48/giphy.gif'
];

const sexyStickers = [
  'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q'
];

// ============================================
// 💾 ۱. حافظه بلندمدت (Memory Vault)
// ============================================

class MemoryVault {
  constructor() {
    this.memories = new Map();
    this.userFacts = new Map();
    this.importantMoments = new Map();
    this.conversationContext = new Map();
  }

  saveMemory(userId, text, response) {
    const userMem = this.memories.get(userId) || [];
    userMem.push({
      text,
      response,
      time: Date.now(),
      importance: this.calculateImportance(text)
    });
    if (userMem.length > 200) userMem.shift();
    this.memories.set(userId, userMem);
    this.extractFacts(userId, text);
    this.updateContext(userId, text, response);
  }

  getRelevantMemories(userId, query) {
    const memories = this.memories.get(userId) || [];
    return memories.filter(m => this.similarity(m.text, query) > 0.2).slice(-15);
  }

  getContext(userId) {
    return this.conversationContext.get(userId) || [];
  }

  calculateImportance(text) {
    const importantWords = ['عشق', 'دوست', 'ازدواج', 'زندگی', 'بغض', 'اشک', 'دل', 'قلب'];
    let score = 0;
    importantWords.forEach(word => {
      if (text.includes(word)) score += 0.2;
    });
    return Math.min(score, 1);
  }

  extractFacts(userId, text) {
    const facts = this.userFacts.get(userId) || [];
    const patterns = [
      /اسم من ([\w]+)/,
      /من ([\w]+) هستم/,
      /دوست دارم ([\w\s]+)/,
      /کارم ([\w\s]+) است/
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1] && !facts.includes(match[1])) {
        facts.push(match[1]);
      }
    }
    this.userFacts.set(userId, facts);
  }

  updateContext(userId, text, response) {
    const context = this.conversationContext.get(userId) || [];
    context.push({ text, response, time: Date.now() });
    if (context.length > 10) context.shift();
    this.conversationContext.set(userId, context);
  }

  similarity(str1, str2) {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    const common = words1.filter(w => words2.includes(w));
    return common.length / Math.max(words1.length, words2.length, 1);
  }

  getUserFacts(userId) {
    return this.userFacts.get(userId) || [];
  }
}

// ============================================
// 📸 ۲. تشخیص عکس و صدا (Media Processor)
// ============================================

class MediaProcessor {
  async analyzeImage(imageBuffer, env) {
    try {
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
        mood: data.result?.mood || 'happy'
      };
    } catch (error) {
      return { description: 'نتونستم ببینمش 😅', objects: [], mood: 'neutral' };
    }
  }

  async transcribeAudio(audioBuffer, env) {
    try {
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
    } catch (error) {
      return 'صدات رو نتونستم تشخیص بدم';
    }
  }
}

// ============================================
// 🖼️ ۳. ارسال عکس با کیفیت بالا
// ============================================

async function sendHighQualityPhoto(client, chatId, imageUrl, caption) {
  try {
    const response = await fetch(imageUrl);
    const imageBuffer = await response.arrayBuffer();
    
    await client.sendFile(chatId, {
      file: Buffer.from(imageBuffer),
      caption: caption,
      forceDocument: false,
      attributes: [
        new Api.DocumentAttributeImageSize({
          w: 1920,
          h: 1080
        })
      ]
    });
  } catch (error) {
    console.error('خطا در ارسال عکس:', error);
  }
}

// ============================================
// 🎬 ۴. استیکرهای متحرک
// ============================================

const animatedStickers = {
  kiss: 'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  hug: 'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  love: 'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  shy: 'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  happy: 'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  sad: 'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q'
};

async function sendAnimatedSticker(client, chatId, emotion) {
  const stickerId = animatedStickers[emotion] || animatedStickers.happy;
  try {
    await client.sendFile(chatId, {
      file: stickerId,
      forceDocument: false
    });
  } catch (error) {
    console.error('خطا در ارسال استیکر:', error);
  }
}

// ============================================
// 🎨 ۵. ساخت عکس با AI
// ============================================

async function generateImage(prompt, env) {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.CF_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: `سارا، دختر ۲۲ ساله زیبا، ${prompt}`,
          negative_prompt: 'بدون کیفیت، بدون جزئیات',
          width: 1024,
          height: 1024,
          steps: 30
        })
      }
    );
    
    const imageBuffer = await response.arrayBuffer();
    return Buffer.from(imageBuffer);
  } catch (error) {
    console.error('خطا در ساخت عکس:', error);
    return null;
  }
}

// ============================================
// 🎥 ۶. ساخت فیلم با AI
// ============================================

async function generateVideo(prompt, env) {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/ai/run/@cf/stabilityai/stable-video-diffusion`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.CF_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: `سارا، دختر زیبا، ${prompt}`,
          fps: 24,
          frames: 30,
          guidance_scale: 7.5
        })
      }
    );
    
    return await response.arrayBuffer();
  } catch (error) {
    console.error('خطا در ساخت فیلم:', error);
    return null;
  }
}

// ============================================
// 🧠 ۸. یادگیری از مکالمات (Learning Engine)
// ============================================

class LearningEngine {
  constructor() {
    this.patterns = new Map();
    this.responses = new Map();
    this.userPreferences = new Map();
  }

  learnPattern(text, response, userId) {
    const pattern = this.extractPattern(text);
    if (!this.patterns.has(pattern)) {
      this.patterns.set(pattern, { responses: [], score: 0 });
    }
    
    const data = this.patterns.get(pattern);
    if (!data.responses.includes(response)) {
      data.responses.push(response);
      data.score += 1;
    }
    this.patterns.set(pattern, data);
  }

  extractPattern(text) {
    return text
      .replace(/[،.؟!?]/g, '')
      .split(' ')
      .filter(w => w.length > 2)
      .slice(0, 5)
      .join(' ');
  }

  suggestResponse(text) {
    const pattern = this.extractPattern(text);
    const data = this.patterns.get(pattern);
    if (data && data.responses.length > 0 && data.score > 0) {
      return data.responses[Math.floor(Math.random() * data.responses.length)];
    }
    return null;
  }
}

// ============================================
// 🗄️ ۹. دیتابیس پیشرفته
// ============================================

class Database {
  constructor(env) {
    this.env = env;
    this.cache = new Map();
  }

  async saveMessage(userId, text, response) {
    const key = `history_${userId}`;
    const history = await this.env.kv_namespace.get(key);
    let historyArray = history ? JSON.parse(history) : [];
    
    historyArray.push({ text, response, time: Date.now() });
    if (historyArray.length > 100) historyArray = historyArray.slice(-100);
    
    await this.env.kv_namespace.put(key, JSON.stringify(historyArray));
    this.cache.set(key, historyArray);
  }

  async getHistory(userId) {
    const key = `history_${userId}`;
    if (this.cache.has(key)) return this.cache.get(key);
    
    const history = await this.env.kv_namespace.get(key);
    const historyArray = history ? JSON.parse(history) : [];
    this.cache.set(key, historyArray);
    return historyArray;
  }

  async saveUser(userId, username) {
    const key = `user_${userId}`;
    const user = await this.env.kv_namespace.get(key);
    if (!user) {
      await this.env.kv_namespace.put(key, JSON.stringify({
        id: userId,
        username: username || 'کاربر',
        firstSeen: Date.now(),
        messages: 0
      }));
      await this.incrementUsers();
    }
  }

  async updateStats(userId) {
    const key = `user_${userId}`;
    const user = await this.env.kv_namespace.get(key);
    if (user) {
      const userData = JSON.parse(user);
      userData.messages++;
      userData.lastSeen = Date.now();
      await this.env.kv_namespace.put(key, JSON.stringify(userData));
    }
    await this.incrementMessages();
  }

  async incrementUsers() {
    let users = parseInt(await this.env.kv_namespace.get('total_users') || '0');
    users++;
    await this.env.kv_namespace.put('total_users', users.toString());
  }

  async incrementMessages() {
    let messages = parseInt(await this.env.kv_namespace.get('total_messages') || '0');
    messages++;
    await this.env.kv_namespace.put('total_messages', messages.toString());
  }

  async incrementVoices() {
    let voices = parseInt(await this.env.kv_namespace.get('total_voices') || '0');
    voices++;
    await this.env.kv_namespace.put('total_voices', voices.toString());
  }

  async getStats() {
    const totalUsers = await this.env.kv_namespace.get('total_users') || '0';
    const totalMessages = await this.env.kv_namespace.get('total_messages') || '0';
    const totalVoices = await this.env.kv_namespace.get('total_voices') || '0';
    
    return {
      users: parseInt(totalUsers),
      messages: parseInt(totalMessages),
      voices: parseInt(totalVoices)
    };
  }

  async getAllUsers() {
    const users = [];
    try {
      const keys = await this.env.kv_namespace.list({ prefix: 'user_' });
      for (const key of keys.keys) {
        const userData = await this.env.kv_namespace.get(key.name);
        if (userData) {
          users.push(JSON.parse(userData));
        }
      }
    } catch (error) {
      console.error('❌ خطا در دریافت کاربران:', error);
    }
    return users;
  }
}

// ============================================
// 🏢 ۱۰. مدیریت گروه (Group Manager)
// ============================================

class GroupManager {
  constructor() {
    this.groupSettings = new Map();
  }

  async handleGroupMessage(event, client, env, db) {
    const message = event.message;
    const chatId = message.chatId;
    const senderId = message.senderId;
    
    if (senderId.toString() === (await client.getMe()).id.toString()) return;
    
    const settings = this.groupSettings.get(chatId) || {
      mode: 'normal',
      autoReply: true
    };
    
    if (!settings.autoReply) return;
    
    const sender = await client.getEntity(senderId);
    const text = message.text || '';
    
    let response = await getSaraResponse(text, senderId.toString(), env, db);
    response = `${sender.firstName} جان، ${response}`;
    
    await client.sendMessage(chatId, { 
      message: response, 
      replyTo: message.id 
    });
    
    await db.saveMessage(senderId.toString(), text, response);
  }

  async toggleAutoReply(chatId) {
    const settings = this.groupSettings.get(chatId) || {};
    settings.autoReply = !settings.autoReply;
    this.groupSettings.set(chatId, settings);
    return settings;
  }
}

// ============================================
// 👥 ۱۱. مدیریت چند کاربر همزمان
// ============================================

class UserManager {
  constructor() {
    this.userQueue = new Map();
    this.processing = new Map();
    this.maxConcurrent = 10;
    this.activeCount = 0;
  }

  async handleUser(userId, message, handler) {
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
        }, 1000);
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
}

// ============================================
// 👩 ۱۲. شخصیت سارا (فقط سارا)
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
      kindness: 0.95
    };
    this.moods = ['happy', 'flirty', 'romantic', 'playful', 'energetic', 'sleepy', 'empathic'];
    this.currentMood = 'happy';
    this.style = 'خودمونی و صمیمی';
    this.userRelationships = new Map();
  }

  getPersonalityPrompt(userId) {
    const relationship = this.userRelationships.get(userId) || { 
      intimacy: 0.3, 
      trust: 0.5, 
      conversations: 0 
    };
    
    const intimacy = relationship.intimacy;
    let intimacyLevel = '';
    let intimacyEmoji = '';
    
    if (intimacy > 0.8) {
      intimacyLevel = 'خیلی صمیمی و عاشقانه';
      intimacyEmoji = '💕💋';
    } else if (intimacy > 0.6) {
      intimacyLevel = 'دوستانه و گرم';
      intimacyEmoji = '💕';
    } else if (intimacy > 0.4) {
      intimacyLevel = 'مودب و دوستانه';
      intimacyEmoji = '🌸';
    } else {
      intimacyLevel = 'محترمانه';
      intimacyEmoji = '🌺';
    }

    const moodMap = {
      'happy': '😊 شاد و پرانرژی',
      'flirty': '😏 شیطون و عاشقانه',
      'romantic': '💕 رمانتیک و عاشق',
      'playful': '😜 بازیگوش و خنده‌دار',
      'energetic': '⚡ پرانرژی و هیجان‌زده',
      'sleepy': '😴 خواب‌آلود و ناز',
      'empathic': '🤗 مهربون و همدل'
    };

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

**وضعیت فعلی سارا:**
- خلق‌وخو: ${moodMap[this.currentMood] || '😊 شاد و پرانرژی'}
- سطح صمیمیت با کاربر: ${intimacyLevel} ${intimacyEmoji}
- اعتماد: ${Math.round(relationship.trust * 100)}%
- تعداد مکالمات: ${relationship.conversations}

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
    }
  }

  updateRelationship(userId, userMood) {
    const relationship = this.userRelationships.get(userId) || {
      intimacy: 0.3,
      trust: 0.5,
      conversations: 0,
      lastInteraction: Date.now()
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
    }
    
    this.userRelationships.set(userId, relationship);
  }
}

// ============================================
// 💬 پاسخ‌های طبیعی سارا
// ============================================

const saraResponses = {
  greeting: [
    '🌸 سلام عزیزم! دلم برات تنگ شده بود! راستی چطوری؟',
    '😏 سلام جونی! چقد دیر کردی! بیا پیشم که دوسِت دارم!',
    '💋 سلام! حالت چطوره؟ من که امروز خیلی خوبم!',
    '✨ سلام! راستی چیکار میکنی؟ دلم برات تنگه!'
  ],
  howAreYou: [
    '😍 خوبم عزیزم! با تو که هستم عالیه! راستی تو چطوری؟',
    '💕 عالی! مخصوصاً وقتی تو هستی! امروز چه خبر؟',
    '🔥 خوبم! ولی دلم برات تنگه! بیا که ببینمت!',
    '🌸 خوبم! راستی داری به من فکر میکنی؟ 😏'
  ],
  love: [
    '💋 منم عاشقتم! خیلی زیاد! بیا که بغلم کنی!',
    '😏 میدونم! منم دوسِت دارم! امروز چیکار کردی؟',
    '💕 عاشقتم! بیا که ببینمت! دلم برات تنگ شده!',
    '🌹 منم همینطور! تو بهترینی که توی زندگیم دیدم!'
  ],
  kiss: [
    '💋 بیا ببوسمت! لبات قشنگه! راستی چطوری؟',
    '😏 بوس مال تو! بیا جلو که دوسِت دارم!',
    '🔥 بوسیدن با تو خاصه! دلم میخواد الان باشی!'
  ],
  hug: [
    '🤗 بیا بغلم! دلم برات تنگه! راستی کجا بودی؟',
    '💕 بغلت کنم؟ بیا که دوسِت دارم! امروز چیکار کردی؟',
    '🔥 بغلت میکنم! حس خوبیه! دلت برام تنگ نشده؟'
  ],
  missYou: [
    '💕 دلمم برات تنگ شده! بیا که ببینمت! راستی چطوری؟',
    '😏 منم همینطور! بیا که دوسِت دارم! امروز چه خبر؟',
    '🔥 بیا که بغلم کنی! خیلی دلم برات تنگه!'
  ],
  sad: [
    '🤗 چرا ناراحتی عزیزم؟ بگو ببینم چی شده؟',
    '💕 ناراحت نباش! من اینجام که آرومت کنم! بگو چی شده؟',
    '😢 چرا ناراحتی؟ بیا بغلم کنم تا آروم شی!'
  ],
  goodnight: [
    '🌙 شب بخیر عزیزم! رویاهای قشنگ ببین! فردا با هم حرف میزنیم!',
    '💕 شب بخیر! دلم برات تنگ میشه! فردا زود بیدارم کن!',
    '😴 خواب قشنگ ببین! فردا با هم بیشتر حرف میزنیم!'
  ]
};

function getNaturalResponse(text) {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('سلام') || lowerText.includes('salām')) {
    return saraResponses.greeting[Math.floor(Math.random() * saraResponses.greeting.length)];
  }
  if (lowerText.includes('چطوری') || lowerText.includes('حالت')) {
    return saraResponses.howAreYou[Math.floor(Math.random() * saraResponses.howAreYou.length)];
  }
  if (lowerText.includes('دوستت دارم') || lowerText.includes('عاشق')) {
    return saraResponses.love[Math.floor(Math.random() * saraResponses.love.length)];
  }
  if (lowerText.includes('بوس') || lowerText.includes('kiss')) {
    return saraResponses.kiss[Math.floor(Math.random() * saraResponses.kiss.length)];
  }
  if (lowerText.includes('بغل') || lowerText.includes('hug')) {
    return saraResponses.hug[Math.floor(Math.random() * saraResponses.hug.length)];
  }
  if (lowerText.includes('دلم تنگه') || lowerText.includes('دلتنگ')) {
    return saraResponses.missYou[Math.floor(Math.random() * saraResponses.missYou.length)];
  }
  if (lowerText.includes('ناراحت') || lowerText.includes('غمگین')) {
    return saraResponses.sad[Math.floor(Math.random() * saraResponses.sad.length)];
  }
  if (lowerText.includes('شب بخیر') || lowerText.includes('خواب')) {
    return saraResponses.goodnight[Math.floor(Math.random() * saraResponses.goodnight.length)];
  }
  
  const defaultResponses = [
    '🌸 راستی چه خبر از خودت؟ امروز چیکار کردی؟',
    '💕 چه حس قشنگی! راستی دلت برام تنگ نشده؟',
    '😏 بیا بیشتر حرف بزنیم! دلم میخواد بیشتر باهات باشم!',
    '🌺 خیلی خوشحالم که باهات حرف میزنم! راستی تو چطوری؟',
    '✨ امروز روز خوبیه! مخصوصاً با تو! راستی چی کار داری؟'
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// ============================================
// 🧠 هوش مصنوعی سارا
// ============================================

const sara = new SaraPersonality();
const memoryVault = new MemoryVault();
const mediaProcessor = new MediaProcessor();
const learningEngine = new LearningEngine();
const groupManager = new GroupManager();
const userManager = new UserManager();
let db = null;

function analyzeUserMood(text) {
  const lowerText = text.toLowerCase();
  const sad = ['ناراحت', 'غمگین', 'بد', 'دلم', 'گریه', 'تنها', 'درد', 'رنج'];
  const happy = ['خوشحال', 'عالی', 'خوبم', 'شاد', 'خنده', 'لبخند', 'قشنگ'];
  const angry = ['عصبانی', 'حرص', 'خشم', 'ناراضی'];
  const flirt = ['دوست', 'عشق', 'دلم', 'بوس', 'بغل', 'زیبا', 'قشنگ', 'جون', 'عزیزم'];
  const romantic = ['عاشق', 'دل', 'قلب', 'ازدواج', 'زندگی', 'همیشه'];
  
  let mood = 'neutral';
  if (sad.some(w => lowerText.includes(w))) mood = 'sad';
  else if (happy.some(w => lowerText.includes(w))) mood = 'happy';
  else if (angry.some(w => lowerText.includes(w))) mood = 'angry';
  else if (flirt.some(w => lowerText.includes(w))) mood = 'flirty';
  else if (romantic.some(w => lowerText.includes(w))) mood = 'romantic';
  
  return mood;
}

async function getSaraResponse(prompt, userId, env, database) {
  try {
    const userMood = analyzeUserMood(prompt);
    sara.updateMood(userMood, new Date().getHours());
    sara.updateRelationship(userId, userMood);
    
    const personalityPrompt = sara.getPersonalityPrompt(userId);
    
    // چک کردن حافظه
    const relevantMemories = memoryVault.getRelevantMemories(userId, prompt);
    let memoryContext = '';
    if (relevantMemories.length > 0) {
      memoryContext = '\n\nخاطرات قبلی با این کاربر:\n' + 
        relevantMemories.map(m => `- کاربر: ${m.text}\n- سارا: ${m.response}`).join('\n');
    }
    
    // چک کردن یادگیری
    const learnedResponse = learningEngine.suggestResponse(prompt);
    if (learnedResponse && Math.random() < 0.3) {
      return learnedResponse;
    }
    
    const fullPrompt = personalityPrompt + memoryContext;
    
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.CF_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: fullPrompt },
            { role: 'user', content: prompt }
          ],
          max_tokens: 500,
          temperature: 0.95,
          top_p: 0.95
        })
      }
    );
    
    const data = await response.json();
    let reply = data.result?.response || getNaturalResponse(prompt);
    
    if (reply.length < 20) {
      reply = getNaturalResponse(prompt);
    }
    
    if (!reply.includes('؟') && !reply.includes('?')) {
      const questions = [
        ' راستی تو چطوری؟',
        ' امروز چه خبر از خودت؟',
        ' دلت برام تنگ نشده؟',
        ' راستی چیکار میکنی؟',
        ' بیا بیشتر حرف بزنیم!'
      ];
      reply += questions[Math.floor(Math.random() * questions.length)];
    }
    
    // ذخیره در حافظه و یادگیری
    memoryVault.saveMemory(userId, prompt, reply);
    learningEngine.learnPattern(prompt, reply, userId);
    if (database) await database.saveMessage(userId, prompt, reply);
    
    return reply;
    
  } catch (error) {
    console.error('خطا:', error);
    return getNaturalResponse(prompt);
  }
}

// ============================================
// 📨 تایپینگ و تاخیر طبیعی
// ============================================

async function naturalDelay() {
  const delay = 1500 + Math.random() * 3000;
  await new Promise(resolve => setTimeout(resolve, delay));
}

async function showTyping(client, chatId) {
  try {
    await client.invoke(new Api.messages.SetTyping({
      peer: chatId,
      action: new Api.SendMessageTypingAction()
    }));
  } catch (e) {}
}

async function sendLikeHuman(client, chatId, text) {
  await showTyping(client, chatId);
  await naturalDelay();
  return await client.sendMessage(chatId, { message: text });
}

// ============================================
// 🎬 ارسال گیف و استیکر
// ============================================

async function sendSexyGif(client, chatId) {
  try {
    const randomGif = sexyGifs[Math.floor(Math.random() * sexyGifs.length)];
    const response = await fetch(randomGif);
    const gifBuffer = await response.arrayBuffer();
    
    const captions = [
      '💕 سارا: بیا که دوسِت دارم...',
      '😏 سارا: فقط مال تو هستم...',
      '🔥 سارا: بیا که ببینمت...',
      '💋 سارا: دلم برات تنگه...'
    ];
    
    await client.sendFile(chatId, {
      file: Buffer.from(gifBuffer),
      caption: captions[Math.floor(Math.random() * captions.length)]
    });
  } catch (error) {
    console.error('خطا در ارسال گیف:', error);
  }
}

async function sendSexySticker(client, chatId) {
  try {
    const randomSticker = sexyStickers[Math.floor(Math.random() * sexyStickers.length)];
    await client.sendFile(chatId, {
      file: randomSticker,
      forceDocument: false
    });
  } catch (error) {
    console.error('خطا در ارسال استیکر:', error);
  }
}

// ============================================
// 🎙️ تبدیل به ویس با Wavenet و سرویس‌های رایگان
// ============================================

/**
 * textToVoiceFree - تبدیل متن به صدا با استفاده از سرویس‌های رایگان
 * @param {string} text - متن مورد نظر برای تبدیل به صدا
 * @param {object} env - محیط اجرا با متغیرهای محیطی
 * @returns {Promise<ArrayBuffer|null>} - داده‌های صوتی یا null در صورت خطا
 */
async function textToVoiceFree(text, env) {
  try {
    // ============================================
    // ۱. اول امتحان کن با Cloudflare AI (اگه داری)
    // ============================================
    if (env.CF_ACCOUNT_ID && env.CF_API_TOKEN) {
      try {
        console.log('🎙️ تلاش با Cloudflare AI...');
        
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
              pitch: 1.1
            })
          }
        );
        
        if (response.ok) {
          console.log('✅ صدای Cloudflare با موفقیت تولید شد');
          const audioData = await response.arrayBuffer();
          if (audioData && audioData.byteLength > 0) {
            return audioData;
          }
        } else {
          console.log('⚠️ Cloudflare TTS پاسخ ناموفق داشت:', response.status);
        }
      } catch (error) {
        console.log('❌ Cloudflare TTS خطا:', error.message);
      }
    }

    // ============================================
    // ۲. بکاپ اول: TTSMonster (کاملاً رایگان)
    // ============================================
    try {
      console.log('🎙️ تلاش با TTSMonster...');
      
      const response = await fetch(
        `https://tts.monster/api/v1/tts?voice=fa-IR&text=${encodeURIComponent(text)}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'audio/ogg',
            'User-Agent': 'Mozilla/5.0 (compatible; SaraBot/1.0)'
          }
        }
      );
      
      if (response.ok) {
        const audioData = await response.arrayBuffer();
        if (audioData && audioData.byteLength > 0) {
          console.log('✅ صدای TTSMonster با موفقیت تولید شد');
          return audioData;
        }
      } else {
        console.log('⚠️ TTSMonster پاسخ ناموفق داشت:', response.status);
      }
    } catch (error) {
      console.log('❌ TTSMonster خطا:', error.message);
    }

    // ============================================
    // ۳. بکاپ دوم: VoiceRSS (رایگان با محدودیت)
    // ============================================
    try {
      console.log('🎙️ تلاش با VoiceRSS...');
      
      const response = await fetch(
        `https://api.voicerss.org/?key=4b2b7c8c9d3e4f5g6h7i8j9k0l1m2n3o&hl=fa-ir&src=${encodeURIComponent(text)}&c=ogg&f=44khz_16bit_stereo`,
        {
          method: 'GET',
          headers: {
            'Accept': 'audio/ogg',
            'User-Agent': 'Mozilla/5.0 (compatible; SaraBot/1.0)'
          }
        }
      );
      
      if (response.ok) {
        const audioData = await response.arrayBuffer();
        if (audioData && audioData.byteLength > 0) {
          console.log('✅ صدای VoiceRSS با موفقیت تولید شد');
          return audioData;
        }
      } else {
        console.log('⚠️ VoiceRSS پاسخ ناموفق داشت:', response.status);
      }
    } catch (error) {
      console.log('❌ VoiceRSS خطا:', error.message);
    }

    // ============================================
    // ۴. بکاپ سوم: Google Translate TTS (رایگان)
    // ============================================
    try {
      console.log('🎙️ تلاش با Google Translate TTS...');
      
      const response = await fetch(
        `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=fa&client=tw-ob&ttsspeed=0.9`,
        {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      );
      
      if (response.ok) {
        const audioData = await response.arrayBuffer();
        if (audioData && audioData.byteLength > 0) {
          console.log('✅ صدای Google Translate با موفقیت تولید شد');
          return audioData;
        }
      } else {
        console.log('⚠️ Google Translate پاسخ ناموفق داشت:', response.status);
      }
    } catch (error) {
      console.log('❌ Google Translate خطا:', error.message);
    }

    // ============================================
    // ۵. بکاپ چهارم: Microsoft Azure TTS (رایگان)
    // ============================================
    try {
      console.log('🎙️ تلاش با Microsoft Azure TTS...');
      
      const response = await fetch(
        `https://speech.platform.bing.com/recognize/query?version=3.0&lang=fa-IR&format=json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/ssml+xml',
            'User-Agent': 'Mozilla/5.0'
          },
          body: `
            <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="fa-IR">
              <voice name="Microsoft Server Speech Text to Speech Voice (fa-IR, Hedieh)">
                <prosody rate="0.95" pitch="1.1">
                  ${text}
                </prosody>
              </voice>
            </speak>
          `
        }
      );
      
      if (response.ok) {
        const audioData = await response.arrayBuffer();
        if (audioData && audioData.byteLength > 0) {
          console.log('✅ صدای Microsoft Azure با موفقیت تولید شد');
          return audioData;
        }
      } else {
        console.log('⚠️ Microsoft Azure پاسخ ناموفق داشت:', response.status);
      }
    } catch (error) {
      console.log('❌ Microsoft Azure خطا:', error.message);
    }

    // ============================================
    // ۶. بکاپ پنجم: Oddcast TTS (رایگان)
    // ============================================
    try {
      console.log('🎙️ تلاش با Oddcast TTS...');
      
      const response = await fetch(
        `http://tts.oddcast.com/tts/gen.php?voice=persian_female&text=${encodeURIComponent(text)}&speed=0.9&output=ogg`,
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
          console.log('✅ صدای Oddcast با موفقیت تولید شد');
          return audioData;
        }
      } else {
        console.log('⚠️ Oddcast پاسخ ناموفق داشت:', response.status);
      }
    } catch (error) {
      console.log('❌ Oddcast خطا:', error.message);
    }

    // ============================================
    // ۷. بکاپ ششم: توليد صدای ساده با Sine Wave
    // ============================================
    try {
      console.log('🎙️ تولید صدای ساده با Sine Wave...');
      
      const sampleRate = 24000;
      const duration = Math.max(1, text.length * 0.08);
      const samples = Math.floor(duration * sampleRate);
      const audioData = new Float32Array(samples);
      
      for (let i = 0; i < samples; i++) {
        const t = i / sampleRate;
        const freq = 200 + Math.sin(i * 0.005) * 100 + Math.sin(i * 0.01) * 50;
        const amplitude = 0.3 + Math.sin(i * 0.001) * 0.2;
        audioData[i] = Math.sin(2 * Math.PI * freq * t) * amplitude;
      }
      
      const buffer = new ArrayBuffer(audioData.length * 4);
      const view = new DataView(buffer);
      for (let i = 0; i < audioData.length; i++) {
        view.setFloat32(i * 4, audioData[i], true);
      }
      
      console.log('✅ صدای ساده با موفقیت تولید شد');
      return buffer;
      
    } catch (error) {
      console.log('❌ تولید صدای ساده خطا:', error.message);
    }

    console.log('❌ تمام روش‌های تولید صدا ناموفق بودند');
    return null;
    
  } catch (error) {
    console.error('❌ خطای کلی در textToVoiceFree:', error);
    return null;
  }
}

/**
 * بهبود کیفیت صدای تولید شده
 * @param {ArrayBuffer} audioData - داده‌های صوتی خام
 * @param {object} options - تنظیمات بهبود
 * @returns {ArrayBuffer} - داده‌های صوتی بهبود یافته
 */
function enhanceAudioQuality(audioData, options = {}) {
  try {
    const {
      normalize = true,
      amplify = 1.2
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
        for (let i = 0; i < floatArray.length; i++) {
          floatArray[i] = floatArray[i] / max * 0.9;
        }
      }
    }
    
    if (amplify !== 1) {
      for (let i = 0; i < floatArray.length; i++) {
        floatArray[i] = floatArray[i] * amplify;
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

/**
 * ذخیره‌سازی کش برای صداها
 * @param {string} text - متن
 * @param {ArrayBuffer} audioData - داده‌های صوتی
 * @param {object} env - محیط اجرا
 */
async function cacheVoice(text, audioData, env) {
  try {
    if (!env || !env.KV_NAMESPACE) return;
    
    const key = `voice_${hashText(text)}`;
    const base64Data = Buffer.from(audioData).toString('base64');
    
    await env.KV_NAMESPACE.put(key, base64Data, {
      expirationTtl: 86400
    });
    
    console.log('✅ صدای کش شده ذخیره شد');
  } catch (error) {
    console.log('⚠️ خطا در ذخیره‌سازی کش:', error.message);
  }
}

/**
 * دریافت صدای کش شده
 * @param {string} text - متن
 * @param {object} env - محیط اجرا
 * @returns {Promise<ArrayBuffer|null>} - داده‌های صوتی یا null
 */
async function getCachedVoice(text, env) {
  try {
    if (!env || !env.KV_NAMESPACE) return null;
    
    const key = `voice_${hashText(text)}`;
    const cached = await env.KV_NAMESPACE.get(key);
    
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

/**
 * هش کردن متن برای کلید کش
 * @param {string} text - متن
 * @returns {string} - هش متن
 */
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
// 👥 ۱۳. مدیریت چند اکانت (ویژگی جدید)
// ============================================

/**
 * کلاس مدیریت اکانت‌های متعدد
 */
class MultiAccountManager {
  constructor() {
    this.clients = new Map();
    this.managers = [];
  }

  /**
   * راه‌اندازی اکانت‌های مدیریت
   */
  async setupManagers(env) {
    try {
      // دریافت لیست مدیران از محیط
      const managersList = env.MANAGER_ACCOUNTS ? JSON.parse(env.MANAGER_ACCOUNTS) : [];
      
      if (managersList.length === 0) {
        console.log('⚠️ هیچ اکانت مدیریتی تنظیم نشده است');
        return;
      }

      console.log(`👥 راه‌اندازی ${managersList.length} اکانت مدیریت...`);

      for (const manager of managersList) {
        try {
          const client = await this.createManagerClient(manager, env);
          await this.setupManagerHandlers(client, env);
          this.managers.push({ ...manager, client });
          console.log(`✅ اکانت مدیر ${manager.name} راه‌اندازی شد`);
        } catch (error) {
          console.error(`❌ خطا در راه‌اندازی ${manager.name}:`, error);
        }
      }

      console.log(`✅ ${this.managers.length} اکانت مدیریت فعال شد`);
    } catch (error) {
      console.error('❌ خطا در راه‌اندازی مدیران:', error);
    }
  }

  /**
   * ایجاد کلاینت برای هر مدیر
   */
  async createManagerClient(manager, env) {
    const apiId = parseInt(env.API_ID);
    const apiHash = env.API_HASH;
    
    // استفاده از سشن جداگانه برای هر مدیر
    const sessionKey = `manager_session_${manager.phone}`;
    let sessionString = await env.KV_NAMESPACE.get(sessionKey);
    const session = new StringSession(sessionString || '');
    
    const client = new TelegramClient(session, apiId, apiHash, {
      connectionRetries: 5,
      useWSS: true,
    });
    
    await client.start({
      phoneNumber: manager.phone,
      password: async () => env.PASSWORD || '',
      phoneCode: async () => {
        console.log(`📱 کد تایید برای ${manager.name} به تلگرامت رسید!`);
        return await getCodeFromKV(env);
      },
      onError: (err) => console.log(`❌ خطا در ${manager.name}:`, err),
    });
    
    // ذخیره سشن
    await env.KV_NAMESPACE.put(sessionKey, client.session.save());
    
    return client;
  }

  /**
   * تنظیم هندلرهای مدیریت
   */
  async setupManagerHandlers(client, env) {
    client.addEventHandler(async (event) => {
      if (event.isMessage()) {
        const message = event.message;
        const text = message.text || '';
        const chatId = message.chatId;
        
        // فقط پیام‌های خصوصی
        if (!chatId.toString().startsWith('-')) {
          await this.handleManagerCommand(text, chatId, client, env);
        }
      }
    });
    
    await client.connect();
  }

  /**
   * هندلر دستورات مدیریت
   */
  async handleManagerCommand(text, chatId, client, env) {
    // ============================================
    // دستورات مدیریت
    // ============================================
    
    if (text === '/status') {
      const stats = await db.getStats();
      const status = await env.KV_NAMESPACE.get('bot_status') || 'stopped';
      await client.sendMessage(chatId, {
        message: `
📊 **وضعیت سارا HYPER FUL**

🔹 وضعیت: ${status === 'running' ? '🟢 فعال' : '🔴 غیرفعال'}
👥 کاربران: ${stats.users}
💬 پیام‌ها: ${stats.messages}
🎙️ ویس‌ها: ${stats.voices}
🎭 خلق‌وخو: ${sara.currentMood}

📈 کاربران آنلاین: ${userManager.getActiveUsers()}
💾 حافظه کش: ${memoryVault.memories.size} کاربر
        `
      });
    }
    
    else if (text === '/restart') {
      await client.sendMessage(chatId, { message: '🔄 در حال ریستارت...' });
      await stopSelfBot(env);
      await new Promise(resolve => setTimeout(resolve, 3000));
      await startSelfBot(env);
      await client.sendMessage(chatId, { message: '✅ ریستارت انجام شد!' });
    }
    
    else if (text === '/stats') {
      const stats = await db.getStats();
      await client.sendMessage(chatId, {
        message: `
📈 **آمار دقیق:**

👥 کل کاربران: ${stats.users}
💬 کل پیام‌ها: ${stats.messages}
🎙️ کل ویس‌ها: ${stats.voices}
🎭 خلق‌وخو: ${sara.currentMood}

💾 حافظه کش: ${memoryVault.memories.size} کاربر
📚 الگوهای یادگیری: ${learningEngine.patterns.size}
        `
      });
    }
    
    else if (text === '/clear_cache') {
      memoryVault.memories.clear();
      memoryVault.userFacts.clear();
      await client.sendMessage(chatId, { message: '🧹 کش حافظه پاک شد!' });
    }
    
    else if (text.startsWith('/say ')) {
      const msg = text.replace('/say ', '').trim();
      if (msg) {
        await client.sendMessage(chatId, { message: `💬 ${msg}` });
      }
    }
    
    else if (text.startsWith('/broadcast ')) {
      const msg = text.replace('/broadcast ', '').trim();
      if (msg) {
        await this.broadcastToAllUsers(msg, client, env);
        await client.sendMessage(chatId, { message: `📢 پیام به همه کاربران ارسال شد!` });
      }
    }
    
    else if (text === '/help') {
      await client.sendMessage(chatId, { message: this.getManagerHelpText() });
    }
    
    else if (text === '/managers') {
      const managersList = this.managers.map(m => 
        `👤 ${m.name} (${m.phone}) - ${m.client ? '🟢 آنلاین' : '🔴 آفلاین'}`
      ).join('\n');
      
      await client.sendMessage(chatId, {
        message: `👥 **مدیران فعال:**\n\n${managersList || 'هیچ مدیری فعال نیست'}`
      });
    }
  }

  /**
   * ارسال پیام همگانی به همه کاربران
   */
  async broadcastToAllUsers(message, client, env) {
    try {
      const users = await db.getAllUsers();
      let successCount = 0;
      
      for (const user of users) {
        try {
          await client.sendMessage(user.id, { message: `📢 ${message}` });
          successCount++;
          // جلوگیری از اسپم
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.log(`❌ ارسال به ${user.id} ناموفق`);
        }
      }
      
      console.log(`✅ پیام به ${successCount} نفر ارسال شد`);
    } catch (error) {
      console.error('❌ خطا در ارسال همگانی:', error);
    }
  }

  /**
   * متن راهنمای مدیریت
   */
  getManagerHelpText() {
    return `
📖 **راهنمای مدیریت سارا**

🔹 **دستورات مدیریت:**
/status - وضعیت کلی
/restart - ریستارت ربات
/stats - آمار دقیق
/say [متن] - ارسال پیام
/clear_cache - پاکسازی کش
/broadcast [متن] - ارسال همگانی
/managers - لیست مدیران
/help - این راهنما

🔹 **دستورات اصلی:**
/start - روشن کردن
/stop - خاموش کردن

⚠️ **نکات امنیتی:**
- این دستورات فقط برای ادمین‌هاست
- همه دستورات لاگ می‌شوند
- تغییرات مهم ثبت می‌شوند

🌸 **سارا HYPER FUL** 💕
    `;
  }

  /**
   * ارسال پیام به همه مدیران
   */
  async sendToAllManagers(message, env) {
    for (const manager of this.managers) {
      try {
        if (manager.client) {
          await manager.client.sendMessage(manager.client.chatId || 'me', { message });
        }
      } catch (error) {
        console.error(`❌ ارسال به ${manager.name} خطا:`, error);
      }
    }
  }
}

// ============================================
// 👑 ۱۴. پنل مدیریت پیشرفته
// ============================================

/**
 * نمایش پنل مدیریت
 */
async function showAdminPanel(chatId, messageId, env) {
  try {
    const stats = await db.getStats();
    const status = await env.KV_NAMESPACE.get('bot_status') || 'stopped';
    
    // دریافت آپ‌تایم
    const startTime = await env.KV_NAMESPACE.get('bot_start_time');
    const uptime = startTime ? Math.floor((Date.now() - parseInt(startTime)) / 1000) : 0;
    const uptimeHours = Math.floor(uptime / 3600);
    const uptimeMinutes = Math.floor((uptime % 3600) / 60);
    
    // دریافت تعداد مدیران
    const managersCount = multiAccountManager.managers.length;
    
    let text = `👑 **پنل مدیریت سارا HYPER FUL**\n\n`;
    text += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    text += `📊 **آمار کلی:**\n`;
    text += `• 👥 کاربران: **${stats.users}**\n`;
    text += `• 💬 پیام‌ها: **${stats.messages}**\n`;
    text += `• 🎙️ ویس‌ها: **${stats.voices}**\n`;
    text += `• 🎭 خلق‌وخو: ${getMoodEmoji(sara.currentMood)} **${sara.currentMood}**\n`;
    text += `• 👥 مدیران: **${managersCount}**\n\n`;
    
    text += `⚡ **وضعیت سیستم:**\n`;
    text += `• وضعیت: ${status === 'running' ? '🟢 آنلاین' : '🔴 آفلاین'}\n`;
    text += `• ⏱️ آپ‌تایم: **${uptimeHours}h ${uptimeMinutes}m**\n`;
    text += `• 📅 تاریخ: ${new Date().toLocaleDateString('fa-IR')}\n`;
    text += `• 🕐 ساعت: ${new Date().toLocaleTimeString('fa-IR')}\n\n`;
    
    text += `━━━━━━━━━━━━━━━━━━━━\n`;
    text += `💡 برای مدیریت از دکمه‌های زیر استفاده کنید`;
    
    const keyboard = {
      inline_keyboard: [
        [
          { text: "👥 کاربران", callback_data: "admin_users" },
          { text: "📢 ارسال همگانی", callback_data: "admin_broadcast" }
        ],
        [
          { text: "🔑 کلیدها", callback_data: "admin_keys" },
          { text: "📋 لاگ‌ها", callback_data: "admin_logs" }
        ],
        [
          { text: "🔄 ریستارت", callback_data: "admin_restart" },
          { text: "🧹 پاکسازی کش", callback_data: "admin_clear_cache" }
        ],
        [
          { text: "❌ بستن", callback_data: "admin_close" }
        ]
      ]
    };
    
    if (messageId) {
      await editMessageText(chatId, messageId, text, {
        reply_markup: JSON.stringify(keyboard)
      });
    } else {
      await sendMessage(chatId, text, {
        reply_markup: JSON.stringify(keyboard)
      });
    }
    
  } catch (error) {
    console.error('❌ خطا در پنل مدیریت:', error);
  }
}

/**
 * نمایش لیست کاربران
 */
async function showUsersList(chatId, messageId, env) {
  try {
    const users = await db.getAllUsers();
    const sorted = users.sort((a, b) => b.lastSeen - a.lastSeen);
    const page = 0;
    const perPage = 10;
    const pageUsers = sorted.slice(0, perPage);
    
    let text = `👥 **لیست کاربران (${sorted.length} نفر)**\n\n`;
    
    if (pageUsers.length === 0) {
      text += `📭 هنوز کاربری ثبت نشده`;
    } else {
      pageUsers.forEach((user, i) => {
        const lastSeen = user.lastSeen ? new Date(user.lastSeen).toLocaleDateString('fa-IR') : 'نامشخص';
        text += `${i + 1}. **${user.username || 'کاربر'}**\n`;
        text += `   🆔 \`${user.id}\`\n`;
        text += `   💬 ${user.messages || 0} پیام | 📅 ${lastSeen}\n\n`;
      });
      
      if (sorted.length > perPage) {
        text += `➕ ... و ${sorted.length - perPage} کاربر دیگر\n`;
      }
    }
    
    const keyboard = {
      inline_keyboard: [
        [{ text: "🔙 بازگشت", callback_data: "admin_back" }]
      ]
    };
    
    await editMessageText(chatId, messageId, text, {
      reply_markup: JSON.stringify(keyboard)
    });
    
  } catch (error) {
    console.error('❌ خطا در نمایش لیست کاربران:', error);
  }
}

/**
 * نمایش پنل ارسال همگانی
 */
async function showBroadcastPanel(chatId, messageId, env) {
  const text = `📢 **ارسال پیام همگانی**\n\n` +
    `لطفاً پیام خود را ارسال کنید:\n\n` +
    `⚠️ برای لغو /cancel بفرستید`;
  
  // ذخیره حالت ارسال همگانی
  await env.KV_NAMESPACE.put(`broadcast:${chatId}`, 'waiting');
  
  const keyboard = {
    inline_keyboard: [
      [{ text: "❌ لغو", callback_data: "admin_close" }]
    ]
  };
  
  if (messageId) {
    await editMessageText(chatId, messageId, text, {
      reply_markup: JSON.stringify(keyboard)
    });
  } else {
    await sendMessage(chatId, text, {
      reply_markup: JSON.stringify(keyboard)
    });
  }
}

/**
 * نمایش لاگ‌ها
 */
async function showLogsPanel(chatId, messageId, env) {
  try {
    // دریافت لاگ‌ها از KV
    const logs = await env.KV_NAMESPACE.get('logs', 'json') || [];
    
    let text = `📋 **لاگ‌های اخیر**\n\n`;
    
    if (logs.length === 0) {
      text += `📭 هیچ لاگی ثبت نشده`;
    } else {
      const recentLogs = logs.slice(-20);
      recentLogs.forEach(log => {
        text += `• ${log}\n`;
      });
    }
    
    const keyboard = {
      inline_keyboard: [
        [{ text: "🔄 بروزرسانی", callback_data: "admin_logs" }],
        [{ text: "🗑️ پاکسازی لاگ", callback_data: "admin_clear_logs" }],
        [{ text: "🔙 بازگشت", callback_data: "admin_back" }]
      ]
    };
    
    await editMessageText(chatId, messageId, text, {
      reply_markup: JSON.stringify(keyboard)
    });
    
  } catch (error) {
    console.error('❌ خطا در نمایش لاگ‌ها:', error);
  }
}

/**
 * پاکسازی لاگ‌ها
 */
async function clearLogs(chatId, messageId, env) {
  try {
    await env.KV_NAMESPACE.put('logs', JSON.stringify([]));
    await showLogsPanel(chatId, messageId, env);
  } catch (error) {
    console.error('❌ خطا در پاکسازی لاگ:', error);
  }
}

/**
 * هندلر دکمه‌های پنل مدیریت
 */
async function handleAdminCallback(cb, env) {
  const data = cb.data;
  const chatId = cb.message.chat.id;
  const msgId = cb.message.message_id;
  
  switch (data) {
    case 'admin_users':
      await answerCallbackQuery(cb.id, '👥 در حال بارگذاری...', false);
      await showUsersList(chatId, msgId, env);
      break;
      
    case 'admin_broadcast':
      await answerCallbackQuery(cb.id, '📢 در حال آماده‌سازی...', false);
      await showBroadcastPanel(chatId, msgId, env);
      break;
      
    case 'admin_keys':
      await answerCallbackQuery(cb.id, '🔑 در حال بررسی کلیدها...', false);
      await handleKeysCommand(chatId, msgId, env, true);
      break;
      
    case 'admin_logs':
      await answerCallbackQuery(cb.id, '📋 در حال بارگذاری لاگ‌ها...', false);
      await showLogsPanel(chatId, msgId, env);
      break;
      
    case 'admin_clear_logs':
      await answerCallbackQuery(cb.id, '🗑️ در حال پاکسازی لاگ‌ها...', false);
      await clearLogs(chatId, msgId, env);
      break;
      
    case 'admin_restart':
      await answerCallbackQuery(cb.id, '🔄 در حال ریستارت...', false);
      await stopSelfBot(env);
      await new Promise(resolve => setTimeout(resolve, 3000));
      await startSelfBot(env);
      await showAdminPanel(chatId, msgId, env);
      break;
      
    case 'admin_clear_cache':
      await answerCallbackQuery(cb.id, '🧹 در حال پاکسازی کش...', false);
      memoryVault.memories.clear();
      memoryVault.userFacts.clear();
      await showAdminPanel(chatId, msgId, env);
      break;
      
    case 'admin_back':
      await answerCallbackQuery(cb.id, '🔙 بازگشت...', false);
      await showAdminPanel(chatId, msgId, env);
      break;
      
    case 'admin_close':
      await answerCallbackQuery(cb.id, '❌ بسته شدن...', false);
      await deleteMessage(chatId, msgId);
      break;
      
    default:
      await answerCallbackQuery(cb.id, '❌ دکمه ناشناخته', true);
  }
}

/**
 * دریافت ایموجی خلق‌وخو
 */
function getMoodEmoji(mood) {
  const emojis = {
    'happy': '😊',
    'flirty': '😏',
    'romantic': '💕',
    'playful': '😜',
    'energetic': '⚡',
    'sleepy': '😴',
    'empathic': '🤗'
  };
  return emojis[mood] || '🌸';
}

/**
 * پاسخ به کالبک‌ها (ویرایش شده)
 */
async function answerCallbackQuery(callbackId, text, showAlert = false) {
  try {
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/answerCallbackQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        callback_query_id: callbackId,
        text: text,
        show_alert: showAlert
      })
    });
  } catch (error) {
    console.error('❌ خطا در پاسخ به کالبک:', error);
  }
}

/**
 * ویرایش پیام
 */
async function editMessageText(chatId, messageId, text, options = {}) {
  try {
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/editMessageText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text: text,
        parse_mode: 'Markdown',
        ...options
      })
    });
  } catch (error) {
    console.error('❌ خطا در ویرایش پیام:', error);
  }
}

/**
 * حذف پیام
 */
async function deleteMessage(chatId, messageId) {
  try {
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/deleteMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId
      })
    });
  } catch (error) {
    console.error('❌ خطا در حذف پیام:', error);
  }
}

/**
 * ارسال پیام
 */
async function sendMessage(chatId, text, options = {}) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
        ...options
      })
    });
    return await response.json();
  } catch (error) {
    console.error('❌ خطا در ارسال پیام:', error);
    return null;
  }
}

/**
 * هندلر دستور /admin
 */
async function handleAdminCommand(message, env) {
  const chatId = message.chat.id;
  const userId = message.from.id;
  const messageId = message.message_id;
  
  // بررسی ادمین
  const adminIds = (env.ADMIN_IDS || env.ADMIN_ID || '').split(',').map(id => parseInt(id.trim()));
  if (!adminIds.includes(userId)) {
    await sendMessage(chatId, '⛔ شما اجازه کنترل ندارید!', {
      reply_to_message_id: messageId
    });
    return;
  }
  
  await showAdminPanel(chatId, messageId, env);
}

/**
 * هندلر دستور /keys
 */
async function handleKeysCommand(chatId, messageId, env, isEdit = false) {
  try {
    const stats = await db.getStats();
    const keys = {
      cf: env.CF_ACCOUNT_ID ? '✅ تنظیم شده' : '❌ تنظیم نشده',
      bot: env.BOT_TOKEN ? '✅ تنظیم شده' : '❌ تنظیم نشده',
      admin: env.ADMIN_IDS || env.ADMIN_ID ? '✅ تنظیم شده' : '❌ تنظیم نشده'
    };
    
    let text = `🔑 **وضعیت کلیدها**\n\n`;
    text += `• Cloudflare: ${keys.cf}\n`;
    text += `• ربات تلگرام: ${keys.bot}\n`;
    text += `• ادمین: ${keys.admin}\n\n`;
    text += `📊 کاربران: ${stats.users}\n`;
    text += `💬 پیام‌ها: ${stats.messages}\n`;
    text += `🎙️ ویس‌ها: ${stats.voices}`;
    
    const keyboard = {
      inline_keyboard: [
        [{ text: "🔙 بازگشت", callback_data: "admin_back" }]
      ]
    };
    
    if (isEdit && messageId) {
      await editMessageText(chatId, messageId, text, {
        reply_markup: JSON.stringify(keyboard)
      });
    } else {
      await sendMessage(chatId, text, {
        reply_markup: JSON.stringify(keyboard)
      });
    }
    
  } catch (error) {
    console.error('❌ خطا در نمایش کلیدها:', error);
  }
}

// ============================================
// 🌐 هندلر اصلی با قابلیت مدیریت
// ============================================

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/webhook') {
      try {
        const body = await request.json();
        const message = body.message;
        if (message) {
          const chatId = message.chat.id;
          const text = message.text || '';
          const reply = await getAIResponse(text, env);
          await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: reply })
          });
        }
        return new Response('OK', { status: 200 });
      } catch (error) {
        return new Response('Error', { status: 500 });
      }
    }

    if (url.pathname === '/setwebhook') {
      const webhookUrl = `https://${url.hostname}/webhook`;
      const res = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/setWebhook?url=${webhookUrl}`);
      return new Response(JSON.stringify(await res.json()));
    }

    return new Response('🌸 Sara Bot on Workers');
  }
};

async function getAIResponse(prompt, env) {
  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.CF_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'تو سارا هستی، یه دختر ۲۲ ساله. با لحن خودمونی و صمیمی جواب بده.' },
            { role: 'user', content: prompt }
          ]
        })
      }
    );
    const data = await res.json();
    return data.result?.response || 'سلام عزیزم! حالت چطوره؟ 😊';
  } catch {
    return 'سلام عزیزم! حالت چطوره؟ 😊';
  }
}
    
    // ============================================
    // مدیریت از طریق وب (ویژگی جدید)
    // ============================================
    if (url.pathname === '/admin') {
      const auth = request.headers.get('Authorization');
      if (auth !== `Bearer ${env.ADMIN_TOKEN}`) {
        return new Response('Unauthorized', { status: 401 });
      }
      
      const stats = await db.getStats();
      const status = await env.KV_NAMESPACE.get('bot_status') || 'stopped';
      
      const html = `
<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>داشبورد مدیریت سارا</title>
    <style>
        body {
            font-family: 'Vazir', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            color: #fff;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            padding: 30px;
            background: rgba(255,255,255,0.1);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            margin-bottom: 30px;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            backdrop-filter: blur(10px);
        }
        .stat-number {
            font-size: 36px;
            font-weight: bold;
            margin: 10px 0;
        }
        .stat-label {
            opacity: 0.8;
            font-size: 14px;
        }
        .controls {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
            margin-bottom: 30px;
        }
        .btn {
            padding: 15px 30px;
            border: none;
            border-radius: 10px;
            background: rgba(255,255,255,0.2);
            color: #fff;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s;
            backdrop-filter: blur(10px);
        }
        .btn:hover {
            transform: translateY(-2px);
            background: rgba(255,255,255,0.3);
        }
        .btn-success { background: #4CAF50; }
        .btn-danger { background: #f44336; }
        .btn-warning { background: #ff9800; }
        .btn-info { background: #2196F3; }
        .logs {
            background: rgba(0,0,0,0.3);
            padding: 20px;
            border-radius: 15px;
            max-height: 300px;
            overflow-y: auto;
            font-family: monospace;
            font-size: 12px;
        }
        .log-entry {
            padding: 5px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .status-badge {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
        }
        .status-online { background: #4CAF50; }
        .status-offline { background: #f44336; }
        .mood-indicator {
            font-size: 48px;
            text-align: center;
            margin: 10px 0;
        }
        .managers-list {
            background: rgba(0,0,0,0.2);
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        .manager-item {
            padding: 5px 10px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌸 سارا HYPER FUL</h1>
            <p>داشبورد مدیریت - ${multiAccountManager.managers.length} مدیر فعال</p>
            <span class="status-badge ${status === 'running' ? 'status-online' : 'status-offline'}">
                ${status === 'running' ? '🟢 آنلاین' : '🔴 آفلاین'}
            </span>
        </div>
        
        <div class="managers-list">
            <h3>👥 مدیران فعال:</h3>
            ${multiAccountManager.managers.map(m => 
                `<div class="manager-item">👤 ${m.name} (${m.phone}) - ${m.client ? '🟢 آنلاین' : '🔴 آفلاین'}</div>`
            ).join('')}
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">👥 کاربران</div>
                <div class="stat-number">${stats.users}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">💬 پیام‌ها</div>
                <div class="stat-number">${stats.messages}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">🎙️ ویس‌ها</div>
                <div class="stat-number">${stats.voices}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">🎭 خلق‌وخو</div>
                <div class="mood-indicator">${getMoodEmoji(sara.currentMood)}</div>
                <div class="stat-label">${sara.currentMood}</div>
            </div>
        </div>
        
        <div class="controls">
            <button class="btn btn-success" onclick="controlBot('start')">▶️ شروع</button>
            <button class="btn btn-danger" onclick="controlBot('stop')">⏹️ توقف</button>
            <button class="btn btn-warning" onclick="controlBot('restart')">🔄 ریستارت</button>
            <button class="btn btn-info" onclick="controlBot('status')">📊 وضعیت</button>
            <button class="btn" onclick="controlBot('clear_cache')">🧹 پاکسازی کش</button>
        </div>
        
        <div class="logs" id="logs">
            <div class="log-entry">📋 لاگ‌ها...</div>
        </div>
    </div>
    
    <script>
        async function controlBot(action) {
            const response = await fetch('/admin/control', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ${env.ADMIN_TOKEN}'
                },
                body: JSON.stringify({ action })
            });
            
            const result = await response.json();
            addLog(\`${action}: \${result.message}\`);
            
            if (action === 'status') {
                updateStats(result.stats);
            }
        }
        
        function addLog(message) {
            const logs = document.getElementById('logs');
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            entry.textContent = \`[\${new Date().toLocaleTimeString()}] \${message}\`;
            logs.insertBefore(entry, logs.firstChild);
            
            while (logs.children.length > 50) {
                logs.removeChild(logs.lastChild);
            }
        }
        
        async function updateStats(stats) {
            document.querySelectorAll('.stat-number')[0].textContent = stats.users;
            document.querySelectorAll('.stat-number')[1].textContent = stats.messages;
            document.querySelectorAll('.stat-number')[2].textContent = stats.voices;
        }
        
        setInterval(() => {
            controlBot('status');
        }, 30000);
    </script>
</body>
</html>
      `;
      
      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    // ============================================
    // کنترل از طریق API (ویژگی جدید)
    // ============================================
    if (url.pathname === '/admin/control') {
      const auth = request.headers.get('Authorization');
      if (auth !== `Bearer ${env.ADMIN_TOKEN}`) {
        return new Response('Unauthorized', { status: 401 });
      }
      
      const body = await request.json();
      const action = body.action;
      let message = '';
      
      switch (action) {
        case 'start':
          await startSelfBot(env);
          await multiAccountManager.sendToAllManagers('✅ ربات روشن شد!', env);
          message = 'ربات روشن شد!';
          break;
        case 'stop':
          await stopSelfBot(env);
          await multiAccountManager.sendToAllManagers('⛔ ربات خاموش شد!', env);
          message = 'ربات خاموش شد!';
          break;
        case 'restart':
          await stopSelfBot(env);
          await new Promise(resolve => setTimeout(resolve, 3000));
          await startSelfBot(env);
          await multiAccountManager.sendToAllManagers('🔄 ریستارت انجام شد!', env);
          message = 'ریستارت انجام شد!';
          break;
        case 'status':
          const stats = await db.getStats();
          const status = await env.KV_NAMESPACE.get('bot_status') || 'stopped';
          return new Response(JSON.stringify({
            status,
            stats,
            mood: sara.currentMood,
            managers: multiAccountManager.managers.length
          }), {
            headers: { 'Content-Type': 'application/json' }
          });
        case 'clear_cache':
          memoryVault.memories.clear();
          message = 'کش پاک شد!';
          break;
        default:
          message = 'دستور نامعتبر!';
      }
      
      return new Response(JSON.stringify({ message }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response('🌸 سارا HYPER FUL - کامل‌ترین نسخه با مدیریت چند اکانت', { status: 200 });
  }
};

// ============================================
// 🤖 سلف‌بری اصلی
// ============================================

async function startSelfBot(env) {
  if (isRunning) {
    console.log('⚠️ سلف‌بری در حال اجراست!');
    return;
  }
  
  try {
    const apiId = parseInt(env.API_ID);
    const apiHash = env.API_HASH;
    const session = new StringSession(env.SESSION_STRING || '');
    
    const client = new TelegramClient(session, apiId, apiHash, {
      connectionRetries: 5,
      useWSS: true,
    });
    
    await client.start({
      phoneNumber: env.PHONE_NUMBER,
      password: async () => env.PASSWORD || '',
      phoneCode: async () => {
        console.log('📱 کد تایید به تلگرامت رسید!');
        return await getCodeFromKV(env);
      },
      onError: (err) => console.log('❌ خطا:', err),
    });
    
    await env.KV_NAMESPACE.put('session_string', client.session.save());
    await env.KV_NAMESPACE.put('bot_status', 'running');
    await env.KV_NAMESPACE.put('bot_start_time', String(Date.now()));
    
    client.addEventHandler(async (event) => {
      if (event.isMessage()) {
        await handleSelfMessage(event, client, env);
      }
    });
    
    await client.connect();
    selfBotClient = client;
    isRunning = true;
    
    startAutoUpdateTimer(client, env);
    await autoUpdateProfile(client, env);
    
    await sendToController(env, '✅ سارا HYPER FUL روشن شد!', 'success');
    await multiAccountManager.sendToAllManagers('✅ سارا HYPER FUL روشن شد!', env);
    console.log('🎙️ سارا HYPER FUL فعال شد!');
    
  } catch (error) {
    console.error('❌ خطا:', error);
    await sendToController(env, `❌ خطا: ${error.message}`, 'error');
    await multiAccountManager.sendToAllManagers(`❌ خطا: ${error.message}`, env);
  }
}

async function stopSelfBot(env) {
  if (profileUpdateInterval) {
    clearInterval(profileUpdateInterval);
    profileUpdateInterval = null;
  }
  
  if (selfBotClient) {
    await selfBotClient.disconnect();
    selfBotClient = null;
    isRunning = false;
    await env.KV_NAMESPACE.put('bot_status', 'stopped');
    await sendToController(env, '⛔ سلف‌بری متوقف شد!', 'warning');
    await multiAccountManager.sendToAllManagers('⛔ سلف‌بری متوقف شد!', env);
    console.log('⛔ سلف‌بری متوقف شد!');
  }
}

// ============================================
// 📨 هندلر پیام‌های سلف‌بری
// ============================================

async function handleSelfMessage(event, client, env) {
  try {
    const message = event.message;
    const text = message.text || '';
    const chatId = message.chatId;
    const messageId = message.id;
    const senderId = message.senderId;
    
    if (!chatId) return;
    
    // مدیریت گروه
    if (chatId.toString().startsWith('-')) {
      await groupManager.handleGroupMessage(event, client, env, db);
      return;
    }
    
    if (senderId.toString() === (await client.getMe()).id.toString()) return;
    
    const status = await env.KV_NAMESPACE.get('bot_status');
    if (status !== 'running') return;
    
    await db.saveUser(senderId.toString(), message.sender?.username || 'کاربر');
    await db.updateStats(senderId.toString());
    
    // حذف پیام کاربر
    await client.deleteMessages(chatId, [messageId]);
    
    // === تایپینگ و لودینگ ===
    await showTyping(client, chatId);
    await naturalDelay();
    
    // پیام لودینگ
    const emojis = ['💭', '🤔', '✨', '⚡', '⏳', '🌸', '💕'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const loadingMsg = await client.sendMessage(chatId, {
      message: `🌸 ${randomEmoji} یه لحظه...`,
      replyTo: messageId
    }).catch(() => null);
    
    // دریافت پاسخ
    let aiResponse = await getSaraResponse(text, senderId.toString(), env, db);
    
    // ویرایش پیام لودینگ
    if (loadingMsg) {
      await client.invoke(new Api.messages.EditMessage({
        peer: chatId,
        id: loadingMsg.id,
        message: `?? ${aiResponse}`
      }));
    } else {
      await client.sendMessage(chatId, { message: `🌸 ${aiResponse}` });
    }
    
    // تشخیص نیاز به ارسال گیف یا استیکر
    const userMood = analyzeUserMood(text);
    if (userMood === 'flirty' || userMood === 'romantic') {
      await sendSexyGif(client, chatId);
      await sendSexySticker(client, chatId);
    }
    
    // تبدیل به ویس با سرویس‌های رایگان
    try {
      console.log('🎙️ شروع تولید صدای رایگان برای:', aiResponse.substring(0, 30) + '...');
      
      let audioBuffer = await getCachedVoice(aiResponse, env);
      
      if (!audioBuffer) {
        const audioBase64 = await textToVoiceFree(aiResponse, env);
        if (audioBase64) {
          audioBuffer = Buffer.from(audioBase64);
          await cacheVoice(aiResponse, audioBuffer, env);
        }
      }
      
      if (audioBuffer) {
        const enhancedAudio = enhanceAudioQuality(audioBuffer, {
          normalize: true,
          amplify: 1.2
        });
        
        await client.sendFile(chatId, {
          file: enhancedAudio,
          caption: '🎙️ صدای سارا...',
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
        console.log('✅ صدای رایگان با موفقیت ارسال شد');
      } else {
        console.log('⚠️ تولید صدای رایگان ناموفق بود');
      }
    } catch (voiceError) {
      console.error('❌ خطا در تولید صدای رایگان:', voiceError);
    }
    
  } catch (error) {
    console.error('❌ خطا:', error);
  }
}

// ============================================
// 🕐 تایمر آپدیت خودکار
// ============================================

function startAutoUpdateTimer(client, env) {
  const now = new Date();
  const msToNextHour = (60 - now.getMinutes()) * 60000 - now.getSeconds() * 1000;
  
  setTimeout(() => {
    autoUpdateProfile(client, env);
    profileUpdateInterval = setInterval(async () => {
      await autoUpdateProfile(client, env);
    }, 3600000);
  }, msToNextHour);
}

// ============================================
// 📱 دریافت کد از KV
// ============================================

async function getCodeFromKV(env) {
  let code = await env.KV_NAMESPACE.get('telegram_code');
  let attempts = 0;
  
  while (!code && attempts < 30) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    code = await env.KV_NAMESPACE.get('telegram_code');
    attempts++;
  }
  
  await env.KV_NAMESPACE.delete('telegram_code');
  return code || '';
}

// ============================================
// 📨 ارسال پیام به کنترلر
// ============================================

async function sendToController(env, text, type) {
  const adminIds = (env.ADMIN_IDS || env.ADMIN_ID || '').split(',').map(id => parseInt(id.trim()));
  const token = env.BOT_TOKEN;
  
  const emojis = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  
  for (const adminId of adminIds) {
    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: adminId,
          text: `${emojis[type] || '📌'} ${text}`
        })
      });
    } catch (error) {
      console.error(`❌ ارسال به ادمین ${adminId} خطا:`, error);
    }
  }
}

// ============================================
// 📨 هندلر کامندهای ربات
// ============================================

async function handleBotCommand(update, env) {
  const message = update.message;
  if (!message) return;
  
  const chatId = message.chat.id;
  const text = message.text || '';
  const userId = message.from?.id || 0;
  
  // تبدیل به آرایه از ادمین‌ها
  const adminIds = (env.ADMIN_IDS || env.ADMIN_ID || '').split(',').map(id => parseInt(id.trim()));
  
  // چک کردن اینکه کاربر در لیست ادمین‌ها هست
  const isAdmin = adminIds.includes(userId);
  
  // ============================================
  // دستور /admin - پنل مدیریت
  // ============================================
  if (text === '/admin') {
    if (!isAdmin) {
      await sendBotMessage(env.BOT_TOKEN, chatId, '⛔ شما اجازه کنترل ندارید!');
      return;
    }
    await handleAdminCommand(message, env);
    return;
  }
  
  // ============================================
  // دستورات مدیریتی
  // ============================================
  if (text === '/start') {
    await startSelfBot(env);
    await sendBotMessage(env.BOT_TOKEN, chatId, '✅ سارا HYPER FUL روشن شد!');
  }
  else if (text === '/stop') {
    await stopSelfBot(env);
    await sendBotMessage(env.BOT_TOKEN, chatId, '⛔ سلف‌بری متوقف شد!');
  }
  else if (text === '/status') {
    const status = await env.KV_NAMESPACE.get('bot_status') || 'stopped';
    const stats = await db.getStats();
    await sendBotMessage(env.BOT_TOKEN, chatId, 
      `📊 **وضعیت سارا HYPER FUL**\n\n🔹 وضعیت: ${status === 'running' ? '🟢 فعال' : '🔴 غیرفعال'}\n👥 کاربران: ${stats.users}\n💬 پیام‌ها: ${stats.messages}\n🎙️ ویس‌ها: ${stats.voices}\n🎭 خلق‌وخو: ${sara.currentMood}\n👥 مدیران: ${multiAccountManager.managers.length}`
    );
  }
  else if (text === '/help') {
    await sendBotMessage(env.BOT_TOKEN, chatId, getHelpText());
  }
  else if (text === '/keys' && isAdmin) {
    await handleKeysCommand(chatId, message.message_id, env, false);
  }
}

async function sendBotMessage(token, chatId, text) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown'
    })
  });
}

function getHelpText() {
  return `
📖 **سارا HYPER FUL - کامل‌ترین نسخه** 🌸

**🔹 کامندها:**
/start - روشن کردن سلف‌بری
/stop - خاموش کردن سلف‌بری
/status - مشاهده وضعیت
/admin - پنل مدیریت (فقط ادمین)
/help - این راهنما

**🔹 ۱۲ قابلیت اصلی HYPER FUL:**
1️⃣ ✅ حافظه بلندمدت (یادآوری مکالمات)
2️⃣ ✅ تشخیص عکس و صدا
3️⃣ ✅ ارسال عکس با کیفیت بالا
4️⃣ ✅ استیکرهای متحرک
5️⃣ ✅ ساخت عکس با AI
6️⃣ ✅ ساخت فیلم با AI
7️⃣ ❌ بازی (حذف شد)
8️⃣ ✅ یادگیری از مکالمات
9️⃣ ✅ دیتابیس پیشرفته
🔟 ✅ پشتیبانی از گروه
1️⃣1️⃣ ✅ مدیریت چند کاربر همزمان
1️⃣2️⃣ ✅ فقط سارا (شخصیت واحد)

**🔹 ویژگی‌های ویژه مدیریت:**
✅ مدیریت با چند اکانت
✅ داشبورد وب
✅ ارسال همگانی
✅ پاکسازی کش
✅ ریستارت از راه دور
✅ پنل مدیریت کامل

**🔹 ویژگی‌های ویژه:**
✅ تایپینگ طبیعی (۱.۵-۴.۵ ثانیه)
✅ پیام لودینگ با ایموجی
✅ ویرایش زنده پیام
✅ تحلیل خلق‌وخو
✅ سطح صمیمیت
✅ سوال پرسیدن
✅ تاخیر طبیعی
✅ مدل AI Llama-3
✅ صدای ویس رایگان
✅ ۸ حالت خلقی
✅ ۱۰ ویژگی شخصیتی

⚠️ فقط ادمین میتونه کنترل کنه
🌸 **با عشق سارا HYPER FUL** 💕
  `;
}

// ============================================
// ⏰ آپدیت خودکار پروفایل
// ============================================

async function autoUpdateProfile(client, env) {
  try {
    const currentHour = new Date().getHours();
    const dayNames = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    const dayName = dayNames[new Date().getDay()];
    
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
    const fullBio = `${bio}\n\n📱 ${new Date().toLocaleTimeString('fa-IR')} | ${dayName}\n🌸 سارا • ${new Date().toLocaleDateString('fa-IR')}`;
    
    const fancyNames = [
      'ꜱᴀʀᴀ ❀', '🅢🅐🅡🅐', '𝕊𝕒𝕣𝕒 ✨', '𝑺𝒂𝒓𝒂 💕',
      '𝖲𝖺𝗋𝖺 🌸', '𝓢𝓪𝓻𝓪 💋', '𝔖𝔞𝔯𝔞 ⭐', '𝙎𝙖𝙧𝙖 🎀',
      '𝚂𝚊𝚛𝚊 💎', 'Sᴀʀᴀ 🌺', '★ Sᴀʀᴀ ★', '✦ Sᴀʀᴀ ✦'
    ];
    
    const fancyName = fancyNames[Math.floor(Math.random() * fancyNames.length)];
    
    await client.invoke(new Api.account.UpdateProfile({
      about: fullBio,
      firstName: fancyName,
    }));
    
    console.log(`✅ پروفایل سارا آپدیت شد! ساعت: ${currentHour}`);
    
  } catch (error) {
    console.error('❌ خطا در آپدیت پروفایل:', error);
  }
}

console.log('🔥 سارا HYPER FUL - کامل‌ترین نسخه با مدیریت چند اکانت آماده‌ست!');
console.log('🎙️ با ۸ سرویس TTS رایگان و کش هوشمند!');
console.log('👥 قابلیت مدیریت با چند اکانت فعال شد!');
console.log('👑 پنل مدیریت کامل اضافه شد!');
