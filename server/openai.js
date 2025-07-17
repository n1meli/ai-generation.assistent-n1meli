import axios from 'axios';
export async function generateStory(Hi, sending you a story, your task is to:
1. Rewrite the story in third person, adapting to the ~LANGUAGE~ context. 
2. Change most events, locations, characters to ~LANGUAGE~ names, while keeping the main idea of the story and chronology. 
3. Add jokes where appropriate. 
4. Make sure all names are ~LANGUAGE~, and the locations should also be culturally appropriate. You are allowed to use small towns, not just the capital, as long as you want to specify the exact location and the context allows it. If it's a currency, it must also match the most common ~LANGUAGE~ culture.
5. write me the same story in ~LANGUAGE~ language, and write it in 5 parts of 6000 letters.

Write a 5-part story based on this outline. 
Write interesting, varied, detailed and engaging. The story should be lively and intense. Each chapter should be unique and completely different from the previous one. Describe the images of people in detail: her dress, shoes, accessories, creating a slight eroticism within the limits allowed by the rules of YouTube. 

At the end of the story, add a hint of a sequel or a mystery that the audience will want to solve in the next episode, end the story on a very dramatic denouement.
Write one part at a time. don't write mini subplots within episodes.
Write the first part. Don't write anything extra at the end

Additional conditions are mandatory:
1. you are not allowed to enter any additional information other than the story itself. Example of what is forbidden: “Yes, I'm willing to do this story for you”, “Chapter 1”.
2. you must put the name used in the ~LANGUAGE~ culture in there.

story:
~STORY~) {
  const res = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );
  return res.data.choices[0].message.content;
}
