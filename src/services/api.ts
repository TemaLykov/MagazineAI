interface PhotoRequest {
  email: string;
  firstName: string;
  photoStyle: string;
  role: string;
  purpose: string;
  ageRange: string;
  photo: File;
  telegramId: number | null;
  username: string | null;
}

export async function submitPhotoRequest(data: PhotoRequest): Promise<{ success: boolean }> {
  try {
    // Convert photo to base64
    const base64Photo = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(data.photo);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

    // Prepare data for API
    const requestData = {
      ...data,
      photo: base64Photo,
      photo_name: data.photo.name,
    };

    const response = await fetch('http://magazine-ai.ru/api/photo-transform', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Server temporarily unavailable. Please try again later.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting photo request:', error);
    throw new Error('Server temporarily unavailable. Please try again later.');
  }
}