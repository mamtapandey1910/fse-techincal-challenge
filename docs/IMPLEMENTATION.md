# Implementation Notes

Keep this short — 5 questions, answers under 200 words total.

---

**1. How did you structure your LLM analysis and why?**

_Single call vs multiple calls? How did you get structured output? What tradeoffs did you consider?_

I have implemented single call so that it could avoid multiple network calls which added latency. However, I have tried parallel execution of multiple calls but it was not giving me the expected results and it did not improve the latency. So I decided to go with single call.
Structure - text_format=CoreAnalysisResponse is inforcing desired structure however I have added some post processing to handle cases where the LLM is not able to follow the structure and give me the desired output.
Tradeoff - The open AI has to read all entire article and give the response in one go

---

**2. How did you handle errors or unexpected LLM responses?**

_What can go wrong (malformed JSON, API errors, missing fields) and how does your code handle it?_

OpenAI can be timeout, can hit rate limit, can give malformed JSON or can miss some fields in the response. I have handled these errors in openai_service.py file and I have implemented retry logic with exponential backoff for API errors.

**3. What did you prioritise on the frontend and why?**

_What did you choose to display and how? What did you leave out?_

I prioritised displaying the sentiment, risk and evidance, as these are the most important fields for analysis. Used chart to display quick analysis. I have left some optional fields such as sentiment_breakdown, mention_analysis, contradictions.

**4. What would you add with more time?**

_Which optional fields did you skip? What would you improve or extend?_

I would like to add optional fields such as sentiment_breakdown, mention_analysis, contradictions. I would also like to improve the UI and make it more user friendly. Also add caching mechanism to improve the performance and reduce the latency.

---

**5. How did you test your implementation?**

_Which articles did you test with? What edge cases did you cover? How did you validate correctness?_

I have added some custom articles for positive , negative, mixed, and also some neurtal sentiments and the response were consistent every single time. I have added some empty fields to check if my UI handles is properly.
