# Google Tracking Setup — Symphony Smart Homes

## Step 1: Google Analytics 4
1. Go to https://analytics.google.com
2. Create a new GA4 property for symphonysh.com
3. Create a Web data stream
4. Copy the Measurement ID (format: G-XXXXXXXXXX)
5. In `index.html`, replace `GA_MEASUREMENT_ID` with your ID (appears twice)

## Step 2: Google Ads Conversion Tracking
1. Go to Google Ads > Goals > Conversions > New conversion action
2. Create two conversions:
   - "Schedule Consultation" (category: Submit lead form)
   - "Phone Call Click" (category: Phone call leads)
3. Copy the Conversion ID (format: AW-XXXXXXXXXX) and each Conversion Label
4. In `index.html`, replace `ADS_CONVERSION_ID` with your Conversion ID
5. In `src/utils/tracking.ts`, replace the placeholder conversion labels

## Step 3: Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: https://symphonysh.com
3. Choose "HTML tag" verification method
4. Copy the verification code
5. In `index.html`, replace `VERIFICATION_CODE` with your code
6. Verify in Search Console
7. Go to Sitemaps > Add: https://symphonysh.com/sitemap.xml

## Step 4: Link Everything
1. In Google Analytics: Admin > Google Ads Linking > Link your Ads account
2. In Google Ads: Tools > Linked accounts > Google Analytics > Link your GA4 property
3. In Google Search Console: Settings > Users and permissions > Add your Google Ads email if different
