import { NextResponse } from 'next/server';
import { UserProfile } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, isQuickAuth, name } = body;

    // Fast/Demo authentication or standard email login
    const userName = name || (email ? email.split('@')[0] : 'قارئ مَعِين');
    const userEmail = email || 'user@maeen.app';

    const user: UserProfile = {
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: userName,
      email: userEmail,
      avatar: userName.substring(0, 2).toUpperCase(),
      createdAt: new Date().toISOString(),
      streak: 3,
      lastActive: new Date().toISOString(),
      isCloudSynced: true,
    };

    return NextResponse.json({
      success: true,
      user,
      token: `maeen_jwt_${Date.now()}`,
      message: 'تم تسجيل الدخول بنجاح وتفعيل المزامنة السحابية'
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 400 });
  }
}
