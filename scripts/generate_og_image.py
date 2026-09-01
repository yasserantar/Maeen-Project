import os
from PIL import Image, ImageDraw, ImageFont

def generate_og_image():
    width = 1200
    height = 630
    
    # Create high-res RGB image
    img = Image.new('RGB', (width, height), color='#071A14')
    draw = ImageDraw.Draw(img)
    
    # Gradient background
    for y in range(height):
        r = int(7 + (13 - 7) * (y / height))
        g = int(26 + (43 - 26) * (y / height))
        b = int(20 + (34 - 20) * (y / height))
        draw.line([(0, y), (width, y)], fill=(r, g, b))
        
    # Luxury Gold Border
    gold = '#F0CA50'
    gold_dim = '#8A7326'
    draw.rectangle([25, 25, width - 25, height - 25], outline=gold, width=4)
    draw.rectangle([35, 35, width - 35, height - 35], outline=gold_dim, width=1)
    
    # Corner Accents
    corner_size = 40
    # Top-Left
    draw.line([(25, 25 + corner_size), (25 + corner_size, 25)], fill=gold, width=6)
    # Top-Right
    draw.line([(width - 25 - corner_size, 25), (width - 25, 25 + corner_size)], fill=gold, width=6)
    # Bottom-Left
    draw.line([(25, height - 25 - corner_size), (25 + corner_size, height - 25)], fill=gold, width=6)
    # Bottom-Right
    draw.line([(width - 25 - corner_size, height - 25), (width - 25, height - 25 - corner_size)], fill=gold, width=6)
    
    # Try finding system fonts (Arial, Segoe UI, Tahoma)
    try:
        font_large = ImageFont.truetype("arial.ttf", 68)
        font_mid = ImageFont.truetype("arial.ttf", 34)
        font_small = ImageFont.truetype("arial.ttf", 22)
    except:
        font_large = ImageFont.load_default()
        font_mid = ImageFont.load_default()
        font_small = ImageFont.load_default()
        
    # Draw Logo Center Box
    box_w, box_h = 100, 100
    box_x = (width - box_w) // 2
    box_y = 70
    draw.rounded_rectangle([box_x, box_y, box_x + box_w, box_y + box_h], radius=24, fill='#0D382B', outline=gold, width=3)
    
    # "م" letter in box
    draw.text((box_x + 32, box_y + 16), "م", fill=gold, font=font_large)
    
    # Title
    title = "منصة مَعِين | Maeen Platform"
    draw.text(((width - draw.textlength(title, font=font_large)) // 2, 200), title, fill='#FFFFFF', font=font_large)
    
    # Subtitle
    subtitle = "معينك اليومي من القرآن الكريم والسنة النبوية المطهرة"
    draw.text(((width - draw.textlength(subtitle, font=font_mid)) // 2, 290), subtitle, fill=gold, font=font_mid)
    
    # Feature Badges
    badges = [
        "📖 صفحة يومية بتفسيرها المعتمد",
        "📜 حديث نبوي صحيح وأثره في حياتك",
        "🎧 تلاوة صوتية متواصلة"
    ]
    
    start_y = 380
    badge_spacing = 380
    total_w = len(badges) * 360
    start_x = (width - total_w) // 2
    
    for i, badge in enumerate(badges):
        bx = start_x + i * 365
        by = start_y
        draw.rounded_rectangle([bx, by, bx + 345, by + 65], radius=16, fill='#112B22', outline=gold_dim, width=2)
        tx = bx + (345 - draw.textlength(badge, font=font_small)) // 2
        draw.text((tx, by + 18), badge, fill='#FFFFFF', font=font_small)
        
    # Bottom Guarantee
    bot_text = "بدون إعلانات نهائياً • مزامنة سحابية • تلاوة وتفسير معتمد • 100% مجاناً"
    draw.text(((width - draw.textlength(bot_text, font=font_small)) // 2, 490), bot_text, fill='#A1C7B8', font=font_small)
    
    # URL Footer
    url_text = "https://maeen-app-five.vercel.app"
    draw.text(((width - draw.textlength(url_text, font=font_small)) // 2, 545), url_text, fill=gold, font=font_small)
    
    # Save output
    out_dir = os.path.join(os.path.dirname(__file__), "..", "public")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "og-image.png")
    img.save(out_path, "PNG")
    print(f"Generated successfully: {out_path}")

if __name__ == '__main__':
    generate_og_image()
