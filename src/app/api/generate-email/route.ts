// File: src/app/api/generate-email/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { formatRepresentativesList } from '@/utils/emailFormatter';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { representatives, userAddress, personalStory } = body;
    
    if (!representatives || !Array.isArray(representatives) || representatives.length === 0) {
      return NextResponse.json({
        subject: '',
        body: '',
        success: false,
        error: 'No representatives provided',
      }, { status: 400 });
    }

    const formattedAddress = `${userAddress.street}, ${userAddress.city}, ${userAddress.state} ${userAddress.zip}`;
    const repsList = formatRepresentativesList(representatives);
    const userName = userAddress.name || 'Concerned Constituent';
    
    console.log(`Generating email for ${userName} at address: ${formattedAddress}`);
    console.log(`Representatives: ${repsList}`);
    
    // Check if API key exists
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OpenAI API key is not set');
      return NextResponse.json({
        subject: '',
        body: '',
        success: false,
        error: 'API configuration error. Please contact the administrator.',
      }, { status: 500 });
    }
    
    // Create the prompt for OpenAI
    const prompt = `
Write a professional, compelling email opposing Arkansas Senate Bill 307. 
The email should be addressed to the following legislators: ${repsList}.
The email should be from a constituent named ${userName} living at: ${formattedAddress}.

Include these key points about SB307:
1. Express strong opposition to Senate Bill 307
2. Explain concerns about the bill's potential negative impacts on Arkansas residents
3. Request that the legislator vote against the bill
4. Thank them for considering your position

${personalStory ? `Include this personal perspective from the constituent: ${personalStory}` : ''}

Format the response as a JSON object with 'subject' and 'body' fields.
The subject should be concise and direct.
The body should be 3-4 paragraphs, professionally written, and persuasive.
The email should be signed with the constituent's name (${userName}).
Do not include any JSON comments, only return the valid JSON object.
`;

    console.log('Sending request to OpenAI');
    
    try {
      // Call OpenAI API
      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that generates professional emails for constituents to send to their elected officials.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      console.log('OpenAI response received');
      
      // Extract the generated content
      const generatedContent = openaiResponse.data.choices[0].message.content;
      
      try {
        // Parse the JSON response
        const emailContent = JSON.parse(generatedContent);
        
        return NextResponse.json({
          subject: emailContent.subject,
          body: emailContent.body,
          success: true,
        });
      } catch (parseError) {
        console.error('Error parsing OpenAI response:', parseError);
        console.log('Raw content:', generatedContent);
        
        // If JSON parsing fails, try to extract subject and body directly
        const subjectMatch = generatedContent.match(/subject["\s:]+([^"]+)/i);
        const bodyMatch = generatedContent.match(/body["\s:]+([^}]+)/i);
        
        if (subjectMatch && bodyMatch) {
          return NextResponse.json({
            subject: subjectMatch[1].trim(),
            body: bodyMatch[1].trim().replace(/^"|"$/g, ''),
            success: true,
          });
        } else {
          throw new Error('Could not parse OpenAI response');
        }
      }
    } catch (apiError: any) {
      // Detailed logging of the API error
      console.error('OpenAI API Error:', apiError.message);
      if (apiError.response) {
        console.error('API Response Status:', apiError.response.status);
        console.error('API Response Data:', JSON.stringify(apiError.response.data, null, 2));
      }
      
      return NextResponse.json({
        subject: '',
        body: '',
        success: false,
        error: apiError.response?.data?.error?.message || 'Failed to generate email with AI. Please try again.',
      }, { status: apiError.response?.status || 500 });
    }
  } catch (error: any) {
    console.error('Error in generate-email API route:', error.message);
    
    return NextResponse.json({
      subject: '',
      body: '',
      success: false,
      error: 'Failed to generate email content. Please try again.',
    }, { status: 500 });
  }
}