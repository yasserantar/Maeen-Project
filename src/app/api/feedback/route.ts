import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, message, context, name, email } = body;

    if (!message || message.trim() === '') {
      return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

    // Feedback received and logged safely
    console.log('[USER FEEDBACK / ERROR REPORT]', {
      type: type || 'general',
      context: context || 'None',
      message,
      name: name || 'Anonymous',
      email: email || 'No email provided',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'جزاكم الله خيراً! تم استلام رسالتكم وملاحظاتكم وسيقوم فريق مَعِين بمراجعتها وتصويبها فوراً.'
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to submit feedback' }, { status: 500 });
  }
}
