-- Public read access policy for recolor_assets bucket
-- Paste this in Supabase SQL Editor

-- Policy for storage.objects (files access)
CREATE POLICY "Public read access for recolor_assets" 
ON storage.objects FOR SELECT 
USING (
  -- Allow access to all files in recolor_assets bucket
  bucket_id = 'recolor_assets'
  -- Allow all file types (not just JPG)
  -- Remove the extension restriction
  -- Allow all folders, not just 'public'
  -- Allow all users (anonymous + authenticated)
);

-- Optional: Policy for storage.buckets (bucket metadata access)  
CREATE POLICY "Public bucket info access"
ON storage.buckets FOR SELECT
USING (
  -- Allow everyone to see bucket information
  true
);