# 🎂 Birthday Webpage Customization Guide

This guide will help you customize all the images and text in your birthday webpage.

## ✨ Special Features

### 🕯️ Blowable Candles
- Click "Enable Microphone to Blow" button
- Blow into your microphone to blow out each candle
- When all candles are blown out, confetti celebrates! 🎉
- You can relight the candles and try again

### 🎀 Hanging Ribbon
- "THE BIRTHDAY GIRL" text appears on a decorative ribbon above the photo
- The ribbon has a beautiful gradient effect with wavy edges

---

## 📝 Changing the Birthday Person's Name

### Location: `/src/app/components/Hero.tsx`
- **Line 4**: Change `"Tanya(My Potato)"` to your desired name
  ```typescript
  const name = "Your Name Here";
  ```

### Location: `/src/app/pages/Celebration.tsx`
- **Line 84**: Change the name in the canvas text
  ```typescript
  ctx.fillText("Your Name Here", 150, 410);
  ```

---

## 🖼️ Image Customization

### 1️⃣ Birthday Girl/Boy Photo (Canvas Frame)
**Location:** `/src/app/pages/Celebration.tsx`

**Line 75**: Replace the image URL
```typescript
img.src = "YOUR_IMAGE_URL_HERE";
```

**How to use your own image:**
- Upload your image to a free image hosting service like:
  - [Imgur](https://imgur.com)
  - [ImgBB](https://imgbb.com)
  - [Cloudinary](https://cloudinary.com)
- Copy the direct image link
- Paste it in place of the current URL

---

### 2️⃣ Gift Box Surprise Image
**Location:** `/src/app/components/InteractiveCard.tsx`

**Line 98**: Replace the gift image URL
```typescript
src="YOUR_GIFT_IMAGE_URL_HERE"
```

**Suggestions for gift images:**
- A photo of you together
- A special memory
- A funny inside joke picture
- An actual gift you're giving
- Any meaningful photo

---

### 3️⃣ Photo Gallery Images
**Location:** `/src/app/components/Gallery.tsx`

**Lines 4-10**: Replace all 5 gallery images
```typescript
const images = [
  "YOUR_IMAGE_1_URL",
  "YOUR_IMAGE_2_URL", 
  "YOUR_IMAGE_3_URL",
  "YOUR_IMAGE_4_URL",
  "YOUR_IMAGE_5_URL",
];
```

**Tips:**
- Use your favorite photos together
- Mix selfies, landscapes, and special moments
- Can use 3-10 images (adjust the array as needed)

---

## 🎨 Customizing Messages

### Hero Section Message
**Location:** `/src/app/components/Hero.tsx`

**Lines 55-58**: Customize the subtitle
```typescript
<p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
  Your custom message here
</p>
```

### Canvas Frame Title
**Location:** `/src/app/pages/Celebration.tsx`

**Line 37**: Change "THE BIRTHDAY GIRL" text
```typescript
ctx.fillText("YOUR CUSTOM TEXT", 150, 325);
```

### Wishes Section
**Location:** `/src/app/components/Wishes.tsx`

**Lines 4-25**: Customize all 4 wish cards with your own messages
```typescript
const wishes = [
  {
    icon: <Smile className="text-yellow-500" />,
    title: "Your Custom Title",
    description: "Your custom message about why they're special.",
  },
  // ... add more or modify existing ones
];
```

---

## 🎁 Quick Reference: All Image Locations

| Image Purpose | File Location | Line Number | Variable/Property |
|--------------|---------------|-------------|-------------------|
| Birthday Person Photo | `/src/app/pages/Celebration.tsx` | 75 | `img.src` |
| Gift Box Surprise | `/src/app/components/InteractiveCard.tsx` | 98 | `src` attribute |
| Gallery Image 1 | `/src/app/components/Gallery.tsx` | 5 | `images[0]` |
| Gallery Image 2 | `/src/app/components/Gallery.tsx` | 6 | `images[1]` |
| Gallery Image 3 | `/src/app/components/Gallery.tsx` | 7 | `images[2]` |
| Gallery Image 4 | `/src/app/components/Gallery.tsx` | 8 | `images[3]` |
| Gallery Image 5 | `/src/app/components/Gallery.tsx` | 9 | `images[4]` |

---

## 🎯 Step-by-Step: Replacing an Image

1. **Get your image ready:**
   - Have the photo saved on your computer
   - Make sure it's in JPG or PNG format

2. **Upload to image hosting:**
   - Go to [Imgur.com](https://imgur.com) (no account needed)
   - Click "New post"
   - Drag and drop your image
   - Right-click the uploaded image → "Copy image address"

3. **Update the code:**
   - Open the relevant file (see table above)
   - Find the line number
   - Replace the URL between the quotes `""`
   - Save the file

4. **Check the result:**
   - Your webpage should automatically update
   - If not, refresh the browser

---

## 💡 Pro Tips

- **Image Size:** For best performance, resize images to reasonable dimensions (max 2000px width)
- **Image Format:** JPG for photos, PNG for graphics with transparency
- **Consistent Style:** Use similar filter/editing style for all photos for a cohesive look
- **Aspect Ratio:** Gallery images work best in various sizes (the masonry layout adapts)
- **Canvas Photo:** Square or portrait images work best for the framed canvas

---

## 🆘 Troubleshooting

**Image not showing?**
- Check if the URL is direct (should end in .jpg, .png, .gif)
- Make sure there are no spaces in the URL
- Verify the image is publicly accessible

**Image looks stretched?**
- The layout is responsive and will adapt
- For canvas photo, square images work best

**Want to add more gallery images?**
- Simply add more URLs to the `images` array in Gallery.tsx
- Example: `"https://your-image-url.com/photo.jpg",`

---

## 🎉 That's It!

You're all set! Replace the images with your own photos to make this birthday webpage truly personal and special. Have fun customizing! 💖