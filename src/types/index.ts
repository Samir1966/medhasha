export type UserRole = 'elder' | 'caregiver' | 'doctor' | 'volunteer' | 'admin';

export interface User {
    id: string;
    email?: string;
    phone?: string;
    full_name?: string;
    role: UserRole;
    avatar_url?: string;
    created_at: string;
    language_preference: 'en' | 'hi' | 'or';
}

export interface Doctor extends User {
    specialty: string;
    qualification: string;
    experience_years: number;
    clinic_address: string;
    consultation_fee: number;
    is_verified: boolean;
    available_slots: string[]; // ISO strings
    latitude?: number;
    longitude?: number;
}

export interface GameSession {
    id: string;
    user_id: string;
    game_type: 'matching' | 'recall' | 'odd_one_out' | 'reflex' | 'sequence';
    score: number;
    difficulty: 'easy' | 'medium' | 'hard';
    duration_seconds: number;
    played_at: string;
}
