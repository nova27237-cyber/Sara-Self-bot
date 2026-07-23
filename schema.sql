-- ============================================
-- 🗄️ دیتابیس سارا HYPER FUL ULTIMATE
-- ============================================

-- ===== ۱. جدول کاربران =====
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    last_active TEXT DEFAULT (datetime('now')),
    is_verified TEXT DEFAULT 'false',
    is_admin TEXT DEFAULT 'false',
    credit INTEGER DEFAULT 0,
    points INTEGER DEFAULT 0,
    is_premium INTEGER DEFAULT 0,
    lang TEXT DEFAULT 'fa',
    mood TEXT DEFAULT 'neutral',
    bio TEXT,
    age INTEGER,
    city TEXT,
    job TEXT,
    interests TEXT,
    blocked INTEGER DEFAULT 0,
    warning_count INTEGER DEFAULT 0,
    total_messages INTEGER DEFAULT 0,
    total_voice INTEGER DEFAULT 0,
    total_media INTEGER DEFAULT 0
);

-- ===== ۲. جدول تراکنش‌ها =====
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount INTEGER,
    type TEXT CHECK(type IN ('credit', 'debit', 'gift', 'penalty', 'reward')),
    desc TEXT,
    date TEXT DEFAULT (datetime('now')),
    status TEXT DEFAULT 'completed',
    ref_id TEXT,
    admin_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ===== ۳. جدول تاریخچه AI =====
CREATE TABLE IF NOT EXISTS ai_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    prompt TEXT,
    response TEXT,
    mood TEXT,
    confidence REAL DEFAULT 0.5,
    processing_time INTEGER,
    date TEXT DEFAULT (datetime('now')),
    model TEXT DEFAULT 'sara-v1',
    is_voice INTEGER DEFAULT 0,
    is_photo INTEGER DEFAULT 0,
    tokens_used INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ===== ۴. جدول حافظه بلندمدت =====
CREATE TABLE IF NOT EXISTS memory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    key TEXT,
    value TEXT,
    type TEXT CHECK(type IN ('fact', 'preference', 'memory', 'context')),
    importance REAL DEFAULT 0.5,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    expires_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ===== ۵. جدول IP Hash ها =====
CREATE TABLE IF NOT EXISTS ip_hashes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    ip_hash TEXT UNIQUE,
    created_at TEXT DEFAULT (datetime('now')),
    last_used TEXT,
    is_active INTEGER DEFAULT 1,
    device_name TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ===== ۶. جدول تنظیمات گروه =====
CREATE TABLE IF NOT EXISTS group_settings (
    chat_id INTEGER PRIMARY KEY,
    active INTEGER DEFAULT 1,
    only_mention INTEGER DEFAULT 1,
    anti_spam INTEGER DEFAULT 1,
    max_messages INTEGER DEFAULT 5,
    time_window INTEGER DEFAULT 30,
    welcome INTEGER DEFAULT 1,
    welcome_message TEXT DEFAULT '🌸 به گروه خوش آمدید!',
    mode TEXT DEFAULT 'normal',
    auto_delete INTEGER DEFAULT 0,
    delete_time INTEGER DEFAULT 60,
    keywords TEXT DEFAULT '{}',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- ===== ۷. جدول کلمات کلیدی گروه =====
CREATE TABLE IF NOT EXISTS group_keywords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id INTEGER,
    keyword TEXT,
    reply TEXT,
    is_regex INTEGER DEFAULT 0,
    priority INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (chat_id) REFERENCES group_settings(chat_id)
);

-- ===== ۸. جدول لیست سیاه گروه =====
CREATE TABLE IF NOT EXISTS group_blacklist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id INTEGER,
    user_id INTEGER,
    reason TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    expires_at TEXT,
    banned_by INTEGER,
    UNIQUE(chat_id, user_id)
);

-- ===== ۹. جدول لاگ‌ها =====
CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level TEXT CHECK(level IN ('info', 'warning', 'error', 'debug')),
    message TEXT,
    user_id INTEGER,
    chat_id INTEGER,
    action TEXT,
    ip TEXT,
    date TEXT DEFAULT (datetime('now')),
    metadata TEXT
);

-- ===== ۱۰. جدول تنظیمات ربات =====
CREATE TABLE IF NOT EXISTS bot_settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    type TEXT DEFAULT 'string',
    description TEXT,
    updated_at TEXT DEFAULT (datetime('now'))
);

-- ===== ۱۱. جدول بک‌آپ =====
CREATE TABLE IF NOT EXISTS backups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    file_name TEXT,
    size INTEGER,
    created_at TEXT DEFAULT (datetime('now')),
    status TEXT DEFAULT 'pending',
    location TEXT
);

-- ============================================
-- 📊 ایندکس‌ها (برای سرعت بیشتر)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_last_active ON users(last_active);
CREATE INDEX IF NOT EXISTS idx_users_is_admin ON users(is_admin);
CREATE INDEX IF NOT EXISTS idx_users_is_premium ON users(is_premium);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);

CREATE INDEX IF NOT EXISTS idx_ai_history_user_id ON ai_history(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_history_date ON ai_history(date);
CREATE INDEX IF NOT EXISTS idx_ai_history_mood ON ai_history(mood);

CREATE INDEX IF NOT EXISTS idx_memory_user_id ON memory(user_id);
CREATE INDEX IF NOT EXISTS idx_memory_key ON memory(key);
CREATE INDEX IF NOT EXISTS idx_memory_type ON memory(type);

CREATE INDEX IF NOT EXISTS idx_ip_hashes_user_id ON ip_hashes(user_id);
CREATE INDEX IF NOT EXISTS idx_ip_hashes_ip_hash ON ip_hashes(ip_hash);

CREATE INDEX IF NOT EXISTS idx_group_settings_chat_id ON group_settings(chat_id);
CREATE INDEX IF NOT EXISTS idx_group_keywords_chat_id ON group_keywords(chat_id);
CREATE INDEX IF NOT EXISTS idx_group_blacklist_chat_id ON group_blacklist(chat_id);

CREATE INDEX IF NOT EXISTS idx_logs_date ON logs(date);
CREATE INDEX IF NOT EXISTS idx_logs_level ON logs(level);
CREATE INDEX IF NOT EXISTS idx_logs_user_id ON logs(user_id);

-- ============================================
-- 🔧 داده‌های اولیه
-- ============================================

INSERT OR IGNORE INTO bot_settings (key, value, type, description) VALUES
('bot_status', 'stopped', 'string', 'وضعیت ربات'),
('bot_start_time', '', 'string', 'زمان شروع ربات'),
('bot_version', '1.0.0', 'string', 'نسخه ربات'),
('default_lang', 'fa', 'string', 'زبان پیش‌فرض'),
('typing', 'true', 'boolean', 'تایپ خودکار'),
('self', 'true', 'boolean', 'حالت سلف'),
('bio', 'true', 'boolean', 'بیوگرافی خودکار'),
('welcome', 'true', 'boolean', 'خوش‌آمدگویی');

-- ============================================
-- 📊 ویوهای آماری
-- ============================================

-- آمار کاربران
CREATE VIEW IF NOT EXISTS user_stats AS
SELECT 
    COUNT(*) as total_users,
    SUM(CASE WHEN is_verified = 'true' THEN 1 ELSE 0 END) as verified_users,
    SUM(CASE WHEN is_admin = 'true' THEN 1 ELSE 0 END) as admin_users,
    SUM(CASE WHEN is_premium = 1 THEN 1 ELSE 0 END) as premium_users,
    SUM(CASE WHEN datetime(last_active) > datetime('now', '-7 days') THEN 1 ELSE 0 END) as active_7days,
    SUM(CASE WHEN blocked = 1 THEN 1 ELSE 0 END) as blocked_users
FROM users;

-- آمار روزانه
CREATE VIEW IF NOT EXISTS daily_stats AS
SELECT 
    date(created_at) as day,
    COUNT(*) as new_users
FROM users
GROUP BY date(created_at)
ORDER BY day DESC
LIMIT 30;

-- آمار تراکنش‌ها
CREATE VIEW IF NOT EXISTS transaction_stats AS
SELECT 
    type,
    COUNT(*) as count,
    SUM(amount) as total_amount,
    AVG(amount) as avg_amount
FROM transactions
WHERE status = 'completed'
GROUP BY type;

-- آمار AI
CREATE VIEW IF NOT EXISTS ai_stats AS
SELECT 
    mood,
    COUNT(*) as count,
    AVG(confidence) as avg_confidence,
    AVG(processing_time) as avg_time
FROM ai_history
GROUP BY mood
ORDER BY count DESC;
