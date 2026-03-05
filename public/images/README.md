Place all your project images in this folder and reference them at runtime using paths that start with `/images/`.

Recommended workflow (simplest — use `public/`):

1. Add image files here, e.g.:
   - public/images/birthday.jpg
   - public/images/gift.jpg
   - public/images/gallery-1.jpg
   - public/images/gallery-2.jpg

2. In your code, update any external URL like `https://images.unsplash.com/...` to a runtime path, e.g. `/images/birthday.jpg`.
   Example (canvas image in `Celebration.tsx`):

   // before
   img.src = "https://images.unsplash.com/....";

   // after
   img.src = "/images/birthday.jpg";

3. In React `img` elements, do the same:

   // before
   <img src="https://images.unsplash.com/..." />

   // after
   <img src="/images/gift.jpg" />

Notes:
- Files in `public/` are copied as-is into the final build during `vite build`. Using `/images/...` makes paths work both locally and on the hosted site.
- No imports are required for `public/` assets — use the absolute path starting with `/`.
- If you prefer Vite to fingerprint images (hashed filenames) and include them in the bundle, put them in `src/assets/images/` and import them in code instead. This is slightly more advanced.

After adding files, restart the dev server (`npm run dev`) if it was running.

Need help renaming/updating the exact files in your code? Reply "apply changes" and I'll update the references for you (I won't add your image binaries).