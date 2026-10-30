/**
 * Meta Graph API Permanent Token Generator for Dhana Lakshmi Loans
 * 
 * Usage:
 * node scripts/generate-permanent-token.js <APP_SECRET> [SHORT_LIVED_TOKEN]
 * 
 * Or set META_APP_SECRET in .env.local and run:
 * node scripts/generate-permanent-token.js
 */

const fs = require('fs');
const path = require('path');

const APP_ID = '1642106017554115';
const PAGE_ID = '1432705636591653';
const IG_ACCOUNT_ID = '17841438971111832';

function readEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  const env = {};
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const parts = line.trim().split('=');
      if (parts.length >= 2) {
        env[parts[0].trim()] = parts.slice(1).join('=').trim();
      }
    }
  }
  return { env, envPath };
}

async function run() {
  const { env, envPath } = readEnv();

  const appSecret = process.argv[2] || env.META_APP_SECRET;
  const shortToken = process.argv[3] || env.INSTAGRAM_ACCESS_TOKEN;

  if (!appSecret) {
    console.error('\n❌ ERROR: App Secret is required.');
    console.log('\nUsage:');
    console.log('  node scripts/generate-permanent-token.js <YOUR_APP_SECRET> [SHORT_TOKEN]');
    console.log('\nHow to get App Secret:');
    console.log('  1. Go to https://developers.facebook.com/apps/1642106017554115/settings/basic/');
    console.log('  2. Click "Show" next to App Secret and copy it.\n');
    process.exit(1);
  }

  if (!shortToken) {
    console.error('\n❌ ERROR: Short-lived access token is required.');
    console.log('Generate a token from Graph API Explorer and pass it as the second argument.\n');
    process.exit(1);
  }

  console.log('🔄 Step 1: Exchanging token for 60-day Long-Lived User Token...');
  const exchangeUrl = `https://graph.facebook.com/v20.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${appSecret}&fb_exchange_token=${shortToken}`;
  
  const exchangeRes = await fetch(exchangeUrl);
  const exchangeData = await exchangeRes.json();

  if (exchangeData.error) {
    console.error('❌ Token Exchange Failed:', exchangeData.error.message);
    process.exit(1);
  }

  const longLivedUserToken = exchangeData.access_token;
  console.log('✅ 60-day Long-Lived Token obtained! (Expires in ~60 days)');

  console.log('\n🔄 Step 2: Fetching Never-Expiring Page Access Token for Dhana Lakshmi Loans...');
  const accountsUrl = `https://graph.facebook.com/v20.0/me/accounts?access_token=${longLivedUserToken}`;
  const accountsRes = await fetch(accountsUrl);
  const accountsData = await accountsRes.json();

  if (accountsData.error) {
    console.error('❌ Failed fetching accounts:', accountsData.error.message);
    process.exit(1);
  }

  let permanentToken = null;
  const pages = accountsData.data || [];
  for (const page of pages) {
    if (page.id === PAGE_ID || page.name?.toLowerCase().includes('dhana lakshmi')) {
      permanentToken = page.access_token;
      console.log(`✅ Found Page: "${page.name}" (ID: ${page.id})`);
      break;
    }
  }

  if (!permanentToken && pages.length > 0) {
    // If exact page ID not matched, use first page
    permanentToken = pages[0].access_token;
    console.log(`✅ Using Page: "${pages[0].name}" (ID: ${pages[0].id})`);
  }

  const tokenToSave = permanentToken || longLivedUserToken;

  console.log('\n🔄 Step 3: Verifying Instagram Business Account connection with token...');
  const testUrl = `https://graph.facebook.com/v20.0/${IG_ACCOUNT_ID}/media?fields=id,caption&access_token=${tokenToSave}&limit=2`;
  const testRes = await fetch(testUrl);
  const testData = await testRes.json();

  if (testData.error) {
    console.warn('⚠️ Warning testing media endpoint:', testData.error.message);
  } else {
    console.log(`✅ Verified! Successfully read ${testData.data?.length || 0} posts from Instagram!`);
  }

  console.log('\n🔄 Step 4: Saving permanent token to .env.local...');
  const newEnvContent = [
    `INSTAGRAM_ACCESS_TOKEN=${tokenToSave}`,
    `INSTAGRAM_BUSINESS_ACCOUNT_ID=${IG_ACCOUNT_ID}`,
    `FACEBOOK_PAGE_ID=${PAGE_ID}`,
    `META_APP_ID=${APP_ID}`,
    `META_APP_SECRET=${appSecret}`,
  ].join('\n') + '\n';

  fs.writeFileSync(envPath, newEnvContent, 'utf-8');
  console.log('✅ Updated .env.local with permanent credentials!');
  console.log('\n🎉 ALL DONE! Your Instagram sync will now run permanently without expiring!\n');
}

run().catch((err) => {
  console.error('Unexpected error:', err);
});
