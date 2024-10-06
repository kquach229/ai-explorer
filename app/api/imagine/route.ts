import { NextResponse } from 'next/server';
import axios from 'axios';

// Define the type for the request body
interface RequestBody {
  prompt: string;
}

export async function POST(req: Request) {
  try {
    // Define the type for the JSON response
    const { prompt }: RequestBody = await req.json(); // Extract the text prompt from the request body

    const url =
      'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4';

    // Request to Hugging Face Inference API
    const response = await axios.post(
      url,
      {
        inputs: `a realistic image of ${prompt}`,
        parameters: {
          guidance_scale: 10,
          num_inference_steps: 100,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    // Convert the response (image) to base64 format
    const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');

    // Send the base64 image back to the client
    return NextResponse.json({ image: `data:image/png;base64,${imageBase64}` });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
