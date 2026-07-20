-- جدول کاربران
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    created_at TEXT,
    last_active TEXT,
    is_verified TEXT DEFAULT 'false',
    is_admin TEXT DEFAULT 'false',
    credit INTEGER DEFAULT 0,
    points INTEGER DEFAULT 0,
    is_premium INTEGER DEFAULT 0
);

-- جدول تراکنش‌ها
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount INTEGER,
    type TEXT,
    desc TEXT,
    date TEXT,
    status TEXT DEFAULT 'completed'
);

-- جدول AI History
CREATE TABLE IF NOT EXISTS ai_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    prompt TEXT,
    response TEXT,
    mood TEXT,
    date TEXT
);
