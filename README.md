# lukash.me

Personal website for Lukash Onyshkevych - Software Engineer

## Overview

This is a modern, responsive static website built with vanilla HTML, CSS, and JavaScript. It's designed to be hosted on AWS S3 with CloudFront for fast global delivery.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Fast**: Static site with minimal dependencies for optimal performance
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Accessible**: Follows web accessibility best practices

## Structure

```
lukash.me/
├── index.html          # Home page
├── resume.html         # Resume page (text version)
├── styles.css          # All styling
├── script.js           # JavaScript for interactivity
├── resume.pdf          # PDF version of resume (add this)
└── README.md           # This file
```

## Local Development

1. Clone or navigate to this directory
2. Open `index.html` in your browser, or use a local server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Deployment to AWS S3

### Prerequisites

1. AWS Account
2. AWS CLI installed and configured
3. Domain name (lukash.me) configured

### Steps

1. **Create an S3 bucket**:
   ```bash
   aws s3 mb s3://lukash.me
   ```

2. **Configure bucket for static website hosting**:
   ```bash
   aws s3 website s3://lukash.me \
     --index-document index.html \
     --error-document index.html
   ```

3. **Set bucket policy** (make it publicly readable):
   Create a file `bucket-policy.json`:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::lukash.me/*"
       }
     ]
   }
   ```
   Then apply it:
   ```bash
   aws s3api put-bucket-policy --bucket lukash.me --policy file://bucket-policy.json
   ```

4. **Upload files**:
   ```bash
   aws s3 sync . s3://lukash.me --exclude "*.md" --exclude ".git/*"
   ```

5. **Optional: Set up CloudFront** (recommended for better performance):
   - Create a CloudFront distribution
   - Set origin to your S3 bucket
   - Configure your domain (lukash.me) to point to CloudFront
   - This provides SSL/HTTPS, CDN caching, and better performance

### Alternative: Using AWS Console

1. Go to S3 Console
2. Create bucket named `lukash.me`
3. Enable "Static website hosting" in bucket properties
4. Set index document to `index.html`
5. Upload all files (except README.md and .git files)
6. Set bucket policy for public read access
7. Your site will be available at: `http://lukash.me.s3-website-[region].amazonaws.com`

## Customization

### Update Personal Information

1. **index.html**: Update the hero section with your information
2. **resume.html**: Fill in your actual experience, education, skills, and projects
3. **resume.pdf**: Add your actual PDF resume (place it in the root directory)

### Update Email

In `resume.html`, replace `your.email@example.com` with your actual email address.

### Styling

All styles are in `styles.css`. The color scheme uses CSS variables defined in `:root`, making it easy to customize:

- `--color-primary`: Main brand color (currently blue)
- `--color-accent`: Accent color
- `--color-text`: Main text color
- `--color-bg`: Background color

### Add More Pages

1. Create a new HTML file (e.g., `projects.html`)
2. Copy the structure from `index.html`
3. Update the navigation links
4. Add your content

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript**: Vanilla JS for smooth interactions
- **Google Fonts**: Inter font family for typography

## Why This Stack?

- **No Build Step**: Simple, fast development without webpack/vite/etc
- **Fast Loading**: Minimal dependencies, optimized for performance
- **Easy to Deploy**: Just upload files to S3
- **Maintainable**: Easy to understand and modify
- **Cost Effective**: S3 + CloudFront is very affordable for personal sites

## Future Enhancements (Optional)

- Add a blog section
- Add a projects showcase page
- Add contact form (would need backend or service like Formspree)
- Add dark mode toggle
- Add analytics (Google Analytics, Plausible, etc.)
- Add RSS feed for blog posts

## License

Personal use - All rights reserved

