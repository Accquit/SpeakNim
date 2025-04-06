import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fcfpfxkxmejjbtsiubvi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZnBmeGt4bWVqamJ0c2l1YnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NDM0OTcsImV4cCI6MjA1OTQxOTQ5N30.ccFGb5kcJkaqJWMblEpnK8i5PdJIMWS52jZWYLQ91YA';
export const supabase = createClient(supabaseUrl, supabaseKey);
