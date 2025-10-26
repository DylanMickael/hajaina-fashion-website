import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const apiFormData = new FormData();
    apiFormData.append('prompt', formData.get('prompt') as string);
    apiFormData.append('resolution', formData.get('resolution') as string);
    apiFormData.append('data', formData.get('data') as Blob);

    const response = await fetch('https://api.decart.ai/v1/generate/lucy-pro-i2i', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.DECART_API_KEY || '',
      },
      body: apiFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur API:', errorText);
      return NextResponse.json(
        { error: 'Erreur lors de la génération de l\'image' },
        { status: response.status }
      );
    }

    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const imageDataUrl = `data:image/png;base64,${base64Image}`;

    return NextResponse.json({
      image: imageDataUrl,
      text: 'Image générée avec succès'
    });

    } catch (error) {
        console.error('Erreur:', error);
        return NextResponse.json(
        { error: 'Erreur serveur' },
        { status: 500 }
    );
  }
}