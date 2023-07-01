# make sure you aws profile is configured
npm run build
aws s3 sync build/ s3://schedulemyemail
aws cloudfront create-invalidation --distribution-id E1OIVAJ8X0IFM6 --paths "/*" --no-cli-pager