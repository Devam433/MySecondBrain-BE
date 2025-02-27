import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

/**
 * @param prompt - prompt the user has entered.
 * @param context - It is the related document(s) based on the prompt .
 * */
export const queryLLM = async (prompt,context) => {
  try {
    const client = new Mistral({apiKey: apiKey});

    const content = `Context information is below :-
    ${context} 
    Based on this context I want you to give me the answer for the following query.
    Query: ${prompt}`

    const chatResponse = await client.chat.complete({
      model: 'mistral-large-latest',
      messages: [{role: 'user', content: content}],
    });

    console.log('Chat:', chatResponse.choices[0].message.content);
    return chatResponse;
  } catch (error) {
    console.log('Error configuring LLM',error)
  }
}
