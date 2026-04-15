import OpenAI from "openai";

let _openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

export type OutputType =
  | "MIDJOURNEY"
  | "STABLE_DIFFUSION"
  | "PRODUCT_DESCRIPTION"
  | "AD_COPY"
  | "SEO_CONTENT";

const SYSTEM_PROMPTS: Record<OutputType, string> = {
  MIDJOURNEY: `You are an expert Midjourney prompt engineer. Analyze the provided image and generate a detailed, production-ready Midjourney prompt. Include: subject, style, lighting, composition, camera angle, color palette, mood, and Midjourney parameters (--ar, --v, --style). Output only the prompt.`,

  STABLE_DIFFUSION: `You are an expert Stable Diffusion prompt engineer. Analyze the provided image and generate a detailed SD prompt with positive and negative prompts. Include style tags, quality boosters (masterpiece, best quality), and technical parameters. Format as: POSITIVE: [prompt] NEGATIVE: [prompt]`,

  PRODUCT_DESCRIPTION: `You are an expert e-commerce copywriter. Analyze the product image and write a compelling product description (150-200 words) that highlights key features, benefits, materials, and use cases. Use persuasive language and include a call-to-action.`,

  AD_COPY: `You are an expert advertising copywriter. Analyze the image and generate 3 variations of ad copy: 1) Social media ad (under 125 chars), 2) Facebook/Instagram ad (2-3 sentences), 3) Google Display ad headline + description. Label each clearly.`,

  SEO_CONTENT: `You are an expert SEO content strategist. Analyze the image and generate: 1) SEO title (under 60 chars), 2) Meta description (under 155 chars), 3) 5-7 target keywords, 4) Alt text for the image, 5) A 100-word SEO-optimized paragraph. Label each section.`,
};

export async function generateFromImage(
  imageBase64: string,
  mimeType: string,
  outputType: OutputType
): Promise<{ prompt: string }> {
  const openai = getOpenAI();
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: SYSTEM_PROMPTS[outputType],
          },
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${imageBase64}`,
              detail: "high",
            },
          },
        ],
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No content from OpenAI");

  return { prompt: content };
}

export async function enhancePrompt(
  prompt: string,
  outputType: OutputType
): Promise<string> {
  const openai = getOpenAI();
  const enhanceInstructions: Record<OutputType, string> = {
    MIDJOURNEY: `Enhance this Midjourney prompt by adding more specific artistic details, lighting descriptions, camera settings, and ensure proper --v and --ar parameters are included.`,
    STABLE_DIFFUSION: `Enhance this SD prompt by adding more quality tags, style descriptors, and ensure the negative prompt is comprehensive.`,
    PRODUCT_DESCRIPTION: `Rewrite and enhance this product description to be more compelling, add power words, and improve the call-to-action.`,
    AD_COPY: `Enhance these ad copy variations to be more compelling, benefit-focused, and action-oriented.`,
    SEO_CONTENT: `Enhance this SEO content with better keyword integration, improve the meta description, and make the paragraph more readable.`,
  };

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `${enhanceInstructions[outputType]}\n\nOriginal:\n${prompt}\n\nEnhanced version:`,
      },
    ],
  });

  return response.choices[0]?.message?.content ?? prompt;
}
