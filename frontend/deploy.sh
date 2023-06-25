# make sure you aws profile is configured
npm run build
aws s3 sync /build s3://schedule-my-email
aws cloudfront create-invalidation --distribution-id E2VGL9UAX81MEY --paths "/*" --no-cli-pager