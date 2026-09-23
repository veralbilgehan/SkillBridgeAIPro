import sqlite3 from 'sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbPath);

const schema = `
CREATE TABLE IF NOT EXISTS companies (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tax_number TEXT,
    subscription_plan TEXT DEFAULT 'free',
    total_credits INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    company_id TEXT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'candidate',
    password_hash TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(company_id) REFERENCES companies(id)
);

CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    company_id TEXT NOT NULL,
    amount INTEGER NOT NULL,
    payment_status TEXT NOT NULL,
    paynkolay_ref TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(company_id) REFERENCES companies(id)
);

CREATE TABLE IF NOT EXISTS agents (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    system_prompt TEXT NOT NULL,
    model_type TEXT DEFAULT 'gemini-2.5-flash',
    status TEXT DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS cases (
    id TEXT PRIMARY KEY,
    company_id TEXT,
    created_by TEXT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    industry TEXT,
    difficulty TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(company_id) REFERENCES companies(id),
    FOREIGN KEY(created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS questions (
    id TEXT PRIMARY KEY,
    case_id TEXT NOT NULL,
    question_text TEXT NOT NULL,
    type TEXT NOT NULL,
    options TEXT,
    ideal_answer_key TEXT,
    FOREIGN KEY(case_id) REFERENCES cases(id)
);

CREATE TABLE IF NOT EXISTS test_sessions (
    id TEXT PRIMARY KEY,
    candidate_id TEXT NOT NULL,
    case_id TEXT NOT NULL,
    status TEXT DEFAULT 'started',
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    FOREIGN KEY(candidate_id) REFERENCES users(id),
    FOREIGN KEY(case_id) REFERENCES cases(id)
);

CREATE TABLE IF NOT EXISTS answers (
    id TEXT PRIMARY KEY,
    test_session_id TEXT NOT NULL,
    question_id TEXT NOT NULL,
    response_text TEXT,
    ai_score INTEGER,
    FOREIGN KEY(test_session_id) REFERENCES test_sessions(id),
    FOREIGN KEY(question_id) REFERENCES questions(id)
);

CREATE TABLE IF NOT EXISTS results (
    id TEXT PRIMARY KEY,
    test_session_id TEXT NOT NULL UNIQUE,
    radar_chart_data TEXT,
    error_analysis TEXT,
    mentor_decision TEXT,
    overall_score INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(test_session_id) REFERENCES test_sessions(id)
);
`;

db.serialize(() => {
    db.exec(schema, (err) => {
        if (err) {
            console.error('Veritabanı tabloları oluşturulurken hata:', err);
        } else {
            console.log('Tüm veritabanı tabloları başarıyla oluşturuldu!');
        }
    });

    // Create a default company and admin user for testing if not exists
    db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
        if (row && row.count === 0) {
            db.run("INSERT INTO companies (id, name, subscription_plan, total_credits) VALUES ('comp_admin', 'SkillBridge Yönetim', 'unlimited', 999999)");
            db.run("INSERT INTO users (id, company_id, full_name, email, role) VALUES ('local-admin', 'comp_admin', 'Süper Yönetici', 'admin@skillbridge.ai', 'admin')");
            console.log('Örnek yönetim şirketi ve admin kullanıcısı eklendi.');
        }
    });
});

db.close();
