import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { OpenAI } from "https://deno.land/x/openai@v4.49.1/mod.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

if (!OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY environment variable');
  // Optionally, throw an error or handle this case as needed
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Allow all origins (for development)
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method Not Allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  let role: string | undefined;
  let trait: string | undefined;

  try {
    const body = await req.json();
    role = body.role;
    trait = body.trait;

    if (!role || !trait) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: role and trait' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Initialize OpenAI client
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

    // Construct the prompt
    const prompt = 
`Generate a brief description for a Tabletop RPG NPC with the following characteristics:
Role: ${role}
Key Trait: ${trait}

Provide the output in the following format:
Name: [NPC Name]
Appearance: [Brief appearance hint]
Motivation: [Key motivation or goal]`;

    // Call OpenAI API
    console.log(`Sending prompt to OpenAI for role: ${role}, trait: ${trait}`);
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150, // Adjust as needed
      temperature: 0.7, // Adjust for creativity vs. predictability
    });

    const npcDescription = chatCompletion.choices[0]?.message?.content?.trim() || 'Failed to generate description.';
    console.log('Received description from OpenAI:', npcDescription);

    // Return the generated description
    return new Response(
      JSON.stringify({ npcDescription }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );

  } catch (error) {
    console.error('Error processing request:', error);
    // Differentiate between client errors and OpenAI/server errors
    if (error instanceof SyntaxError) { // Handle invalid JSON
        return new Response(
          JSON.stringify({ error: 'Invalid JSON format in request body' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
    }
    // Handle OpenAI specific errors or general errors
    return new Response(
      JSON.stringify({ error: 'Failed to generate NPC description', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
}); 