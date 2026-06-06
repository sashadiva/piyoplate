import { Injectable, BadRequestException } from '@nestjs/common';
import {  GoogleGenerativeAI,  HarmCategory,  HarmBlockThreshold} from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  private readonly MODEL = 'gemini-3.5-flash';

  private readonly safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('⚠️  GEMINI_API_KEY tidak ditemukan di .env');
    }
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  }

  async estimateCaloriesFromIngredients(
    ingredients: string,
    title: string,
    servings: number = 1,
  ): Promise<{
    calories_per_serving: number;
    breakdown: string;
    notes: string;
  }> {
    const model = this.genAI.getGenerativeModel({
      model: this.MODEL,
      safetySettings: this.safetySettings,
    });

    const prompt = `Kamu adalah ahli gizi. Estimasikan total kalori untuk resep berikut.

Nama resep: ${title}
Jumlah porsi: ${servings}
Bahan-bahan:
${ingredients}

Berikan response dalam format JSON berikut SAJA, tanpa teks lain, tanpa markdown code block:
{
  "calories_per_serving": <angka bulat kalori per porsi>,
  "breakdown": "<penjelasan singkat kalori per bahan utama>",
  "notes": "<catatan singkat nilai gizi>"
}

Aturan:
- calories_per_serving = estimasi kalori untuk SATU porsi
- Gunakan standar kalori umum (nasi 130kkal/100gr, ayam 165kkal/100gr, telur 70kkal, dll)
- Jika jumlah bahan tidak jelas, pakai estimasi wajar untuk 1 porsi
- Hanya balas dengan JSON murni, tidak ada teks lain`;

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();

      // Bersihkan jika ada markdown code block
      const cleaned = text
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();

      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Gemini tidak mengembalikan JSON valid');

      const parsed = JSON.parse(jsonMatch[0]);

      return {
        calories_per_serving: Math.round(Number(parsed.calories_per_serving) || 0),
        breakdown: parsed.breakdown || '',
        notes: parsed.notes || '',
      };
    } catch (error) {
      throw new BadRequestException(
        `Gagal estimasi kalori dari AI`,
      );
    }
  }
  async estimateCaloriesFromPhoto(
    base64Image: string,
    mediaType: 'image/jpeg' | 'image/png' | 'image/webp' = 'image/jpeg',
    portionNote?: string,
  ): Promise<{
    food_name: string;
    calories_estimated: number;
    confidence: 'high' | 'medium' | 'low';
    breakdown: string;
    portion_note: string;
  }> {
    const model = this.genAI.getGenerativeModel({
      model: this.MODEL,
      safetySettings: this.safetySettings,
    });

    const portionContext = portionNote
      ? `Informasi porsi dari user: "${portionNote}"`
      : 'Estimasikan porsi dari apa yang terlihat di foto.';

    const prompt = `Kamu adalah ahli gizi dengan keahlian mendeteksi makanan dari foto.

Identifikasi semua makanan yang terlihat di foto ini dan estimasikan total kalorinya.
${portionContext}

Berikan response dalam format JSON berikut SAJA, tanpa teks lain, tanpa markdown code block:
{
  "food_name": "<nama makanan dalam Bahasa Indonesia, pisahkan dengan koma jika lebih dari 1>",
  "calories_estimated": <total kalori semua makanan, angka bulat>,
  "confidence": "<high|medium|low>",
  "breakdown": "<breakdown estimasi kalori per item makanan>",
  "portion_note": "<perkiraan ukuran/berat porsi dari foto>"
}

Aturan:
- food_name: nama makanan yang terdeteksi
- calories_estimated: total kalori semua yang ada di foto/piring
- confidence: "high" jika makanan jelas, "medium" jika kurang jelas, "low" jika tidak yakin
- Jika bukan foto makanan: set food_name "Tidak terdeteksi" dan calories_estimated 0
- Hanya balas dengan JSON murni`;

    try {
      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: mediaType,
            data: base64Image,
          },
        },
        prompt,
      ]);

      const text = result.response.text().trim();
      const cleaned = text
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();

      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Gemini tidak mengembalikan JSON valid');

      const parsed = JSON.parse(jsonMatch[0]);

      return {
        food_name: parsed.food_name || 'Tidak terdeteksi',
        calories_estimated: Math.max(0, Math.round(Number(parsed.calories_estimated) || 0)),
        confidence: parsed.confidence || 'medium',
        breakdown: parsed.breakdown || '',
        portion_note: parsed.portion_note || '',
      };
    } catch (error) {
      throw new BadRequestException(
        `Gagal deteksi kalori dari foto`,
      );
    }
  }
}