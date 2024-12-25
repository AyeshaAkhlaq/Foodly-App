import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yaemxzjfficpwprxqawi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZW14empmZmljcHdwcnhxYXdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzNjc2NjgsImV4cCI6MjA0OTk0MzY2OH0.wl3LN74ndsbo1SLdOQRvBt0g3WguXMakt9qMXHFih1E';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
