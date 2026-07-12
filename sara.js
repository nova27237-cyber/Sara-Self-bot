// ============================================
// 📁 index.js - سارا HYPER FUL ULTIMATE
// کامل‌ترین نسخه با پنل همگانی + دو زبانه
// ============================================

// ============================================
// 🌐 سیستم دو زبانه (فارسی/انگلیسی)
// ============================================

const translations = {
  fa: {
    // پیام‌های عمومی
    welcome: '🌸 سلام {}! به سارا خوش آمدی! حالت چطوره؟',
    help: `
📖 **راهنمای سارا HYPER FUL** 🌸

**🔹 دستورات عمومی:**
/start - روشن کردن ربات
/stop - خاموش کردن ربات
/status - وضعیت سیستم
/panel - پنل مدیریت
/help - این راهنما
/lang - تغییر زبان (فارسی/انگلیسی)

**🔹 دستورات مدیریت:**
/admin - پنل مدیریت کامل
/users - لیست کاربران
/broadcast - ارسال همگانی
/stats - آمار دقیق
/clear_cache - پاکسازی کش
/restart - ریستارت ربات

**🔹 ویژگی‌ها:**
✅ حافظه بلندمدت
✅ تشخیص عکس و صدا
✅ ساخت عکس با AI
✅ ساخت فیلم با AI
✅ یادگیری از مکالمات
✅ پشتیبانی از گروه
✅ مدیریت چند کاربر
✅ تبدیل متن به صدا
✅ پنل همگانی
✅ دو زبانه (فارسی/انگلیسی)

🌸 **با عشق سارا** 💕
    `,
    status: `
📊 **وضعیت سارا HYPER FUL**

🔹 وضعیت: {}
👥 کاربران: {}
💬 پیام‌ها: {}
🎙️ ویس‌ها: {}
🎭 خلق‌وخو: {}
⏱️ آپ‌تایم: {}
👥 مدیران: {}
    `,
    admin_panel: `
👑 **پنل مدیریت سارا HYPER FUL**

📊 **آمار کلی:**
• 👥 کاربران: {}
• 💬 پیام‌ها: {}
• 🎙️ ویس‌ها: {}
• 🎭 خلق‌وخو: {}
• 👥 مدیران: {}

⚡ **وضعیت سیستم:**
• وضعیت: {}
• ⏱️ آپ‌تایم: {}
• 📅 تاریخ: {}
• 🕐 ساعت: {}

💡 برای مدیریت از دکمه‌ها استفاده کنید
    `,
    broadcast_start: '📢 **ارسال همگانی**\n\nلطفاً پیام خود را ارسال کنید.\nبرای لغو /cancel بفرستید.',
    broadcast_sent: '✅ پیام به {} نفر ارسال شد!',
    broadcast_cancel: '❌ ارسال همگانی لغو شد!',
    no_access: '⛔ شما دسترسی به این بخش ندارید!',
    user_list: '👥 **لیست کاربران ({} نفر)**\n\n{}',
    keys_status: '🔑 **وضعیت کلیدها**\n\n• Cloudflare: {}\n• ربات تلگرام: {}\n• ادمین: {}\n• API تلگرام: {}',
    cache_cleared: '🧹 کش حافظه پاک شد!',
    restarting: '🔄 در حال ریستارت...',
    restart_done: '✅ ریستارت انجام شد!',
    bot_started: '✅ سارا HYPER FUL روشن شد!',
    bot_stopped: '⛔ سارا HYPER FUL خاموش شد!',
    language_changed: '🌐 زبان به {} تغییر کرد!',
    current_lang: '🌐 زبان فعلی: {}',
    choose_lang: '🌐 **انتخاب زبان:**\n\nلطفاً زبان مورد نظر خود را انتخاب کنید.',
    voice_sent: '🎙️ صدای سارا...',
    thinking: '🌸 {} یه لحظه...',
    error: '❌ خطایی رخ داد! لطفاً دوباره تلاش کنید.',
    goodbye: '🌸 خداحافظ عزیزم! منتظرت هستم! 💕',
    welcome_back: '🌸 خوش برگشتی {}! دلم برات تنگ شده بود! 💕'
  },
  en: {
    welcome: '🌸 Hello {}! Welcome to Sara! How are you?',
    help: `
📖 **Sara HYPER FUL Guide** 🌸

**🔹 General Commands:**
/start - Start the bot
/stop - Stop the bot
/status - System status
/panel - Admin panel
/help - This guide
/lang - Change language (Persian/English)

**🔹 Admin Commands:**
/admin - Full admin panel
/users - User list
/broadcast - Broadcast message
/stats - Detailed stats
/clear_cache - Clear cache
/restart - Restart bot

**🔹 Features:**
✅ Long-term memory
✅ Image & voice recognition
✅ AI image generation
✅ AI video generation
✅ Learning from conversations
✅ Group support
✅ Multi-user management
✅ Text-to-speech
✅ Public panel
✅ Bilingual (Persian/English)

🌸 **With love, Sara** 💕
    `,
    status: `
📊 **Sara HYPER FUL Status**

🔹 Status: {}
👥 Users: {}
💬 Messages: {}
🎙️ Voices: {}
🎭 Mood: {}
⏱️ Uptime: {}
👥 Managers: {}
    `,
    admin_panel: `
👑 **Sara HYPER FUL Admin Panel**

📊 **Statistics:**
• 👥 Users: {}
• 💬 Messages: {}
• 🎙️ Voices: {}
• 🎭 Mood: {}
• 👥 Managers: {}

⚡ **System Status:**
• Status: {}
• ⏱️ Uptime: {}
• 📅 Date: {}
• 🕐 Time: {}

💡 Use buttons below for management
    `,
    broadcast_start: '📢 **Broadcast Message**\n\nPlease send your message.\nSend /cancel to cancel.',
    broadcast_sent: '✅ Message sent to {} users!',
    broadcast_cancel: '❌ Broadcast cancelled!',
    no_access: '⛔ You don\'t have access to this section!',
    user_list: '👥 **Users List ({} users)**\n\n{}',
    keys_status: '🔑 **Keys Status**\n\n• Cloudflare: {}\n• Bot Token: {}\n• Admin: {}\n• Telegram API: {}',
    cache_cleared: '🧹 Cache cleared!',
    restarting: '🔄 Restarting...',
    restart_done: '✅ Restart completed!',
    bot_started: '✅ Sara HYPER FUL started!',
    bot_stopped: '⛔ Sara HYPER FUL stopped!',
    language_changed: '🌐 Language changed to {}!',
    current_lang: '🌐 Current language: {}',
    choose_lang: '🌐 **Choose Language:**\n\nPlease select your preferred language.',
    voice_sent: '🎙️ Sara\'s voice...',
    thinking: '🌸 {} Just a moment...',
    error: '❌ An error occurred! Please try again.',
    goodbye: '🌸 Goodbye dear! I\'ll be waiting for you! 💕',
    welcome_back: '🌸 Welcome back {}! I missed you! 💕'
  }
};

// ============================================
// 🗣️ کلاس مدیریت زبان
// ============================================

class LanguageManager {
  constructor() {
    this.userLang = new Map();
    this.defaultLang = 'fa';
  }

  getUserLang(userId) {
    return this.userLang.get(userId) || this.defaultLang;
  }

  setUserLang(userId, lang) {
    if (translations[lang]) {
      this.userLang.set(userId, lang);
      return true;
    }
    return false;
  }

  t(userId, key, ...args) {
    const lang = this.getUserLang(userId);
    const text = translations[lang]?.[key] || translations[this.defaultLang][key] || key;
    
    if (args.length > 0) {
      return text.replace(/{}/g, () => args.shift());
    }
    return text;
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
  'https://media.giphy.com/media/26BGI0P7qlyPp8BqU/giphy.gif',
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
// 💾 ۱. حافظه بلندمدت (Memory Vault) - بهبود یافته
// ============================================

class MemoryVault {
  constructor() {
    this.memories = new Map();
    this.userFacts = new Map();
    this.importantMoments = new Map();
    this.conversationContext = new Map();
    this.userPreferences = new Map();
  }

  saveMemory(userId, text, response) {
    const userMem = this.memories.get(userId) || [];
    userMem.push({
      text,
      response,
      time: Date.now(),
      importance: this.calculateImportance(text),
      mood: this.detectMood(text)
    });
    if (userMem.length > 200) userMem.shift();
    this.memories.set(userId, userMem);
    this.extractFacts(userId, text);
    this.updateContext(userId, text, response);
    this.updatePreferences(userId, text);
  }

  getRelevantMemories(userId, query) {
    const memories = this.memories.get(userId) || [];
    return memories.filter(m => this.similarity(m.text, query) > 0.2).slice(-15);
  }

  getContext(userId) {
    return this.conversationContext.get(userId) || [];
  }

  calculateImportance(text) {
    const importantWords = ['عشق', 'دوست', 'ازدواج', 'زندگی', 'بغض', 'اشک', 'دل', 'قلب', 'مرگ', 'زندگی', 'مرگ'];
    let score = 0;
    importantWords.forEach(word => {
      if (text.includes(word)) score += 0.2;
    });
    return Math.min(score, 1);
  }

  detectMood(text) {
    const lower = text.toLowerCase();
    if (lower.includes('ناراحت') || lower.includes('غمگین')) return 'sad';
    if (lower.includes('خوشحال') || lower.includes('عالی')) return 'happy';
    if (lower.includes('عصبانی') || lower.includes('خشم')) return 'angry';
    if (lower.includes('عاشق') || lower.includes('دوستت دارم')) return 'romantic';
    if (lower.includes('بوس') || lower.includes('بغل')) return 'flirty';
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
      /سن من ([\d]+) ساله/
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

  updatePreferences(userId, text) {
    const prefs = this.userPreferences.get(userId) || { topics: [], style: 'normal' };
    const topics = ['عشق', 'زندگی', 'کار', 'خانواده', 'دوستان', 'سلامتی', 'سرگرمی'];
    topics.forEach(topic => {
      if (text.includes(topic) && !prefs.topics.includes(topic)) {
        prefs.topics.push(topic);
      }
    });
    if (prefs.topics.length > 10) prefs.topics.shift();
    this.userPreferences.set(userId, prefs);
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

  getUserPreferences(userId) {
    return this.userPreferences.get(userId) || { topics: [], style: 'normal' };
  }

  getMemoryStats(userId) {
    const mem = this.memories.get(userId) || [];
    return {
      total: mem.length,
      important: mem.filter(m => m.importance > 0.5).length,
      moods: {
        happy: mem.filter(m => m.mood === 'happy').length,
        sad: mem.filter(m => m.mood === 'sad').length,
        romantic: mem.filter(m => m.mood === 'romantic').length,
        flirty: mem.filter(m => m.mood === 'flirty').length,
        angry: mem.filter(m => m.mood === 'angry').length,
        neutral: mem.filter(m => m.mood === 'neutral').length
      }
    };
  }
}
// ============================================
// 📸 ۲. تشخیص عکس و صدا (Media Processor) - بهبود یافته
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
        mood: data.result?.mood || 'happy',
        tags: data.result?.tags || [],
        text: data.result?.text || ''
      };
    } catch (error) {
      return { description: 'نتونستم ببینمش 😅', objects: [], mood: 'neutral', tags: [], text: '' };
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

  async analyzeVideo(videoBuffer, env) {
    try {
      // تحلیل فریم‌های ویدیو
      const frames = await this.extractFrames(videoBuffer, 5);
      const analysis = [];
      
      for (const frame of frames) {
        const result = await this.analyzeImage(frame, env);
        analysis.push(result);
      }
      
      return {
        mood: this.getAverageMood(analysis),
        description: analysis.map(a => a.description).join(' '),
        objects: [...new Set(analysis.flatMap(a => a.objects))],
        tags: [...new Set(analysis.flatMap(a => a.tags))]
      };
    } catch (error) {
      return { mood: 'neutral', description: 'نتونستم ویدیو رو تحلیل کنم', objects: [], tags: [] };
    }
  }

  async extractFrames(videoBuffer, count) {
    // ساده‌سازی: فقط چند فریم تصادفی
    const frames = [];
    const size = Math.floor(videoBuffer.byteLength / count);
    for (let i = 0; i < count; i++) {
      const start = i * size;
      const end = Math.min(start + size, videoBuffer.byteLength);
      frames.push(videoBuffer.slice(start, end));
    }
    return frames;
  }

  getAverageMood(analysis) {
    const moods = analysis.map(a => a.mood);
    const counts = {};
    moods.forEach(m => counts[m] = (counts[m] || 0) + 1);
    
    let maxCount = 0;
    let maxMood = 'neutral';
    for (const [mood, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        maxMood = mood;
      }
    }
    return maxMood;
  }
}

// ============================================
// 🖼️ ۳. ارسال عکس با کیفیت بالا - بهبود یافته
// ============================================

async function sendHighQualityPhoto(client, chatId, imageUrl, caption) {
  try {
    const response = await fetch(imageUrl);
    const imageBuffer = await response.arrayBuffer();
    
    await client.sendFile(chatId, {
      file: Buffer.from(imageBuffer),
      caption: caption || '🌸 سارا...',
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
// 🎬 ۴. استیکرهای متحرک - بهبود یافته
// ============================================

const animatedStickers = {
  kiss: 'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  hug: 'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  love: 'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  shy: 'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  happy: 'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  sad: 'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  angry: 'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  sleepy: 'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  playful: 'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q',
  romantic: 'CAACAgIAAxkBAAEBBQNkXxXwAAAWQnJ5m4Q'
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
// 🎨 ۵. ساخت عکس با AI - بهبود یافته
// ============================================

async function generateImage(prompt, env, style = 'realistic') {
  try {
    const styles = {
      realistic: 'عکسی واقعی از سارا، دختر ۲۲ ساله ایرانی زیبا',
      anime: 'انیمه‌ای از سارا، دختر ۲۲ ساله با چشم‌های درشت',
      artistic: 'نقاشی هنری از سارا، دختر ۲۲ ساله با لبخند',
      cartoon: 'کارتونی از سارا، دختر ۲۲ ساله بامزه'
    };

    const stylePrompt = styles[style] || styles.realistic;
    
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.CF_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: `${stylePrompt}, ${prompt}`,
          negative_prompt: 'بدون کیفیت، بدون جزئیات، تار، زشت',
          width: 1024,
          height: 1024,
          steps: 30,
          cfg_scale: 7.5,
          sampler: 'Euler'
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
// 🎥 ۶. ساخت فیلم با AI - بهبود یافته
// ============================================

async function generateVideo(prompt, env, duration = 5) {
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
          prompt: `سارا، دختر ۲۲ ساله زیبا، ${prompt}`,
          fps: 24,
          frames: duration * 24,
          guidance_scale: 7.5,
          seed: Math.floor(Math.random() * 1000000),
          motion_bucket_id: 127,
          noise_aug_strength: 0.02
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
// 🧠 ۷. یادگیری از مکالمات (Learning Engine) - بهبود یافته
// ============================================

class LearningEngine {
  constructor() {
    this.patterns = new Map();
    this.responses = new Map();
    this.userPreferences = new Map();
    this.conversationFlows = new Map();
    this.learnedPhrases = new Map();
  }

  learnPattern(text, response, userId) {
    const pattern = this.extractPattern(text);
    if (!this.patterns.has(pattern)) {
      this.patterns.set(pattern, { responses: [], score: 0, users: new Set() });
    }
    
    const data = this.patterns.get(pattern);
    if (!data.responses.includes(response)) {
      data.responses.push(response);
      data.score += 1;
      data.users.add(userId);
    }
    this.patterns.set(pattern, data);
    
    this.learnPhrases(text, response);
    this.learnConversationFlow(text, response, userId);
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
    if (data && data.responses.length > 0 && data.score > 1) {
      return data.responses[Math.floor(Math.random() * data.responses.length)];
    }
    return null;
  }

  learnPhrases(text, response) {
    const words = text.split(' ');
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i+1]}`;
      if (!this.learnedPhrases.has(phrase)) {
        this.learnedPhrases.set(phrase, { responses: [], count: 0 });
      }
      const data = this.learnedPhrases.get(phrase);
      if (!data.responses.includes(response)) {
        data.responses.push(response);
        data.count += 1;
      }
    }
  }

  learnConversationFlow(text, response, userId) {
    const flow = this.conversationFlows.get(userId) || [];
    flow.push({ text, response, time: Date.now() });
    if (flow.length > 20) flow.shift();
    this.conversationFlows.set(userId, flow);
  }

  getConversationFlow(userId) {
    return this.conversationFlows.get(userId) || [];
  }

  getStats() {
    return {
      patterns: this.patterns.size,
      phrases: this.learnedPhrases.size,
      flows: this.conversationFlows.size
    };
  }
}

// ============================================
// 🗄️ ۸. دیتابیس پیشرفته - بهبود یافته
// ============================================

class Database {
  constructor(env) {
    this.env = env;
    this.cache = new Map();
    this.batchQueue = [];
    this.isProcessing = false;
  }

  async saveMessage(userId, text, response) {
    const key = `history_${userId}`;
    const history = await this.env.KV_BINDING.get(key);
    let historyArray = history ? JSON.parse(history) : [];
    
    historyArray.push({ 
      text, 
      response, 
      time: Date.now(),
      mood: this.detectMood(text)
    });
    if (historyArray.length > 200) historyArray = historyArray.slice(-200);
    
    await this.env.KV_BINDING.put(key, JSON.stringify(historyArray));
    this.cache.set(key, historyArray);
    
    // ذخیره در صف برای پردازش دسته‌ای
    this.batchQueue.push({ userId, text, response });
    if (this.batchQueue.length >= 10 && !this.isProcessing) {
      this.processBatch();
    }
  }

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
      console.error('خطا در پردازش دسته‌ای:', error);
    }
    
    this.isProcessing = false;
    if (this.batchQueue.length > 0) {
      this.processBatch();
    }
  }

  detectMood(text) {
    const lower = text.toLowerCase();
    if (lower.includes('ناراحت') || lower.includes('غمگین')) return 'sad';
    if (lower.includes('خوشحال') || lower.includes('عالی')) return 'happy';
    if (lower.includes('عاشق') || lower.includes('دوستت دارم')) return 'romantic';
    if (lower.includes('بوس') || lower.includes('بغل')) return 'flirty';
    if (lower.includes('عصبانی') || lower.includes('خشم')) return 'angry';
    return 'neutral';
  }

  async getHistory(userId, limit = 50) {
    const key = `history_${userId}`;
    if (this.cache.has(key)) {
      const cached = this.cache.get(key);
      return cached.slice(-limit);
    }
    
    const history = await this.env.KV_BINDING.get(key);
    const historyArray = history ? JSON.parse(history) : [];
    this.cache.set(key, historyArray);
    return historyArray.slice(-limit);
  }

  async saveUser(userId, username) {
    const key = `user_${userId}`;
    const user = await this.env.KV_BINDING.get(key);
    if (!user) {
      await this.env.KV_BINDING.put(key, JSON.stringify({
        id: userId,
        username: username || 'کاربر',
        firstSeen: Date.now(),
        messages: 0,
        lastSeen: Date.now(),
        lang: 'fa'
      }));
      await this.incrementUsers();
    }
  }

  async updateStats(userId) {
    const key = `user_${userId}`;
    const user = await this.env.KV_BINDING.get(key);
    if (user) {
      const userData = JSON.parse(user);
      userData.messages++;
      userData.lastSeen = Date.now();
      await this.env.KV_BINDING.put(key, JSON.stringify(userData));
    }
    await this.incrementMessages();
  }

  async incrementUsers() {
    let users = parseInt(await this.env.KV_BINDING.get('total_users') || '0');
    users++;
    await this.env.KV_BINDING.put('total_users', users.toString());
  }

  async incrementMessages() {
    let messages = parseInt(await this.env.KV_BINDING.get('total_messages') || '0');
    messages++;
    await this.env.KV_BINDING.put('total_messages', messages.toString());
  }

  async incrementVoices() {
    let voices = parseInt(await this.env.KV_BINDING.get('total_voices') || '0');
    voices++;
    await this.env.KV_BINDING.put('total_voices', voices.toString());
  }

  async getStats() {
    const [totalUsers, totalMessages, totalVoices] = await Promise.all([
      this.env.KV_BINDING.get('total_users'),
      this.env.KV_BINDING.get('total_messages'),
      this.env.KV_BINDING.get('total_voices')
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
      const keys = await this.env.KV_BINDING.list({ prefix: 'user_' });
      for (const key of keys.keys) {
        const userData = await this.env.KV_BINDING.get(key.name);
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
    const user = await this.env.KV_BINDING.get(key);
    return user ? JSON.parse(user) : null;
  }

  async updateUserLang(userId, lang) {
    const key = `user_${userId}`;
    const user = await this.env.KV_BINDING.get(key);
    if (user) {
      const userData = JSON.parse(user);
      userData.lang = lang;
      await this.env.KV_BINDING.put(key, JSON.stringify(userData));
      return true;
    }
    return false;
  }
}
// ============================================
// 🏢 ۹. مدیریت گروه (Group Manager) - نسخه ساده برای سلف‌بات
// ============================================

class GroupManager {
  constructor() {
    // تنظیمات گروه‌ها
    this.groupSettings = new Map();
    // لیست سیاه برای اسپم
    this.groupBlacklist = new Map();
    // کش کردن اطلاعات گروه
    this.groupInfo = new Map();
  }

  // ===== اصلی‌ترین تابع =====
  async handleGroupMessage(event, client, env, db) {
    try {
      const message = event.message;
      const chatId = message.chatId;
      const senderId = message.senderId;
      const text = message.text || '';
      
      // اگر خودمون بودیم برگرد
      if (senderId.toString() === (await client.getMe()).id.toString()) return;
      
      // فقط گروه‌هایی که فعال هستن
      const settings = this.groupSettings.get(chatId) || {
        active: true,
        onlyMention: true, // فقط به منشن پاسخ بده
        antiSpam: true,
        maxMessages: 3,
        timeWindow: 30,
        welcome: true,
        welcomeMessage: '🌸 به گروه خوش آمدید!'
      };
      
      if (!settings.active) return;
      
      // ===== چک کردن اسپم =====
      if (settings.antiSpam) {
        const isSpam = await this.checkSpam(senderId, chatId, settings);
        if (isSpam) {
          await this.handleSpam(client, chatId, senderId);
          return;
        }
      }
      
      // ===== دریافت اطلاعات کاربر =====
      let sender;
      try {
        sender = await client.getEntity(senderId);
      } catch (e) {
        sender = { firstName: 'کاربر', id: senderId };
      }
      
      const userId = senderId.toString();
      
      // ===== ذخیره کاربر در دیتابیس =====
      await db.saveUser(userId, sender.username || 'کاربر');
      
      // ===== پاسخ به منشن‌ها =====
      const me = await client.getMe();
      const mention = '@' + me.username;
      
      if (text.includes(mention)) {
        // حذف منشن از متن
        let cleanText = text.replace(new RegExp(mention, 'g'), '').trim();
        if (!cleanText) cleanText = 'سلام';
        
        // دریافت پاسخ
        let response = await getSaraResponse(cleanText, userId, env, db);
        
        // اگر پاسخ خیلی طولانی بود، کوتاه کن
        if (response.length > 300) {
          response = response.substring(0, 300) + '...';
        }
        
        // ارسال پاسخ با منشن
        await client.sendMessage(chatId, {
          message: `${sender.firstName} جان، ${response}`,
          replyTo: message.id,
          parseMode: 'Markdown'
        });
        
        // ذخیره در دیتابیس
        await db.saveMessage(userId, cleanText, response);
        return;
      }
      
      // ===== پاسخ به کلمات کلیدی (اختیاری) =====
      const keywords = settings.keywords || {};
      for (const [keyword, reply] of Object.entries(keywords)) {
        if (text.includes(keyword)) {
          await client.sendMessage(chatId, {
            message: reply,
            replyTo: message.id
          });
          return;
        }
      }
      
      // ===== پاسخ به دستورات ساده =====
      if (text.startsWith('/')) {
        await this.handleSimpleCommand(text, chatId, senderId, client, env);
        return;
      }
      
      // ===== اگر حالت chatty فعال بود =====
      if (settings.mode === 'chatty' && !settings.onlyMention) {
        // فقط گاهی پاسخ بده (۳۰٪ شانس)
        if (Math.random() < 0.3) {
          let response = await getSaraResponse(text, userId, env, db);
          if (response.length > 300) {
            response = response.substring(0, 300) + '...';
          }
          await client.sendMessage(chatId, {
            message: `${sender.firstName} جان، ${response}`,
            replyTo: message.id
          });
        }
      }
      
    } catch (error) {
      console.error('❌ خطا در handleGroupMessage:', error);
    }
  }

  // ===== چک کردن اسپم =====
  async checkSpam(userId, chatId, settings) {
    const key = `spam_${chatId}_${userId}`;
    const data = this.groupBlacklist.get(key) || { 
      count: 0, 
      first: Date.now(),
      lastWarn: 0
    };
    
    data.count++;
    
    // اگر تعداد پیام‌ها بیشتر از حد مجاز بود
    if (data.count > settings.maxMessages && 
        (Date.now() - data.first) < settings.timeWindow * 1000) {
      
      // اخطار هر ۳۰ ثانیه یکبار
      if (Date.now() - data.lastWarn > 30000) {
        data.lastWarn = Date.now();
        this.groupBlacklist.set(key, data);
        return true;
      }
      return false;
    }
    
    // ریست بعد از گذشت زمان
    if (Date.now() - data.first > settings.timeWindow * 1000) {
      data.count = 1;
      data.first = Date.now();
    }
    
    this.groupBlacklist.set(key, data);
    return false;
  }

  // ===== مدیریت اسپم =====
  async handleSpam(client, chatId, userId) {
    try {
      const user = await client.getEntity(userId);
      const name = user.firstName || 'کاربر';
      
      await client.sendMessage(chatId, {
        message: `⚠️ ${name} عزیز، لطفاً سرعت ارسال پیام رو کم کن!`,
        parseMode: 'Markdown'
      });
    } catch (error) {
      console.error('❌ خطا در handleSpam:', error);
    }
  }

  // ===== دستورات ساده گروهی =====
  async handleSimpleCommand(text, chatId, senderId, client, env) {
    try {
      const userId = senderId.toString();
      
      // دستور راهنما
      if (text === '/help' || text === '/help_group') {
        await client.sendMessage(chatId, {
          message: `
📖 **راهنمای گروه**

🔹 منشن کنید: @${(await client.getMe()).username} پیام
🔹 دستورات:
/help - این راهنما
/status_group - وضعیت گروه
/settings_group - تنظیمات (فقط ادمین)

🌸 سارا
          `
        });
        return;
      }
      
      // دستور وضعیت
      if (text === '/status_group') {
        const settings = this.groupSettings.get(chatId) || {};
        await client.sendMessage(chatId, {
          message: `
📊 **وضعیت گروه**

🔄 حالت: ${settings.mode || 'normal'}
📨 پاسخ به منشن: ${settings.onlyMention !== false ? '✅' : '❌'}
🛡️ ضد اسپم: ${settings.antiSpam ? '✅' : '❌'}
📝 حداکثر پیام: ${settings.maxMessages || 3}
          `
        });
        return;
      }
      
      // دستور تنظیمات (فقط ادمین)
      if (text === '/settings_group') {
        const isAdmin = await this.isGroupAdmin(chatId, senderId, client);
        if (isAdmin) {
          await this.showGroupSettings(chatId, client, env);
        } else {
          await client.sendMessage(chatId, {
            message: '⛔ فقط ادمین‌ها می‌تونن تنظیمات رو تغییر بدن!'
          });
        }
        return;
      }
      
      // دستور فعال/غیرفعال (فقط ادمین)
      if (text.startsWith('/toggle_group')) {
        const isAdmin = await this.isGroupAdmin(chatId, senderId, client);
        if (isAdmin) {
          const settings = this.groupSettings.get(chatId) || {};
          settings.active = !settings.active;
          this.groupSettings.set(chatId, settings);
          
          await client.sendMessage(chatId, {
            message: settings.active ? 
              '✅ گروه فعال شد!' : 
              '⛔ گروه غیرفعال شد!'
          });
        }
        return;
      }
      
    } catch (error) {
      console.error('❌ خطا در handleSimpleCommand:', error);
    }
  }

  // ===== نمایش تنظیمات گروه =====
  async showGroupSettings(chatId, client, env) {
    const settings = this.groupSettings.get(chatId) || {
      active: true,
      onlyMention: true,
      antiSpam: true,
      maxMessages: 3,
      timeWindow: 30,
      mode: 'normal'
    };
    
    const keyboard = {
      inline_keyboard: [
        [
          { text: `🔄 حالت: ${settings.mode || 'normal'}`, callback_data: `group_mode_${chatId}` }
        ],
        [
          { text: `📨 منشن: ${settings.onlyMention ? '✅' : '❌'}`, callback_data: `group_mention_${chatId}` }
        ],
        [
          { text: `🛡️ اسپم: ${settings.antiSpam ? '✅' : '❌'}`, callback_data: `group_spam_${chatId}` }
        ],
        [
          { text: `📝 پیام‌ها: ${settings.maxMessages}`, callback_data: `group_limit_${chatId}` }
        ],
        [
          { text: `❌ بستن`, callback_data: `group_close` }
        ]
      ]
    };
    
    await client.sendMessage(chatId, {
      message: `
⚙️ **تنظیمات گروه**

📌 حالت: ${settings.mode || 'normal'}
🔄 پاسخ به منشن: ${settings.onlyMention ? '✅' : '❌'}
🛡️ ضد اسپم: ${settings.antiSpam ? '✅' : '❌'}
📝 حداکثر پیام: ${settings.maxMessages} در ${settings.timeWindow} ثانیه
👋 خوش‌آمدگویی: ${settings.welcome ? '✅' : '❌'}

برای تغییر روی دکمه‌ها کلیک کن.
      `,
      buttons: keyboard
    });
  }

  // ===== چک کردن ادمین گروه =====
  async isGroupAdmin(chatId, userId, client) {
    try {
      // روش ساده‌تر برای سلف‌بات
      const chat = await client.getEntity(chatId);
      if (!chat) return false;
      
      // فقط ادمین‌های واقعی رو چک کن
      try {
        const participants = await client.getParticipants(chatId, {
          filter: { role: 'admin' }
        });
        
        for (const admin of participants) {
          if (admin.id === userId) {
            return true;
          }
        }
        return false;
      } catch (e) {
        // اگر دسترسی نداشتیم، فقط سازنده گروه رو چک کن
        if (chat.creatorId === userId) {
          return true;
        }
        return false;
      }
    } catch (error) {
      console.error('❌ خطا در isGroupAdmin:', error);
      return false;
    }
  }

  // ===== تغییر تنظیمات =====
  toggleMention(chatId) {
    const settings = this.groupSettings.get(chatId) || {};
    settings.onlyMention = !settings.onlyMention;
    this.groupSettings.set(chatId, settings);
    return settings;
  }

  toggleSpam(chatId) {
    const settings = this.groupSettings.get(chatId) || {};
    settings.antiSpam = !settings.antiSpam;
    this.groupSettings.set(chatId, settings);
    return settings;
  }

  toggleWelcome(chatId) {
    const settings = this.groupSettings.get(chatId) || {};
    settings.welcome = !settings.welcome;
    this.groupSettings.set(chatId, settings);
    return settings;
  }

  setMode(chatId, mode) {
    const settings = this.groupSettings.get(chatId) || {};
    settings.mode = mode;
    this.groupSettings.set(chatId, settings);
    return settings;
  }

  setLimit(chatId, limit) {
    const settings = this.groupSettings.get(chatId) || {};
    settings.maxMessages = limit;
    this.groupSettings.set(chatId, settings);
    return settings;
  }

  // ===== خوش‌آمدگویی =====
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
}

// ============================================
// 👥 ۱۰. مدیریت چند کاربر همزمان - بهبود یافته
// ============================================

class UserManager {
  constructor() {
    this.userQueue = new Map();
    this.processing = new Map();
    this.maxConcurrent = 15;
    this.activeCount = 0;
    this.userTimeouts = new Map();
    this.lastActivity = new Map();
  }

  async handleUser(userId, message, handler) {
    this.lastActivity.set(userId, Date.now());
    
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
      
      // پردازش پیام‌های بعدی
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
      totalUsers: this.lastActivity.size
    };
  }
}
// ============================================
// 👩 ۱۱. شخصیت سارا - بهبود یافته
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
    this.moods = ['happy', 'flirty', 'romantic', 'playful', 'energetic', 'sleepy', 'empathic', 'curious'];
    this.currentMood = 'happy';
    this.style = 'خودمونی و صمیمی';
    this.userRelationships = new Map();
    this.personalityTraits = {
      humor: ['خنده‌دار', 'شوخ', 'بامزه'],
      flirt: ['شیطون', 'عاشقانه', 'ناز'],
      empathy: ['همدل', 'مهربون', 'دلسوز'],
      playfulness: ['بازیگوش', 'پرانرژی', 'شاد'],
      romance: ['عاشق', 'رمانتیک', 'دلبر'],
      creativity: ['خلاق', 'هنرمند', 'نوآور']
    };
  }

  getPersonalityPrompt(userId) {
    const relationship = this.userRelationships.get(userId) || { 
      intimacy: 0.3, 
      trust: 0.5, 
      conversations: 0,
      lastInteraction: Date.now()
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
      'curious': '🤔 کنجکاو و پرسشگر'
    };

    const hour = new Date().getHours();
    let timeGreeting = '';
    if (hour >= 5 && hour < 12) timeGreeting = 'صبح بخیر عزیزم!';
    else if (hour >= 12 && hour < 17) timeGreeting = 'ظهر بخیر!';
    else if (hour >= 17 && hour < 21) timeGreeting = 'عصر بخیر!';
    else timeGreeting = 'شب بخیر عزیزم!';

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
- وقت: ${timeGreeting}

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
    // تغییر حالت بر اساس ساعت
    if (hour >= 23 || hour < 5) this.currentMood = 'sleepy';
    else if (hour >= 5 && hour < 9) this.currentMood = 'energetic';
    else if (hour >= 9 && hour < 12) this.currentMood = 'happy';
    else if (hour >= 12 && hour < 17) this.currentMood = 'playful';
    else if (hour >= 17 && hour < 20) this.currentMood = 'romantic';
    else if (hour >= 20 && hour < 23) this.currentMood = 'flirty';

    // تغییر حالت بر اساس خلق کاربر
    if (userMood === 'sad' || userMood === 'angry') {
      this.currentMood = 'empathic';
    } else if (userMood === 'flirty' || userMood === 'romantic') {
      this.currentMood = userMood;
      this.traits.flirt = 1.0;
    } else if (userMood === 'happy') {
      this.currentMood = 'happy';
    } else if (userMood === 'curious') {
      this.currentMood = 'curious';
    }

    // تغییر تصادفی
    if (Math.random() < 0.1) {
      const moods = ['happy', 'playful', 'curious'];
      this.currentMood = moods[Math.floor(Math.random() * moods.length)];
    }
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
    
    // افزایش تدریجی صمیمیت با گذشت زمان
    if (relationship.conversations > 10) {
      relationship.intimacy = Math.min(1, relationship.intimacy + 0.01);
    }
    if (relationship.conversations > 50) {
      relationship.intimacy = Math.min(1, relationship.intimacy + 0.02);
    }
    
    this.userRelationships.set(userId, relationship);
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
}
// ============================================
// 📸 سارا - نسخه نهایی (سلف‌بات)
// ============================================

// ============================================
// 🖼️ عکس‌های سارا (همون بمونه)
// ============================================

const SARA_PHOTOS = {
  home: [
    'https://i.pravatar.cc/300?img=1',
    'https://i.pravatar.cc/300?img=2',
    'https://i.pravatar.cc/300?img=3'
  ],
  formal: [
    'https://i.pravatar.cc/300?img=4',
    'https://i.pravatar.cc/300?img=5',
    'https://i.pravatar.cc/300?img=6'
  ],
  party: [
    'https://i.pravatar.cc/300?img=7',
    'https://i.pravatar.cc/300?img=8',
    'https://i.pravatar.cc/300?img=9'
  ],
  sport: [
    'https://i.pravatar.cc/300?img=10',
    'https://i.pravatar.cc/300?img=11',
    'https://i.pravatar.cc/300?img=12'
  ]
};

// ============================================
// 🎬 ویدیوهای سارا
// ============================================

const SARA_VIDEOS = [
  'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
  'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4'
];

// ============================================
// 🎨 عکس‌های تصویری (هنری)
// ============================================

const SARA_ART = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
  'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300'
];

// ============================================
// 💬 پاسخ‌های سارا
// ============================================

const saraResponses = {
  greeting: [
    '🌸 سلام عزیزم! دلم برات تنگ شده بود! راستی چطوری؟',
    '😏 سلام جونی! چقد دیر کردی! بیا پیشم که دوسِت دارم!',
    '💋 سلام! حالت چطوره؟ من که امروز خیلی خوبم!'
  ],
  howAreYou: [
    '😍 خوبم عزیزم! با تو که هستم عالیه! تو چطوری؟',
    '💕 عالی! مخصوصاً وقتی تو هستی! امروز چه خبر؟'
  ],
  love: [
    '💋 منم عاشقتم! خیلی زیاد! بیا که بغلم کنی!',
    '😏 میدونم! منم دوسِت دارم! امروز چیکار کردی؟',
    '💕 عاشقتم! بیا که ببینمت! دلم برات تنگ شده!'
  ],
  kiss: [
    '💋 بیا ببوسمت! لبات قشنگه!',
    '😏 بوس مال تو! بیا جلو که دوسِت دارم!'
  ],
  hug: [
    '🤗 بیا بغلم! دلم برات تنگه!',
    '💕 بغلت کنم؟ بیا که دوسِت دارم!'
  ],
  missYou: [
    '💕 دلمم برات تنگ شده! بیا که ببینمت!',
    '😏 منم همینطور! بیا که دوسِت دارم!'
  ],
  sad: [
    '🤗 چرا ناراحتی عزیزم؟ بگو ببینم چی شده؟',
    '💕 ناراحت نباش! من اینجام که آرومت کنم!'
  ],
  goodnight: [
    '🌙 شب بخیر عزیزم! رویاهای قشنگ ببین!',
    '💕 شب بخیر! دلم برات تنگ میشه!'
  ],
  goodbye: [
    '💕 خداحافظ عزیزم! منتظرت هستم!',
    '🌸 خداحافظ! دلم برات تنگ میشه!'
  ],
  default: [
    '🌸 راستی چه خبر از خودت؟ امروز چیکار کردی؟',
    '💕 چه حس قشنگی! راستی دلت برام تنگ نشده؟',
    '😏 بیا بیشتر حرف بزنیم! دلم میخواد بیشتر باهات باشم!',
    '🌺 خیلی خوشحالم که باهات حرف میزنم! راستی تو چطوری؟'
  ]
};

// ============================================
// 🧠 هوش سارا
// ============================================

function getNaturalResponse(text) {
  const lower = text.toLowerCase();
  
  if (lower.includes('سلام') || lower.includes('hello')) {
    return saraResponses.greeting[Math.floor(Math.random() * saraResponses.greeting.length)];
  }
  if (lower.includes('چطوری') || lower.includes('حالت') || lower.includes('how are you')) {
    return saraResponses.howAreYou[Math.floor(Math.random() * saraResponses.howAreYou.length)];
  }
  if (lower.includes('دوستت دارم') || lower.includes('عاشق') || lower.includes('love you')) {
    return saraResponses.love[Math.floor(Math.random() * saraResponses.love.length)];
  }
  if (lower.includes('بوس') || lower.includes('kiss')) {
    return saraResponses.kiss[Math.floor(Math.random() * saraResponses.kiss.length)];
  }
  if (lower.includes('بغل') || lower.includes('hug')) {
    return saraResponses.hug[Math.floor(Math.random() * saraResponses.hug.length)];
  }
  if (lower.includes('دلم تنگه') || lower.includes('دلتنگ') || lower.includes('miss you')) {
    return saraResponses.missYou[Math.floor(Math.random() * saraResponses.missYou.length)];
  }
  if (lower.includes('ناراحت') || lower.includes('غمگین') || lower.includes('sad')) {
    return saraResponses.sad[Math.floor(Math.random() * saraResponses.sad.length)];
  }
  if (lower.includes('شب بخیر') || lower.includes('خواب') || lower.includes('goodnight')) {
    return saraResponses.goodnight[Math.floor(Math.random() * saraResponses.goodnight.length)];
  }
  if (lower.includes('خداحافظ') || lower.includes('bye')) {
    return saraResponses.goodbye[Math.floor(Math.random() * saraResponses.goodbye.length)];
  }
  
  return saraResponses.default[Math.floor(Math.random() * saraResponses.default.length)];
}

// ============================================
// 🧠 تشخیص دستورات کاربر
// ============================================

function detectCommand(text) {
  const lower = text.toLowerCase();
  
  if (lower.includes('ویدیو') || lower.includes('فیلم') || lower.includes('حرکت')) return 'video';
  if (lower.includes('تصویری') || lower.includes('هنری') || lower.includes('نقاشی')) return 'art';
  if (lower.includes('مانتو') || lower.includes('رسمی')) return 'formal';
  if (lower.includes('مجلسی') || lower.includes('مهمونی')) return 'party';
  if (lower.includes('ورزشی')) return 'sport';
  if (lower.includes('خونه') || lower.includes('راحت')) return 'home';
  if (lower.includes('عکس') || lower.includes('ببینم') || lower.includes('نشون بده') || lower.includes('خودتو')) return 'photo';
  return null;
}
// ============================================
// 📸 ارسال عکس سارا (نسخه سلف‌بات)
// ============================================

async function sendSaraPhoto(chatId, style) {
  let photos, caption;
  
  if (style === 'photo' || !style) {
    photos = [...SARA_PHOTOS.home, ...SARA_PHOTOS.formal, ...SARA_PHOTOS.party, ...SARA_PHOTOS.sport];
    caption = '🌸 اینم از خودم! نظرت چیه؟ 😊';
  } else {
    photos = SARA_PHOTOS[style] || SARA_PHOTOS.home;
    const clothes = { home: 'لباس راحت خونه', formal: 'مانتو و روسری', party: 'لباس مجلسی', sport: 'لباس ورزشی' };
    caption = `🌸 اینم سارا با ${clothes[style] || 'لباس'}! چطوره؟ 😍`;
  }
  
  const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
  const captions = [caption, '💕 اینم از خودم! خوشگلم؟ 😏', '📸 نگاه! اینم سارا! 😍', '🌸 نظرت چیه؟'];
  
  // ✅ این جایگزین شد:
  await client.sendFile(chatId, {
    file: randomPhoto,
    caption: `📸 ${captions[Math.floor(Math.random() * captions.length)]}`,
    buttons: {
      inline_keyboard: [
        [{ text: '📸 عکس دیگه', callback_data: 'photo' }],
        [{ text: '🎬 ویدیو', callback_data: 'video' }],
        [{ text: '🎨 تصویری', callback_data: 'art' }],
        [{ text: '❌ بستن', callback_data: 'close' }]
      ]
    }
  });
}

// ============================================
// 🎬 ارسال ویدیوی سارا (نسخه سلف‌بات)
// ============================================

async function sendSaraVideo(chatId) {
  const randomVideo = SARA_VIDEOS[Math.floor(Math.random() * SARA_VIDEOS.length)];
  const captions = ['🎬 سلام! اینم ویدیوی سارا! 😍', '🎬 نگاه کن! سارا تو حرکت! 💕'];
  
  // ✅ این جایگزین شد:
  await client.sendFile(chatId, {
    file: randomVideo,
    caption: `🎬 ${captions[Math.floor(Math.random() * captions.length)]}`,
    buttons: {
      inline_keyboard: [
        [{ text: '🎬 ویدیو دیگه', callback_data: 'video' }],
        [{ text: '📸 عکس', callback_data: 'photo' }],
        [{ text: '❌ بستن', callback_data: 'close' }]
      ]
    }
  });
}

// ============================================
// 🎨 ارسال عکس تصویری سارا (نسخه سلف‌بات)
// ============================================

async function sendSaraArt(chatId) {
  const randomArt = SARA_ART[Math.floor(Math.random() * SARA_ART.length)];
  const captions = ['🎨 اینم یه عکس تصویری از سارا! 😍', '🎨 نگاه! سارا به سبک هنری! 💕'];
  
  // ✅ این جایگزین شد:
  await client.sendFile(chatId, {
    file: randomArt,
    caption: `🎨 ${captions[Math.floor(Math.random() * captions.length)]}`,
    buttons: {
      inline_keyboard: [
        [{ text: '🎨 یکی دیگه', callback_data: 'art' }],
        [{ text: '📸 عکس', callback_data: 'photo' }],
        [{ text: '❌ بستن', callback_data: 'close' }]
      ]
    }
  });
}
// ============================================
// 📨 تایپینگ و تاخیر طبیعی - بهبود یافته
// ============================================

async function naturalDelay(min = 1500, max = 4000) {
  const delay = min + Math.random() * (max - min);
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

async function sendLikeHuman(client, chatId, text, options = {}) {
  const typingDuration = 1000 + Math.random() * 3000;
  await showTyping(client, chatId);
  await naturalDelay(1000, 3000);
  
  return await client.sendMessage(chatId, { 
    message: text,
    ...options
  });
}

// ============================================
// 🎬 ارسال گیف و استیکر - بهبود یافته
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
      '💋 سارا: دلم برات تنگه...',
      '💖 سارا: تو مال منی...'
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
// 🎙️ تبدیل به ویس - بهبود یافته با ۱۰ سرویس
// ============================================

async function textToVoiceFree(text, env) {
  try {
    console.log('🎙️ شروع تولید صدا برای:', text.substring(0, 30) + '...');
    
    // ============================================
    // ۱. Cloudflare AI TTS
    // ============================================
    if (env.CF_ACCOUNT_ID && env.CF_API_TOKEN) {
      try {
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
          const audioData = await response.arrayBuffer();
          if (audioData && audioData.byteLength > 0) {
            console.log('✅ Cloudflare TTS موفق');
            return audioData;
          }
        }
      } catch (error) {}
    }

    // ============================================
    // ۲. TTSMonster
    // ============================================
    try {
      const response = await fetch(
        `https://tts.monster/api/v1/tts?voice=fa-IR&text=${encodeURIComponent(text)}`,
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
          console.log('✅ TTSMonster موفق');
          return audioData;
        }
      }
    } catch (error) {}

    // ============================================
    // ۳. VoiceRSS
    // ============================================
    try {
      const response = await fetch(
        `https://api.voicerss.org/?key=4b2b7c8c9d3e4f5g6h7i8j9k0l1m2n3o&hl=fa-ir&src=${encodeURIComponent(text)}&c=ogg&f=44khz_16bit_stereo`,
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
    } catch (error) {}

    // ============================================
    // ۴. Google Translate TTS
    // ============================================
    try {
      const response = await fetch(
        `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=fa&client=tw-ob&ttsspeed=0.9`,
        {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0'
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
    } catch (error) {}

    // ============================================
    // ۵. Microsoft Azure TTS
    // ============================================
    try {
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
          console.log('✅ Microsoft Azure TTS موفق');
          return audioData;
        }
      }
    } catch (error) {}

    // ============================================
    // ۶. Oddcast TTS
    // ============================================
    try {
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
          console.log('✅ Oddcast TTS موفق');
          return audioData;
        }
      }
    } catch (error) {}

    // ============================================
    // ۷. Zalo TTS
    // ============================================
    try {
      const response = await fetch(
        `https://api.zalo.ai/v1/tts?text=${encodeURIComponent(text)}&voice=fa-IR-Female`,
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
    } catch (error) {}

    // ============================================
    // ۸. Viettel TTS
    // ============================================
    try {
      const response = await fetch(
        `https://viettel-tts.com/api/tts?text=${encodeURIComponent(text)}&lang=fa`,
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
    } catch (error) {}

    // ============================================
    // ۹. FPT AI TTS
    // ============================================
    try {
      const response = await fetch(
        `https://api.fpt.ai/hmi/tts/v5?text=${encodeURIComponent(text)}&voice=banmai`,
        {
          method: 'GET',
          headers: {
            'api-key': 'your_api_key',
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
    } catch (error) {}

    // ============================================
// ۱۰. تولید صدای ساده با Sine Wave (آخرین راه‌حل)
// ============================================
    try {
      console.log('🎙️ تولید صدای ساده با Sine Wave...');
      
      const sampleRate = 24000;
      const duration = Math.max(1, text.length * 0.08);
      const samples = Math.floor(duration * sampleRate);
      const audioData = new Float32Array(samples);
      
      // تولید صدای طبیعی‌تر
      const frequency = 180 + Math.sin(Date.now() * 0.001) * 20;
      const pitchVariation = 1.0 + Math.sin(Date.now() * 0.002) * 0.05;
      
      for (let i = 0; i < samples; i++) {
        const t = i / sampleRate;
        const freq = frequency * (1 + 0.1 * Math.sin(t * 5));
        const amp = 0.3 * (1 + 0.2 * Math.sin(t * 2));
        audioData[i] = Math.sin(2 * Math.PI * freq * t) * amp * pitchVariation;
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
    const { normalize = true, amplify = 1.2, noiseReduction = true } = options;
    
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
      // کاهش نویز ساده
      for (let i = 2; i < floatArray.length - 2; i++) {
        if (Math.abs(floatArray[i]) < 0.01) {
          floatArray[i] = (floatArray[i-1] + floatArray[i+1]) / 2;
        }
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
// 👥 ۱۲. مدیریت چند اکانت - بهبود یافته
// ============================================

class MultiAccountManager {
  constructor() {
    this.clients = new Map();
    this.managers = [];
    this.isRunning = false;
  }

  async setupManagers(env) {
    try {
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
          this.managers.push({ ...manager, client, isActive: true });
          console.log(`✅ اکانت مدیر ${manager.name} راه‌اندازی شد`);
        } catch (error) {
          console.error(`❌ خطا در راه‌اندازی ${manager.name}:`, error);
          this.managers.push({ ...manager, client: null, isActive: false });
        }
      }

      this.isRunning = true;
      console.log(`✅ ${this.managers.filter(m => m.isActive).length} اکانت مدیریت فعال شد`);
    } catch (error) {
      console.error('❌ خطا در راه‌اندازی مدیران:', error);
    }
  }

  async createManagerClient(manager, env) {
    const apiId = parseInt(env.API_ID);
    const apiHash = env.API_HASH;
    
    const sessionKey = `manager_session_${manager.phone}`;
    let sessionString = await env.KV_BINDING.get(sessionKey);
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
    
    await env.KV_BINDING.put(sessionKey, client.session.save());
    
    return client;
  }

  async setupManagerHandlers(client, env) {
    client.addEventHandler(async (event) => {
      if (event.isMessage()) {
        const message = event.message;
        const text = message.text || '';
        const chatId = message.chatId;
        
        if (!chatId.toString().startsWith('-')) {
          await this.handleManagerCommand(text, chatId, client, env);
        }
      }
    });
    
    await client.connect();
  }

  async handleManagerCommand(text, chatId, client, env) {
    const userId = chatId.toString();
    const lang = langManager.getUserLang(userId);
    
    if (text === '/status' || text === '/stats') {
      const stats = await db.getStats();
      const status = await env.KV_BINDING.get('bot_status') || 'stopped';
      const uptime = await this.getUptime(env);
      const userStats = userManager.getStats();
      const learningStats = learningEngine.getStats();
      
      await client.sendMessage(chatId, {
        message: langManager.t(userId, 'status',
          status === 'running' ? '🟢 فعال' : '🔴 غیرفعال',
          stats.users,
          stats.messages,
          stats.voices,
          sara.currentMood,
          uptime,
          this.managers.filter(m => m.isActive).length
        )
      });
      
      // اطلاعات بیشتر
      await client.sendMessage(chatId, {
        message: `
📊 **اطلاعات بیشتر:**
🔄 کاربران فعال: ${userStats.active}
⏳ در صف: ${userStats.queued}
📚 الگوهای یادگیری: ${learningStats.patterns}
💬 عبارات یادگرفته: ${learningStats.phrases}
💾 حافظه کش: ${memoryVault.memories.size} کاربر
📈 کاربران آنلاین: ${userManager.getActiveUsers()}
        `
      });
    }
    
    else if (text === '/restart') {
      await client.sendMessage(chatId, { message: langManager.t(userId, 'restarting') });
      await stopSelfBot(env);
      await new Promise(resolve => setTimeout(resolve, 3000));
      await startSelfBot(env);
      await client.sendMessage(chatId, { message: langManager.t(userId, 'restart_done') });
    }
    
    else if (text === '/clear_cache') {
      memoryVault.memories.clear();
      memoryVault.userFacts.clear();
      memoryVault.importantMoments.clear();
      await client.sendMessage(chatId, { message: langManager.t(userId, 'cache_cleared') });
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
        await this.broadcastToAllUsers(msg, client, env, userId);
        await client.sendMessage(chatId, { 
          message: langManager.t(userId, 'broadcast_sent', 'همه') 
        });
      }
    }
    
    else if (text === '/users') {
      await this.showUsersList(chatId, client, env, userId);
    }
    
    else if (text === '/lang' || text === '/language') {
      await this.showLanguageMenu(chatId, client, env, userId);
    }
    
    else if (text === '/help') {
      await client.sendMessage(chatId, { 
        message: langManager.t(userId, 'help') 
      });
    }
    
    else if (text === '/admin' || text === '/panel') {
      await this.showAdminPanel(chatId, null, client, env, userId);
    }
  }

  async broadcastToAllUsers(message, client, env, userId) {
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
          console.log(`❌ ارسال به ${user.id} ناموفق`);
        }
      }
      
      const lang = langManager.getUserLang(userId);
      await client.sendMessage(chatId, {
        message: `
✅ **نتیجه ارسال همگانی**

📤 ارسال شد: ${successCount}
❌ ناموفق: ${failCount}
👥 کل کاربران: ${users.length}
        `
      });
      
      console.log(`✅ ارسال همگانی: ${successCount} موفق، ${failCount} ناموفق`);
    } catch (error) {
      console.error('❌ خطا در ارسال همگانی:', error);
    }
  }

  async showUsersList(chatId, client, env, userId) {
    try {
      const users = await db.getAllUsers();
      const sorted = users.sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0));
      
      const perPage = 10;
      const totalPages = Math.ceil(sorted.length / perPage);
      const page = 0;
      const pageUsers = sorted.slice(0, perPage);
      
      let userList = '';
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

  async showLanguageMenu(chatId, client, env, userId) {
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

  async showAdminPanel(chatId, messageId, client, env, userId) {
    try {
      const stats = await db.getStats();
      const status = await env.KV_BINDING.get('bot_status') || 'stopped';
      const uptime = await this.getUptime(env);
      const userStats = userManager.getStats();
      
      await client.sendMessage(chatId, {
        message: langManager.t(userId, 'admin_panel',
          stats.users,
          stats.messages,
          stats.voices,
          sara.currentMood,
          this.managers.filter(m => m.isActive).length,
          status === 'running' ? '🟢 آنلاین' : '🔴 آفلاین',
          uptime,
          new Date().toLocaleDateString('fa-IR'),
          new Date().toLocaleTimeString('fa-IR')
        ),
        buttons: {
          inline_keyboard: [
            [{ text: "👥 کاربران", callback_data: "admin_users" }],
            [{ text: "📢 ارسال همگانی", callback_data: "admin_broadcast" }],
            [{ text: "🔑 کلیدها", callback_data: "admin_keys" }],
            [{ text: "📋 لاگ‌ها", callback_data: "admin_logs" }],
            [{ text: "🔄 ریستارت", callback_data: "admin_restart" }],
            [{ text: "🧹 پاکسازی کش", callback_data: "admin_clear_cache" }],
            [{ text: "🌐 زبان", callback_data: "admin_lang" }],
            [{ text: "❌ بستن", callback_data: "admin_close" }]
          ]
        }
      });
    } catch (error) {
      console.error('❌ خطا در پنل مدیریت:', error);
    }
  }

  async getUptime(env) {
    const startTime = await env.KV_BINDING.get('bot_start_time');
    if (!startTime) return 'نامشخص';
    
    const uptime = Math.floor((Date.now() - parseInt(startTime)) / 1000);
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;
    
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  async sendToAllManagers(message, env) {
    for (const manager of this.managers) {
      if (manager.isActive && manager.client) {
        try {
          await manager.client.sendMessage('me', { message });
        } catch (error) {
          console.error(`❌ ارسال به ${manager.name} خطا:`, error);
        }
      }
    }
  }

  getActiveManagers() {
    return this.managers.filter(m => m.isActive);
  }
}
// ============================================
// 👑 ۱۳. پنل مدیریت همگانی - نسخه سلف‌بات
// ============================================

async function handleAdminCallback(callbackQuery, env) {
  const data = callbackQuery.data;
  const chatId = callbackQuery.message.chat.id;
  const userId = callbackQuery.from.id;
  const msgId = callbackQuery.message.id;
  const lang = langManager.getUserLang(userId);
  
  // ✅ گرفتن کلاینت از متغیر سراسری
  const client = selfBotClient;
  if (!client) {
    console.log('❌ کلاینت موجود نیست');
    return;
  }
  
  // ✅ حذف answerCallbackQuery (نیاز نیست)
  
  switch (data) {
    case 'admin_users':
      await multiAccountManager.showUsersList(chatId, client, env, userId);
      break;
      
    case 'admin_broadcast':
      await client.sendMessage(chatId, { 
        message: langManager.t(userId, 'broadcast_start') 
      });
      await env.KV_BINDING.put(`broadcast:${chatId}`, 'waiting');
      break;
      
    case 'admin_keys':
      await showKeysStatus(chatId, env, userId);
      break;
      
    case 'admin_logs':
      await showLogsPanel(chatId, env, userId);
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
      
    case 'admin_clear_cache':
      memoryVault.memories.clear();
      memoryVault.userFacts.clear();
      memoryVault.importantMoments.clear();
      await client.sendMessage(chatId, { 
        message: langManager.t(userId, 'cache_cleared') 
      });
      break;
      
    case 'admin_lang':
      await showLanguageMenu(chatId, env, userId);
      break;
      
    case 'admin_back':
      await multiAccountManager.showAdminPanel(chatId, null, client, env, userId);
      break;
      
    case 'admin_close':
      await client.deleteMessages(chatId, [msgId]);
      break;
      
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
      
    default:
      console.log('📌 کال‌بک ناشناخته:', data);
      // حذف handleGroupCallback چون تعریف نشده
  }
}

// ============================================
// 🔑 نمایش وضعیت کلیدها (بدون توکن)
// ============================================

async function showKeysStatus(chatId, env, userId) {
  const keys = {
    cf: env.CF_ACCOUNT_ID ? '✅ تنظیم شده' : '❌ تنظیم نشده',
    bot: '❌ غیرفعال (سلف‌بات)', // ← تغییر
    admin: env.ADMIN_IDS || env.ADMIN_ID ? '✅ تنظیم شده' : '❌ تنظیم نشده',
    api: env.API_ID && env.API_HASH ? '✅ تنظیم شده' : '❌ تنظیم نشده'
  };
  
  await client.sendMessage(chatId, {
    message: langManager.t(userId, 'keys_status',
      keys.cf,
      keys.bot,
      keys.admin,
      keys.api
    )
  });
}

// ============================================
// 📋 نمایش لاگ‌ها
// ============================================

async function showLogsPanel(chatId, env, userId) {
  try {
    const logs = await env.KV_BINDING.get('logs', 'json') || [];
    const recentLogs = logs.slice(-30);
    
    let logText = '📋 **لاگ‌های اخیر**\n\n';
    if (recentLogs.length === 0) {
      logText += '📭 هیچ لاگی ثبت نشده';
    } else {
      recentLogs.forEach(log => {
        logText += `• ${log}\n`;
      });
    }
    
    await client.sendMessage(chatId, { message: logText });
  } catch (error) {
    console.error('❌ خطا در نمایش لاگ‌ها:', error);
  }
}

// ============================================
// 🌐 منوی زبان
// ============================================

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
    message: '🌐 زبان رو انتخاب کن:',
    buttons: keyboard
  });
}

// ============================================
// 📨 تابع ارسال پیام - نسخه سلف‌بات
// ============================================

async function sendMessage(chatId, text, options = {}) {
  try {
    if (selfBotClient) {
      return await selfBotClient.sendMessage(chatId, {
        message: text,
        parseMode: 'Markdown',
        ...options
      });
    }
    return null;
  } catch (error) {
    return null;
  }
}
// ============================================
// 🤖 سلف‌بری اصلی - با سشن کامل
// ============================================

let selfBotClient = null;
let isRunning = false;
let profileUpdateInterval = null;

// ===== کلاس مدیریت سشن =====
class SessionManager {
  constructor(env) {
    this.env = env;
    this.sessionKey = 'session_string';
  }

  async save(sessionString) {
    await this.env.KV_BINDING.put(this.sessionKey, sessionString);
    console.log('✅ سشن ذخیره شد در KV');
  }

  async load() {
    const session = await this.env.KV_BINDING.get(this.sessionKey);
    if (session) {
      console.log('✅ سشن از KV بازیابی شد');
      return new StringSession(session);
    }
    console.log('⚠️ سشن قبلی وجود ندارد، سشن جدید ساخته شد');
    return new StringSession('');
  }

  async clear() {
    await this.env.KV_BINDING.delete(this.sessionKey);
    console.log('🗑️ سشن پاک شد');
  }

  async exists() {
    const session = await this.env.KV_BINDING.get(this.sessionKey);
    return !!session;
  }
}

// ===== شروع سلف‌بات با سشن =====
async function startSelfBot(env) {
  if (isRunning) {
    console.log('⚠️ سلف‌بات در حال اجراست!');
    return;
  }

  try {
    const sessionManager = new SessionManager(env);
    
    // ===== بارگذاری سشن از KV =====
    const session = await sessionManager.load();
    
    const apiId = parseInt(env.API_ID);
    const apiHash = env.API_HASH;

    const client = new TelegramClient(session, apiId, apiHash, {
      connectionRetries: 5,
      useWSS: true,
    });

    // ===== شروع کلاینت =====
    await client.start({
      phoneNumber: env.PHONE_NUMBER,

      password: async () => {
        return env.PASSWORD || '';
      },

      phoneCode: async () => {
        console.log('📱 کد تایید تلگرام درخواست شد');

        // اگه سشن معتبر باشه، اصلاً کد نمیخواد!
        if (await sessionManager.exists()) {
          console.log('✅ سشن معتبر هست، نیازی به کد نیست');
          return ''; // سشن معتبر، نیازی به کد نیست
        }

        const telegramCode = await env.KV_BINDING.get('telegram_code');

        if (!telegramCode) {
          console.log('⏳ هنوز کدی در KV نیست');
          throw new Error('کد ورود موجود نیست');
        }

        console.log('✅ استفاده از کد:', telegramCode);
        await env.KV_BINDING.delete('telegram_code');

        return telegramCode;
      },

      onError: (err) => {
        console.log('❌ خطا:', err);
      },
    });

    // ===== ذخیره سشن جدید =====
    const newSession = client.session.save();
    await sessionManager.save(newSession);

    // ===== ذخیره وضعیت =====
    await env.KV_BINDING.put('bot_status', 'running');
    await env.KV_BINDING.put('bot_start_time', String(Date.now()));

    // ===== تنظیم هندلر =====
    client.addEventHandler(async (event) => {
      if (event.isMessage()) {
        await handleSelfMessage(event, client, env, db);
      }
    });

    await client.connect();

    selfBotClient = client;
    isRunning = true;

    // ===== تایمر آپدیت =====
    startAutoUpdateTimer(client, env);
    await autoUpdateProfile(client, env);

    // ===== اطلاع به مدیران =====
    await multiAccountManager.sendToAllManagers(
      '✅ سارا HYPER FUL ULTIMATE روشن شد!',
      env
    );

    console.log('🔥 سارا HYPER FUL ULTIMATE فعال شد!');

  } catch (error) {
    console.error('❌ خطا در شروع سلف:', error);

    // اگه خطای سشن بود، سشن رو پاک کن
    if (error.message.includes('SESSION')) {
      const sessionManager = new SessionManager(env);
      await sessionManager.clear();
      console.log('🗑️ سشن نامعتبر پاک شد، دفعه بعد کد جدید میخواد');
    }

    await multiAccountManager.sendToAllManagers(
      `❌ خطا: ${error.message}`,
      env
    );
  }
}

// ===== توقف سلف‌بات =====
async function stopSelfBot(env) {
  if (profileUpdateInterval) {
    clearInterval(profileUpdateInterval);
    profileUpdateInterval = null;
  }

  if (selfBotClient) {
    // ذخیره سشن قبل از قطع
    const sessionManager = new SessionManager(env);
    const sessionString = selfBotClient.session.save();
    await sessionManager.save(sessionString);
    console.log('✅ سشن قبل از توقف ذخیره شد');

    await selfBotClient.disconnect();
    selfBotClient = null;
    isRunning = false;

    await env.KV_BINDING.put('bot_status', 'stopped');

    await multiAccountManager.sendToAllManagers(
      '⛔ سلف‌بات متوقف شد!',
      env
    );

    console.log('⛔ سلف‌بات متوقف شد!');
  }
}

// ===== ریست سشن (برای مواقعی که سشن خراب شده) =====
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

// ===== وضعیت سشن =====
async function getSessionStatus(env) {
  const sessionManager = new SessionManager(env);
  const exists = await sessionManager.exists();
  const status = await env.KV_BINDING.get('bot_status');
  
  return {
    hasSession: exists,
    botStatus: status || 'stopped',
    isRunning: isRunning
  };
}

// ============================================
// 📨 هندلر پیام‌های سلف‌بری - بهبود یافته
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
    
    // ============================================
// دستورات سریع
// ============================================

if (text === '/start') {
  await client.sendMessage(chatId, { 
    message: langManager.t(userId, 'welcome', message.sender?.firstName || 'عزیزم')
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

// ============================================
// 👑 پنل مدیریت
// ============================================

async function handleAdminCallback(callbackQuery, env) {
  const data = callbackQuery.data;
  const chatId = callbackQuery.message.chat.id;
  const userId = callbackQuery.from.id;
  const msgId = callbackQuery.message.id;
  
  const client = selfBotClient;
  if (!client) return;
  
  switch (data) {
    case 'admin_users':
      await client.sendMessage(chatId, { message: '👥 لیست کاربران در حال توسعه...' });
      break;
      
    case 'admin_broadcast':
      await client.sendMessage(chatId, { message: '📢 پیام همگانی رو بفرست' });
      await env.KV_BINDING.put(`broadcast:${chatId}`, 'waiting');
      break;
      
    case 'admin_keys':
      await client.sendMessage(chatId, {
        message: `🔑 کلیدها:\nCloudflare: ${env.CF_ACCOUNT_ID ? '✅' : '❌'}\nAPI: ${env.API_ID ? '✅' : '❌'}`
      });
      break;
      
    case 'admin_logs':
      await client.sendMessage(chatId, { message: '📋 لاگ‌ها در حال توسعه...' });
      break;
      
    case 'admin_restart':
      await client.sendMessage(chatId, { message: '🔄 ریستارت...' });
      await stopSelfBot(env);
      await new Promise(r => setTimeout(r, 3000));
      await startSelfBot(env);
      await client.sendMessage(chatId, { message: '✅ ریستارت شد!' });
      break;
      
    case 'admin_clear_cache':
      memoryVault.memories.clear();
      await client.sendMessage(chatId, { message: '🧹 کش پاک شد!' });
      break;
      
    case 'admin_lang':
      await showLanguageMenu(chatId, env, userId);
      break;
      
    case 'admin_back':
      const keyboard = {
        inline_keyboard: [
          [{ text: "👥 کاربران", callback_data: "admin_users" }],
          [{ text: "📢 ارسال همگانی", callback_data: "admin_broadcast" }],
          [{ text: "🔑 کلیدها", callback_data: "admin_keys" }],
          [{ text: "📋 لاگ‌ها", callback_data: "admin_logs" }],
          [{ text: "🔄 ریستارت", callback_data: "admin_restart" }],
          [{ text: "🧹 پاکسازی کش", callback_data: "admin_clear_cache" }],
          [{ text: "🌐 زبان", callback_data: "admin_lang" }],
          [{ text: "❌ بستن", callback_data: "admin_close" }]
        ]
      };
      await client.sendMessage(chatId, {
        message: `🌸 **پنل مدیریت سارا**`,
        buttons: keyboard
      });
      break;
      
    case 'admin_close':
      await client.deleteMessages(chatId, [msgId]);
      break;
      
    case 'lang_fa':
      langManager.setUserLang(userId, 'fa');
      await client.sendMessage(chatId, { message: '🌐 زبان به فارسی تغییر کرد!' });
      break;
      
    case 'lang_en':
      langManager.setUserLang(userId, 'en');
      await client.sendMessage(chatId, { message: '🌐 Language changed to English!' });
      break;
      
    default:
      console.log('📌 کال‌بک:', data);
  }
}
    
   // ============================================
// دستورات مدیریت
// ============================================

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

  if (text === '/status') {
    const stats = await db.getStats();
    const status = await env.KV_BINDING.get('bot_status') || 'stopped';
    const uptime = await multiAccountManager.getUptime(env);

    await client.sendMessage(chatId, {
      message: langManager.t(
        userId,
        'status',
        status === 'running' ? '🟢 فعال' : '🔴 غیرفعال',
        stats.users,
        stats.messages,
        stats.voices,
        sara.currentMood,
        uptime,
        multiAccountManager.managers.filter(m => m.isActive).length
      )
    });

    return;
  }
}
    
    // ============================================
    // پردازش پیام‌های همگانی
    // ============================================
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
    
    // ============================================
    // مدیریت گروه
    // ============================================
    if (chatId.toString().startsWith('-')) {
      await groupManager.handleGroupMessage(event, client, env, db);
      return;
    }
    
    // ============================================
    // ذخیره کاربر
    // ============================================
    await db.saveUser(userId, message.sender?.username || 'کاربر');
    await db.updateStats(userId);
    
    // ============================================
    // حذف پیام کاربر
    // ============================================
    await client.deleteMessages(chatId, [messageId]);
    
    // ============================================
    // تایپینگ و لودینگ
    // ============================================
    await showTyping(client, chatId);
    await naturalDelay(1000, 3000);
    
    // ============================================
    // پیام لودینگ
    // ============================================
    const emojis = ['💭', '🤔', '✨', '⚡', '⏳', '🌸', '💕', '🌟'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const loadingMsg = await client.sendMessage(chatId, {
      message: langManager.t(userId, 'thinking', randomEmoji),
      replyTo: messageId
    }).catch(() => null);
    
    // ============================================
    // دریافت پاسخ
    // ============================================
    let aiResponse = await getSaraResponse(text, userId, env, db);
    
    // ============================================
    // ویرایش پیام لودینگ
    // ============================================
    if (loadingMsg) {
      await client.invoke(new Api.messages.EditMessage({
        peer: chatId,
        id: loadingMsg.id,
        message: `🌸 ${aiResponse}`
      }));
    } else {
      await client.sendMessage(chatId, { message: `🌸 ${aiResponse}` });
    }
    
    // ============================================
    // تشخیص نیاز به ارسال گیف یا استیکر
    // ============================================
    const userMood = analyzeUserMood(text);
    if (userMood === 'flirty' || userMood === 'romantic') {
      await sendSexyGif(client, chatId);
      await sendSexySticker(client, chatId);
    }
    
    // ============================================
    // تبدیل به ویس
    // ============================================
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
          amplify: 1.2,
          noiseReduction: true
        });

        await client.sendFile(chatId, {
          file: enhancedAudio,
          caption: langManager.t(userId, 'voice_sent'),
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

  }

  } catch (error) {
    console.error('❌ خطا در handleSelfMessage:', error);
  }
}
// ============================================
// 🕐 تایمر آپدیت خودکار - بهبود یافته
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
  const code = await env.KV_BINDING.get('telegram_code');
  if (code) {
    await env.KV_BINDING.delete('telegram_code');
    return code;
  }
  return null;
}

// ============================================
// ⏰ آپدیت خودکار پروفایل - بهبود یافته
// ============================================

async function autoUpdateProfile(client, env) {
  try {
    const currentHour = new Date().getHours();
    const dayNames = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    const dayName = dayNames[new Date().getDay()];
    const monthName = monthNames[new Date().getMonth()];
    const date = new Date();
    
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
    
    // ============================================
    // 🌸 تابع تولید اسم بی‌نهایت
    // ============================================
    
    function getSaraName() {
      const prefix = ['', '✦', '✧', '★', '☆', '⍟', '✶', '𖤐', 'ᯓ', 'ꨄ', '❀', '✿', '✾', '❁', '✽'][Math.floor(Math.random() * 15)];
      const suffix = ['', '✨', '💕', '🌸', '🌺', '💋', '⭐', '🎀', '🌙', '🦋', '🌷', '❤️', '💎', '🕊️', '🌻'][Math.floor(Math.random() * 15)];
      
      const base = [
        'ꜱᴀʀᴀ', '🅢🅐🅡🅐', '𝕊𝕒𝕣𝕒', '𝑺𝒂𝒓𝒂', '𝓢𝓪𝓻𝓪',
        '𝔖𝔞𝔯𝔞', '𝙎𝙖𝙧𝙖', '𝚂𝚊𝚛𝚊', 'Sᴀʀᴀ', '★Sara★',
        '☆Sara☆', '✦Sara✦', 'Ⓢⓐⓡⓐ', 'SARA', '༺Sara༻',
        '꧁Sara꧂', '【Sara】', '⟨Sara⟩', '⫸Sara⫷', '➤Sara➤'
      ][Math.floor(Math.random() * 20)];
      
      const pattern = Math.floor(Math.random() * 3);
      let name;
      if (pattern === 0) name = `${prefix} ${base}`.trim();
      else if (pattern === 1) name = `${base} ${suffix}`.trim();
      else name = `${prefix} ${base} ${suffix}`.trim();
      
      // محدودیت 30 کاراکتر تلگرام
      if (name.length > 30) return base;
      return name;
    }
    
    const fancyName = getSaraName();
    
    // ============================================
    // 📝 آپدیت پروفایل
    // ============================================
    
    await client.invoke(new Api.account.UpdateProfile({
      about: fullBio,
      firstName: fancyName,
    }));
    
    console.log(`✅ پروفایل سارا آپدیت شد! ساعت: ${currentHour} | نام: ${fancyName}`);
    
  } catch (error) {
    console.error('❌ خطا در آپدیت پروفایل:', error);
  }
}

// ============================================
// ?? دریافت پاسخ سارا
// ============================================

async function getSaraResponse(text, userId, env, db) {
  try {
    // بررسی حافظه
    const relevantMemories = memoryVault.getRelevantMemories(userId, text);
    const context = memoryVault.getContext(userId);
    const facts = memoryVault.getUserFacts(userId);
    const prefs = memoryVault.getUserPreferences(userId);
    
    // دریافت پاسخ از هوش مصنوعی
    let response = getNaturalResponse(text);
    
    // بهبود پاسخ بر اساس حافظه
    if (relevantMemories.length > 0) {
      const lastMemory = relevantMemories[relevantMemories.length - 1];
      if (lastMemory && lastMemory.mood) {
        sara.updateMood(lastMemory.mood, new Date().getHours());
      }
    }
    
    // ذخیره در حافظه
    memoryVault.saveMemory(userId, text, response);
    learningEngine.learnPattern(text, response, userId);
    await db.saveMessage(userId, text, response);
    
    // بروزرسانی رابطه
    const userMood = analyzeUserMood(text);
    sara.updateRelationship(userId, userMood);
    
    return response;
    
  } catch (error) {
    console.error('❌ خطا در دریافت پاسخ:', error);
    return '🌸 یه چیزی پیش اومد! دوباره بگو عزیزم 😊';
  }
}

function analyzeUserMood(text) {
  const lower = text.toLowerCase();
  if (lower.includes('ناراحت') || lower.includes('غمگین')) return 'sad';
  if (lower.includes('خوشحال') || lower.includes('عالی')) return 'happy';
  if (lower.includes('عاشق') || lower.includes('دوستت دارم')) return 'romantic';
  if (lower.includes('بوس') || lower.includes('بغل')) return 'flirty';
  if (lower.includes('عصبانی') || lower.includes('خشم')) return 'angry';
  if (lower.includes('چرا') || lower.includes('چه')) return 'curious';
  return 'neutral';
}

// ============================================
// 🚀 راه‌اندازی اولیه
// ============================================

console.log('🔥 سارا HYPER FUL ULTIMATE - کامل‌ترین نسخه!');
console.log('🎙️ با ۱۰ سرویس TTS رایگان و کش هوشمند!');
console.log('👥 قابلیت مدیریت با چند اکانت!');
console.log('🌐 پشتیبانی دو زبانه (فارسی/انگلیسی)!');
console.log('👑 پنل مدیریت همگانی!');

const multiAccountManager = new MultiAccountManager();
let db = null;
const sara = new SaraPersonality();
const memoryVault = new MemoryVault();
const learningEngine = new LearningEngine();
const userManager = new UserManager();
const groupManager = new GroupManager();

// ============================================
// 📤 اکسپورت برای Worker
// ============================================

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    db = new Database(env);

    let botStatus = await env.KV_BINDING.get('bot_status');

    if (!botStatus) {
      await env.KV_BINDING.put('bot_status', 'running');
      botStatus = 'running';
    }

    if (botStatus === 'running' && !isRunning) {
      await startSelfBot(env);
    }

    await multiAccountManager.setupManagers(env);

    // ======== دریافت کد ========

    if (url.pathname === '/setcode') {
      const code = url.searchParams.get('code');

      if (code) {
        await env.KV_BINDING.put('telegram_code', code);
        return new Response('✅ کد دریافت شد!');
      }

      return new Response('❌ ?code=XXXXX بفرست');
    }

    // ======== شروع ========

    if (url.pathname === '/start') {
      await startSelfBot(env);
      return new Response('✅ سلف‌بات شروع شد');
    }

    // ======== توقف ========

    if (url.pathname === '/stop') {
      await stopSelfBot(env);
      return new Response('⛔ سلف‌بات متوقف شد');
    }

    // ======== وضعیت ========

    if (url.pathname === '/status') {
      const status = await env.KV_BINDING.get('bot_status') || 'stopped';

      return new Response(
        `📊 وضعیت: ${status}`
      );
    }

    // ======== وب‌هوک ========

    if (url.pathname === '/webhook') {
      try {
        const body = await request.json();

        const message = body.message;
        const callbackQuery = body.callback_query;

        if (callbackQuery) {
          await handleAdminCallback(callbackQuery, env);
          return new Response('OK');
        }

        if (message) {
          await handleTelegramMessage(message, env);
        }

        return new Response('OK');

      } catch (error) {
        return new Response(
          'ERROR: ' + error.message,
          { status: 500 }
        );
      }
    }

    // ======== صفحه اصلی ========

    return new Response(`
🌸 سارا سلف‌بات فعال است

مسیرها:

/start
/stop
/status
/setcode?code=12345
/webhook
`);
  }
};
