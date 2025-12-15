#!/bin/bash

# Deployment script for lukash.me to AWS S3
# Make sure AWS CLI is configured and you have the bucket created

BUCKET_NAME="lukash.me"
REGION="us-east-1"  # Change this to your preferred region

echo "🚀 Deploying lukash.me to S3..."

# Sync files to S3 (excluding git and markdown files)
aws s3 sync . s3://$BUCKET_NAME \
  --exclude "*.md" \
  --exclude ".git/*" \
  --exclude ".gitignore" \
  --exclude "deploy.sh" \
  --exclude ".DS_Store" \
  --delete \
  --region $REGION

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your site should be available at:"
    echo "   http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
    echo ""
    echo "💡 If you're using CloudFront, it may take a few minutes to update."
else
    echo "❌ Deployment failed. Check your AWS credentials and bucket configuration."
    exit 1
fi

